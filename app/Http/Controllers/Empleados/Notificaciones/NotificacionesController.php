<?php

namespace App\Http\Controllers\Empleados\Notificaciones;

use App\Http\Controllers\Controller;
use App\Models\AsistenciaEmpleado;
use App\Models\Cargo;
use App\Models\EmpleadoActivo;
use App\Models\Institucion;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class NotificacionesController extends Controller
{
    /**
     * Vista principal: listado de empleados activos + selector mes/año.
     */
    public function index(Request $request): Response
    {
        $search = trim($request->get('search', ''));

        // Años disponibles en la tabla asistencia_empleados
        $years = AsistenciaEmpleado::query()
            ->selectRaw('YEAR(fecha) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->filter()
            ->values()
            ->map(fn($y) => (int) $y);

        // Año/mes por defecto: el más reciente con registros
        $yearPorDefecto = $request->get('year') ?? $years->first() ?? now()->year;
        $mesPorDefecto = $request->get('mes') ?? now()->month;

        // Empleados activos
        $empleados = EmpleadoActivo::query()
            ->where('situacion_laboral', '!=', 'Retirado')
            ->when($search, function ($q, $s) {
                $q->where(function ($sub) use ($s) {
                    $sub->where('nombres', 'like', "%{$s}%")
                        ->orWhere('apellidos', 'like', "%{$s}%")
                        ->orWhere('cedula', 'like', "%{$s}%");
                });
            })
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($e) {
                // Resolver nombre del cargo
                $cargoNombre = '—';
                if ($e->tipo_de_personal) {
                    if (is_numeric($e->tipo_de_personal)) {
                        $cargo = Cargo::find($e->tipo_de_personal);
                        $cargoNombre = $cargo?->nombre_del_cargo ?? '—';
                    } else {
                        $cargoNombre = $e->tipo_de_personal;
                    }
                }

                return [
                    'id' => $e->id,
                    'nombres' => $e->nombres,
                    'apellidos' => $e->apellidos,
                    'cedula' => $e->cedula,
                    'documento' => $e->documento,
                    'foto' => $e->foto,
                    'sexo' => $e->sexo,
                    'cargo_nombre' => $cargoNombre,
                    'iniciales' => $e->iniciales,
                ];
            });

        return Inertia::render('Empleados/Notificaciones/Index', [
            'empleados' => $empleados,
            'years' => $years,
            'mesPorDefecto' => (int) $mesPorDefecto,
            'yearPorDefecto' => (int) $yearPorDefecto,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Genera el PDF de notificación de un empleado para un mes/año.
     */
    public function notificacionPdf(Request $request, int $id)
    {
        $mes = (int) $request->get('mes', now()->month);
        $year = (int) $request->get('year', now()->year);

        if (!$mes || !$year) {
            abort(400, 'Mes y año son requeridos.');
        }
         Carbon::setLocale('es');

        // Asistencias del empleado en el mes/año
        $todasLasAsistencias = AsistenciaEmpleado::where('empleado_id', $id)
            ->whereMonth('fecha', $mes)
            ->whereYear('fecha', $year)
            ->get();

        $asistencia_existe = $todasLasAsistencias->count();

        // Institución
        $institucion = Institucion::orderBy('nombre_de_la_institucion', 'asc')->get();

        // Director del plantel (para la firma del PDF)
        $director = EmpleadoActivo::where('funcion_en_el_plantel', 'like', '%Director%')
            ->first();

        if (!$director) {
            $director = EmpleadoActivo::first();
        }

        $directorData = null;
        if ($director) {
            $directorData = (object) [
                'nombre_y_apellido' => trim("{$director->nombres} {$director->apellidos}"),
                'cedula' => ($director->documento ?? 'V-') . $director->cedula,
            ];
        }

        if ($asistencia_existe == 0) {
            $pdf = Pdf::loadView('pdf.empleados.notificaciones-empleados', compact(
                'asistencia_existe',
                'institucion',
                'directorData',
            ));
        } else {
            // Filtrar en memoria
            $fechasAsistencias = $todasLasAsistencias->where('status', 'Asistio')->unique('fecha')->values();
            $fechasFaltas = $todasLasAsistencias->where('status', 'Falto')->unique('fecha')->values();
            $fechasPermiso = $todasLasAsistencias->where('status', 'Permiso')->unique('fecha')->values();

            $asistencias = $fechasAsistencias->count();
            $faltas = $fechasFaltas->count();
            $permisos = $fechasPermiso->count();
            $totalAsistencias = $asistencia_existe;

            $empleado = EmpleadoActivo::select('id', 'nombres', 'apellidos', 'cedula', 'sexo')->findOrFail($id);

            $fechaExacta = Carbon::now()->format('d-m-Y');
            $dia = Carbon::now()->format('d');
            $meses = Carbon::parse("$year-$mes-01")->translatedFormat('F');
            $aho = $year;

            $primerRegistro = $todasLasAsistencias->first();
            $mes = $primerRegistro ? $primerRegistro->fecha : Carbon::now();

            $pdf = Pdf::loadView('pdf.empleados.notificaciones-empleados', compact(
                'empleado',
                'faltas',
                'asistencias',
                'permisos',
                'fechaExacta',
                'dia',
                'mes',
                'meses',
                'aho',
                'totalAsistencias',
                'fechasFaltas',
                'fechasAsistencias',
                'fechasPermiso',
                'institucion',
                'asistencia_existe',
                'directorData',
            ));
        }

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream("Notificacion_{$id}.pdf");
    }

    /**
     * Resumen de asistencias para la tabla (AJAX).
     */
    public function resumen(Request $request)
    {
        $mes = (int) $request->get('mes');
        $year = (int) $request->get('year');

        if (!$mes || !$year) {
            return response()->json([]);
        }

        $resumen = AsistenciaEmpleado::query()
            ->select(
                'empleado_id',
                DB::raw("SUM(CASE WHEN status = 'Asistio' THEN 1 ELSE 0 END) as asistencias"),
                DB::raw("SUM(CASE WHEN status = 'Falto' THEN 1 ELSE 0 END) as faltas"),
                DB::raw("SUM(CASE WHEN status = 'Permiso' THEN 1 ELSE 0 END) as permisos"),
            )
            ->whereMonth('fecha', $mes)
            ->whereYear('fecha', $year)
            ->groupBy('empleado_id')
            ->get()
            ->keyBy('empleado_id');

        return response()->json($resumen);
    }
}
