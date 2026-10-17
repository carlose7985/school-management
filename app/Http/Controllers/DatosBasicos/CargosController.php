<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CargosController extends Controller
{
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $cargos = Cargo::query()
            ->when($search, fn($q, $s) => $q->where('nombre_del_cargo', 'like', "%{$s}%"))
            ->orderBy('id', 'asc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('DatosBasicos/Cargos/Index', [
            'cargos' => $cargos,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_del_cargo' => ['required', 'string', 'max:255', 'unique:cargos,nombre_del_cargo'],
        ]);

        $nombre = preg_replace('/\s+/', ' ', trim($validated['nombre_del_cargo']));

        Cargo::create([
            'nombre_del_cargo' => $nombre,
            'status' => true,
        ]);

        return back()->with('success', 'Cargo registrado correctamente.');
    }

    public function storeFast(Request $request)
    {
        $validated = $request->validate([
            'nombre_del_cargo' => ['required', 'string', 'max:255'],
        ]);

        $nombre = preg_replace('/\s+/', ' ', trim($validated['nombre_del_cargo']));

        $cargo = Cargo::firstOrCreate(
            ['nombre_del_cargo' => $nombre],
            ['status' => true]
        );

        return response()->json([
            'success' => true,
            'cargo' => [
                'value' => $cargo->id,
                'label' => $cargo->nombre_del_cargo,
            ],
            'was_created' => $cargo->wasRecentlyCreated,
        ]);
    }

    public function update(Request $request, Cargo $cargo)
    {
        $validated = $request->validate([
            'nombre_del_cargo' => [
                'required',
                'string',
                'max:255',
                'unique:cargos,nombre_del_cargo,' . $cargo->id,
            ],
        ]);

        $nombre = preg_replace('/\s+/', ' ', trim($validated['nombre_del_cargo']));

        $cargo->update(['nombre_del_cargo' => $nombre]);

        return back()->with('success', 'Cargo actualizado.');
    }

    public function toggle(Cargo $cargo)
    {
        $cargo->update(['status' => !$cargo->status]);

        return back()->with(
            'success',
            $cargo->status ? 'Cargo activado.' : 'Cargo desactivado.'
        );
    }

    public function listActive()
    {
        $cargos = Cargo::query()
            ->where('status', true)
            ->orderBy('nombre_del_cargo')
            ->get(['id', 'nombre_del_cargo'])
            ->map(fn($c) => [
                'value' => $c->id,
                'label' => $c->nombre_del_cargo,
            ]);

        return response()->json($cargos);
    }
}
