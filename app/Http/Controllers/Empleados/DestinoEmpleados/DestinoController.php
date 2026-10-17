<?php

namespace App\Http\Controllers\Empleados\DestinoEmpleados;

use App\Http\Controllers\Controller;
use App\Models\DestinoEmpleado;
use App\Models\EmpleadoActivo;
use Illuminate\Http\Request;

class DestinoController extends Controller
{
    /**
     * 🎯 Guarda o actualiza el destino del empleado (para la constancia de liberación).
     */
    public function store(Request $request, EmpleadoActivo $empleado)
    {
        $validated = $request->validate([
            'destino' => ['required', 'string', 'max:255'],
        ], [
            'destino.required' => 'Escribe el destino del empleado.',
        ]);

        // 🎯 Guardar/actualizar en destino_empleados
        $registro = DestinoEmpleado::updateOrCreate(
            ['empleado_id' => $empleado->id],
            ['destino' => $validated['destino']]
        );

        // 🎯 Actualizar el campo status_de_actualizacion del empleado
        $empleado->update([
            'status_de_actualizacion' => $validated['destino'],
             'situacion_laboral' => 'Inactivo',
        ]);

        return response()->json([
            'success' => true,
            'destino' => $registro->destino,
            'message' => 'Destino guardado correctamente.',
        ]);
    }

    /**
     * 🎯 Obtiene el destino guardado del empleado (para pre-cargar el modal).
     */
    public function show(EmpleadoActivo $empleado)
    {
        $registro = DestinoEmpleado::where('empleado_id', $empleado->id)->first();

        return response()->json([
            'destino' => $registro?->destino ?? '',
        ]);
    }
}