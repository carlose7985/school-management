<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Permisos Eventuales</title>
    <style>
        @page {
            margin: 1cm 1.5cm 1.5cm 1.5cm;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 10px;
            color: #1e293b;
        }

        .header-table {
            width: 100%;
            border: none;
            margin-bottom: 10px;
        }

        .header-table td {
            border: none;
            vertical-align: top;
        }

        .header-title {
            text-align: center;
            font-weight: bold;
            font-size: 11px;
            line-height: 1.4;
        }

        .header-inst {
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            margin-top: 5px;
        }

        .doc-title {
            text-align: center;
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            margin: 15px 0;
            padding: 8px 0;
            border-top: 2px solid #1e40af;
            border-bottom: 2px solid #1e40af;
            color: #1e40af;
        }

        .info-block {
            width: 100%;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 8px 12px;
            margin-bottom: 15px;
            background: #f8fafc;
        }

        .info-block table {
            width: 100%;
            border: none;
        }

        .info-block td {
            border: none;
            padding: 2px 0;
            font-size: 10px;
        }

        .info-label {
            font-weight: bold;
            color: #64748b;
            text-transform: uppercase;
            font-size: 9px;
        }

        .info-value {
            color: #0f172a;
            font-weight: bold;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .data-table th {
            background: #1e40af;
            color: #ffffff;
            padding: 6px 8px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid #1e40af;
        }

        .data-table td {
            border: 1px solid #cbd5e1;
            padding: 6px 8px;
            font-size: 9px;
            vertical-align: top;
        }

        .data-table tr:nth-child(even) td {
            background: #f8fafc;
        }

        .data-table .center {
            text-align: center;
        }

        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge-activo {
            background: #dcfce7;
            color: #15803d;
        }

        .badge-vencido {
            background: #e2e8f0;
            color: #475569;
        }

        .badge-procesando {
            background: #fef3c7;
            color: #92400e;
        }

        .total-row {
            margin-top: 15px;
            padding: 8px 12px;
            background: #f1f5f9;
            border-left: 4px solid #1e40af;
            font-size: 10px;
        }

        .firma-block {
            margin-top: 60px;
            text-align: center;
        }

        .firma-line {
            width: 250px;
            border-top: 1px solid #334155;
            margin: 0 auto 5px;
        }

        .firma-label {
            font-size: 10px;
            font-weight: bold;
        }

        .firma-nombre {
            font-size: 9px;
            margin-top: 3px;
        }

        .empty-msg {
            padding: 40px 0;
            text-align: center;
            font-style: italic;
            color: #94a3b8;
            font-size: 11px;
        }

        .footer-meta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 8px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    {{-- HEADER --}}
    <table class="header-table">
        <tr>
            <td style="width: 80%; text-align: left;">
                <img src="{{ $globalLogoDocumento ?? '' }}" style="max-width: 100%; height: 50px;" alt="Logo">
            </td>
            <td style="width: 20%; text-align: right;">
                <img src="{{ $globalLogoInstitucion ?? '' }}" style="max-width: 100%; height: 50px;" alt="Escudo">
            </td>
        </tr>
    </table>

    <div class="header-title">
        REPÚBLICA BOLIVARIANA DE VENEZUELA<br>
        MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN
    </div>

    <div class="header-inst">
        {{ strtoupper($globalInstitucion->nombre_de_la_institucion ?? 'INSTITUCIÓN EDUCATIVA') }}
    </div>

    {{-- TÍTULO --}}
    <div class="doc-title">
        @if($empleado)
            Reporte de Permisos Eventuales — Individual
        @else
            Reporte General de Permisos Eventuales
        @endif
    </div>

    {{-- INFO DEL EMPLEADO (solo si es individual) --}}
    @if($empleado)
        <div class="info-block">
            <table>
                <tr>
                    <td style="width: 50%;">
                        <span class="info-label">Empleado:</span>
                        <span class="info-value">{{ $empleado->nombres }} {{ $empleado->apellidos }}</span>
                    </td>
                    <td style="width: 50%;">
                        <span class="info-label">Cédula:</span>
                        <span class="info-value">{{ ($empleado->documento ?? 'V-') . $empleado->cedula }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="info-label">Cargo:</span>
                        <span class="info-value">{{ $empleado->cargo_nombre }}</span>
                    </td>
                    <td>
                        <span class="info-label">Situación:</span>
                        <span class="info-value">{{ $empleado->situacion_laboral }}</span>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    {{-- INFO DEL REPORTE --}}
    <div class="info-block">
        <table>
            <tr>
                <td style="width: 50%;">
                    <span class="info-label">Período del reporte:</span>
                    <span class="info-value">
                        {{ $desde ? \Carbon\Carbon::parse($desde)->format('d/m/Y') : 'Inicio' }}
                        —
                        {{ $hasta ? \Carbon\Carbon::parse($hasta)->format('d/m/Y') : 'Actualidad' }}
                    </span>
                </td>
                <td style="width: 50%;">
                    <span class="info-label">Filtro de estado:</span>
                    <span class="info-value">{{ $statusFiltro ?? 'Todos' }}</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span class="info-label">Fecha de emisión:</span>
                    <span class="info-value">{{ $fechaEmision }}</span>
                </td>
            </tr>
        </table>
    </div>

    {{-- TABLA DE DATOS --}}
    @if($permisos->count() > 0)
        <table class="data-table">
            <thead>
                <tr>
                    @if(!$empleado)
                        <th style="width: 25%;">Empleado</th>
                        <th style="width: 12%;">Cédula</th>
                    @endif
                    <th style="{{ $empleado ? 'width: 15%;' : 'width: 12%;' }}">F. Registro</th>
                    <th style="{{ $empleado ? 'width: 15%;' : 'width: 12%;' }}">Motivo</th>
                    <th style="{{ $empleado ? 'width: 30%;' : 'width: 22%;' }}">Período</th>
                    <th style="width: 15%;">Estado</th>
                </tr>
            </thead>
            <tbody>
                @foreach($permisos as $permiso)
                    <tr>
                        @if(!$empleado)
                            <td>{{ $permiso->empleado->nombres ?? '—' }} {{ $permiso->empleado->apellidos ?? '' }}</td>
                            <td>{{ ($permiso->empleado->documento ?? 'V-') . ($permiso->empleado->cedula ?? '') }}</td>
                        @endif
                        <td class="center">{{ \Carbon\Carbon::parse($permiso->fecha_registro)->format('d/m/Y') }}</td>
                        <td>{{ $permiso->descripcion }}</td>
                        <td class="center">
                            {{ \Carbon\Carbon::parse($permiso->fecha_de_inicio)->format('d/m/Y') }}
                            al
                            {{ \Carbon\Carbon::parse($permiso->fecha_final)->format('d/m/Y') }}
                        </td>
                        <td class="center">
                            @if($permiso->status === 'Activo')
                                <span class="badge badge-activo">Activo</span>
                            @elseif($permiso->status === 'Procesando')
                                <span class="badge badge-procesando">Procesando</span>
                            @else
                                <span class="badge badge-vencido">Vencido</span>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="total-row">
            <strong>Total de permisos registrados:</strong> {{ $permisos->count() }}
        </div>
    @else
        <div class="empty-msg">
            No se encontraron permisos eventuales con los filtros seleccionados.
        </div>
    @endif

    {{-- FIRMA --}}
    <div class="firma-block">
        <div class="firma-line"></div>
        <div class="firma-label">Director(a)</div>
        @if($directorData)
            <div class="firma-nombre">{{ $directorData->nombre_y_apellido }}</div>
            <div class="firma-nombre">C.I: {{ $directorData->cedula }}</div>
        @endif
    </div>

    <div class="footer-meta">
        Generado el {{ $fechaEmision }} · Sistema de Gestión Escolar
    </div>

</body>
</html>