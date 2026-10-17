<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $table = 'permisos';

    protected $fillable = [
        'empleado_id',
        'tipo',
        'fecha_de_inicio',
        'fecha_final',
        'dia',
        'descripcion',
        'status',
        'fecha_registro',
    ];

    protected $casts = [
        'fecha_de_inicio' => 'date:Y-m-d',
        'fecha_final' => 'date:Y-m-d',
        'fecha_registro' => 'date:Y-m-d',
    ];

    // ─────────────────────────────────────────────
    // Relación con el empleado
    // ─────────────────────────────────────────────
    public function empleado()
    {
        return $this->belongsTo(EmpleadoActivo::class, 'empleado_id');
    }

    // ─────────────────────────────────────────────
    // Scopes
    // ─────────────────────────────────────────────
    public function scopeTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    public function scopeActivos($query)
    {
        return $query->where('status', 'Activo');
    }

    public function scopeVencidos($query)
    {
        return $query->where('status', 'Permiso Vencido');
    }

    // ─────────────────────────────────────────────
    // Accessor: días legibles para mostrar
    // ─────────────────────────────────────────────
    public function getDetalleAttribute(): string
    {
        if ($this->tipo === 'Eventual') {
            $inicio = $this->fecha_de_inicio
                ? Carbon::parse($this->fecha_de_inicio)->format('d/m/Y')
                : '—';
            $fin = $this->fecha_final
                ? Carbon::parse($this->fecha_final)->format('d/m/Y')
                : '—';

            return "{$inicio} al {$fin}";
        }

        return $this->dia ?? '—';
    }
}
