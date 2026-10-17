<?php

namespace App\Http\Controllers\ExportDocumentos;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use App\Models\CartaAceptacion;
use App\Models\DiaFestivo;
use App\Models\EmpleadoActivo;
use App\Models\HistorialAsistencia;
use App\Models\Institucion;
use App\Models\Logo;
use App\Models\VigilanteGuardia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ExportDocEmpleadosPdfController extends Controller
{
    /**
     * Endpoint único para generar documentos PDF de empleados.
     * El tipo se decide por el parámetro `type` del request.
     */
    public function exportDocumento(Request $request): Response
    {
        $type = $request->input('type');
        $empleadoId = $request->input('empleadoId');

        return match ($type) {
            'ficha-tecnica' => $this->fichaTecnica($empleadoId),
            'constancia-liberacion' => $this->constanciaLiberacion($empleadoId),
            'fiel-cumplimiento' => $this->fielCumplimiento($empleadoId),
            'historial-asistencia' => $this->historialAsistencia(
                (int) $request->input('year'),
                (array) $request->input('meses', []),
                (int) $empleadoId,
            ),
            'solicitud-vacaciones' => $this->solicitudVacaciones($empleadoId),
            default => abort(400, 'Tipo de documento no reconocido.'),
        };
    }

    // ════════════════════════════════════════════════════════
    // Helpers comunes
    // ════════════════════════════════════════════════════════

    private function getInstitucion()
    {
        return Institucion::orderBy('nombre_de_la_institucion', 'asc')->first();
    }

    private function getLogos(): array
    {
        $logo = Logo::first();

        $logoDocumento = ($logo && $logo->logo_documentos && Storage::disk('public')->exists($logo->logo_documentos))
            ? storage_path('app/public/' . $logo->logo_documentos)
            : public_path('img/noImgdoc.jpeg');

        $logoInstitucion = ($logo && $logo->logo_institucion && Storage::disk('public')->exists($logo->logo_institucion))
            ? storage_path('app/public/' . $logo->logo_institucion)
            : public_path('img/noImgdoc.jpeg');

        return [$logoDocumento, $logoInstitucion];
    }

    private function getFechaActual(): array
    {
        Carbon::setLocale('es');
        $now = Carbon::now();

        return [
            'dia' => $now->format('d'),
            'mes' => $now->translatedFormat('F'),
            'aho' => $now->format('Y'),
            'fechaExacta' => $now->format('d-m-Y'),
        ];
    }

    // ════════════════════════════════════════════════════════
    // 1. FICHA TÉCNICA
    // ════════════════════════════════════════════════════════
    private function fichaTecnica(int $empleadoId): Response
    {
        $empleado = EmpleadoActivo::findOrFail($empleadoId);
        [$logoDocumento, $logoInstitucion] = $this->getLogos();
        $institucion = $this->getInstitucion();

        $pdf = Pdf::loadView('pdf.empleados.ficha_tecnica', compact(
            'empleado',
            'institucion',
            'logoDocumento',
            'logoInstitucion',
        ));

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream("Ficha_Tecnica_{$empleado->cedula}.pdf");
    }

    // ════════════════════════════════════════════════════════
    // 2. CONSTANCIA DE LIBERACIÓN
    // ════════════════════════════════════════════════════════
    private function constanciaLiberacion(int $empleadoId): Response
    {
        $empleado = EmpleadoActivo::findOrFail($empleadoId);
        [$logoDocumento, $logoInstitucion] = $this->getLogos();
        $institucion = $this->getInstitucion();

        // Buscar destino (opcional, ya guardado en otro endpoint)
        $registroDestino = DB::table('destino_empleados')
            ->where('empleado_id', $empleadoId)
            ->latest('id')
            ->first();

        $destino = $registroDestino?->destino ?? '__________________________';

        $title = 'Constancia de Liberación';
        $fechas = $this->getFechaActual();

        $pdf = Pdf::loadView('pdf.empleados.constancia_liberacion', array_merge($fechas, [
            'title' => $title,
            'empleado' => $empleado,
            'institucion' => $institucion,
            'logoDocumento' => $logoDocumento,
            'logoInstitucion' => $logoInstitucion,
            'destino' => $destino,
        ]));

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream("Constancia_Liberacion_{$empleado->cedula}.pdf");
    }

    // ════════════════════════════════════════════════════════
    // 3. FIEL CUMPLIMIENTO
    // ════════════════════════════════════════════════════════
    private function fielCumplimiento(int $empleadoId): Response
    {
        $empleado = EmpleadoActivo::findOrFail($empleadoId);
        [$logoDocumento, $logoInstitucion] = $this->getLogos();
        $institucion = $this->getInstitucion();

        $title = 'Constancia de Cabal y Fiel Cumplimiento';
        $fechas = $this->getFechaActual();

        $pdf = Pdf::loadView('pdf.empleados.fiel_cumplimiento', array_merge($fechas, [
            'title' => $title,
            'empleado' => $empleado,
            'institucion' => $institucion,
            'logoDocumento' => $logoDocumento,
            'logoInstitucion' => $logoInstitucion,
        ]));

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream("Fiel_Cumplimiento_{$empleado->cedula}.pdf");
    }

    // ════════════════════════════════════════════════════════
    // 4. HISTORIAL DE ASISTENCIA
    // ════════════════════════════════════════════════════════
    private function historialAsistencia(int $year, array $mesesIds, int $empleadoId): Response
    {
        Carbon::setLocale('es');
        $fecha_actual = Carbon::now()->format('d-m-Y');

        $institucion = Institucion::orderBy('nombre_de_la_institucion', 'asc')->first();
        [$logoDocumento, $logoInstitucion] = $this->getLogos();

        // Si no vienen meses, usar los 12
        if (empty($mesesIds)) {
            $mesesIds = range(1, 12);
        }
        $mesesIds = array_map('intval', $mesesIds);

        $empleado = EmpleadoActivo::findOrFail($empleadoId);
        $nombreCompleto = $empleado->nombres . ' ' . $empleado->apellidos;
        $cedula = $empleado->cedula;

        // ── Asistencias ──
        $consultaAsis = DB::table('asistencia_empleados')
            ->where('empleado_id', $empleadoId)
            ->whereYear('fecha', $year)
            ->whereIn(DB::raw('MONTH(fecha)'), $mesesIds)
            ->get();

        $asistenciasMap = $consultaAsis->mapWithKeys(function ($item) {
            return [Carbon::parse($item->fecha)->format('Y-m-d') => $item->status];
        });

        // ── Festivos ──
        $consultaFestivos = DiaFestivo::whereYear('fecha', $year)
            ->whereIn(DB::raw('MONTH(fecha)'), $mesesIds)
            ->get();

        $festivosArray = $consultaFestivos->map(function ($item) {
            return Carbon::parse($item->fecha)->format('Y-m-d');
        })->toArray();

        // ── Estructura ──
        $reporteData = [];

        foreach ($mesesIds as $mes) {
            $fechaInicio = Carbon::createFromDate($year, $mes, 1);

            $periodo = CarbonPeriod::create(
                $fechaInicio->copy()->startOfMonth(),
                $fechaInicio->copy()->endOfMonth()
            );

            $diasDelMes = [];
            $totales = ['A' => 0, 'F' => 0, 'P' => 0, 'N' => 0, 'DF' => 0];

            foreach ($periodo as $date) {
                if ($date->isWeekend()) continue;

                $fechaStr = $date->format('Y-m-d');
                $statusDB = $asistenciasMap[$fechaStr] ?? null;

                $letra = '-';
                $clase = '';

                if ($statusDB) {
                    $status = trim(strtolower($statusDB));

                    if ($status === 'asistio') {
                        $letra = 'A';
                        $clase = 'badge-green';
                        $totales['A']++;
                    } elseif ($status === 'falto') {
                        $letra = 'F';
                        $clase = 'badge-red';
                        $totales['F']++;
                    } elseif ($status === 'permiso') {
                        $letra = 'P';
                        $clase = 'badge-yellow';
                        $totales['P']++;
                    } elseif ($status === 'nuevo ingreso') {
                        $letra = 'N';
                        $clase = 'badge-gray';
                        $totales['N']++;
                    }
                } else {
                    if (in_array($fechaStr, $festivosArray)) {
                        $letra = 'DF';
                        $clase = 'badge-purple';
                        $totales['DF']++;
                    }
                }

                $diasDelMes[] = [
                    'num_dia' => $date->format('d'),
                    'nombre_dia' => ucfirst($date->locale('es')->minDayName),
                    'letra' => $letra,
                    'clase' => $clase,
                ];
            }

            $reporteData[] = [
                'nombre_mes' => ucfirst($fechaInicio->locale('es')->monthName),
                'dias' => $diasDelMes,
                'totales' => $totales,
            ];
        }

        $pdf = Pdf::loadView('pdf.empleados.historial_asistencias', [
            'reporteData' => $reporteData,
            'empleado' => $empleado,
            'anio_escolar' => $year,
            'fecha_actual' => $fecha_actual,
        ]);

        $pdf->setPaper('Letter', 'landscape');

        return $pdf->stream("Historial_Asistencia_{$cedula}.pdf");
    }

    // ════════════════════════════════════════════════════════
    // 5. SOLICITUD DE VACACIONES
    // ════════════════════════════════════════════════════════
    private function solicitudVacaciones(int $empleadoId): Response
    {
        $empleado = EmpleadoActivo::findOrFail($empleadoId);
        [$logoDocumento, $logoInstitucion] = $this->getLogos();
        $institucion = $this->getInstitucion();

        $title = 'Solicitud de Vacaciones';
        $fechas = $this->getFechaActual();

        $pdf = Pdf::loadView('pdf.empleados.solicitud_vacaciones', array_merge($fechas, [
            'title' => $title,
            'empleado' => $empleado,
            'institucion' => $institucion,
            'logoDocumento' => $logoDocumento,
            'logoInstitucion' => $logoInstitucion,
        ]));

        $pdf->setPaper('Letter', 'portrait');

        return $pdf->stream("Solicitud_Vacaciones_{$empleado->cedula}.pdf");
    }

     public function listadodeAsistenciasTodos()
    {
        // Obtener todos los cargos que tienen empleados activos
        $cargos = EmpleadoActivo::select('tipo_de_personal')
            ->whereNotNull('tipo_de_personal')
            ->where('tipo_de_personal', '!=', '')
            ->distinct()
            ->orderBy('tipo_de_personal')
            ->pluck('tipo_de_personal');

        // Si no hay cargos, mostrar mensaje
        if ($cargos->isEmpty()) {
            return back()->with('error', 'No hay cargos registrados con empleados');
        }

        $dataPorCargo = [];

        foreach ($cargos as $cargoName) {
            // Determinar si es vigilante
            $esVigilante = stripos($cargoName, 'Vigilante') !== false;

            if ($esVigilante) {
                // Lógica para vigilantes
                $registros = VigilanteGuardia::with('empleado')->get();
                $data = $registros->groupBy('dias_guardia');
            } else {
                // Lógica para otros cargos
                $data = EmpleadoActivo::where('tipo_de_personal', $cargoName)
                    ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                    ->orderByRaw("FIELD(funcion_en_el_plantel, 
                    'Director', 
                    'Subdirector', 
                    'Coordinador', 
                    'Docente Especialista', 
                    'Docente de aula', 
                    'Secretaria(o)', 
                    'Aseador(a)', 
                    'Cocinera(o)',
                    'Sin Asignacion') ASC")
                    ->orderBy('id', 'asc')
                    ->select('id', 'nombres', 'apellidos', 'situacion_laboral', 'cedula')
                    ->get();
            }

            // Solo agregar si hay datos
            if (($esVigilante && $data->isNotEmpty()) || (!$esVigilante && $data->count() > 0)) {
                $dataPorCargo[] = [
                    'cargoName' => $cargoName,
                    'data' => $data,
                    'esVigilante' => $esVigilante
                ];
            }
        }

        // Generar PDF con todos los cargos
        $pdf = PDF::loadView('pdf.empleados.listado-de-asistencias-empleados-todos-pdf', compact('dataPorCargo'));
        $pdf->setPaper("Letter", "portrait");
        return $pdf->stream('Listado_General_Asistencias_Todos_Cargos.pdf');
    }


    public function listadodeAsistencias(int $cargoId)
    {
        $cargo = Cargo::findOrFail($cargoId);
        $cargoName = $cargo->nombre_del_cargo;

        // Variables para la vista
        $esVigilante = false;
        $data = []; // Aquí guardaremos los empleados o los grupos

        // 1. LÓGICA PARA VIGILANTES
        if (stripos($cargoName, 'Vigilante') !== false) {
            $esVigilante = true;

            // Obtenemos los registros de la tabla de guardias cargando la relación con el empleado
            // Ordenamos primero para intentar mantener un orden lógico si es posible
            $registros = VigilanteGuardia::with('empleado') // Asumiendo relación 'empleado' en el modelo Vigilantesguardia
                ->get();

            // Agrupamos por la columna 'dias_guardia' (Ej: "Lunes", "Martes", "Fin de Semana")
            $data = $registros->groupBy('dias_guardia');

            // Opcional: Ordenar los días si es necesario (Lunes, Martes, etc.)
            // $data = $data->sortBy(...); 

        } else {
            // 2. LÓGICA PARA OTROS CARGOS (Docentes, Obreros, etc.)
            $esVigilante = false;

            $data = EmpleadoActivo::where('tipo_de_personal', $cargoName)
                ->where('funcion_en_el_plantel', '!=', 'Vigilante')
                ->orderByRaw("FIELD(funcion_en_el_plantel, 
            'Director', 
            'Subdirector', 
            'Coordinador', 
            'Docente Especialista', 
            'Docente de aula', 
            'Secretaria(o)', 
            'Aseador(a)', 
            'Cocinera(o)',
            'Sin Asignacion') ASC") // <--- COMILLA AGREGADA AQUÍ
                ->orderBy('id', 'asc')
                ->select('id', 'nombres', 'apellidos', 'situacion_laboral', 'cedula')
                ->get();
        }

        $pdf = Pdf::loadView('pdf.empleados.listado-de-asistencias-empleados-pdf', compact('data', 'cargoName', 'esVigilante'));

        $pdf->setPaper("Letter", "portrait");
        return $pdf->stream('Listado Guia ' . $cargoName . '.pdf');
    }

    /**
     * 🎯 Wrapper público para reusar el historial desde otros controladores.
     */
    public function historialAsistenciaPublico(int $year, array $mesesIds, int $empleadoId): Response
    {
        return $this->historialAsistencia($year, $mesesIds, $empleadoId);
    }

}
