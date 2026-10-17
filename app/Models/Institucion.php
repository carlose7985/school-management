<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institucion extends Model
{
    use HasFactory;

    /**
     * Nombre explícito de la tabla (Laravel pluralizaría a "institucions").
     */
    protected $table = 'instituciones';

    protected $fillable = [
        'nombre_de_la_institucion',
        'direccion',
        'telefono',
        'email',
        'rif',
        'nif',
        'fecha_de_fundada',
        'circuito',
        'estado',
        'municipio',
        'parroquia',
        'dependencia',
        'codigo_de_dependencia',
        'codigo_dea',
        'codigo_estadistico',
        'codigo_cenae',
        'codigo_circuito',
        'codigo_primaria',
        'codigo_electoral',
        'comuna',
        'zona_educativa',
        'turno',
        'medio',
        'tipo_de_escuela',
        'numero_de_aulas',
        'numero_de_secciones',
        'otras_aulas',
    ];

    protected $casts = [
        'fecha_de_fundada' => 'date:Y-m-d',
        'numero_de_aulas' => 'integer',
        'numero_de_secciones' => 'integer',
        'otras_aulas' => 'integer',
    ];
}
