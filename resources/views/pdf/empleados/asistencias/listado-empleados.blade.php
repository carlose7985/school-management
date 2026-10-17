<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Listado de Empleados</title>
    <style>
        @page {
            margin: 2cm 1.5cm 2cm 1.5cm;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 10pt;
            color: #0f172a;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 16pt;
            color: #1e40af;
            text-transform: uppercase;
            margin: 0;
        }

        .header h2 {
            font-size: 12pt;
            color: #334155;
            margin: 4px 0;
            font-weight: normal;
        }

        .header p {
            font-size: 9pt;
            color: #64748b;
            margin: 2px 0;
        }

        .title {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 20px 0;
            padding: 8px 0;
            border-top: 1px solid #cbd5e1;
            border-bottom: 1px solid #cbd5e1;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th {
            background: #1e40af;
            color: white;
            font-size: 9pt;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 8px 6px;
            text-align: left;
            border: 1px solid #1e3a8a;
        }

        td {
            font-size: 9pt;
            padding: 6px;
            border: 1px solid #e2e8f0;
        }

        tbody tr:nth-child(even) {
            background: #f8fafc;
        }

        .text-center {
            text-align: center;
        }

        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #cbd5e1;
            text-align: center;
            font-size: 8pt;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $institucion->nombre_de_la_institucion ?? 'Institución' }}</h1>
        @if($institucion)
        <h2>Dirección: {{ $institucion->direccion ?? 'N/A' }}</h2>
        <p>Teléfono: {{ $institucion->telefono ?? 'N/A' }} | Email: {{ $institucion->email ?? 'N/A' }}</p>
        @endif
    </div>

    <div class="title">
        Listado de Empleados — {{ $cargoNombre }}
    </div>

    <p style="text-align: right; font-size: 9pt; color: #64748b;">
        Fecha de Emisión: {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}
        | Total: {{ $empleados->count() }} empleados
    </p>

    <table>
        <thead>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 35%;">Nombres y Apellidos</th>
                <th style="width: 15%;">Cédula</th>
                <th style="width: 25%;">Cargo</th>
                <th style="width: 20%;">Función</th>
            </tr>
        </thead>
        <tbody>
            @forelse($empleados as $i => $emp)
            <tr>
                <td class="text-center">{{ $i + 1 }}</td>
                <td>{{ $emp->nombres }} {{ $emp->apellidos }}</td>
                <td>{{ $emp->cedula }}</td>
                <td>{{ $emp->tipo_de_personal ?? '—' }}</td>
                <td>{{ $emp->funcion_en_el_plantel ?? '—' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="5" class="text-center" style="padding: 20px; color: #94a3b8; font-style: italic;">
                    Sin empleados
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Generado por el Sistema de Gestión Escolar
    </div>
</body>

</html>