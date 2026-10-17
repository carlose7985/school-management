<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use App\Models\AreaTrabajo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AreaTrabajoController extends Controller
{
    /**
     * Listado con búsqueda y paginación.
     */
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $areas = AreaTrabajo::query()
            ->when($search, function ($query, $search) {
                $query->where('nombre_del_area', 'like', "%{$search}%");
            })
            ->orderBy('id', 'asc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('DatosBasicos/Areas/Index', [
            'areas' => $areas,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Guarda un nuevo área.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_del_area' => ['required', 'string', 'max:255', 'unique:area_trabajos,nombre_del_area'],
        ]);

        // 🎯 Forzar mayúsculas
        $nombre = mb_strtoupper(
            preg_replace('/\s+/', ' ', trim($validated['nombre_del_area'])),
            'UTF-8'
        );

        AreaTrabajo::create([
            'nombre_del_area' => $nombre,
            'status' => true,
        ]);

        return back()->with('success', 'Área registrada correctamente.');
    }

    /**
     * 🚀 Guardado rápido desde cualquier select remoto.
     * Devuelve JSON con el área creada para que el frontend la agregue a la lista sin recargar.
     */
    public function storeFast(Request $request)
    {
        $validated = $request->validate([
            'nombre_del_area' => ['required', 'string', 'max:255'],
        ]);

        // 🎯 Forzar mayúsculas y limpiar espacios
        $nombre = mb_strtoupper(
            preg_replace('/\s+/', ' ', trim($validated['nombre_del_area'])),
            'UTF-8'
        );

        $area = AreaTrabajo::firstOrCreate(
            ['nombre_del_area' => $nombre],
            ['status' => true]
        );

        return response()->json([
            'success' => true,
            'area' => [
                'value' => $area->id,
                'label' => $area->nombre_del_area,
            ],
            'was_created' => $area->wasRecentlyCreated,
        ]);
    }    

    /**
     * Activa / desactiva un área.
     */
    public function toggle(AreaTrabajo $area)
    {

    

        $area->update(['status' => !$area->status]);

        return back()->with(
            'success',
            $area->status ? 'Área activada.' : 'Área desactivada.'
        );
    }

    /**
     * Actualiza el nombre de un área.
     */
    public function update(Request $request, AreaTrabajo $area)
    {
        $validated = $request->validate([
            'nombre_del_area' => [
                'required',
                'string',
                'max:255',
                'unique:area_trabajos,nombre_del_area,' . $area->id,
            ],
        ]);

        $nombre = mb_strtoupper(
            preg_replace('/\s+/', ' ', trim($validated['nombre_del_area'])),
            'UTF-8'
        );

        $area->update(['nombre_del_area' => $nombre]);

        return back()->with('success', 'Área actualizada correctamente.');
    }

    /**
     * Listado ligero de áreas activas para selects remotos.
     */
    public function listActive()
    {
        $areas = AreaTrabajo::query()
            ->where('status', true)
            ->orderBy('nombre_del_area')
            ->get(['id', 'nombre_del_area'])
            ->map(fn($a) => [
                'value' => $a->id,
                'label' => $a->nombre_del_area,
            ]);

        return response()->json($areas);
    }
}
