<?php

namespace App\Http\Controllers\Empleados\CartaAceptacion;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use App\Models\CartaAceptacion;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CartaAceptacionController extends Controller
{
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $cartas = CartaAceptacion::query()
            ->when($search, function ($q, $s) {
                $q->where('nombres', 'like', "%{$s}%")
                    ->orWhere('apellidos', 'like', "%{$s}%")
                    ->orWhere('cedula', 'like', "%{$s}%")
                    ->orWhere('documento', 'like', "%{$s}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $cartas->getCollection()->transform(function ($c) {
            $c->cargo_nombre = $this->resolveCargo($c->tipo_de_personal);
            return $c;
        });

        $cargos = Cargo::query()
            ->where('status', true)
            ->orderBy('nombre_del_cargo')
            ->get(['id', 'nombre_del_cargo'])
            ->map(fn($c) => [
                'value' => $c->nombre_del_cargo,
                'label' => $c->nombre_del_cargo,
            ]);

        return Inertia::render('Empleados/CartaAceptacion/Index', [
            'cartas' => $cartas,
            'cargos' => $cargos,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'documento' => ['required', 'string', 'max:50'],
            'cedula' => ['required', 'max:8', 'unique:carta_aceptacions,cedula'],
            'sexo' => ['required', Rule::in(['M', 'F'])],
            'tipo_de_personal' => ['required'],
            'fecha_registro' => ['required', 'date'],
        ]);

        CartaAceptacion::create($validated);

        return back()->with('success', 'Carta de aceptación registrada correctamente.');
    }

    public function update(Request $request, CartaAceptacion $carta)
    {
        $validated = $request->validate([
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'documento' => ['required', 'string', 'max:50'],
            'cedula' => ['required', 'max:8', 'unique:carta_aceptacions,cedula,' . $carta->id],
            'sexo' => ['required', Rule::in(['M', 'F'])],
            'tipo_de_personal' => ['required'],
            'fecha_registro' => ['required', 'date'],
        ]);

        $carta->update($validated);

        return back()->with('success', 'Carta actualizada correctamente.');
    }

    public function destroy(CartaAceptacion $carta)
    {
        $carta->delete();

        return back()->with('success', 'Carta eliminada.');
    }

    /**
     * Genera el PDF de la carta de aceptación.
     */
    public function imprimir(CartaAceptacion $carta)
    {
        $cargo = $this->resolveCargo($carta->tipo_de_personal);

        // 🎯 Buscar director: primero con cargo "Director", si no, el primero activo
        $director = \App\Models\EmpleadoActivo::where('tipo_de_personal', 'like', '%Director%')
            ->first();

        if (!$director) {
            $director = \App\Models\EmpleadoActivo::first();
        }
        $title = 'Carta de Aceptación';

        $pdf = Pdf::loadView('pdf.empleados.carta_aceptacion', [
            'cartadeaceptacion' => $carta,
            'cargo' => $cargo,
            'director' => $director,
            'title' => $title,
        ])->setPaper('letter', 'portrait');

        return $pdf->stream("carta-aceptacion-{$carta->cedula}.pdf");
    }


    private function resolveCargo($tipo): string
    {
        if (!$tipo) return '—';
        if (is_numeric($tipo)) {
            $cargo = Cargo::find($tipo);
            return $cargo?->nombre_del_cargo ?? $tipo;
        }
        return $tipo;
    }
}
