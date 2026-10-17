<?php

namespace App\Http\Controllers\Empleados\Permisos;

use App\Http\Controllers\Controller;
use App\Models\EmpleadoActivo;
use App\Models\Permiso;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PermisosController extends Controller
{
    private const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    private const TIPOS = ['Eventual', 'Permanente'];
    private const STATUS = ['Activo', 'Procesando', 'Permiso Vencido'];

    private const MOTIVOS = [
        'Permiso Médico',
        'Permiso por Cuido',
        'Permiso Pre-Post',
        'Permiso Solicitado',
        'Permiso por Vacaciones',
        'Otros Permisos',
        'Permiso por Estudios',
        'Permiso Especial',
    ];

    // ════════════════════════════════════════════════════════
    // LISTADO
    // ════════════════════════════════════════════════════════
    public function index(Request $request): Response
    {
        $search = trim($request->get('search', ''));
        $filterTipo = $request->get('tipo');
        $filterStatus = $request->get('status');
        $filterEmpleadoId = $request->get('empleado_id');
        $filterDesde = $request->get('desde');
        $filterHasta = $request->get('hasta');

        // ── EVENTUALES (1 fila por permiso) ──
        $eventuales = Permiso::query()
            ->with(['empleado:id,nombres,apellidos,cedula,documento,foto,tipo_de_personal'])
            ->where('tipo', 'Eventual')
            ->when($search, function ($q, $s) {
                $q->where(function ($qq) use ($s) {
                    $qq->where('descripcion', 'like', "%{$s}%")
                        ->orWhereHas('empleado', function ($eq) use ($s) {
                            $eq->where('nombres', 'like', "%{$s}%")
                                ->orWhere('apellidos', 'like', "%{$s}%")
                                ->orWhere('cedula', 'like', "%{$s}%");
                        });
                });
            })
            ->when($filterStatus, fn($q, $s) => $q->where('status', $s))
            ->when($filterEmpleadoId, fn($q, $id) => $q->where('empleado_id', $id))
            ->when($filterDesde, fn($q, $d) => $q->whereDate('fecha_registro', '>=', $d))
            ->when($filterHasta, fn($q, $h) => $q->whereDate('fecha_registro', '<=', $h))
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'tipo' => 'Eventual',
                'empleado_id' => $p->empleado_id,
                'empleado' => $p->empleado,
                'detalle' => $p->detalle,
                'fecha_de_inicio' => $p->fecha_de_inicio,
                'fecha_final' => $p->fecha_final,
                'dia' => null,
                'dias' => [],
                'descripcion' => $p->descripcion,
                'status' => $p->status,
                'fecha_registro' => $p->fecha_registro,
                'ids_agrupados' => [$p->id],
            ]);

        // ── PERMANENTES (agrupados por empleado + descripción) ──
        $permanentesRaw = Permiso::query()
            ->with(['empleado:id,nombres,apellidos,cedula,documento,foto,tipo_de_personal'])
            ->where('tipo', 'Permanente')
            ->when($search, function ($q, $s) {
                $q->where(function ($qq) use ($s) {
                    $qq->where('descripcion', 'like', "%{$s}%")
                        ->orWhereHas('empleado', function ($eq) use ($s) {
                            $eq->where('nombres', 'like', "%{$s}%")
                                ->orWhere('apellidos', 'like', "%{$s}%")
                                ->orWhere('cedula', 'like', "%{$s}%");
                        });
                });
            })
            ->when($filterStatus, fn($q, $s) => $q->where('status', $s))
            ->when($filterEmpleadoId, fn($q, $id) => $q->where('empleado_id', $id))
            ->when($filterDesde, fn($q, $d) => $q->whereDate('fecha_registro', '>=', $d))
            ->when($filterHasta, fn($q, $h) => $q->whereDate('fecha_registro', '<=', $h))
            ->orderBy('empleado_id')
            ->orderBy('descripcion')
            ->orderBy('dia')
            ->get();

        $ordenDias = array_flip(self::DIAS_SEMANA);

        $permanentes = $permanentesRaw
            ->groupBy(fn($p) => $p->empleado_id . '|' . $p->descripcion)
            ->map(function ($grupo) use ($ordenDias) {
                $primero = $grupo->first();

                $dias = $grupo->pluck('dia')
                    ->filter()
                    ->sortBy(fn($d) => $ordenDias[$d] ?? 99)
                    ->values()
                    ->all();

                $statuses = $grupo->pluck('status')->unique();
                $statusFinal = $statuses->contains('Activo')
                    ? 'Activo'
                    : ($statuses->contains('Procesando') ? 'Procesando' : 'Permiso Vencido');

                return [
                    'id' => $primero->id,
                    'tipo' => 'Permanente',
                    'empleado_id' => $primero->empleado_id,
                    'empleado' => $primero->empleado,
                    'detalle' => implode(', ', $dias),
                    'fecha_de_inicio' => null,
                    'fecha_final' => null,
                    'dia' => null,
                    'dias' => $dias,
                    'descripcion' => $primero->descripcion,
                    'status' => $statusFinal,
                    'fecha_registro' => $primero->fecha_registro,
                    'ids_agrupados' => $grupo->pluck('id')->values()->all(),
                ];
            })
            ->values();

        // ── COMBINAR ──
        $allPermisos = $eventuales->concat($permanentes);

        if ($filterTipo) {
            $allPermisos = $allPermisos->filter(fn($p) => $p['tipo'] === $filterTipo);
        }

        $ordenStatus = array_flip(self::STATUS);
        $allPermisos = $allPermisos
            ->sortBy([
                fn($a, $b) => ($ordenStatus[$a['status']] ?? 99) <=> ($ordenStatus[$b['status']] ?? 99),
                fn($a, $b) => strtotime($b['fecha_registro'] ?? '1970-01-01') <=> strtotime($a['fecha_registro'] ?? '1970-01-01'),
            ])
            ->values();

        // ── PAGINACIÓN MANUAL ──
        $perPage = 6;
        $currentPage = max((int) $request->get('page', 1), 1);
        $total = $allPermisos->count();
        $lastPage = max((int) ceil($total / $perPage), 1);
        $items = $allPermisos->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $permisos = [
            'data' => $items,
            'current_page' => $currentPage,
            'last_page' => $lastPage,
            'total' => $total,
            'per_page' => $perPage,
            'links' => $this->buildPaginationLinks($currentPage, $lastPage, $request),
        ];

        $empleados = EmpleadoActivo::query()
            ->where('situacion_laboral', '!=', 'Retirado')
            ->orderBy('id', 'asc')
            ->get(['id', 'nombres', 'apellidos', 'cedula', 'documento'])
            ->map(fn($e) => [
                'value' => $e->id,
                'label' => trim("{$e->nombres} {$e->apellidos}"),
                'cedula' => ($e->documento ?? '') . $e->cedula,
            ]);

        return Inertia::render('Empleados/Permisos/Index', [
            'permisos' => $permisos,
            'empleados' => $empleados,
            'filters' => [
                'search' => $search,
                'tipo' => $filterTipo,
                'status' => $filterStatus,
                'empleado_id' => $filterEmpleadoId,
                'desde' => $filterDesde,
                'hasta' => $filterHasta,
            ],
        ]);
    }

    private function buildPaginationLinks(int $currentPage, int $lastPage, Request $request): array
    {
        $links = [];
        $baseUrl = '/empleados/activos/permisos';
        $query = $request->except('page');

        $links[] = [
            'url' => $currentPage > 1
                ? $baseUrl . '?' . http_build_query(array_merge($query, ['page' => $currentPage - 1]))
                : null,
            'label' => '&laquo; Previous',
            'active' => false,
        ];

        for ($i = 1; $i <= $lastPage; $i++) {
            $links[] = [
                'url' => $baseUrl . '?' . http_build_query(array_merge($query, ['page' => $i])),
                'label' => (string) $i,
                'active' => $i === $currentPage,
            ];
        }

        $links[] = [
            'url' => $currentPage < $lastPage
                ? $baseUrl . '?' . http_build_query(array_merge($query, ['page' => $currentPage + 1]))
                : null,
            'label' => 'Next &raquo;',
            'active' => false,
        ];

        return $links;
    }

    // ════════════════════════════════════════════════════════
    // CREAR
    // ════════════════════════════════════════════════════════
    public function store(Request $request)
    {
        $validated = $request->validate([
            'empleado_id' => ['required', 'integer', 'exists:empleado_activos,id'],
            'tipo' => ['required', Rule::in(self::TIPOS)],
            'descripcion' => ['required', 'string', Rule::in(self::MOTIVOS)],

            'fecha_de_inicio' => ['exclude_if:tipo,Permanente', 'required', 'date'],
            'fecha_final' => ['exclude_if:tipo,Permanente', 'required', 'date', 'after_or_equal:fecha_de_inicio'],

            'dias' => ['exclude_if:tipo,Eventual', 'required', 'array', 'min:1'],
            'dias.*' => ['string', Rule::in(self::DIAS_SEMANA)],
        ], [
            'empleado_id.required' => 'Selecciona un empleado.',
            'tipo.required' => 'Selecciona el tipo de permiso.',
            'descripcion.required' => 'Selecciona una descripción.',
            'descripcion.in' => 'La descripción seleccionada no es válida.',
            'fecha_de_inicio.required' => 'La fecha de inicio es obligatoria.',
            'fecha_final.required' => 'La fecha final es obligatoria.',
            'fecha_final.after_or_equal' => 'La fecha final debe ser igual o posterior a la fecha de inicio.',
            'dias.required' => 'Selecciona al menos un día.',
            'dias.min' => 'Selecciona al menos un día.',
        ]);

        $empleado = EmpleadoActivo::findOrFail($validated['empleado_id']);
        $fechaRegistro = now()->format('Y-m-d');

        // ═══════════════════════════════════════════════
        // Crear el permiso
        // ═══════════════════════════════════════════════
        if ($validated['tipo'] === 'Eventual') {
            Permiso::create([
                'empleado_id' => $validated['empleado_id'],
                'tipo' => 'Eventual',
                'fecha_de_inicio' => $validated['fecha_de_inicio'],
                'fecha_final' => $validated['fecha_final'],
                'dia' => null,
                'descripcion' => $validated['descripcion'],
                'status' => 'Activo',
                'fecha_registro' => $fechaRegistro,
            ]);
            $mensajeExito = 'Permiso eventual registrado correctamente.';
        } else {
            foreach ($validated['dias'] as $dia) {
                Permiso::create([
                    'empleado_id' => $validated['empleado_id'],
                    'tipo' => 'Permanente',
                    'fecha_de_inicio' => null,
                    'fecha_final' => null,
                    'dia' => $dia,
                    'descripcion' => $validated['descripcion'],
                    'status' => 'Activo',
                    'fecha_registro' => $fechaRegistro,
                ]);
            }
            $total = count($validated['dias']);
            $plural = $total === 1 ? 'día' : 'días';
            $mensajeExito = "Permiso permanente registrado en {$total} {$plural}.";
        }

        // ═══════════════════════════════════════════════
        // Construir mensaje de WhatsApp
        // ═══════════════════════════════════════════════
        $whatsappData = $this->buildWhatsAppMessage($empleado, $validated);

        // ═══════════════════════════════════════════════
        // Redirigir con success + whatsapp_message
        // ═══════════════════════════════════════════════
        return back()
            ->with('success', $mensajeExito)
            ->with('whatsapp_message', $whatsappData);
    }

    /**
     * Construye los datos del mensaje de WhatsApp.
     */
    private function buildWhatsAppMessage(EmpleadoActivo $empleado, array $validated): array
    {
        $nombreCompleto = trim("{$empleado->nombres} {$empleado->apellidos}");

        // ═══ EVENTUAL ═══
        if ($validated['tipo'] === 'Eventual') {
            $fechaInicio = \Carbon\Carbon::parse($validated['fecha_de_inicio']);
            $fechaFinal = \Carbon\Carbon::parse($validated['fecha_final']);
            $totalDias = $fechaInicio->diffInDays($fechaFinal) + 1;

            $mensaje = "✅ *COMPROBANTE DE PERMISO*\n" .
                "Estimad@ *{$nombreCompleto}*,\n" .
                "Se te informa que ha registrado un Permiso *Eventual* hasta el " . $fechaFinal->format('d/m/Y') . ".\n" .
                "📝 *Motivo:* {$validated['descripcion']}\n" .
                "🗓️ *Desde:* " . $fechaInicio->format('d/m/Y') . "\n" .
                "🗓️ *Hasta:* " . $fechaFinal->format('d/m/Y') . "\n" .
                "⏳ *Total:* {$totalDias} día(s)\n" .
                "Atentamente, *Gestión de Personal*";
        }
        // ═══ PERMANENTE ═══
        else {
            $listaDias = implode(', ', $validated['dias']);

            $mensaje = "✅ *COMPROBANTE DE PERMISO*\n" .
                "Estimad@ *{$nombreCompleto}*,\n" .
                "Se te informa que ha asignado un Permiso Permanente los días: *{$listaDias}*.\n" .
                "📝 *Motivo:* {$validated['descripcion']}\n" .
                "🗓️ *Días:* {$listaDias}\n" .
                "Atentamente, *Gestión de Personal*";
        }

        // Número formateado para WhatsApp
        $numeroWhatsApp = $this->formatPhone($empleado->telefono);
        $mensajeCodificado = rawurlencode($mensaje);

        return [
            'destinatario' => $nombreCompleto,
            'numero' => $empleado->telefono ?? '—',
            'numero_whatsapp' => $numeroWhatsApp,
            'mensaje' => $mensaje,
            // URL para enviar al número del empleado
            'url_send' => "https://wa.me/{$numeroWhatsApp}?text={$mensajeCodificado}",
            // URL para elegir cualquier contacto manualmente
            'url_pick' => "https://wa.me/?text={$mensajeCodificado}",
            // Detectar si el empleado tiene teléfono
            'tiene_telefono' => !empty($empleado->telefono),
        ];
    }

    /**
     * Formatea el teléfono para WhatsApp (código de país 58 Venezuela).
     */
    private function formatPhone(?string $phone): string
    {
        if (!$phone) return '';
        $clean = preg_replace('/[^0-9]/', '', $phone);
        if (!$clean) return '';
        // Si empieza con 0 → reemplazar por 58
        if (str_starts_with($clean, '0')) {
            return '58' . substr($clean, 1);
        }
        // Si empieza con 58 → dejarlo
        if (str_starts_with($clean, '58')) {
            return $clean;
        }
        // Sino, agregar 58
        return '58' . $clean;
    }

    // ════════════════════════════════════════════════════════
    // ACTUALIZAR
    // ════════════════════════════════════════════════════════
    public function update(Request $request, Permiso $permiso)
    {
        $validated = $request->validate([
            'descripcion' => ['required', 'string', Rule::in(self::MOTIVOS)],

            'fecha_de_inicio' => $permiso->tipo === 'Eventual'
                ? ['required', 'date']
                : ['nullable'],
            'fecha_final' => $permiso->tipo === 'Eventual'
                ? ['required', 'date', 'after_or_equal:fecha_de_inicio']
                : ['nullable'],

            'dias' => $permiso->tipo === 'Permanente'
                ? ['required', 'array', 'min:1']
                : ['nullable'],
            'dias.*' => ['string', Rule::in(self::DIAS_SEMANA)],
        ], [
            'descripcion.required' => 'Selecciona una descripción.',
            'descripcion.in' => 'La descripción seleccionada no es válida.',
            'fecha_de_inicio.required' => 'La fecha de inicio es obligatoria.',
            'fecha_final.required' => 'La fecha final es obligatoria.',
            'fecha_final.after_or_equal' => 'La fecha final debe ser igual o posterior a la fecha de inicio.',
            'dias.required' => 'Selecciona al menos un día.',
            'dias.min' => 'Selecciona al menos un día.',
        ]);

        // ── EVENTUAL ──
        if ($permiso->tipo === 'Eventual') {
            $permiso->update([
                'descripcion' => $validated['descripcion'],
                'fecha_de_inicio' => $validated['fecha_de_inicio'],
                'fecha_final' => $validated['fecha_final'],
            ]);

            return back()->with('success', 'Permiso actualizado correctamente.');
        }

        // ── PERMANENTE: eliminar grupo + recrear ──
        $descripcionOriginal = $permiso->descripcion;
        $empleadoId = $permiso->empleado_id;

        // Elimino TODOS los días del grupo (por empleado + descripción)
        Permiso::where('empleado_id', $empleadoId)
            ->where('tipo', 'Permanente')
            ->where('descripcion', $descripcionOriginal)
            ->delete();

        // Recreo con los nuevos días
        $fechaRegistro = now()->format('Y-m-d');
        foreach ($validated['dias'] as $dia) {
            Permiso::create([
                'empleado_id' => $empleadoId,
                'tipo' => 'Permanente',
                'fecha_de_inicio' => null,
                'fecha_final' => null,
                'dia' => $dia,
                'descripcion' => $validated['descripcion'],
                'status' => 'Activo',
                'fecha_registro' => $fechaRegistro,
            ]);
        }

        $total = count($validated['dias']);
        $plural = $total === 1 ? 'día' : 'días';

        return back()->with('success', "Permiso permanente actualizado en {$total} {$plural}.");
    }

    // ════════════════════════════════════════════════════════
    // ELIMINAR
    // ════════════════════════════════════════════════════════
    public function destroy(Permiso $permiso)
    {
        // Si es Permanente, eliminar TODOS los días del grupo (mismo empleado + descripción)
        if ($permiso->tipo === 'Permanente') {
            $eliminados = Permiso::where('empleado_id', $permiso->empleado_id)
                ->where('tipo', 'Permanente')
                ->where('descripcion', $permiso->descripcion)
                ->delete();

            $plural = $eliminados === 1 ? 'día' : 'días';

            return back()->with('success', "Permiso permanente eliminado ({$eliminados} {$plural}).");
        }

        // Eventual: solo 1 registro
        $permiso->delete();

        return back()->with('success', 'Permiso eliminado.');
    }

    // ════════════════════════════════════════════════════════
    // TOGGLE STATUS
    // ════════════════════════════════════════════════════════
    public function toggle(Permiso $permiso)
    {
        $nuevo = $permiso->status === 'Activo' ? 'Permiso Vencido' : 'Activo';

        // Si es Permanente, aplicar a TODOS los días del mismo grupo (empleado + descripción)
        if ($permiso->tipo === 'Permanente') {
            Permiso::where('empleado_id', $permiso->empleado_id)
                ->where('tipo', 'Permanente')
                ->where('descripcion', $permiso->descripcion)
                ->update(['status' => $nuevo]);
        } else {
            $permiso->update(['status' => $nuevo]);
        }

        return back()->with('success', "Permiso marcado como {$nuevo}.");
    }

    // ════════════════════════════════════════════════════════
    // CHECK: Verificar conflictos antes de crear/editar
    // ════════════════════════════════════════════════════════
    /**
     * Verifica si un empleado ya tiene permisos ACTIVOS del tipo indicado.
     * Si tiene → conflicto. El usuario debe actualizar o desactivar el existente.
     */
    public function check(Request $request)
    {
        $empleadoId = (int) $request->get('empleado_id');
        $tipo = $request->get('tipo');
        $dias = (array) $request->get('dias', []);
        $excludeIds = (array) $request->get('exclude_id', []);
        $excludeIds = array_filter(array_map('intval', $excludeIds));

        if (!$empleadoId || !in_array($tipo, self::TIPOS, true)) {
            return response()->json(['conflicto' => false]);
        }

        // ─────────────────────────────────────────
        // EVENTUAL: cualquier permiso Eventual con status Activo
        // ─────────────────────────────────────────
        if ($tipo === 'Eventual') {
            $query = Permiso::query()
                ->where('empleado_id', $empleadoId)
                ->where('tipo', 'Eventual')
                ->where('status', 'Activo');

            if (!empty($excludeIds)) {
                $query->whereNotIn('id', $excludeIds);
            }

            $existente = $query->latest('id')->first();

            if ($existente) {
                return response()->json([
                    'conflicto' => true,
                    'tipo' => 'Eventual',
                    'permiso' => [
                        'id' => $existente->id,
                        'descripcion' => $existente->descripcion,
                        'fecha_de_inicio' => $existente->fecha_de_inicio,
                        'fecha_final' => $existente->fecha_final,
                        'detalle' => $existente->detalle,
                        'status' => $existente->status,
                    ],
                    'mensaje' => "El empleado ya tiene un permiso eventual con estado ACTIVO ({$existente->detalle}). Debes actualizarlo o desactivarlo antes de crear uno nuevo.",
                ]);
            }

            return response()->json(['conflicto' => false]);
        }

        // ─────────────────────────────────────────
        // PERMANENTE: cualquier permiso Permanente con status Activo en esos días
        // ─────────────────────────────────────────
        if ($tipo === 'Permanente') {
            // Si no hay días seleccionados, no verificar (aún no se sabe qué días)
            if (empty($dias)) {
                return response()->json(['conflicto' => false]);
            }

            $query = Permiso::query()
                ->where('empleado_id', $empleadoId)
                ->where('tipo', 'Permanente')
                ->where('status', 'Activo')
                ->whereIn('dia', $dias);

            if (!empty($excludeIds)) {
                $query->whereNotIn('id', $excludeIds);
            }

            $existentes = $query->orderBy('dia')->get();

            if ($existentes->isNotEmpty()) {
                $diasEnConflicto = $existentes->pluck('dia')->unique()->values()->all();

                return response()->json([
                    'conflicto' => true,
                    'tipo' => 'Permanente',
                    'permisos' => $existentes->map(fn($p) => [
                        'id' => $p->id,
                        'dia' => $p->dia,
                        'descripcion' => $p->descripcion,
                        'status' => $p->status,
                    ])->all(),
                    'dias_en_conflicto' => $diasEnConflicto,
                    'mensaje' => 'El empleado ya tiene permiso(s) permanente(s) ACTIVO(S) en: ' . implode(', ', $diasEnConflicto) . '. Debes actualizarlos o desactivarlos antes de continuar.',
                ]);
            }

            return response()->json(['conflicto' => false]);
        }

        return response()->json(['conflicto' => false]);
    }


    // ════════════════════════════════════════════════════════
    // PERMISOS VENCIDOS: Lista de Eventuales activos con fecha_final < hoy
    // ════════════════════════════════════════════════════════
    public function permisosVencidos(Request $request)
    {
        $empleadoId = $request->get('empleado_id');

        $vencidos = $this->getPermisosVencidos($empleadoId);

        return response()->json([
            'vencidos' => $vencidos,
            'total' => $vencidos->count(),
        ]);
    }

    // ════════════════════════════════════════════════════════
    // PROCESAR PERMISO VENCIDO (Cancelar o Renovar)
    // ════════════════════════════════════════════════════════
    public function procesarVencido(Request $request, Permiso $permiso)
    {
        $accion = $request->input('accion'); // 'renovar' | 'cancelar'

        if (!in_array($accion, ['renovar', 'cancelar'], true)) {
            return response()->json(['error' => 'Acción no válida.'], 400);
        }

        // ═══ CANCELAR ═══
        if ($accion === 'cancelar') {
            $permiso->update(['status' => 'Permiso Vencido']);

            return response()->json([
                'success' => true,
                'message' => 'Permiso marcado como Vencido.',
            ]);
        }

        // ═══ RENOVAR ═══
        // Validar las nuevas fechas/motivo
        $validated = $request->validate([
            'tipo' => ['required', \Illuminate\Validation\Rule::in(['Eventual'])],
            'descripcion' => ['required', 'string', \Illuminate\Validation\Rule::in(self::MOTIVOS)],
            'fecha_de_inicio' => ['required', 'date'],
            'fecha_final' => ['required', 'date', 'after_or_equal:fecha_de_inicio'],
        ], [
            'descripcion.required' => 'Selecciona una descripción.',
            'fecha_de_inicio.required' => 'La fecha de inicio es obligatoria.',
            'fecha_final.required' => 'La fecha final es obligatoria.',
            'fecha_final.after_or_equal' => 'La fecha final debe ser igual o posterior a la fecha de inicio.',
        ]);

        // 1) Marcar el viejo como vencido
        $permiso->update(['status' => 'Permiso Vencido']);

        // 2) Crear el nuevo
        $nuevo = Permiso::create([
            'empleado_id' => $permiso->empleado_id,
            'tipo' => 'Eventual',
            'fecha_de_inicio' => $validated['fecha_de_inicio'],
            'fecha_final' => $validated['fecha_final'],
            'dia' => null,
            'descripcion' => $validated['descripcion'],
            'status' => 'Activo',
            'fecha_registro' => now()->format('Y-m-d'),
        ]);

        // 3) WhatsApp del nuevo permiso
        $empleado = EmpleadoActivo::find($permiso->empleado_id);
        $whatsappData = null;
        if ($empleado) {
            $whatsappData = $this->buildWhatsAppMessage($empleado, [
                'tipo' => 'Eventual',
                'descripcion' => $validated['descripcion'],
                'fecha_de_inicio' => $validated['fecha_de_inicio'],
                'fecha_final' => $validated['fecha_final'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Permiso renovado correctamente.',
            'nuevo_permiso' => [
                'id' => $nuevo->id,
                'descripcion' => $nuevo->descripcion,
                'detalle' => $nuevo->detalle,
            ],
            'whatsapp_message' => $whatsappData,
        ]);
    }
    
    // ════════════════════════════════════════════════════════
    // REPORTE GENERAL DE PERMISOS EVENTUALES (PDF)
    // ════════════════════════════════════════════════════════
    public function reporteGeneral(Request $request)
    {
        $desde = $request->get('desde');
        $hasta = $request->get('hasta');
        $statusFiltro = $request->get('status'); // 'Activo' | 'Permiso Vencido' | null

        $permisos = Permiso::query()
            ->with(['empleado:id,nombres,apellidos,cedula,documento'])
            ->where('tipo', 'Eventual')
            ->when($desde, fn($q, $d) => $q->whereDate('fecha_registro', '>=', $d))
            ->when($hasta, fn($q, $h) => $q->whereDate('fecha_registro', '<=', $h))
            ->when($statusFiltro, fn($q, $s) => $q->where('status', $s))
            ->orderBy('fecha_registro', 'desc')
            ->orderBy('empleado_id')
            ->get();

        return $this->generarReportePdf($permisos, null, $desde, $hasta, $statusFiltro, 'general');
    }

    // ════════════════════════════════════════════════════════
    // REPORTE INDIVIDUAL DE PERMISOS EVENTUALES (PDF)
    // ════════════════════════════════════════════════════════
    public function reporteIndividual(Request $request, int $empleadoId)
    {
        $desde = $request->get('desde');
        $hasta = $request->get('hasta');
        $statusFiltro = $request->get('status');

        $empleado = EmpleadoActivo::findOrFail($empleadoId);

        $permisos = Permiso::query()
            ->where('tipo', 'Eventual')
            ->where('empleado_id', $empleadoId)
            ->when($desde, fn($q, $d) => $q->whereDate('fecha_registro', '>=', $d))
            ->when($hasta, fn($q, $h) => $q->whereDate('fecha_registro', '<=', $h))
            ->when($statusFiltro, fn($q, $s) => $q->where('status', $s))
            ->orderBy('fecha_registro', 'desc')
            ->get();

        return $this->generarReportePdf($permisos, $empleado, $desde, $hasta, $statusFiltro, 'individual');
    }

    // ════════════════════════════════════════════════════════
    // HELPER: Genera el PDF (reutilizado por individual y general)
    // ════════════════════════════════════════════════════════
    private function generarReportePdf(
        $permisos,
        ?EmpleadoActivo $empleado,
        ?string $desde,
        ?string $hasta,
        ?string $statusFiltro,
        string $tipoReporte
         ) {
        \Carbon\Carbon::setLocale('es');

        $fechaEmision = now()->translatedFormat('d \d\e F \d\e Y');

        // Director para la firma
        $director = EmpleadoActivo::where('funcion_en_el_plantel', 'like', '%Director%')->first()
            ?? EmpleadoActivo::first();

        $directorData = null;
        if ($director) {
            $directorData = (object) [
                'nombre_y_apellido' => trim("{$director->nombres} {$director->apellidos}"),
                'cedula' => ($director->documento ?? 'V-') . $director->cedula,
            ];
        }

        // Nombre del archivo
        if ($tipoReporte === 'individual' && $empleado) {
            $nombreArchivo = "Permisos_Eventuales_{$empleado->cedula}.pdf";
        } else {
            $nombreArchivo = 'Permisos_Eventuales_General_' . now()->format('Y-m-d') . '.pdf';
        }

        $pdf = Pdf::loadView('pdf.empleados.reporte-permisos-eventuales', [
            'permisos' => $permisos,
            'empleado' => $empleado,
            'desde' => $desde,
            'hasta' => $hasta,
            'statusFiltro' => $statusFiltro,
            'fechaEmision' => $fechaEmision,
            'directorData' => $directorData,
        ]);

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream($nombreArchivo);
    }

    // ════════════════════════════════════════════════════════
// HELPERS PRIVADOS
// ════════════════════════════════════════════════════════

    /**
     * Obtiene la lista de permisos Eventuales vencidos.
     * - tipo = Eventual
     * - status = Activo
     * - fecha_final < hoy
     * Opcionalmente filtra por empleado_id.
     */
    private function getPermisosVencidos(?int $empleadoId = null): \Illuminate\Support\Collection
    {
        $hoy = now()->format('Y-m-d');

        return Permiso::query()
            ->with(['empleado:id,nombres,apellidos,cedula,documento,foto,sexo'])
            ->where('tipo', 'Eventual')
            ->where('status', 'Activo')
            ->whereDate('fecha_final', '<', $hoy)
            ->when($empleadoId, fn($q, $id) => $q->where('empleado_id', $id))
            ->orderBy('fecha_final', 'asc')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'empleado_id' => $p->empleado_id,
                'empleado' => $p->empleado,
                'descripcion' => $p->descripcion,
                'fecha_de_inicio' => $p->fecha_de_inicio,
                'fecha_final' => $p->fecha_final,
                'detalle' => $p->detalle,
                'dias_vencidos' => \Carbon\Carbon::parse($p->fecha_final)->diffInDays(now()),
            ]);
    }
}
