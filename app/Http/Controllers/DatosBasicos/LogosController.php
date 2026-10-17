<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Logo;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LogosController extends Controller
{
    /**
     * Muestra la vista con el registro único (o null).
     */
    public function index()
    {
        return Inertia::render('DatosBasicos/Logos/Index', [
            'logos' => Logo::first(),
        ]);
    }

    /**
     * Sube o actualiza uno de los dos logos.
     * El campo se pasa por `field` ('logo_institucion' o 'logo_documentos').
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'field' => ['required', 'in:logo_institucion,logo_documentos'],
            'file' => ['required', 'image', 'mimes:png,jpg,jpeg,webp,svg', 'max:2048'], // máx 2MB
        ]);

        $field = $validated['field'];
        $file = $request->file('file');

        // Obtener o crear el registro único
        $logo = Logo::firstOrCreate([]);

        // Borrar el archivo anterior si existe
        if ($logo->$field && Storage::disk('public')->exists($logo->$field)) {
            Storage::disk('public')->delete($logo->$field);
        }

        // Guardar el nuevo archivo en storage/app/public/logos
        $path = $file->store('logos', 'public');

        // Actualizar el campo
        $logo->update([$field => $path]);

        return back()->with('success', 'Logo actualizado correctamente.');
    }

    /**
     * Elimina un logo específico.
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'field' => ['required', 'in:logo_institucion,logo_documentos'],
        ]);

        $logo = Logo::first();
        if (!$logo) {
            return back()->with('error', 'No hay logos registrados.');
        }

        $field = $validated['field'];

        if ($logo->$field && Storage::disk('public')->exists($logo->$field)) {
            Storage::disk('public')->delete($logo->$field);
        }

        $logo->update([$field => null]);

        return back()->with('success', 'Logo eliminado.');
    }
}