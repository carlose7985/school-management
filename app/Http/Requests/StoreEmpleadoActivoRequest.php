<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmpleadoActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'cedula' => ['required', 'string', 'max:8', 'unique:empleado_activos,cedula'],
            'documento' => ['nullable', 'string', 'max:20'],
            'sexo' => ['required', Rule::in(['M', 'F'])],
            'fecha_de_nacimiento' => ['required', 'date'],
            'lugar_de_nacimiento' => ['required', 'string', 'max:255'],

            'direccion_de_habitacion' => ['required', 'string', 'max:500'],
            'parroquia' => ['required', 'string', 'max:255'],
            'telefono' => ['required', 'string', 'max:20'],
            'correo_electronico' => ['required', 'email', 'max:255'],

            'grado_de_intruccion' => ['required', 'array', 'min:1'],
            'grado_de_intruccion.*' => ['string', 'max:50'],

            'profesion' => ['required', 'string', 'max:255'],

            'cargo_en_el_perror' => ['required', 'string', 'max:255'],
            'codigo_del_cargo' => ['required', 'string', 'max:255'],
            'dependencia' => ['required', 'string', 'max:255'],
            'codigo_de_dependencia' => ['required', 'string', 'max:255'],

            'tipo_de_personal' => ['required', 'string', 'max:255', 'exists:cargos,nombre_del_cargo'],
            'status_del_cargo' => ['required', Rule::in(['Nacional', 'Estadal', 'Regional'])],
            'condicion_del_cargo' => ['required', Rule::in(['Fijo', 'Contratado'])],

            'area_de_trabajo' => ['required', 'array', 'min:1'],
            'area_de_trabajo.*' => ['string', 'max:255', 'exists:area_trabajos,nombre_del_area'],

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

            'fecha_de_ingreso_al_plantel' => ['required', 'date'],
            'fecha_de_ingreso_al_cargo' => ['required', 'date'],

            'situacion_laboral' => ['nullable', 'string', 'max:255'],
            'status_de_actualizacion' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Campo requerido.',
            'string' => 'Debe ser texto.',
            'date' => 'Fecha inválida.',
            'array' => 'Selección inválida.',
            'max' => 'Máx. :max caracteres.',
            'min' => 'Seleccione al menos :min opción.',
            'in' => 'Valor no permitido.',

            'cedula.unique' => 'Cédula ya registrada.',
            'cedula.max' => 'Máx. 8 dígitos.',
            'correo_electronico.email' => 'Email inválido.',
            'telefono.max' => 'Máx. 20 dígitos.',

            'grado_de_intruccion.required' => 'Seleccione al menos un grado.',
            'area_de_trabajo.required' => 'Seleccione al menos un área.',
            'tipo_de_personal.required' => 'Seleccione un tipo.',
        ];
    }
}
