<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartaAceptacion extends Model
{
    protected $table = 'carta_aceptacions';
    protected $fillable = ['nombres', 'apellidos', 'documento', 'cedula', 'sexo', 'tipo_de_personal', 'fecha_registro'];

    protected $appends = ['nombre_completo', 'cargo_nombre'];

    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombres} {$this->apellidos}");
    }

    public function getCargoNombreAttribute(): string
    {
        if (!$this->tipo_de_personal) return '—';

        // Si es un ID numérico, busca el cargo
        if (is_numeric($this->tipo_de_personal)) {
            $cargo = Cargo::find($this->tipo_de_personal);
            return $cargo?->nombre_del_cargo ?? $this->tipo_de_personal;
        }

        return $this->tipo_de_personal;
    }
}
