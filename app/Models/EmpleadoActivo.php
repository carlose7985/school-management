<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class EmpleadoActivo extends Model
{
    protected $table = 'empleado_activos';

    protected $fillable = [
        'nombres',
        'apellidos',
        'documento',
        'cedula',
        'sexo',
        'foto',
        'codigo_qr',
        'rostro_data',
        'huella_id',
        'fecha_de_nacimiento',
        'lugar_de_nacimiento',
        'direccion_de_habitacion',
        'parroquia',
        'telefono',
        'correo_electronico',
        'grado_de_intruccion',
        'profesion',
        'tipo_de_personal',
        'cargo_en_el_perror',
        'codigo_del_cargo',
        'condicion_del_cargo',
        'status_del_cargo',
        'fecha_de_ingreso_al_cargo',
        'carga_horaria',
        'dependencia',
        'codigo_de_dependencia',
        'situacion_laboral',
        'status_de_actualizacion',
        'fecha_de_ingreso_al_plantel',
        'funcion_en_el_plantel',
        'area_de_trabajo',
        'fecha_registro',
        'status',
    ];

    protected $casts = [
        'fecha_de_nacimiento' => 'date:Y-m-d',
        'fecha_de_ingreso_al_cargo' => 'date:Y-m-d',
        'fecha_de_ingreso_al_plantel' => 'date:Y-m-d',
        'fecha_registro' => 'date:Y-m-d',
        'area_de_trabajo' => 'array',
        'grado_de_intruccion' => 'array',
        'rostro_data' => 'array',
        'status' => 'string',
    ];

    protected $appends = [
        'nombre_completo',
        'edad',
        'iniciales',
        'cargo_nombre',
        'areas_nombres',  // ← asegúrate de que esté
        'permiso_activo_hoy',
    ];
    

    public function getAreasNombresAttribute(): array
    {
        $areas = $this->area_de_trabajo;
        if (is_string($areas)) {
            $areas = json_decode($areas, true) ?? [];
        }
        return is_array($areas) ? $areas : [];
    }
    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombres} {$this->apellidos}");
    }

    public function getEdadAttribute(): ?int
    {
        return $this->fecha_de_nacimiento
            ? Carbon::parse($this->fecha_de_nacimiento)->age
            : null;
    }

    public function getInicialesAttribute(): string
    {
        $n = $this->nombres ? mb_substr($this->nombres, 0, 1) : '';
        $a = $this->apellidos ? mb_substr($this->apellidos, 0, 1) : '';
        return mb_strtoupper("{$n}{$a}");
    }

    public function getCargoNombreAttribute(): string
    {
        if (!$this->tipo_de_personal) return '—';

        if (is_numeric($this->tipo_de_personal)) {
            $cargo = Cargo::find($this->tipo_de_personal);
            return $cargo?->nombre_del_cargo ?? $this->tipo_de_personal;
        }

        return $this->tipo_de_personal;
    }

    /**
     * Relación con los permisos.
     */
    public function permisos()
    {
        return $this->hasMany(Permiso::class, 'empleado_id');
    }

    /**
     * Permisos activos.
     */
    public function permisosActivos()
    {
        return $this->hasMany(Permiso::class, 'empleado_id')
            ->where('status', 'Activo');
    }


    public function getPermisoActivoHoyAttribute(): array
    {
        // 1) Si está inactivo administrativamente → Inactivo (prioridad máxima)
        if ($this->situacion_laboral !== 'Activo') {
            return [
                'estado' => $this->situacion_laboral ?? 'Inactivo',
                'color' => 'slate',
                'descripcion' => null,
                'tipo' => null,
            ];
        }

        $hoy = \Carbon\Carbon::now();
        $hoyStr = $hoy->format('Y-m-d');
        $diaSemana = $this->nombreDiaSemana($hoy->dayOfWeek); // 'Lunes', 'Martes', ...

        // 2) ¿Tiene permiso Eventual activo hoy?
        $eventual = Permiso::where('empleado_id', $this->id)
            ->where('tipo', 'Eventual')
            ->where('status', 'Activo')
            ->whereDate('fecha_de_inicio', '<=', $hoyStr)
            ->whereDate('fecha_final', '>=', $hoyStr)
            ->first();

        if ($eventual) {
            return [
                'estado' => 'Permiso',
                'color' => 'blue',
                'descripcion' => $eventual->descripcion,
                'tipo' => 'Eventual',
            ];
        }

        // 3) ¿Tiene permiso Permanente activo para HOY?
        $permanente = Permiso::where('empleado_id', $this->id)
            ->where('tipo', 'Permanente')
            ->where('status', 'Activo')
            ->where('dia', $diaSemana)
            ->first();

        if ($permanente) {
            return [
                'estado' => 'Permiso',
                'color' => 'amber',
                'descripcion' => $permanente->descripcion,
                'tipo' => 'Permanente',
            ];
        }

        // 4) Sin permisos → Activo normal
        return [
            'estado' => 'Activo',
            'color' => 'emerald',
            'descripcion' => null,
            'tipo' => null,
        ];
    }

    /**
     * Helper: convierte dayOfWeek (0-6) a nombre en español.
     */
    private function nombreDiaSemana(int $dayOfWeek): string
    {
        $dias = [
            0 => 'Domingo',
            1 => 'Lunes',
            2 => 'Martes',
            3 => 'Miércoles',
            4 => 'Jueves',
            5 => 'Viernes',
            6 => 'Sábado',
        ];

        return $dias[$dayOfWeek] ?? '';
    }

    public function destinoEmpleado()
    {
        return $this->hasOne(DestinoEmpleado::class, 'empleado_id');
    }
}
