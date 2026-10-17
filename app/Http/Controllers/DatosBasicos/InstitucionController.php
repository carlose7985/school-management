<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInstitucionRequest;
use App\Models\Institucion;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class InstitucionController extends Controller
{
    public function index()
    {
    
        // Como es "singleton" (solo existe una institución), tomamos la primera
        $institucion = Institucion::first();

        return Inertia::render('DatosBasicos/Institucion/Index', [
            'institucion' => $institucion,
        ]);
    }

    public function store(StoreInstitucionRequest $request)
    {
        $validated = $request->validated();

        $institucion = Institucion::first();

        if ($institucion) {
            $institucion->update($validated);
            $mensaje = 'Datos actualizados correctamente.';
        } else {
            $institucion = Institucion::create($validated);
            $mensaje = 'Datos registrados correctamente.';
        }

        return redirect()
            ->route('configuraciones.institucion.index')
            ->with('success', $mensaje);
    }

    public function imprimir()
    {
        $institucion = Institucion::first();

        if (!$institucion) {
            return redirect()
                ->route('configuraciones.institucion.index')
                ->with('error', 'Primero debes registrar los datos de la institución.');
        }

        $pdf = Pdf::loadView('pdf.institucion.institucion', [
            'institucion' => $institucion,
        ]);

        // Opciones de papel (opcional)
        $pdf->setPaper('letter', 'portrait');

        // stream() abre el PDF en el navegador (pestaña nueva)
        // download() lo descarga directamente
        return $pdf->stream('ficha-institucion-' . date('Y-m-d') . '.pdf');
    }
}
