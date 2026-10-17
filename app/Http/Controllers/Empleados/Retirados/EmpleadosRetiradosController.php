<?php

namespace App\Http\Controllers\Empleados\Retirados;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController;
use App\Models\Cargo;
use App\Models\EmpleadoActivo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmpleadosRetiradosController extends Controller
{
    // ════════════════════════════════════════════════════════
    // LISTADO DE RETIRADOS
    // ════════════════════════════════════════════════════════
    public function index(Request $request): Response
    {
        $search = trim((string) $request->get('search', ''));

        $query = EmpleadoActivo::query()
            ->where('situacion_laboral', 'Retirado')
            ->orderBy('apellidos', 'asc')
            ->orderBy('nombres', 'asc');

        if ($search !== '') {
            $query->where(function ($sub) use ($search) {
                $sub->where('nombres', 'like', "%{$search}%")
                    ->orWhere('apellidos', 'like', "%{$search}%")
                    ->orWhere('cedula', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(nombres, ' ', apellidos) LIKE ?", ["%{$search}%"]);
            });
        }

        $empleados = $query->paginate(15)->withQueryString();

        // Cargos para el modal de cambiar cargo (por si lo usan en show)
        $cargos = Cargo::where('status', true)
            ->orderBy('nombre_del_cargo')
            ->get()
            ->map(fn ($c) => ['value' => $c->id, 'label' => $c->nombre_del_cargo]);

        return Inertia::render('Empleados/Retirados/Listado/Index', [
            'empleados' => $empleados,
            'cargos'    => $cargos,
            'filters'   => ['search' => $search],
        ]);
    }

    // ════════════════════════════════════════════════════════
    // SHOW (reusa vista de activos)
    // ════════════════════════════════════════════════════════

    public function show(EmpleadoActivo $empleado)
    {
        return Inertia::render('Empleados/Retirados/Listado/Show', [
            'empleado' => $empleado,
        ]);
    }

    // public function show(EmpleadoActivo $empleado)
    // {
        
    //     // Redirige al show de activos (solo lectura)
    //     return redirect()->route('empleados.retirados.show', $empleado->id);
    // }

    // ════════════════════════════════════════════════════════
    // REACTIVAR EMPLEADO
    // ════════════════════════════════════════════════════════
    public function reactivar(EmpleadoActivo $empleado)
    {
        if (strtolower($empleado->situacion_laboral ?? '') !== 'retirado') {
            return back()->with('error', 'Este empleado no está retirado.');
        }

        $empleado->update([
            'situacion_laboral'       => 'Activo',
            'status_de_actualizacion' => null,
        ]);

        return redirect()
            ->route('empleados.retirados.listado.index')
            ->with('success', "Empleado {$empleado->nombres} {$empleado->apellidos} reactivado correctamente.");
    }

    // ════════════════════════════════════════════════════════
    // HISTORIAL DE ASISTENCIA PDF
    // ════════════════════════════════════════════════════════
    public function historialAsistencia(Request $request, EmpleadoActivo $empleado)
    {
        $year     = (int) $request->get('year', now()->year);
        $mesesIds = (array) $request->get('meses', []);

        $exportController = new ExportDocEmpleadosPdfController();

        return $exportController->historialAsistenciaPublico($year, $mesesIds, $empleado->id);
    }
}
