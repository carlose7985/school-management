<?php

namespace App\Http\Controllers\Empleados\Asistencias;

use App\Http\Controllers\Controller;
use App\Models\AsistenciaEmpleado;
use App\Models\Cargo;
use App\Models\DiaFestivo;
use App\Models\EmpleadoActivo;
use App\Models\Permiso;
use App\Models\VigilanteGuardia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AsistenciasEmpleadosController extends Controller
{
    private const STATUS_VALIDOS = ['Asistio', 'Falto', 'Permiso'];

    // ════════════════════════════════════════════════════════
    // VISTA PRINCIPAL (CARGOS)
    // ════════════════════════════════════════════════════════
    public function index(Request $request): Response
    {
        Carbon::setLocale('es');

        $fechaSeleccionada = $request->get('fecha', now()->format('Y-m-d'));
        $fecha = Carbon::parse($fechaSeleccionada);

        $hoy = now()->startOfDay();
        if ($fecha->gt($hoy)) {
            $fecha = $hoy->copy();
            $fechaSeleccionada = $fecha->format('Y-m-d');
        }

        $diaSemana = ucfirst($fecha->locale('es')->dayName);
        $fechaFormateada = mb_strtoupper($fecha->translatedFormat('l j \d\e F'), 'UTF-8');
        $esFinDeSemana = $fecha->isWeekend();

        $feriado = DiaFestivo::whereDate('fecha', $fecha->format('Y-m-d'))->first();
        $esFeriado = !is_null($feriado);

        $tipoDia = 'normal';
        if ($esFinDeSemana) {
            $tipoDia = 'fin-semana';
        } elseif ($esFeriado) {
            $tipoDia = 'feriado';
        }

        $fechaAnterior = $fecha->copy()->subDay()->format('Y-m-d');
        $fechaSiguiente = $fecha->copy()->addDay()->format('Y-m-d');
        $puedeAvanzar = $fecha->copy()->addDay()->lte($hoy);

        $cargos = Cargo::where('status', true)
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn($cargo) => $this->buildCargoStat($cargo, $fechaSeleccionada));

        $totalesGenerales = [
            'masculino' => $cargos->sum('masculino'),
            'femenino' => $cargos->sum('femenino'),
            'total' => $cargos->sum('total'),
        ];

        return Inertia::render('Asistencias/Empleados/Index', [
            'fechaSeleccionada' => $fechaSeleccionada,
            'fechaFormateada' => $fechaFormateada,
            'diaSemana' => $diaSemana,
            'tipoDia' => $tipoDia,
            'feriado' => $feriado ? [
                'id' => $feriado->id,
                'descripcion' => $feriado->descripcion,
            ] : null,
            'fechaAnterior' => $fechaAnterior,
            'fechaSiguiente' => $fechaSiguiente,
            'puedeAvanzar' => $puedeAvanzar,
            'cargos' => $cargos,
            'totalesGenerales' => $totalesGenerales,
            'permisosVencidos' => $this->getPermisosVencidos(),
            'permisosVencidosTotal' => $this->getPermisosVencidos()->count(),
        ]);
    }

    // ════════════════════════════════════════════════════════
    // VISTA DE CARGA POR CARGO
    // ════════════════════════════════════════════════════════
    public function cargo(Request $request, int $cargoId): Response
    {
        Carbon::setLocale('es');

        $fechaSeleccionada = $request->get('fecha', now()->format('Y-m-d'));
        $fecha = Carbon::parse($fechaSeleccionada);

        $hoy = now()->startOfDay();
        if ($fecha->gt($hoy)) {
            $fecha = $hoy->copy();
            $fechaSeleccionada = $fecha->format('Y-m-d');
        }

        $cargo = Cargo::findOrFail($cargoId);
        $esVigilante = strtolower($cargo->nombre_del_cargo) === 'vigilante';

        // Bloquear días no laborables
        $esFinDeSemana = $fecha->isWeekend();
        $feriado = DiaFestivo::whereDate('fecha', $fecha->format('Y-m-d'))->first();
        $esFeriado = !is_null($feriado);

        if ($esFinDeSemana || $esFeriado) {
            return Inertia::render('Asistencias/Empleados/PasarAsistencia', [
                'cargo' => ['id' => $cargo->id, 'nombre' => $cargo->nombre_del_cargo],
                'fechaSeleccionada' => $fechaSeleccionada,
                'fechaFormateada' => mb_strtoupper($fecha->translatedFormat('l j \d\e F'), 'UTF-8'),
                'diaSemana' => ucfirst($fecha->locale('es')->dayName),
                'esVigilante' => $esVigilante,
                'vigilanteHabilitado' => false,
                'mensajeBloqueo' => $esFinDeSemana
                    ? 'Fin de Semana (' . ucfirst($fecha->locale('es')->dayName) . ')'
                    : 'Feriado: ' . $feriado->descripcion,
                'empleados' => [],
                'cargoProcesado' => false,
                'totales' => ['presentes' => 0, 'faltas' => 0, 'permisos' => 0, 'total_nomina' => 0],
                'diasSinRegistro' => [],
            ]);
        }

        // Verificar si el cargo ya fue procesado
        $stat = $this->buildCargoStat($cargo, $fechaSeleccionada);
        if ($stat['procesado'] === true) {
            return Inertia::render('Asistencias/Empleados/PasarAsistencia', [
                'cargo' => ['id' => $cargo->id, 'nombre' => $cargo->nombre_del_cargo],
                'fechaSeleccionada' => $fechaSeleccionada,
                'fechaFormateada' => mb_strtoupper($fecha->translatedFormat('l j \d\e F'), 'UTF-8'),
                'diaSemana' => ucfirst($fecha->locale('es')->dayName),
                'esVigilante' => $esVigilante,
                'vigilanteHabilitado' => true,
                'empleados' => [],
                'totales' => ['presentes' => 0, 'faltas' => 0, 'permisos' => 0, 'total_nomina' => 0],
                'diasSinRegistro' => [],
                'cargoProcesado' => true,
            ]);
        }

        // Verificar habilitación de vigilante
        $vigilanteHabilitado = true;
        $mensajeVigilante = null;
        if ($esVigilante) {
            [$vigilanteHabilitado, $mensajeVigilante] = $this->checkVigilanteHabilitado($fechaSeleccionada);
        }

        $empleados = $this->getEmpleadosByCargo($cargo, $fechaSeleccionada, $fecha);
        $diasSinRegistro = $this->getDiasSinRegistro($cargo->nombre_del_cargo, $fechaSeleccionada);

        $totales = [
            'presentes' => collect($empleados)->where('status_actual', 'Asistio')->count(),
            'faltas' => collect($empleados)->where('status_actual', 'Falto')->count(),
            'permisos' => collect($empleados)->where('status_actual', 'Permiso')->count(),
            'total_nomina' => count($empleados),
        ];

        return Inertia::render('Asistencias/Empleados/PasarAsistencia', [
            'cargo' => ['id' => $cargo->id, 'nombre' => $cargo->nombre_del_cargo],
            'fechaSeleccionada' => $fechaSeleccionada,
            'fechaFormateada' => mb_strtoupper($fecha->translatedFormat('l j \d\e F'), 'UTF-8'),
            'diaSemana' => ucfirst($fecha->locale('es')->dayName),
            'esVigilante' => $esVigilante,
            'vigilanteHabilitado' => $vigilanteHabilitado,
            'mensajeVigilante' => $mensajeVigilante,
            'empleados' => $empleados,
            'totales' => $totales,
            'diasSinRegistro' => $diasSinRegistro,
            'cargoProcesado' => false,
        ]);
    }

    // ════════════════════════════════════════════════════════
    // GUARDAR MASIVO
    // ════════════════════════════════════════════════════════
    public function guardar(Request $request)
    {
        $validated = $request->validate([
            'fecha' => ['required', 'date'],
            'cargo' => ['required', 'string'],
            'asistencias' => ['required', 'array'],
            'asistencias.*.empleado_id' => ['required', 'integer', 'exists:empleado_activos,id'],
            'asistencias.*.status' => ['required', Rule::in(self::STATUS_VALIDOS)],
        ]);

        $fecha = Carbon::parse($validated['fecha'])->format('Y-m-d');
        $cargoNombre = $validated['cargo'];
        $mes = Carbon::parse($fecha)->format('Y-m');
        $esVigilante = strtolower($cargoNombre) === 'vigilante';

        // Verificar si ya fue procesado
        if ($esVigilante) {
            $empleadoIds = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('funcion_en_el_plantel', 'Vigilante')
                ->pluck('id')->all();
        } else {
            $empleadoIds = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('tipo_de_personal', $cargoNombre)
                ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                ->pluck('id')->all();
        }

        $yaGuardados = AsistenciaEmpleado::whereDate('fecha', $fecha)
            ->whereIn('empleado_id', $empleadoIds)
            ->count();

        if ($yaGuardados >= count($empleadoIds) && count($empleadoIds) > 0) {
            return back()->with('error', 'Este cargo ya tiene la asistencia cargada para esta fecha.');
        }

        DB::beginTransaction();
        try {
            foreach ($validated['asistencias'] as $item) {
                $existente = AsistenciaEmpleado::where('empleado_id', $item['empleado_id'])
                    ->whereDate('fecha', $fecha)
                    ->first();

                if ($existente && $existente->metodo === 'Qr') {
                    continue;
                }

                // El tipo_de_cargo se guarda con el tipo REAL del empleado (Obrero/Admin/Vigilante)
                $empleado = EmpleadoActivo::find($item['empleado_id']);
                $tipoReal = $empleado?->tipo_de_personal ?? $cargoNombre;

                AsistenciaEmpleado::updateOrCreate(
                    ['empleado_id' => $item['empleado_id'], 'fecha' => $fecha],
                    [
                        'mes' => $mes,
                        'tipo_de_cargo' => $tipoReal,
                        'status' => $item['status'],
                        'metodo' => 'Manual',
                    ]
                );
            }

            DB::commit();
            return back()->with('success', 'Asistencias guardadas correctamente.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al guardar: ' . $e->getMessage());
        }
    }

    // ════════════════════════════════════════════════════════
    // DÍAS SIN REGISTRO
    // ════════════════════════════════════════════════════════
    public function diasSinRegistro(Request $request, int $cargoId)
    {
        $cargo = Cargo::findOrFail($cargoId);
        $fecha = $request->get('fecha', now()->format('Y-m-d'));
        return response()->json(['dias' => $this->getDiasSinRegistro($cargo->nombre_del_cargo, $fecha)]);
    }

    // ════════════════════════════════════════════════════════
    // GUARDAR FESTIVOS
    // ════════════════════════════════════════════════════════
    public function guardarFestivos(Request $request)
    {
        $validated = $request->validate([
            'dias' => ['required', 'array', 'min:1'],
            'dias.*' => ['required', 'date'],
            'descripcion' => ['required', 'string', 'max:255'],
        ]);

        foreach ($validated['dias'] as $dia) {
            DiaFestivo::firstOrCreate(['fecha' => $dia], ['descripcion' => $validated['descripcion']]);
        }

        return back()->with('success', count($validated['dias']) . ' día(s) festivo(s) registrado(s).');
    }

    public function preAsistencia(Request $request, int $cargoId)
    {
        Carbon::setLocale('es');
        $fechaSeleccionada = $request->get('fecha', now()->format('Y-m-d'));
        $fecha = Carbon::parse($fechaSeleccionada);

        $cargo = Cargo::findOrFail($cargoId);
        if (strtolower($cargo->nombre_del_cargo) !== 'vigilante') {
            return response()->json(['vigilantes' => [], 'dia_guardia' => null]);
        }

        $diaHoy = strtolower($fecha->locale('es')->dayName);
        $diasBuscar = $this->getDiasGuardiaAnterior($diaHoy);

        if (empty($diasBuscar)) {
            return response()->json(['vigilantes' => [], 'dia_guardia' => null]);
        }

        $vigilantes = $this->getVigilantesPreAsistencia($diasBuscar, $fechaSeleccionada);
        return response()->json(['vigilantes' => $vigilantes, 'dia_guardia' => $diasBuscar]);
    }

    // ════════════════════════════════════════════════════════
    // GUARDAR PRE-ASISTENCIA
    // ════════════════════════════════════════════════════════
    public function guardarPreAsistencia(Request $request)
    {
        $validated = $request->validate([
            'registros' => ['required', 'array'],
            'registros.*.empleado_id' => ['required', 'integer', 'exists:empleado_activos,id'],
            'registros.*.status' => ['required', Rule::in(self::STATUS_VALIDOS)],
        ]);

        DB::beginTransaction();
        try {
            foreach ($validated['registros'] as $item) {
                VigilanteGuardia::where('empleado_id', $item['empleado_id'])
                    ->update(['status' => $item['status']]);
            }
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Pre-asistencia guardada correctamente.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    // ════════════════════════════════════════════════════════
    // VALIDAR SI UNA FECHA ES LABORABLE
    // ════════════════════════════════════════════════════════
    private function validarDiaLaborable(string $fecha): array
    {
        $carbon = Carbon::parse($fecha);

        // 1. Fin de semana
        if ($carbon->isWeekend()) {
            return [
                'valido'  => false,
                'tipo'    => 'fin-semana',
                'mensaje' => 'No se puede actualizar asistencia en fin de semana (' . ucfirst($carbon->locale('es')->dayName) . ').',
            ];
        }

        // 2. Feriado
        $feriado = DiaFestivo::whereDate('fecha', $carbon->format('Y-m-d'))->first();
        if ($feriado) {
            return [
                'valido'  => false,
                'tipo'    => 'feriado',
                'mensaje' => 'No se puede actualizar asistencia en día feriado: ' . $feriado->descripcion,
                'feriado' => [
                    'id'          => $feriado->id,
                    'descripcion' => $feriado->descripcion,
                ],
            ];
        }

        return ['valido' => true, 'tipo' => 'laborable', 'mensaje' => null];
    }

    // ════════════════════════════════════════════════════════
    // ACTUALIZAR ASISTENCIA — VISTA PRINCIPAL
    // ════════════════════════════════════════════════════════
    public function actualizarIndex(): Response
    {
        Carbon::setLocale('es');

        return Inertia::render('Asistencias/Empleados/ActualizarAsistencia');
    }

    // ════════════════════════════════════════════════════════
    // BUSCAR EMPLEADOS (con asistencia y guardia de esa fecha)
    // ════════════════════════════════════════════════════════
    public function buscarEmpleados(Request $request)
    {
        $request->validate([
            'fecha' => ['required', 'date'],
            'q'     => ['nullable', 'string', 'max:100'],
        ]);

        $fecha = Carbon::parse($request->get('fecha'))->format('Y-m-d');
        $q     = trim((string) $request->get('q', ''));

        // 🚫 Validar día laborable
        $validacionDia = $this->validarDiaLaborable($fecha);
        if (!$validacionDia['valido']) {
            return response()->json([
                'fecha'     => $fecha,
                'empleados' => [],
                'bloqueado' => true,
                'tipo_dia'  => $validacionDia['tipo'],
                'mensaje'   => $validacionDia['mensaje'],
                'feriado'   => $validacionDia['feriado'] ?? null,
            ]);
        }
        $query = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
            ->orderBy('id', 'asc');

        if ($q !== '') {
            $query->where(function ($sub) use ($q) {
                $sub->where('nombres', 'like', "%{$q}%")
                    ->orWhere('apellidos', 'like', "%{$q}%")
                    ->orWhere('cedula', 'like', "%{$q}%")
                    ->orWhereRaw("CONCAT(nombres, ' ', apellidos) LIKE ?", ["%{$q}%"]);
            });
        }

        $empleados = $query->limit(60)->get([
            'id',
            'nombres',
            'apellidos',
            'cedula',
            'documento',
            'sexo',
            'tipo_de_personal',
            'funcion_en_el_plantel',
        ]);

        $ids = $empleados->pluck('id')->all();

        $asistenciasMap = AsistenciaEmpleado::whereDate('fecha', $fecha)
            ->whereIn('empleado_id', $ids)
            ->get()
            ->keyBy('empleado_id');

        $guardiasMap = VigilanteGuardia::whereIn('empleado_id', $ids)
            ->get()
            ->keyBy('empleado_id');

        $resultado = $empleados->map(function ($emp) use ($asistenciasMap, $guardiasMap) {
            $esVigilante = strtolower($emp->funcion_en_el_plantel ?? '') === 'vigilante';
            $asistencia  = $asistenciasMap->get($emp->id);
            $guardia     = $esVigilante ? $guardiasMap->get($emp->id) : null;

            return [
                'id'                     => $emp->id,
                'nombres'                => $emp->nombres,
                'apellidos'              => $emp->apellidos,
                'nombre_completo'        => trim("{$emp->nombres} {$emp->apellidos}"),
                'cedula'                 => ($emp->documento ?? 'V-') . $emp->cedula,
                'tipo_de_personal'       => $emp->tipo_de_personal,
                'funcion_en_el_plantel'  => $emp->funcion_en_el_plantel,
                'sexo'                   => $emp->sexo,
                'iniciales'              => $emp->iniciales ?? null,
                'es_vigilante'           => $esVigilante,
                'asistencia_actual'      => $asistencia ? [
                    'id'     => $asistencia->id,
                    'status' => $asistencia->status,
                    'metodo' => $asistencia->metodo,
                ] : null,
                'guardia_actual'         => $guardia ? [
                    'id'            => $guardia->id,
                    'status'        => $guardia->status,
                    'dias_guardia'  => $guardia->dias_guardia,
                ] : null,
            ];
        });

        return response()->json([
            'fecha'     => $fecha,
            'empleados' => $resultado,
            'bloqueado' => false,
            'tipo_dia'  => 'laborable',
        ]);
    }

    // ════════════════════════════════════════════════════════
    // ACTUALIZAR ASISTENCIA MANUAL (y guardia si es vigilante)
    // ════════════════════════════════════════════════════════
  
    public function actualizarAsistenciaManual(Request $request)
    {
        $validated = $request->validate([
            'empleado_id' => ['required', 'integer', 'exists:empleado_activos,id'],
            'fecha'       => ['required', 'date'],
            'status'      => ['required', Rule::in(self::STATUS_VALIDOS)],
        ]);

        $fecha = Carbon::parse($validated['fecha'])->format('Y-m-d');

        // 🚫 Bloqueo duro: no permitir actualizar en días no laborables
        $validacionDia = $this->validarDiaLaborable($fecha);
        if (!$validacionDia['valido']) {
            return response()->json([
                'success' => false,
                'error'   => $validacionDia['mensaje'],
                'tipo'    => $validacionDia['tipo'],
            ], 422);
        }
        $empleado = EmpleadoActivo::find($validated['empleado_id']);
        if (!$empleado) {
            return response()->json(['error' => 'Empleado no encontrado.'], 404);
        }

        $fecha  = Carbon::parse($validated['fecha'])->format('Y-m-d');
        $mes    = Carbon::parse($fecha)->format('Y-m');
        $status = $validated['status'];
        $esVigilante = strtolower($empleado->funcion_en_el_plantel ?? '') === 'vigilante';

        DB::beginTransaction();
        try {
            // 1. Actualizar/crear asistencia
            $asistencia = AsistenciaEmpleado::updateOrCreate(
                ['empleado_id' => $empleado->id, 'fecha' => $fecha],
                [
                    'mes'            => $mes,
                    'tipo_de_cargo'  => $empleado->tipo_de_personal,
                    'status'         => $status,
                    'metodo'         => 'Manual',
                ]
            );

            // 2. Si es vigilante, actualizar su guardia
            $guardiaActualizada = null;
            if ($esVigilante) {
                $guardia = VigilanteGuardia::where('empleado_id', $empleado->id)->first();
                if ($guardia) {
                    $guardia->update(['status' => $status]);
                    $guardiaActualizada = [
                        'id'     => $guardia->id,
                        'status' => $guardia->status,
                    ];
                }
            }

            DB::commit();

            return response()->json([
                'success'    => true,
                'message'    => 'Asistencia actualizada correctamente.',
                'asistencia' => [
                    'id'     => $asistencia->id,
                    'status' => $asistencia->status,
                    'metodo' => $asistencia->metodo,
                ],
                'guardia'    => $guardiaActualizada,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    // ════════════════════════════════════════════════════════
    // HELPERS
    // ════════════════════════════════════════════════════════

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
                'dias_vencidos' => Carbon::parse($p->fecha_final)->diffInDays(now()),
            ]);
    }

   

    private function buildCargoStat(Cargo $cargo, string $fecha): array
    {
        $esVigilante = strtolower($cargo->nombre_del_cargo) === 'vigilante';

        // ─────────────────────────────────────────────
        // 1. Empleados de ESTA card (lógica según tipo)
        // ─────────────────────────────────────────────
        if ($esVigilante) {
            // Vigilante: TODOS los que tienen función Vigilante
            // (sin importar su tipo_de_personal: Obrero, Admin o Vigilante)
            $empleadosCard = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('funcion_en_el_plantel', 'Vigilante')
                ->get(['id', 'sexo']);
        } else {
            // Obrero/Admin/Docente/Cenae: solo los del tipo SIN función Vigilante
            $empleadosCard = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('tipo_de_personal', $cargo->nombre_del_cargo)
                ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                ->get(['id', 'sexo']);
        }

        $idsCard = $empleadosCard->pluck('id')->all();
        $totalEmpleados = count($idsCard);

        // ─────────────────────────────────────────────
        // 2. Asistencias del día para los de esta card
        // ─────────────────────────────────────────────
        $asistenciasHoy = AsistenciaEmpleado::query()
            ->whereDate('fecha', $fecha)
            ->whereIn('empleado_id', $idsCard)
            ->get();

        // Conteo visual: solo Asistio
        $asistioHoy = $asistenciasHoy->where('status', 'Asistio');
        $masculino = $asistioHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'M'
        )->count();
        $femenino = $asistioHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'F'
        )->count();
        $totalVisual = $masculino + $femenino;

        // Procesados: cualquier status
        $totalProcesados = $asistenciasHoy->count();

        // ─────────────────────────────────────────────
        // 3. Vigilantes del tipo (solo para Obrero/Admin)
        // ─────────────────────────────────────────────
        $empleadosVigilantesDelTipo = 0;
        $vigilantesDelTipoMarcados = 0;

        if (!$esVigilante && in_array(strtolower($cargo->nombre_del_cargo), ['obrero', 'administrativo'], true)) {
            $vigilantesIds = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('tipo_de_personal', $cargo->nombre_del_cargo)
                ->where('funcion_en_el_plantel', 'Vigilante')
                ->pluck('id')->all();

            $empleadosVigilantesDelTipo = count($vigilantesIds);

            if ($empleadosVigilantesDelTipo > 0) {
                $vigilantesDelTipoMarcados = AsistenciaEmpleado::whereDate('fecha', $fecha)
                    ->whereIn('empleado_id', $vigilantesIds)
                    ->count();
            }
        }

        // ─────────────────────────────────────────────
        // 4. Faltas y permisos (solo de esta card)
        // ─────────────────────────────────────────────
        $faltoHoy = $asistenciasHoy->where('status', 'Falto');
        $faltoMasculino = $faltoHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'M'
        )->count();
        $faltoFemenino = $faltoHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'F'
        )->count();

        $permisoHoy = $asistenciasHoy->where('status', 'Permiso');
        $permisoMasculino = $permisoHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'M'
        )->count();
        $permisoFemenino = $permisoHoy->filter(
            fn($a) => $empleadosCard->firstWhere('id', $a->empleado_id)?->sexo === 'F'
        )->count();

        // ─────────────────────────────────────────────
        // 5. Días sin registro
        // ─────────────────────────────────────────────
        $diasSinRegistro = $this->getDiasSinRegistro($cargo->nombre_del_cargo, $fecha);

        // ═════════════════════════════════════════════
        // 6. ESTADO
        // ═════════════════════════════════════════════
        $estado = 'por-cargar';
        $procesado = false;
        $incompleto = false;
        $restringido = false;
        $mensajeRestriccion = null;

        if ($totalEmpleados === 0) {
            $estado = 'sin-personal';
        } elseif ($totalProcesados >= $totalEmpleados) {
            // Todos los de esta card están 100%
            if (!$esVigilante && $empleadosVigilantesDelTipo > 0 && $vigilantesDelTipoMarcados < $empleadosVigilantesDelTipo) {
                // Obrero/Admin con vigilantes pendientes → INCOMPLETO + BLOQUEADO
                $estado = 'incompleto';
                $incompleto = true;
                $restringido = true;
                $mensajeRestriccion = "Faltan {$empleadosVigilantesDelTipo} vigilante(s) de {$cargo->nombre_del_cargo} por cargar en la card de Vigilante.";
            } else {
                $estado = 'completado';
                $procesado = true;
            }
        }

        // ─────────────────────────────────────────────
        // 7. Vigilante: verificar habilitación
        // ─────────────────────────────────────────────
        if ($esVigilante) {
            [$habilitado, $mensaje] = $this->checkVigilanteHabilitado($fecha);
            $restringido = !$habilitado;
            $mensajeRestriccion = $mensaje;

            // Si está habilitado y ya se cargaron todos los vigilantes → procesado
            if ($habilitado && $totalEmpleados > 0 && $totalProcesados >= $totalEmpleados) {
                $estado = 'completado';
                $procesado = true;
            }
        }

        return [
            'id' => $cargo->id,
            'nombre' => $cargo->nombre_del_cargo,
            'total_empleados' => $totalEmpleados,
            'empleados_vigilantes' => $empleadosVigilantesDelTipo,
            'masculino' => $masculino,
            'femenino' => $femenino,
            'total' => $totalVisual,
            'estado' => $estado,
            'procesado' => $procesado,
            'incompleto' => $incompleto,
            'restringido' => $restringido,
            'mensaje_restriccion' => $mensajeRestriccion,
            'dias_sin_registro' => $diasSinRegistro,
            'dias_sin_registro_total' => count($diasSinRegistro),
            'faltas' => [
                'masculino' => $faltoMasculino,
                'femenino'  => $faltoFemenino,
                'total'     => $faltoMasculino + $faltoFemenino,
            ],
            'permisos' => [
                'masculino' => $permisoMasculino,
                'femenino'  => $permisoFemenino,
                'total'     => $permisoMasculino + $permisoFemenino,
            ],
        ];
    }
    private function getEmpleadosByCargo(Cargo $cargo, string $fecha, Carbon $fechaCarbon): array
    {
        $esVigilante = strtolower($cargo->nombre_del_cargo) === 'vigilante';
        $diaSemana = strtolower($fechaCarbon->locale('es')->dayName);

        if ($esVigilante) {
            // Vigilante: TODOS los que tienen función Vigilante
            // (sin importar su tipo_de_personal: Obrero, Admin o Vigilante)
            $empleados = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('funcion_en_el_plantel', 'Vigilante')
                ->orderBy('id', 'asc')->get();
        } else {
            // Obrero/Admin/Docente/Cenae: SOLO los del tipo SIN función Vigilante
            $empleados = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('tipo_de_personal', $cargo->nombre_del_cargo)
                ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                ->orderBy('id', 'asc')->get();
        }
        $asistenciasExistentes = AsistenciaEmpleado::whereDate('fecha', $fecha)
            ->whereIn('empleado_id', $empleados->pluck('id'))
            ->get()->keyBy('empleado_id');

        $permisosEventuales = Permiso::where('tipo', 'Eventual')
            ->where('status', 'Activo')
            ->whereDate('fecha_de_inicio', '<=', $fecha)
            ->whereDate('fecha_final', '>=', $fecha)
            ->whereIn('empleado_id', $empleados->pluck('id'))
            ->get()->keyBy('empleado_id');

        $permisosPermanentes = Permiso::where('tipo', 'Permanente')
            ->where('status', 'Activo')
            ->where('dia', $diaSemana)
            ->whereIn('empleado_id', $empleados->pluck('id'))
            ->get()->keyBy('empleado_id');

        $guardias = $esVigilante
            ? VigilanteGuardia::whereIn('empleado_id', $empleados->pluck('id'))->get()->keyBy('empleado_id')
            : collect();

        return $empleados->map(function ($emp) use (
            $asistenciasExistentes,
            $permisosEventuales,
            $permisosPermanentes,
            $guardias,
            $esVigilante,
            $fechaCarbon
        ) {
            $existente = $asistenciasExistentes->get($emp->id);
            $statusDefault = 'Asistio';
            $origen = 'default';
            $detallePermiso = null;

            if ($permisoEventual = $permisosEventuales->get($emp->id)) {
                $statusDefault = 'Permiso';
                $origen = 'permiso_eventual';
                $detallePermiso = $permisoEventual->descripcion;
            } elseif ($permisoPermanente = $permisosPermanentes->get($emp->id)) {
                $statusDefault = 'Permiso';
                $origen = 'permiso_permanente';
                $detallePermiso = $permisoPermanente->descripcion;
            } elseif ($esVigilante && ($guardia = $guardias->get($emp->id))) {
                $statusDefault = $this->calcularStatusVigilante($guardia, $fechaCarbon);
                $origen = 'guardia';
            }

            return [
                'id' => $emp->id,
                'nombres' => $emp->nombres,
                'apellidos' => $emp->apellidos,
                'nombre_completo' => trim("{$emp->nombres} {$emp->apellidos}"),
                'cedula' => ($emp->documento ?? 'V-') . $emp->cedula,
                'tipo_de_personal' => $emp->tipo_de_personal,
                'sexo' => $emp->sexo,
                'iniciales' => $emp->iniciales,
                'status_actual' => $existente ? $existente->status : $statusDefault,
                'metodo' => $existente ? $existente->metodo : null,
                'ya_marcado' => (bool) $existente,
                'ya_marcado_qr' => $existente && $existente->metodo === 'Qr',
                'origen' => $origen,
                'detalle_permiso' => $detallePermiso,
            ];
        })->all();
    }

    private function calcularStatusVigilante(VigilanteGuardia $guardia, Carbon $fecha): string
    {
        $diaHoy = strtolower($fecha->locale('es')->dayName);
        $diasGuardia = array_map('strtolower', $guardia->dias_guardia ?? []);

        if (in_array($diaHoy, $diasGuardia)) {
            return $guardia->status ?? 'Asistio';
        }

        $ordenSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
        $indexHoy = array_search($diaHoy, $ordenSemana);

        for ($i = $indexHoy - 1; $i >= 0; $i--) {
            if (in_array($ordenSemana[$i], $diasGuardia)) {
                return $guardia->status ?? 'Asistio';
            }
        }

        for ($i = count($ordenSemana) - 1; $i > $indexHoy; $i--) {
            if (in_array($ordenSemana[$i], $diasGuardia)) {
                return $guardia->status ?? 'Asistio';
            }
        }

        return $guardia->status ?? 'Asistio';
    }

    /**
     * 🎯 Vigilante habilitado cuando Obrero y Administrativo
     * (SOLO los que NO tienen función Vigilante) están 100% cargados.
     */

    private function checkVigilanteHabilitado(string $fecha): array
    {
        $faltantes = [];

        foreach (['Obrero', 'Administrativo'] as $tipo) {
            // 🎯 SOLO los que NO tienen función Vigilante (esos se cargan en su propia card)
            $empleadoIds = EmpleadoActivo::where('situacion_laboral', '!=', 'Retirado')
                ->where('tipo_de_personal', $tipo)
                ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                ->pluck('id')->all();

            if (empty($empleadoIds)) continue;

            $marcados = AsistenciaEmpleado::whereDate('fecha', $fecha)
                ->whereIn('empleado_id', $empleadoIds)
                ->count();

            if ($marcados < count($empleadoIds)) {
                $faltantes[] = "{$tipo} ({$marcados}/" . count($empleadoIds) . ')';
            }
        }

        if (!empty($faltantes)) {
            return [false, 'Primero debes completar la carga de: ' . implode(', ', $faltantes)];
        }

        return [true, null];
    }

    private function getDiasSinRegistro(string $cargoNombre, string $fechaRef): array
    {
        $fecha = Carbon::parse($fechaRef);
        $inicioMes = $fecha->copy()->startOfMonth();
        $finMes = $fecha->copy()->endOfMonth();
        $hoy = now()->startOfDay();

        $diasLaborables = [];
        $periodo = CarbonPeriod::create($inicioMes, $finMes);
        foreach ($periodo as $dia) {
            if ($dia->isWeekend()) continue;
            if ($dia->gt($hoy)) break;
            $diasLaborables[] = $dia->format('Y-m-d');
        }

        if (empty($diasLaborables)) return [];

        $conAsistencia = AsistenciaEmpleado::query()
            ->join('empleado_activos', 'empleado_activos.id', '=', 'asistencia_empleados.empleado_id')
            ->where('empleado_activos.tipo_de_personal', $cargoNombre)
            ->whereBetween('asistencia_empleados.fecha', [
                $inicioMes->format('Y-m-d'),
                $finMes->format('Y-m-d'),
            ])
            ->pluck('asistencia_empleados.fecha')
            ->map(fn($f) => Carbon::parse($f)->format('Y-m-d'))
            ->unique()
            ->values()
            ->all();


        $festivos = DiaFestivo::whereBetween('fecha', [$inicioMes->format('Y-m-d'), $finMes->format('Y-m-d')])
            ->pluck('fecha')
            ->map(fn($f) => Carbon::parse($f)->timezone(config('app.timezone'))->toDateString())
            ->values()
            ->all();

        $sinRegistro = array_values(array_diff($diasLaborables, $conAsistencia, $festivos));

        return collect($sinRegistro)->map(fn($f) => [
            'fecha' => $f,
            'fecha_formateada' => Carbon::parse($f)->translatedFormat('l j \d\e F'),
            'dia_semana' => ucfirst(Carbon::parse($f)->locale('es')->dayName),
            'dia_numero' => Carbon::parse($f)->format('d'),
        ])->all();
    }

    private function getDiasGuardiaAnterior(string $diaHoy): array
    {
        return match (strtolower($diaHoy)) {
            'lunes' => ['viernes', 'sábado', 'domingo'],
            'martes' => ['lunes'],
            'miércoles' => ['martes'],
            'jueves' => ['miércoles'],
            'viernes' => ['jueves'],
            default => [],
        };
    }

    private function getVigilantesPreAsistencia(array $diasBuscar, string $fecha): array
    {
        $guardias = VigilanteGuardia::with(['empleado:id,nombres,apellidos,cedula,documento,tipo_de_personal,funcion_en_el_plantel,sexo'])
            ->get()
            ->filter(function ($guardia) use ($diasBuscar) {
                if (!$guardia->empleado) return false;
                if (strtolower($guardia->empleado->funcion_en_el_plantel ?? '') !== 'vigilante') return false;
                $diasGuardia = array_map('strtolower', $guardia->dias_guardia ?? []);
                return !empty(array_intersect($diasGuardia, $diasBuscar));
            });

        return $guardias->map(function ($guardia) {
            $emp = $guardia->empleado;
            return [
                'empleado_id' => $emp->id,
                'nombre_completo' => trim("{$emp->nombres} {$emp->apellidos}"),
                'cedula' => ($emp->documento ?? 'V-') . $emp->cedula,
                'tipo_de_personal' => $emp->tipo_de_personal,
                'sexo' => $emp->sexo,
                'iniciales' => $emp->iniciales,
                'dias_guardia' => $guardia->dias_guardia ?? [],
                'status_actual' => $guardia->status ?? 'Asistio',
                'vigilante_guardia_id' => $guardia->id,
            ];
        })->values()->all();
    }

    // ════════════════════════════════════════════════════════
    // LISTADOS DISPONIBLES (para el select del modal)
    // ════════════════════════════════════════════════════════
    public function listadosDisponibles()
    {
        $cargos = Cargo::where('status', true)
            ->orderBy('id', 'asc')
            ->pluck('nombre_del_cargo')
            ->map(fn($nombre) => ['value' => $nombre, 'label' => $nombre])
            ->values();

        return response()->json([
            'cargos' => $cargos,
        ]);
    }

    // ════════════════════════════════════════════════════════
    // GENERAR LISTADO PDF (por cargo o todos)
    // ════════════════════════════════════════════════════════
    // ════════════════════════════════════════════════════════
    // GENERAR LISTADO PDF (por cargo o todos)
    // ════════════════════════════════════════════════════════
    public function generarListado(Request $request)
    {
        $cargoNombre = $request->get('cargo');

        $exportController = new \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController();

        // Todos los cargos
        if (empty($cargoNombre) || $cargoNombre === 'todos') {
            return $exportController->listadodeAsistenciasTodos();
        }

        // Un cargo específico (por NOMBRE, no por ID)
        $cargo = Cargo::where('nombre_del_cargo', $cargoNombre)->first();

        if (!$cargo) {
            abort(404, 'Cargo no encontrado.');
        }

        return $exportController->listadodeAsistencias($cargo->id);
    }
}
