<?php

namespace App\Http\Controllers\Empleados\PdfEmpleados;

use App\Http\Controllers\Controller;
use App\Models\EmpleadoActivo;
use App\Models\Institucion;
use App\Models\Logo;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function imprimir(Request $request, EmpleadoActivo $empleado, string $tipo)
    {
        // 🎯 Mapeo de títulos por tipo de documento
        $titulos = [
            'ficha_tecnica'         => 'Ficha del Empleado',
            'constancia_liberacion' => 'Constancia de Liberación',
            'fiel_cumplimiento'     => 'Constancia de Fiel Cumplimiento',
            'solicitud_vacaciones'  => 'Solicitud de Vacaciones',
            'historial_asistencias' => 'Historial de Asistencias',
        ];

        if (!array_key_exists($tipo, $titulos)) {
            abort(404, "Documento '{$tipo}' no válido.");
        }

        // 🎯 Buscar el destino (string) del empleado
        $destinoEmpleado = \App\Models\DestinoEmpleado::where('empleado_id', $empleado->id)->first();

        $data = $this->getDataByTipo($tipo, $empleado, $request);

        $data['logo']        = Logo::first();
        $data['institucion'] = Institucion::first();
        $data['empleado']    = $empleado;
        $data['title']       = $titulos[$tipo];
        $data['destino']     = $destinoEmpleado->destino ?? 'SIN DESTINO ASIGNADO'; // 👈 string

        $vista = "pdf.empleados.{$tipo}";

        if (!view()->exists($vista)) {
            abort(404, "Vista PDF '{$tipo}' no encontrada.");
        }

        $orientacion = $tipo === 'historial_asistencias' ? 'landscape' : 'portrait';

        $pdf = Pdf::loadView($vista, $data)->setPaper('letter', $orientacion);

        return $pdf->stream("{$tipo}-{$empleado->cedula}.pdf");
    }


    private function getDataByTipo(string $tipo, EmpleadoActivo $empleado, Request $request): array
    {
        return match ($tipo) {
            'historial_asistencias' => $this->dataHistorialAsistencias($empleado, $request),
            'solicitud_vacaciones' => $this->dataSolicitudVacaciones($empleado, $request),
            default => $this->dataBasica($empleado),
        };
    }

    private function dataBasica(EmpleadoActivo $empleado): array
    {
        return [
            'fecha_actual' => Carbon::now(),
        ];
    }

    private function dataHistorialAsistencias(EmpleadoActivo $empleado, Request $request): array
    {
        $anioEscolar = (int) $request->get('anio_escolar', now()->year);
        $mesesSeleccionados = $request->get('meses', []);

        if (empty($mesesSeleccionados)) {
            $mesesSeleccionados = [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ];
        }

        // 🎯 Asistencias del empleado en el año
        $asistencias = \App\Models\AsistenciaEmpleado::where('empleado_id', $empleado->id)
            ->whereYear('fecha', $anioEscolar)
            ->get()
            ->keyBy(fn($item) => \Carbon\Carbon::parse($item->fecha)->format('Y-m-d'));

        // 🎯 Días festivos del año
        $festivos = \App\Models\DiaFestivo::whereYear('fecha', $anioEscolar)
            ->pluck('fecha')
            ->map(fn($f) => \Carbon\Carbon::parse($f)->format('Y-m-d'))
            ->toArray();

        $festivosSet = array_flip($festivos);

        $reporteData = [];

        foreach ($mesesSeleccionados as $nombreMes) {
            $numMes = $this->nombreMesANumero($nombreMes);
            if (!$numMes) continue;

            $diasDelMes = \Carbon\Carbon::create($anioEscolar, $numMes, 1)->daysInMonth;

            $dias = [];
            $totales = ['A' => 0, 'F' => 0, 'P' => 0];

            for ($dia = 1; $dia <= $diasDelMes; $dia++) {
                $fecha = \Carbon\Carbon::create($anioEscolar, $numMes, $dia);

                // 🎯 Saltar sábados (6) y domingos (0)
                if (in_array($fecha->dayOfWeek, [0, 6])) {
                    continue;
                }

                $clave = $fecha->format('Y-m-d');
                $nombreDia = $this->nombreDiaCorto($fecha->dayOfWeek);

                $letra = '**';
                $clase = '';
                $esFestivo = isset($festivosSet[$clave]);

                if ($esFestivo) {
                    // 🎯 Día festivo → DF
                    $letra = 'DF';
                    $clase = 'badge-festivo';
                } else {
                    $registro = $asistencias->get($clave);

                    if ($registro) {
                        switch ($registro->status) {
                            case 'Asistio':
                                $letra = 'A';
                                $clase = 'badge-green';
                                $totales['A']++;
                                break;
                            case 'Falto':
                            case 'Ausente':
                                $letra = 'F';
                                $clase = 'badge-red';
                                $totales['F']++;
                                break;
                            case 'Permiso':
                            case 'Permisousa':
                                $letra = 'P';
                                $clase = 'badge-yellow';
                                $totales['P']++;
                                break;
                        }
                    }
                }

                $dias[] = [
                    'nombre_dia' => $nombreDia,
                    'num_dia' => str_pad($dia, 2, '0', STR_PAD_LEFT),
                    'letra' => $letra,
                    'clase' => $clase,
                    'es_festivo' => $esFestivo,
                ];
            }

            $reporteData[] = [
                'nombre_mes' => $nombreMes,
                'dias' => $dias,
                'totales' => $totales,
            ];
        }

        return [
            'anio_escolar' => $anioEscolar,
            'meses' => $mesesSeleccionados,
            'reporteData' => $reporteData,
            'fecha_actual' => Carbon::now()->format('d/m/Y H:i'),
        ];
    }
    /**
     * Convierte nombre de mes a número (1-12).
     */
    private function nombreMesANumero(string $nombre): ?int
    {
        $meses = [
            'Enero' => 1,
            'Febrero' => 2,
            'Marzo' => 3,
            'Abril' => 4,
            'Mayo' => 5,
            'Junio' => 6,
            'Julio' => 7,
            'Agosto' => 8,
            'Septiembre' => 9,
            'Octubre' => 10,
            'Noviembre' => 11,
            'Diciembre' => 12,
        ];

        return $meses[$nombre] ?? null;
    }

    /**
     * Nombre corto del día de la semana.
     * 0 = Domingo, 1 = Lunes, ... 6 = Sábado
     */
    private function nombreDiaCorto(int $dayOfWeek): string
    {
        $dias = [
            0 => 'Dom',
            1 => 'Lun',
            2 => 'Mar',
            3 => 'Mié',
            4 => 'Jue',
            5 => 'Vie',
            6 => 'Sáb',
        ];

        return $dias[$dayOfWeek] ?? '';
    }

    private function dataSolicitudVacaciones(EmpleadoActivo $empleado, Request $request): array
    {
        return [
            'fecha_actual' => Carbon::now(),
            'dias_disponibles' => 0,
            'periodo' => null,
        ];
    }
}
