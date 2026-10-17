<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Listado de Inmuebles</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 9px;
            color: #0f172a;
            padding: 15px;
        }

        .header {
            border-bottom: 3px solid #d97706;
            padding-bottom: 10px;
            margin-bottom: 15px;
            display: table;
            width: 100%;
        }
        .header-title {
            display: table-cell;
            vertical-align: middle;
        }
        .header-title h1 {
            font-size: 18px;
            color: #d97706;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }
        .header-title p {
            font-size: 8px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 4px;
        }
        .header-meta {
            display: table-cell;
            text-align: right;
            vertical-align: middle;
            font-size: 8px;
            color: #64748b;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
        }
        thead {
            background: #d97706;
            color: white;
        }
        th {
            padding: 7px 5px;
            text-align: left;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid #b45309;
        }
        td {
            padding: 5px;
            border: 1px solid #e2e8f0;
            font-size: 8.5px;
            vertical-align: middle;
        }
        tbody tr:nth-child(even) {
            background: #fef3c7;
        }

        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge-propio { background: #d1fae5; color: #065f46; }
        .badge-prestado { background: #dbeafe; color: #1e40af; }
        .badge-alquilado { background: #fef3c7; color: #92400e; }
        .badge-donado { background: #ede9fe; color: #5b21b6; }

        .text-center { text-align: center; }
        .text-right { text-align: right; }

        .footer {
            margin-top: 20px;
            padding-top: 8px;
            border-top: 1px solid #cbd5e1;
            font-size: 7px;
            color: #94a3b8;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .summary {
            background: #fef3c7;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 10px;
            font-size: 9px;
            font-weight: bold;
            color: #92400e;
        }
    </style>
</head>
<body>

    <!-- Encabezado -->
    <div class="header">
        <div class="header-title">
            <h1>Listado de Inmuebles</h1>
            <p>Inventario General · EduSystem</p>
        </div>
        <div class="header-meta">
            <strong>Fecha:</strong> {{ date('d/m/Y H:i') }}<br>
            <strong>Total:</strong> {{ $inmuebles->count() }} registros
            @if($search)
                <br><strong>Filtro:</strong> "{{ $search }}"
            @endif
        </div>
    </div>

    <!-- Resumen -->
    <div class="summary">
        Total de inmuebles: {{ $inmuebles->count() }} ·
        Cantidad total: {{ $inmuebles->sum('cantidad') }} ·
        Costo aproximado total: $ {{ number_format($inmuebles->sum('costo_aproximado'), 2, ',', '.') }}
    </div>

    <!-- Tabla -->
    <table>
        <thead>
            <tr>
                <th style="width: 4%;">#</th>
                <th style="width: 13%;">Tipo</th>
                <th style="width: 15%;">Ubicación</th>
                <th style="width: 12%;" class="text-center">Dimensiones (m)</th>
                <th style="width: 8%;">Color</th>
                <th style="width: 12%;" class="text-right">Costo ($)</th>
                <th style="width: 6%;" class="text-center">Cant.</th>
                <th style="width: 10%;" class="text-center">Condición</th>
                <th style="width: 12%;">Registrado</th>
            </tr>
        </thead>
        <tbody>
            @forelse($inmuebles as $i => $inmueble)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td><strong>{{ $inmueble->tipo_de_inmueble }}</strong></td>
                    <td>{{ $inmueble->ubicacion_nombre ?? '—' }}</td>
                    <td class="text-center">
                        {{ $inmueble->largo ?? '—' }} ×
                        {{ $inmueble->ancho ?? '—' }} ×
                        {{ $inmueble->alto ?? '—' }}
                    </td>
                    <td>{{ $inmueble->color ?? '—' }}</td>
                    <td class="text-right">
                        {{ $inmueble->costo_aproximado
                            ? number_format($inmueble->costo_aproximado, 2, ',', '.')
                            : '—' }}
                    </td>
                    <td class="text-center">{{ $inmueble->cantidad }}</td>
                    <td class="text-center">
                        <span class="badge badge-{{ strtolower($inmueble->condicion_legal) }}">
                            {{ $inmueble->condicion_legal }}
                        </span>
                    </td>
                    <td>{{ $inmueble->created_at?->format('d/m/Y') ?? '—' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="9" class="text-center" style="padding: 20px; color: #94a3b8;">
                        Sin inmuebles registrados
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Generado por EduSystem · {{ date('d/m/Y H:i') }}
    </div>

</body>
</html>