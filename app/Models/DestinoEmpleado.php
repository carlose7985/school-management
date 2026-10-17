<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinoEmpleado extends Model
{
    protected $table = 'destino_empleados';

    protected $fillable = [
        'empleado_id',
        'destino',
    ];

    // 🔗 Relación inversa hacia el empleado
    public function empleado()
    {
        return $this->belongsTo(EmpleadoActivo::class, 'empleado_id');
    }
}