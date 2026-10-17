<?php

namespace App\Http\Controllers\DatosBasicos;

use Illuminate\Http\Request;
use App\Models\Apreciacion;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ApreciacionController
{
    /**
     * Listado con búsqueda y paginación.
     */
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $apreciaciones = Apreciacion::query()
            ->when($search, function ($query, $search) {
                $query->where('literal', 'like', "%{$search}%")
                    ->orWhere('numeral', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            })
            ->orderBy('literal')
            ->orderBy('numeral')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('DatosBasicos/Apreciaciones/Index', [
            'apreciaciones' => $apreciaciones,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Guarda una nueva apreciación.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'literal' => ['required', Rule::in(['S-D', 'A', 'B', 'C', 'D', 'E', 'Inasistente'])],
            'numeral' => ['nullable', 'string', 'max:10'],
            'status' => ['required', Rule::in(['Aprobado', 'Reprobado'])],
        ]);

        // Evitar duplicado: misma literal + numeral
        $existe = Apreciacion::where('literal', $validated['literal'])
            ->where(function ($q) use ($validated) {
                if (!empty($validated['numeral'])) {
                    $q->where('numeral', $validated['numeral']);
                } else {
                    $q->whereNull('numeral');
                }
            })
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'literal' => 'Ya existe una apreciación con esos valores.',
            ]);
        }

        Apreciacion::create([
            'literal' => $validated['literal'],
            'numeral' => $validated['numeral'] ?? null,
            'status' => $validated['status'],
        ]);

        return back()->with('success', 'Apreciación registrada correctamente.');
    }

    /**
     * 🚀 Guardado rápido desde cualquier select remoto.
     */
    public function storeFast(Request $request)
    {
        $validated = $request->validate([
            'literal' => ['required', Rule::in(['S-D', 'A', 'B', 'C', 'D', 'E', 'Inasistente'])],
            'numeral' => ['nullable', 'string', 'max:10'],
            'status' => ['required', Rule::in(['Aprobado', 'Reprobado'])],
        ]);

        $apreciacion = Apreciacion::firstOrCreate(
            [
                'literal' => $validated['literal'],
                'numeral' => $validated['numeral'] ?? null,
            ],
            [
                'status' => $validated['status'],
            ]
        );

        return response()->json([
            'success' => true,
            'apreciacion' => [
                'value' => $apreciacion->id,
                'label' => $apreciacion->nombre_completo,
                'literal' => $apreciacion->literal,
                'numeral' => $apreciacion->numeral,
                'status' => $apreciacion->status,
            ],
            'was_created' => $apreciacion->wasRecentlyCreated,
        ]);
    }

    /**
     * Actualiza una apreciación.
     */
    public function update(Request $request, Apreciacion $apreciacion)
    {
        $validated = $request->validate([
            'literal' => ['required', Rule::in(['S-D', 'A', 'B', 'C', 'D', 'E', 'Inasistente'])],
            'numeral' => ['nullable', 'string', 'max:10'],
            'status' => ['required', Rule::in(['Aprobado', 'Reprobado'])],
        ]);

        // Evitar duplicado excluyendo la actual
        $existe = Apreciacion::where('literal', $validated['literal'])
            ->where(function ($q) use ($validated) {
                if (!empty($validated['numeral'])) {
                    $q->where('numeral', $validated['numeral']);
                } else {
                    $q->whereNull('numeral');
                }
            })
            ->whereKeyNot($apreciacion->id)
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'literal' => 'Ya existe otra apreciación con esos valores.',
            ]);
        }

        $apreciacion->update([
            'literal' => $validated['literal'],
            'numeral' => $validated['numeral'] ?? null,
            'status' => $validated['status'],
        ]);

        return back()->with('success', 'Apreciación actualizada correctamente.');
    }

    /**
     * Elimina una apreciación.
     */
    public function destroy(Apreciacion $apreciacion)
    {
        $apreciacion->delete();

        return back()->with('success', 'Apreciación eliminada.');
    }

    /**
     * Listado ligero de apreciaciones activas para selects remotos.
     */
    public function listActive()
    {
        $apreciaciones = Apreciacion::query()
            ->orderBy('literal')
            ->orderBy('numeral')
            ->get()
            ->map(fn($a) => [
                'value' => $a->id,
                'label' => $a->nombre_completo,
                'literal' => $a->literal,
                'numeral' => $a->numeral,
                'status' => $a->status,
            ]);

        return response()->json($apreciaciones);
    }
}
