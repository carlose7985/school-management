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

    $sectionContent .= 'tengo a bien dirigirme a usted en la oportunidad de informarle que acepto ';

    if ($cartadeaceptacion->sexo == 'M') {
    $sectionContent .= 'al ciudadano ';
    }
    if ($cartadeaceptacion->sexo == 'F') {
    $sectionContent .= 'a la ciudadana ';
    }

    $cedulaCompleta = $cartadeaceptacion->documento . $cartadeaceptacion->cedula;

    $sectionContent .= ' <b><u>' . $cartadeaceptacion->nombres . ' ' . $cartadeaceptacion->apellidos . '</u></b>, titular de la cédula de identidad <span style="white-space: nowrap;"><b><u>' . $cedulaCompleta . '</u></b></span> ';
   
   
    $tipoPersonal = trim($cartadeaceptacion->tipo_de_personal);

    // Si es CENAE (en mayúsculas o minúsculas), muestra "Cocinero(a)", de lo contrario muestra el valor original
    $cargoTexto = (strtoupper($tipoPersonal) === 'CENAE') ? 'Cocinero(a)' : $tipoPersonal;

    $sectionContent .= ' para desempeñar funciones de <b><u>' . $cargoTexto . '</u></b> en esta institución.';
    @endphp

    @include('partials.content', ['section' => $sectionContent])

    @include('partials.data_fecha')

    @include('partials.footer_2')

</body>

</html>