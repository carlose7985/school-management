<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Inmueble extends Model
{
    protected $table = 'inmuebles';

    protected $fillable = [
        'tipo_de_inmueble',
        'largo',
        'ancho',
        'alto',
        'color',
        'costo_aproximado',
        'ubicacion',
        'cantidad',
        'condicion_legal',
    ];

}
