<?php

namespace App\Http\Controllers\Empleados\EmpleadosActivos;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmpleadoActivoRequest;
use App\Http\Requests\UpdateEmpleadoActivoRequest;
use App\Models\AreaTrabajo;
use App\Models\Cargo;
use App\Models\CartaAceptacion;
use App\Models\DestinoEmpleado;
use App\Models\EmpleadoActivo;
use App\Models\Institucion;
use App\Models\Logo;
use App\Models\Permiso;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EmpleadosActivosController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->input('search');
        $hoy = Carbon::now()->format('Y-m-d');
        $diaSemana = ucfirst(Carbon::now()->locale('es')->dayName); // "Lunes", "Martes"...

        $empleados = EmpleadoActivo::query()
            ->with(['permisos'])
            ->where('situacion_laboral', '!=', 'Retirado')  // 🎯 EXCLUIR RETIRADOS
            ->when($search, function ($query, $search) {
                $query->where('nombres', 'like', "%{$search}%")
                    ->orWhere('cedula', 'like', "%{$search}%")
                    ->orWhere('apellidos', 'like', "%{$search}%");
            })
            ->orderBy('id', 'asc')
            ->paginate(4)
            ->withQueryString();

        // ═══════════════════════════════════════════════════════
        // VIGILANTE INTELIGENTE
        // Combina situacion_laboral + permisos activos HOY
        // ═══════════════════════════════════════════════════════
        // Mapa de colores según el motivo del permiso Eventual
        $colorPorMotivo = [
            'Permiso Médico' => 'rose',
            'Permiso por Cuido' => 'amber',
            'Permiso Pre-Post' => 'purple',
            'Permiso Solicitado' => 'blue',
            'Permiso por Vacaciones' => 'cyan',
            'Otros Permisos' => 'slate',
        ];

        $empleados->getCollection()->transform(function ($emp) use ($hoy, $diaSemana, $colorPorMotivo) {
            $status = 'Activo';
            $color = 'emerald';
            $detallePermiso = null;

            // Permisos activos (ya cargados por el with)
            $permisosActivos = $emp->permisos->where('status', 'Activo');

            // 1. PRIORIDAD MÁXIMA: Permiso Eventual activo HOY
            $eventual = $permisosActivos
                ->where('tipo', 'Eventual')
                ->where('fecha_de_inicio', '<=', $hoy)
                ->where('fecha_final', '>=', $hoy)
                ->first();

            if ($eventual) {
                // Texto genérico "Permiso"
                $status = 'Permiso';

                // Color según el motivo
                $color = $colorPorMotivo[$eventual->descripcion] ?? 'slate';

                // Descripción para el tooltip
                $detallePermiso = $eventual->descripcion ?? 'Permiso eventual activo';
            }

            // 2. PRIORIDAD MEDIA: Permiso Permanente (día fijo de hoy)
            else {
                $permanente = $permisosActivos
                    ->where('tipo', 'Permanente')
                    ->where('dia', $diaSemana)
                    ->first();

                if ($permanente) {
                    $status = 'Permiso Diario';
                    $color = 'amber';
                    $detallePermiso = $permanente->descripcion ?? 'Permiso diario activo';
                }

                // 3. FALLBACK: Situación Laboral Base
                else {
                    $statusBase = $emp->situacion_laboral ?? 'Activo';
                    $status = $statusBase;

                    $colorMap = [
                        'Activo' => 'emerald',
                        'Inactivo' => 'gray',
                        'Comision de Servicio' => 'blue',
                        'Proceso Administrativo' => 'slate',
                        'Reposo' => 'rose',
                    ];

                    $color = $colorMap[$statusBase] ?? 'slate';
                    $detallePermiso = null;
                }
            }

            $emp->situacion_real = $status;
            $emp->color_real = $color;
            $emp->detalle_permiso = $detallePermiso;

            return $emp;
        });

        return Inertia::render('Empleados/Activos/Index', [
            'empleados' => $empleados,
            'cargos' => Cargo::orderBy('id', 'asc')
                ->get(['id', 'nombre_del_cargo'])
                ->map(fn($c) => [
                    'value' => $c->id,
                    'label' => $c->nombre_del_cargo,
                ]),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $cargos = Cargo::query()
            ->where('status', true)
            ->orderBy('id', 'asc')
            ->pluck('nombre_del_cargo')
            ->map(fn($nombre) => ['value' => $nombre, 'label' => $nombre]);

        $areas = AreaTrabajo::query()
            ->where('status', true)
            ->orderBy('id', 'asc')
            ->pluck('nombre_del_area')
            ->map(fn($nombre) => ['value' => $nombre, 'label' => $nombre]);

        return Inertia::render('Empleados/Activos/Create', [
            'cargos' => $cargos,
            'areas' => $areas,
        ]);
    }

    public function store(StoreEmpleadoActivoRequest $request)
    {
        $data = $request->validated();


        $data['status_de_actualizacion'] = 'Si';
        $data['situacion_laboral'] = 'Activo';
        $data['fecha_registro'] = now()->format('Y-m-d');

        EmpleadoActivo::create($data);
        // 🎯 Buscar en carta_aceptacions por cédula y eliminar si existe
        CartaAceptacion::where('cedula', $data['cedula'])->delete();

        return redirect()
            ->route('empleados.activos.listado.index')
            ->with('success', 'Empleado registrado correctamente.');
    }

    public function show(EmpleadoActivo $empleado)
    {
        return Inertia::render('Empleados/Activos/Show', [
            'empleado' => $empleado,
        ]);
    }

    public function edit(EmpleadoActivo $empleado)
    {
        $cargos = Cargo::query()
            ->where('status', true)
            ->orderBy('id', 'asc')
            ->pluck('nombre_del_cargo')
            ->map(fn($nombre) => ['value' => $nombre, 'label' => $nombre]);

        $areas = AreaTrabajo::query()
            ->where('status', true)
            ->orderBy('id', 'asc')
            ->pluck('nombre_del_area')
            ->map(fn($nombre) => ['value' => $nombre, 'label' => $nombre]);

        return Inertia::render('Empleados/Activos/Edit', [
            'empleado' => $empleado,
            'cargos' => $cargos,
            'areas' => $areas,
        ]);
    }

    public function update(UpdateEmpleadoActivoRequest $request, EmpleadoActivo $empleado)
    {
        $data = $request->validated();
        $data['status_de_actualizacion'] = 'Si';
        $empleado->update($data);

        return redirect()
            ->route('empleados.activos.listado.index')
            ->with('success', 'Expediente actualizado correctamente.');
    }

    public function toggleSituacion(EmpleadoActivo $empleado)
    {
        $nuevo = $empleado->situacion_laboral === 'Activo' ? 'Inactivo' : 'Activo';
        $empleado->update(['situacion_laboral' => $nuevo]);

        return back()->with(
            'success',
            "Empleado {$nuevo} correctamente."
        );
    }

    public function updateCargo(Request $request, EmpleadoActivo $empleado)
    {
        $validated = $request->validate([
            'tipo_de_personal' => ['required', 'string', 'max:255', 'exists:cargos,nombre_del_cargo'],
        ]);

        $empleado->update(['tipo_de_personal' => $validated['tipo_de_personal']]);

        return back()->with('success', 'Cargo actualizado correctamente.');
    }

    // Cargar Foto (Base64 desde Cámara o Archivo)
    public function updateFoto(Request $request, int $id)
    {
        $emp = EmpleadoActivo::findOrFail($id);

        // 🎯 Caso 1: Eliminar foto (foto viene vacía o null)
        if (!$request->filled('foto')) {
            if ($emp->foto && Storage::disk('public')->exists($emp->foto)) {
                Storage::disk('public')->delete($emp->foto);
            }
            $emp->update(['foto' => null]);

            return back()->with('success', 'Fotografía eliminada correctamente.');
        }

        // 🎯 Caso 2: Subir/actualizar foto (Base64)
        if ($emp->foto && Storage::disk('public')->exists($emp->foto)) {
            Storage::disk('public')->delete($emp->foto);
        }

        $image = $request->foto;
        // Limpiar todos los prefijos posibles de base64
        $image = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        $image = str_replace(' ', '+', $image);

        $imageName = 'empleados/foto_' . $id . '_' . time() . '.jpg';
        Storage::disk('public')->put($imageName, base64_decode($image));

        $emp->update(['foto' => $imageName]);

        return back()->with('success', 'Fotografía actualizada con éxito.');
    }

    public function carnet(int $id)
    {
        $empleado = EmpleadoActivo::findOrFail($id);

        // Generar código QR único si no existe
        if (empty($empleado->codigo_qr)) {
            $empleado->update([
                'codigo_qr' => 'EMP-' . $empleado->cedula . '-' . Str::upper(Str::random(5))
            ]);
        }

        // QR en PNG base64 de alta resolución
        $qrCode = new \Endroid\QrCode\QrCode(
            data: $empleado->codigo_qr,
            encoding: new \Endroid\QrCode\Encoding\Encoding('UTF-8'),
            errorCorrectionLevel: \Endroid\QrCode\ErrorCorrectionLevel::High,
            size: 600,
            margin: 5,
            roundBlockSizeMode: \Endroid\QrCode\RoundBlockSizeMode::Margin,
        );

        $writer = new \Endroid\QrCode\Writer\PngWriter();
        $result = $writer->write($qrCode);
        $qrBase64 = 'data:image/png;base64,' . base64_encode($result->getString());

        // Institución y logo
        $institucion = Institucion::first();
        $logo = Logo::first();

        $logoInstitucion = ($logo && $logo->logo_institucion && Storage::disk('public')->exists($logo->logo_institucion))
            ? storage_path('app/public/' . $logo->logo_institucion)
            : public_path('img/noImgdoc.jpeg');

        // Renderizar el Blade a HTML
        $html = view('pdf.empleados.carnet-empleado', [
            'empleado' => $empleado,
            'qrBase64' => $qrBase64,
            'institucion' => $institucion,
            'logoInstitucion' => $logoInstitucion,
        ])->render();

        // Nombre del archivo
        $filename = 'carnet_' . $empleado->cedula . '_' . time() . '.png';
        $outputPath = public_path('carnets/' . $filename);

        // Crear la carpeta si no existe
        if (!file_exists(public_path('carnets'))) {
            mkdir(public_path('carnets'), 0755, true);
        }

        // Renderizar HTML → PNG con Browsershot
        \Spatie\Browsershot\Browsershot::html($html)
            ->windowSize(600, 1000)
            ->deviceScaleFactor(2)
            ->fullPage()
            ->setOption('args', ['--no-sandbox', '--disable-setuid-sandbox'])
            ->save($outputPath);

        // 🎯 Devolver JSON con la URL del carnet
        return response()->json([
            'success' => true,
            'url' => asset('carnets/' . $filename),
            'filename' => 'Carnet_' . $empleado->documento . $empleado->cedula . '.png',
            'empleado' => [
                'nombre' => $empleado->nombre_completo,
                'cedula' => $empleado->documento . $empleado->cedula,
            ],
        ]);
    }

    public function check(int $empleadoId)
    {
        // Buscamos el registro
        $registro = DestinoEmpleado::where('empleado_id', $empleadoId)->first();

        // Retornamos un objeto con una llave 'exists' clara
        return response()->json([
            'exists' => !is_null($registro),
            'destino' => $registro ? $registro->destino : null
        ]);
    }

    public function storeDestino(Request $request)
    {
        $request->validate([
            'empleado_id' => 'required',
            'destino' => 'required|string|max:255'
        ]);

        $destino = DestinoEmpleado::updateOrCreate(
            ['empleado_id' => $request->empleado_id], // Condición de búsqueda
            ['destino' => $request->destino]          // Datos a actualizar/crear
        );

        return response()->json(['message' => 'Destino guardado con éxito', 'data' => $destino]);
    }

    /**
     * 🎯 Retira a un empleado cambiando su situación laboral.
     * NO elimina registros de la BD. Solo actualiza el estado.
     */
    public function retirar(Request $request, EmpleadoActivo $empleado)
    {
        $validated = $request->validate([
            'motivo_retiro' => ['required', 'string', 'max:255'],
            'observacion' => ['nullable', 'string', 'max:500'],
        ], [
            'motivo_retiro.required' => 'Selecciona el motivo del retiro.',
        ]);

        // 🎯 Desactivar permisos activos
        Permiso::where('empleado_id', $empleado->id)
            ->where('status', 'Activo')
            ->update(['status' => 'Inactivo']);

        // 🎯 Construir el motivo completo con la observación
        $motivoCompleto = $validated['motivo_retiro'];
        if (!empty($validated['observacion'])) {
            $motivoCompleto .= ' — ' . $validated['observacion'];
        }

        // 🎯 Actualizar el empleado
        $empleado->update([
            'situacion_laboral' => 'Retirado',
            'status_de_actualizacion' => $motivoCompleto,
        ]);

        return redirect()
            ->route('empleados.activos.listado.index')
            ->with('success', "Empleado {$empleado->nombres} {$empleado->apellidos} retirado correctamente.");
    }
}
