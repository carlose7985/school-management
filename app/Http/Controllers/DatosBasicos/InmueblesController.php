<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Models\Inmueble;
use App\Models\AreaTrabajo;
use App\Exports\InmueblesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Illuminate\Http\Request;
use Inertia\Inertia;


class InmueblesController
{
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $inmuebles = Inmueble::query()
            ->when($search, function ($query, $search) {
                $query->where('tipo_de_inmueble', 'like', "%{$search}%")
                    ->orWhere('ubicacion', 'like', "%{$search}%")
                    ->orWhere('color', 'like', "%{$search}%")
                    ->orWhere('condicion_legal', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        // Cargar nombres de ubicaciones (si ubicacion guarda el id del area)
        $inmuebles->getCollection()->transform(function ($inmueble) {
            $inmueble->ubicacion_nombre = $this->resolveUbicacion($inmueble->ubicacion);
            return $inmueble;
        });

        // Áreas para el select remoto
        $areas = AreaTrabajo::query()
            ->where('status', true)
            ->orderBy('nombre_del_area')
            ->get(['id', 'nombre_del_area'])
            ->map(fn($a) => [
                'value' => $a->id,
                'label' => $a->nombre_del_area,
            ]);

        return Inertia::render('DatosBasicos/Inmuebles/Index', [
            'inmuebles' => $inmuebles,
            'areas' => $areas,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_de_inmueble' => ['required', 'string', 'max:255'],
            'largo' => ['nullable', 'min:0'],
            'ancho' => ['nullable', 'min:0'],
            'alto' => ['nullable', 'min:0'],
            'color' => ['nullable', 'string', 'max:100'],
            'costo_aproximado' => ['nullable', 'min:0'],
            'ubicacion' => ['required', 'max:255'],
            'cantidad' => ['required', 'integer', 'min:1'],
            'condicion_legal' => ['required', 'in:Propio,Prestado,Alquilado,Donado'],
        ]);

        // Normalizar decimales: cambiar coma a punto para guardar en BD
        foreach (['largo', 'ancho', 'alto', 'costo_aproximado'] as $field) {
            if (!empty($validated[$field])) {
                $validated[$field] = (float) str_replace(',', '.', $validated[$field]);
            }
        }

        Inmueble::create($validated);

        return back()->with('success', 'Inmueble registrado correctamente.');
    }

    public function update(Request $request, Inmueble $inmueble)
    {
        $validated = $request->validate([
            'tipo_de_inmueble' => ['required', 'string', 'max:255'],
            'largo' => ['nullable', 'min:0'],
            'ancho' => ['nullable', 'min:0'],
            'alto' => ['nullable', 'min:0'],
            'color' => ['nullable', 'string', 'max:100'],
            'costo_aproximado' => ['nullable', 'min:0'],
            'ubicacion' => ['required', 'max:255'],
            'cantidad' => ['required', 'integer', 'min:1'],
            'condicion_legal' => ['required', 'in:Propio,Prestado,Alquilado,Donado'],
        ]);

        foreach (['largo', 'ancho', 'alto', 'costo_aproximado'] as $field) {
            if (!empty($validated[$field])) {
                $validated[$field] = (float) str_replace(',', '.', $validated[$field]);
            }
        }

        $inmueble->update($validated);

        return back()->with('success', 'Inmueble actualizado correctamente.');
    }

    public function destroy(Inmueble $inmueble)
    {
        $inmueble->delete();

        return back()->with('success', 'Inmueble eliminado.');
    }

    /**
     * Genera el PDF con el QR del inmueble.
     */
    public function imprimirQr(Inmueble $inmueble)
    {
        $ubicacionNombre = $this->resolveUbicacion($inmueble->ubicacion);

        // 🎯 Construir el payload del QR
        $qrPayload = implode("\n", [
            "INMUEBLE: {$inmueble->tipo_de_inmueble}",
            "UBICACIÓN: {$ubicacionNombre}",
            "DIMENSIONES: {$inmueble->largo}x{$inmueble->ancho}x{$inmueble->alto} m",
            "COLOR: " . ($inmueble->color ?? 'N/A'),
            "COSTO: " . ($inmueble->costo_aproximado ?? 'N/A'),
            "CANTIDAD: {$inmueble->cantidad}",
            "CONDICIÓN: {$inmueble->condicion_legal}",
            "SISTEMA: EduSystem",
        ]);

        // Generar QR como PNG base64
        $qrCode = new QrCode(
            data: $qrPayload,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Medium,
            size: 400,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
        );

        $writer = new PngWriter();
        $result = $writer->write($qrCode);
        $qrBase64 = 'data:image/png;base64,' . base64_encode($result->getString());

        $pdf = Pdf::loadView('pdf.inmuebles.inmueble-qr', [
            'inmueble' => $inmueble,
            'ubicacionNombre' => $ubicacionNombre,
            'qrBase64' => $qrBase64,
        ])->setPaper([0, 0, 400, 520], 'portrait');

        return $pdf->stream("qr-inmueble-{$inmueble->id}.pdf");
    }

    /**
     * Resuelve el nombre de la ubicación si es un ID de área.
     */
    private function resolveUbicacion($ubicacion): string
    {
        if (!$ubicacion) return 'Sin ubicación';

        // Si es un número, buscar el nombre del área
        if (is_numeric($ubicacion)) {
            $area = AreaTrabajo::find($ubicacion);
            return $area ? $area->nombre_del_area : $ubicacion;
        }

        return $ubicacion;
    }

    /**
 * Exporta el listado completo de inmuebles a PDF.
 */
public function exportPdf(Request $request)
{
    $search = trim($request->get('search', ''));

    $query = Inmueble::query();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('tipo_de_inmueble', 'like', "%{$search}%")
              ->orWhere('ubicacion', 'like', "%{$search}%")
              ->orWhere('color', 'like', "%{$search}%")
              ->orWhere('condicion_legal', 'like', "%{$search}%");
        });
    }

    $inmuebles = $query->orderBy('created_at', 'desc')->get();

    // Resolver nombres de ubicación
    $inmuebles->transform(function ($inmueble) {
        if ($inmueble->ubicacion && is_numeric($inmueble->ubicacion)) {
            $area = \App\Models\AreaTrabajo::find($inmueble->ubicacion);
            $inmueble->ubicacion_nombre = $area ? $area->nombre_del_area : $inmueble->ubicacion;
        } else {
            $inmueble->ubicacion_nombre = $inmueble->ubicacion ?? '—';
        }
        return $inmueble;
    });

    $pdf = Pdf::loadView('pdf.inmuebles.inmuebles-listado', [
        'inmuebles' => $inmuebles,
        'search' => $search,
    ])->setPaper('letter', 'landscape');

    return $pdf->stream('inmuebles-' . date('Y-m-d') . '.pdf');
}

/**
 * Exporta el listado completo de inmuebles a Excel.
 */
public function exportExcel(Request $request)
{
    $search = trim($request->get('search', ''));

    return Excel::download(
        new InmueblesExport($search),
        'inmuebles-' . date('Y-m-d') . '.xlsx'
    );
}
}