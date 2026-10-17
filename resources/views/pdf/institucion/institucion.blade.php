<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Ficha de Institución</title>
    <style>
        * {
            margin: 12px;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #1e293b;
            padding: 20px;
        }

        /* ── Encabezado ── */
        .header {
            border-bottom: 3px solid #1e40af;
            padding-bottom: 12px;
            margin-bottom: 20px;
            display: table;
            width: 100%;
        }

        .header-title {
            display: table-cell;
            vertical-align: middle;
        }

        .header-title h1 {
            font-size: 20px;
            color: #1e40af;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }

        .header-title p {
            font-size: 9px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 4px;
        }

        .header-logo {
            display: table-cell;
            width: 80px;
            text-align: right;
            vertical-align: middle;
        }

        /* ── Secciones ── */
        .section {
            margin-bottom: 18px;
            page-break-inside: avoid;
        }

        .section-title {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #1e40af;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
            margin-bottom: 10px;
        }

        /* ── Grid de campos ── */
        table.fields {
            width: 100%;
            border-collapse: collapse;
        }

        table.fields td {
            padding: 5px 8px;
            vertical-align: top;
            border-bottom: 1px solid #f1f5f9;
        }

        .label {
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            width: 40%;
        }

        .value {
            font-size: 11px;
            font-weight: bold;
            color: #0f172a;
        }

        /* ── Pie ── */
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #cbd5e1;
            font-size: 8px;
            color: #94a3b8;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* ── Anchos de columna para layout 2 columnas ── */
        .col-50 {
            width: 50%;
        }

        .col-100 {
            width: 100%;
        }
    </style>
</head>

<body>

    <!-- ENCABEZADO -->
    <div class="header">
        <div class="header-title">
            <h1>{{ $institucion->nombre_de_la_institucion ?? 'Institución Educativa' }}</h1>
            <p>Ficha General de Datos</p>
        </div>
        <div class="header-logo">
            @if($institucion && $institucion->logo)
            <img src="{{ public_path('storage/' . $institucion->logo) }}" style="max-height: 60px; max-width: 70px;">
            @endif
        </div>
    </div>

    <!-- IDENTIDAD LEGAL -->
    <div class="section">
        <div class="section-title">Identidad Legal</div>
        <table class="fields">
            <tr>
                <td class="label">Nombre Oficial</td>
                <td class="value col-50">{{ $institucion->nombre_de_la_institucion ?? '—' }}</td>
                <td class="label">Correo Electrónico</td>
                <td class="value col-50">{{ $institucion->email ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Teléfono</td>
                <td class="value">{{ $institucion->telefono ?? '—' }}</td>
                <td class="label">RIF</td>
                <td class="value">{{ $institucion->rif ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">NIF</td>
                <td class="value">{{ $institucion->nif ?? '—' }}</td>
                <td class="label">Fecha de Fundación</td>
                <td class="value">
                    {{ $institucion && $institucion->fecha_de_fundada
                        ? \Carbon\Carbon::parse($institucion->fecha_de_fundada)->format('d/m/Y')
                        : '—' }}
                    @if($institucion && $institucion->age)
                    ({{ $institucion->age }} años)
                    @endif
                </td>
            </tr>
            <tr>
                <td class="label">Circuito</td>
                <td class="value">{{ $institucion->circuito ?? '—' }}</td>
                <td class="label">Dependencia</td>
                <td class="value">{{ $institucion->dependencia ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Zona Educativa</td>
                <td class="value col-100" colspan="3">{{ $institucion->zona_educativa ?? '—' }}</td>
            </tr>
        </table>
    </div>

    <!-- CÓDIGOS Y ESTRUCTURA -->
    <div class="section">
        <div class="section-title">Códigos y Estructura</div>
        <table class="fields">
            <tr>
                <td class="label">Código DEA</td>
                <td class="value">{{ $institucion->codigo_dea ?? '—' }}</td>
                <td class="label">Cód. Estadístico</td>
                <td class="value">{{ $institucion->codigo_estadistico ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Cód. CENAE</td>
                <td class="value">{{ $institucion->codigo_cenae ?? '—' }}</td>
                <td class="label">Cód. Circuital</td>
                <td class="value">{{ $institucion->codigo_circuito ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Cód. Dependencia</td>
                <td class="value">{{ $institucion->codigo_de_dependencia ?? '—' }}</td>
                <td class="label">Cód. Electoral</td>
                <td class="value">{{ $institucion->codigo_electoral ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Cód. Primaria</td>
                <td class="value">{{ $institucion->codigo_primaria ?? '—' }}</td>
                <td class="label">Aulas</td>
                <td class="value">{{ $institucion->numero_de_aulas ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Otras Aulas</td>
                <td class="value">{{ $institucion->otras_aulas ?? '—' }}</td>
                <td class="label">Secciones</td>
                <td class="value">{{ $institucion->numero_de_secciones ?? '—' }}</td>
            </tr>
        </table>
    </div>

    <!-- UBICACIÓN Y TURNOS -->
    <div class="section">
        <div class="section-title">Ubicación y Turnos</div>
        <table class="fields">
            <tr>
                <td class="label">Dirección Exacta</td>
                <td class="value col-100" colspan="3">{{ $institucion->direccion ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Estado</td>
                <td class="value">{{ $institucion->estado ?? '—' }}</td>
                <td class="label">Municipio</td>
                <td class="value">{{ $institucion->municipio ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Parroquia</td>
                <td class="value">{{ $institucion->parroquia ?? '—' }}</td>
                <td class="label">Comuna</td>
                <td class="value">{{ $institucion->comuna ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Turno</td>
                <td class="value">{{ $institucion->turno ?? '—' }}</td>
                <td class="label">Medio</td>
                <td class="value">{{ $institucion->medio ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Tipo de Escuela</td>
                <td class="value col-100" colspan="3">{{ $institucion->tipo_de_escuela ?? '—' }}</td>
            </tr>
        </table>
    </div>

    <!-- PIE -->
    <div class="footer">
        Generado por EduSystem — {{ date('d/m/Y H:i') }}
    </div>

</body>

</html>