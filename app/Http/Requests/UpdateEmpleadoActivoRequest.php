<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmpleadoActivoRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a hacer esta petición.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        // ID del empleado desde la ruta (soporta route model binding o ID directo)
        $empleado = $this->route('empleado');
        $id = is_object($empleado) ? $empleado->id : $empleado;

        return [
            // ───── Datos personales ─────
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'documento' => ['required', Rule::in(['V-', 'E-', 'J-', 'P-'])],
            'cedula' => [
                'required',
                'string',
                'max:8',
                Rule::unique('empleado_activos', 'cedula')->ignore($id),
            ],
            'sexo' => ['required', Rule::in(['M', 'F'])],
            'fecha_de_nacimiento' => ['required', 'date', 'before:today'],
            'lugar_de_nacimiento' => ['required', 'string', 'max:255'],

            // ───── Ubicación y contacto ─────
            'direccion_de_habitacion' => ['required', 'string', 'max:500'],
            'parroquia' => ['required', 'string', 'max:255'],
            'telefono' => ['required', 'string', 'max:20'],
            'correo_electronico' => ['required', 'email', 'max:255'],
            'grado_de_intruccion' => ['required', 'array', 'min:1'],
            'grado_de_intruccion.*' => ['string', 'max:50'],
            'profesion' => ['required', 'string', 'max:255'],

            // ───── Datos laborales ─────
            'cargo_en_el_perror' => ['required', 'string', 'max:255'],
            'codigo_del_cargo' => ['required', 'string', 'max:255'],
            'dependencia' => ['required', 'string', 'max:255'],
            'codigo_de_dependencia' => ['required', 'string', 'max:255'],
            'status_del_cargo' => ['required', Rule::in(['Nacional', 'Estadal', 'Regional'])],
            'condicion_del_cargo' => ['required', Rule::in(['Fijo', 'Contratado'])],

            // ⚠️ Este campo NO se envía desde el frontend actual.
            // Se comenta o se elimina. Si lo necesitas, envíalo desde Vue.
            // 'tipo_de_personal' => ['required', 'string', 'max:255', 'exists:cargos,nombre_del_cargo'],

            // ───── Áreas: llegan como NOMBRES (string[]) ─────
            'area_de_trabajo' => ['required', 'array', 'min:1'],
            'area_de_trabajo.*' => [
                'string',
                'max:255',
                'exists:area_trabajos,nombre_del_area',
            ],

            'funcion_en_el_plantel' => ['required', Rule::in([
                'Director',
                'Subdirector',
                'Coordinador',
                'Docente de Aula',
                'Docente Especialista',
                'Secretaria(o)',
                'Aseador(a)',
                'Cocinera(o)',
                'Vigilante',
                'Sin Asignación',
            ])],
            'carga_horaria' => ['required', Rule::in([
                '00.00',
                '20.00',
                '33.33',
                '35.00',
                '37.50',
                '40.00',
                '53.33',
                '54.00',
            ])],
            'fecha_de_ingreso_al_plantel' => ['required', 'date', 'after_or_equal:fecha_de_ingreso_al_cargo'],
            'fecha_de_ingreso_al_cargo' => ['required', 'date'],
        ];
    }

    /**
     * Mensajes de error personalizados.
     */
    public function messages(): array
    {
        return [
            // Genéricos
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser texto.',
            'max' => 'El campo :attribute no debe superar :max caracteres.',
            'min' => 'El campo :attribute debe tener al menos :min elemento(s).',
            'date' => 'El campo :attribute debe ser una fecha válida.',
            'email' => 'El campo :attribute debe ser un correo válido.',
            'array' => 'El campo :attribute debe ser una lista.',
            'in' => 'El valor seleccionado en :attribute no es válido.',

            // Específicos
            'cedula.unique' => 'Esta cédula ya está registrada en otro empleado.',
            'cedula.max' => 'La cédula no debe superar 8 dígitos.',
            'correo_electronico.email' => 'El formato del correo electrónico es inválido.',
            'fecha_de_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
            'fecha_de_ingreso_al_cargo.after_or_equal' => 'La fecha de ingreso al cargo no puede ser anterior a la fecha de ingreso al plantel.',

            'grado_de_intruccion.required' => 'Debe seleccionar al menos un grado de instrucción.',
            'grado_de_intruccion.min' => 'Debe seleccionar al menos un grado de instrucción.',

            'area_de_trabajo.required' => 'Debe seleccionar al menos un área de trabajo.',
            'area_de_trabajo.min' => 'Debe seleccionar al menos un área de trabajo.',
            'area_de_trabajo.*.exists' => 'Una de las áreas seleccionadas no existe en el catálogo.',
        ];
    }

    /**
     * Nombres legibles para los atributos (aparecen en los mensajes).
     */
    public function attributes(): array
    {
        return [
            'nombres' => 'nombres',
            'apellidos' => 'apellidos',
            'documento' => 'tipo de documento',
            'cedula' => 'cédula',
            'sexo' => 'sexo',
            'fecha_de_nacimiento' => 'fecha de nacimiento',
            'lugar_de_nacimiento' => 'lugar de nacimiento',
            'direccion_de_habitacion' => 'dirección de habitación',
            'parroquia' => 'parroquia',
            'telefono' => 'teléfono',
            'correo_electronico' => 'correo electrónico',
            'grado_de_intruccion' => 'grado de instrucción',
            'profesion' => 'título obtenido',
            'cargo_en_el_perror' => 'cargo en nómina',
            'codigo_del_cargo' => 'código del cargo',
            'dependencia' => 'dependencia',
            'codigo_de_dependencia' => 'código de dependencia',
            'status_del_cargo' => 'status del cargo',
            'condicion_del_cargo' => 'condición del cargo',
            'area_de_trabajo' => 'áreas de asignación',
            'funcion_en_el_plantel' => 'función en el plantel',
            'carga_horaria' => 'carga horaria',
            'fecha_de_ingreso_al_plantel' => 'fecha de ingreso al plantel',
            'fecha_de_ingreso_al_cargo' => 'fecha de ingreso al cargo',
        ];
    }

    /**
     * Preparar los datos antes de validar.
     * Útil para normalizar strings o limpiar campos opcionales.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'nombres' => is_string($this->nombres) ? trim($this->nombres) : $this->nombres,
            'apellidos' => is_string($this->apellidos) ? trim($this->apellidos) : $this->apellidos,
            'cedula' => is_string($this->cedula) ? trim($this->cedula) : $this->cedula,
            'correo_electronico' => is_string($this->correo_electronico)
                ? strtolower(trim($this->correo_electronico))
                : $this->correo_electronico,
        ]);
    }
}
