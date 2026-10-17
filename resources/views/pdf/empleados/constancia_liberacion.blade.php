<!DOCTYPE html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }}</title>
    <style>
        @page {
            margin: 1.5cm 2.0cm 1.5cm 2.0cm;
        }
    </style>

</head>

<body>

    @php

    $sectionTitle = $title;

    @endphp

    @include('partials.header' , ['section_title' => $sectionTitle])

    @php

    $sectionContent = ' ';

    $sectionContent .= ' hace constar por medio de la presente que ';

    if ($empleado->sexo == 'M') {
    $sectionContent .= 'el ciudadano ';
    }
    if ($empleado->sexo == 'F') {
    $sectionContent .= 'la ciudadana ';
    }

    $sectionContent .= ' <b><u>' . $empleado->nombres . ' ' . $empleado->apellidos . '</b></u>,
    titular de la cédula de identidad <span style="white-space: nowrap;"><b><u>' . $empleado->documento . $empleado->cedula . '</b></u></span> ';

    $sectionContent .= 'ejercia el cargo como personal ' . '<b><u>' . $empleado->cargo_nombre . ' </b></u> ';
    
    $sectionContent .= 'con funciones de ' . '<b><u>' . $empleado->funcion_en_el_plantel . ' </b></u> ';

    $sectionContent .= 'en esta institución, y a partir de la siguiente fecha: ' . '<b><u>' . $empleado->updated_at->format('d/m/Y') . ' </b></u> ' . 'queda';

    if ($empleado->sexo == 'M') {
    $sectionContent .= ' LIBERADO ';
    } elseif ($empleado->sexo == 'F') {
    $sectionContent .= ' LIBERADA ';
    }


    $sectionContent .= ' de sus funciones, para ejercer en la siguiente institución: '
    . '<b><u>' . $destino . '</u></b>.';

    @endphp

    @include('partials.content', ['section' => $sectionContent])

    @include('partials.data_fecha')

    @include('partials.footer_2')

</body>

</html>