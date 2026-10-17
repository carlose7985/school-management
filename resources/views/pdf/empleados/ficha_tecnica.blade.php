<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha empleado</title>


    <style>
        @page {
            margin: 1.0cm 1.5cm 2.0cm 1.5cm;
        }

        #header {

            width: 100%;
            margin-top: 0cm;
            left: 0cm;
        }

        .text-9 {
            font-size: 9pt !important;
        }

        .text-10 {
            font-size: 10pt !important;
        }

        .text-11 {
            font-size: 11pt !important;
            font-family: 'Rock Salt', cursive;
        }

        .text-12 {
            font-size: 12pt !important;
        }

        .text-center {
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .text-right {
            text-align: right;
        }

        table.table-header {
            width: 100%;
            border-collapse: collapse;
            border: none;

        }

        table.table-header-a {
            width: 100%;
            border-collapse: collapse;
            border: none;
            line-height: 0.6cm;
        }

        th,
        td {
            font-size: 10pt;
        }

        table.table-footer {
            width: 100%;
            border-collapse: collapse;
            border: none;
            line-height: 0.5cm;
        }

        table.table-footer2 {
            width: 100%;
            border-collapse: collapse;
            border: none;
            line-height: 0.5cm;
        }

        .image {
            position: relative;
            width: 90px;
            height: 80px;
            float: right;
            top: -45px;
        }

        .color {
            color: #665e52;
        }
    </style>
</head>

<body>
    @php
    // 🎯 Edad (años cumplidos)
    $edad = $empleado->fecha_de_nacimiento
    ? \Carbon\Carbon::parse($empleado->fecha_de_nacimiento)->age
    : null;

    // 🎯 Años de servicio (desde ingreso al cargo)
    $aniosServicio = null;
    if ($empleado->fecha_de_ingreso_al_cargo) {
    $aniosServicio = (int) floor(
    \Carbon\Carbon::parse($empleado->fecha_de_ingreso_al_cargo)
    ->diffInYears(\Carbon\Carbon::now())
    );
    }

    // 🎯 Años en el plantel (desde ingreso al plantel)
    $aniosPlantel = null;
    if ($empleado->fecha_de_ingreso_al_plantel) {
    $aniosPlantel = (int) floor(
    \Carbon\Carbon::parse($empleado->fecha_de_ingreso_al_plantel)
    ->diffInYears(\Carbon\Carbon::now())
    );
    }

    // 🎯 Grado de instrucción (puede ser array o string)
    $gradoInstruccion = $empleado->grado_de_intruccion;
    if (is_array($gradoInstruccion)) {
    $gradoInstruccion = implode(', ', $gradoInstruccion);
    } elseif (is_string($gradoInstruccion) && str_starts_with($gradoInstruccion, '[')) {
    $gradoInstruccion = implode(', ', json_decode($gradoInstruccion, true) ?? []);
    }

    // 🎯 Cargo (puede ser ID o string)
    $cargoNombre = $empleado->tipo_de_personal;
    if (is_numeric($cargoNombre)) {
    $cargo = \App\Models\Cargo::find($cargoNombre);
    $cargoNombre = $cargo?->nombre_del_cargo ?? $cargoNombre;
    }
    @endphp

    <div id="header color">
        <table class="table-header" border="0">
            <tr>
                <td class="text-left" rowspan="3" width="100%"><img src="{{ $globalLogoDocumento ?? '' }}" alt="imagen"
                        width="100%" height="50px" title=""></td>

            </tr>

        </table>


        <table class="table-header-a color" border="0">

            <tr>
                <td class="text-center text-11" width="100%"><b>FICHA DEL EMPLEADO</b></td>
            </tr>

        </table>


    </div>
    <div class="container color">

        <table style="width:100%; border-collapse: collapse; border:1px solid #000; line-height: 0.7cm;">
            <tr>
                <td style="text-align:left; font-size:11pt; width:40%; border:1px solid #000; padding:4px;">
                    <b>Apellidos y Nombres:</b>
                </td>
                <td style="text-align:left; font-size:11pt; width:60%; border:1px solid #000; padding:4px;">
                    {{ $empleado->nombres }} {{ $empleado->apellidos }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Documento de Identidad:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->tipo_documento ?? 'V' }}-{{ $empleado->cedula }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Lugar de Nacimiento:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->lugar_de_nacimiento ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Fecha de Nacimiento:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->fecha_de_nacimiento
                    ? \Carbon\Carbon::parse($empleado->fecha_de_nacimiento)->format('d-m-Y')
                    : '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Edad:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $edad !== null ? $edad . ' años' : '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Sexo:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->sexo === 'M' ? 'Masculino' : ($empleado->sexo === 'F' ? 'Femenino' : '—') }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Dirección de Habitación:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->direccion_de_habitacion ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Parroquia:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->parroquia ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Correo Electrónico:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->correo_electronico ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Teléfono:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->telefono ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Grado de Instrucción:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $gradoInstruccion ?: '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Título Obtenido:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->profesion ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Status Laboral:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->situacion_laboral ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Cargo:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $cargoNombre ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Código del Cargo:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->codigo_del_cargo ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Carga Horaria:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->carga_horaria ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Asignación en el Plantel:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->funcion_en_el_plantel ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Dependencia:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->dependencia ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Código de Dependencia:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->codigo_de_dependencia ?? '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Condición del Cargo:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->condicion_del_cargo ?? '—' }} {{ $empleado->status_del_cargo ?? '' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Ingreso al MPPE:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->fecha_de_ingreso_al_cargo
                    ? \Carbon\Carbon::parse($empleado->fecha_de_ingreso_al_cargo)->format('d-m-Y')
                    : '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Ingreso al Plantel:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    {{ $empleado->fecha_de_ingreso_al_plantel
                    ? \Carbon\Carbon::parse($empleado->fecha_de_ingreso_al_plantel)->format('d-m-Y')
                    : '—' }}
                </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Años de Servicio:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    @if($aniosServicio === null)
                    —
                    @elseif($aniosServicio < 1)
                        Menos de un año
                        @elseif($aniosServicio==1)
                        1 año
                        @else
                        {{ $aniosServicio }} años
                        @endif
                        </td>
            </tr>

            <tr>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    <b>Años en el Plantel:</b>
                </td>
                <td style="text-align:left; font-size:11pt; border:1px solid #000; padding:4px;">
                    @if($aniosPlantel === null)
                    —
                    @elseif($aniosPlantel < 1)
                        Menos de un año
                        @elseif($aniosPlantel==1)
                        1 año
                        @else
                        {{ $aniosPlantel }} años
                        @endif
                        </td>
            </tr>
        </table>
    </div>
</body>

</html>