<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DiaFestivo;
use Carbon\Carbon;
use Inertia\Inertia;

class DiaFestivoController extends Controller
{
    /**
     * Listado con búsqueda y paginación.
     */
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $festivos = DiaFestivo::query()
            ->when($search, function ($query, $search) {
                $query->where('descripcion', 'like', "%{$search}%")
                    ->orWhere('fecha', 'like', "%{$search}%");
            })
            ->orderBy('fecha', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('DatosBasicos/Festivos/Index', [
            'festivos' => $festivos,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Guarda un nuevo día festivo.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha' => ['required', 'date'],
            'descripcion' => ['required', 'string', 'max:255'],
        ]);

        // Evitar duplicados por fecha exacta
        $existe = DiaFestivo::whereDate('fecha', $validated['fecha'])->exists();
        if ($existe) {
            return back()->withErrors([
                'fecha' => 'Ya existe un día festivo registrado para esa fecha.',
            ]);
        }

        DiaFestivo::create([
            'fecha' => $validated['fecha'],
            'descripcion' => $validated['descripcion'],
        ]);

        return back()->with('success', 'Día festivo registrado correctamente.');
    }

    /**
     * 🚀 Guardado rápido desde cualquier select remoto.
     * Devuelve JSON con el día festivo creado.
     */
    public function storeFast(Request $request)
    {
        $validated = $request->validate([
            'fecha' => ['required', 'date'],
            'descripcion' => ['required', 'string', 'max:255'],
        ]);

        $festivo = DiaFestivo::firstOrCreate(
            ['fecha' => $validated['fecha']],
            ['descripcion' => $validated['descripcion']]
        );

        return response()->json([
            'success' => true,
            'festivo' => [
                'value' => $festivo->id,
                'label' => Carbon::parse($festivo->fecha)->format('d/m/Y') . ' · ' . $festivo->descripcion,
                'fecha' => $festivo->fecha,
                'descripcion' => $festivo->descripcion,
            ],
            'was_created' => $festivo->wasRecentlyCreated,
        ]);
    }

    /**
     * Actualiza un día festivo.
     */
    public function update(Request $request, DiaFestivo $festivo)
    {
        $validated = $request->validate([
            'fecha' => ['required', 'date'],
            'descripcion' => ['required', 'string', 'max:255'],
        ]);

        // Evitar duplicados por fecha (excluyendo el actual)
        $existe = DiaFestivo::whereDate('fecha', $validated['fecha'])
            ->where('id', '!=', $festivo->id)
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'fecha' => 'Ya existe otro día festivo con esa fecha.',
            ]);
        }

        $festivo->update($validated);

        return back()->with('success', 'Día festivo actualizado correctamente.');
    }

    /**
     * Elimina un día festivo.
     */
    public function destroy(DiaFestivo $festivo)
    {
        $festivo->delete();

        return back()->with('success', 'Día festivo eliminado.');
    }

    /**
     * Listado ligero de días festivos para selects remotos.
     * Opcionalmente filtra por año: /list/active?year=2026
     */
    public function listActive(Request $request)
    {
        $year = $request->get('year');

        $festivos = DiaFestivo::query()
            ->when($year, fn($q) => $q->whereYear('fecha', $year))
            ->orderBy('fecha')
            ->get()
            ->map(fn($f) => [
                'value' => $f->id,
                'label' => Carbon::parse($f->fecha)->format('d/m/Y') . ' · ' . $f->descripcion,
                'fecha' => $f->fecha,
                'descripcion' => $f->descripcion,
            ]);

        return response()->json($festivos);
    }
}
