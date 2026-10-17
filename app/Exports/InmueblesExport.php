<?php

namespace App\Exports;

use App\Models\Inmueble;
use App\Models\AreaTrabajo;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class InmueblesExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize,
    WithTitle
{
    protected ?string $search;

    public function __construct(?string $search = null)
    {
        $this->search = $search;
    }

    /**
     * Retorna la colección de inmuebles filtrada.
     */
    public function collection(): \Illuminate\Support\Collection
    {
        $query = Inmueble::query();

        if ($this->search) {
            $search = $this->search;
            $query->where(function ($q) use ($search) {
                $q->where('tipo_de_inmueble', 'like', "%{$search}%")
                  ->orWhere('ubicacion', 'like', "%{$search}%")
                  ->orWhere('color', 'like', "%{$search}%")
                  ->orWhere('condicion_legal', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Encabezados de columna.
     */
    public function headings(): array
    {
        return [
            'ID',
            'Tipo de Inmueble',
            'Ubicación',
            'Largo (m)',
            'Ancho (m)',
            'Alto (m)',
            'Color',
            'Costo Aproximado ($)',
            'Cantidad',
            'Condición Legal',
            'Fecha de Registro',
        ];
    }

    /**
     * Mapea cada fila.
     */
    public function map($inmueble): array
    {
        $ubicacionNombre = '—';

        if ($inmueble->ubicacion) {
            if (is_numeric($inmueble->ubicacion)) {
                $area = AreaTrabajo::find($inmueble->ubicacion);
                $ubicacionNombre = $area ? $area->nombre_del_area : $inmueble->ubicacion;
            } else {
                $ubicacionNombre = $inmueble->ubicacion;
            }
        }

        return [
            $inmueble->id,
            $inmueble->tipo_de_inmueble ?? '—',
            $ubicacionNombre,
            $inmueble->largo ?? '—',
            $inmueble->ancho ?? '—',
            $inmueble->alto ?? '—',
            $inmueble->color ?? '—',
            $inmueble->costo_aproximado !== null
                ? (float) $inmueble->costo_aproximado
                : '—',
            $inmueble->cantidad ?? 0,
            $inmueble->condicion_legal ?? '—',
            $inmueble->created_at?->format('d/m/Y H:i') ?? '—',
        ];
    }

    /**
     * Estilos aplicados a la hoja.
     */
    public function styles(Worksheet $sheet): array
    {
        // Encabezado: negrita, texto blanco, fondo ámbar, centrado
        $sheet->getStyle('A1:K1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D97706'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Altura de la fila del encabezado
        $sheet->getRowDimension(1)->setRowHeight(24);

        // Estilos generales de todas las celdas
        $sheet->getStyle('A2:K' . ($sheet->getHighestRow()))->applyFromArray([
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        return [];
    }

    /**
     * Nombre de la pestaña.
     */
    public function title(): string
    {
        return 'Inmuebles';
    }
}