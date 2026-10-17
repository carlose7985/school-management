<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>QR Inmueble</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            padding: 20px;
            text-align: center;
            color: #0f172a;
        }

        .card {
            border: 2px solid #d97706;
            border-radius: 12px;
            padding: 20px;
            background: white;
        }

        .header {
            border-bottom: 2px solid #d97706;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .header h1 {
            font-size: 15px;
            color: #d97706;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }

        .header p {
            font-size: 8px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 4px;
        }

        .qr-wrap {
            background: white;
            padding: 10px;
            display: inline-block;
            margin: 10px 0;
        }

        .qr-wrap img {
            width: 180px;
            height: 180px;
        }

        .info {
            margin-top: 10px;
        }

        .name {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .location {
            font-size: 11px;
            color: #d97706;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .detail {
            font-size: 9px;
            color: #475569;
            margin: 4px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer {
            margin-top: 15px;
            padding-top: 8px;
            border-top: 1px solid #cbd5e1;
            font-size: 7px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    </style>
</head>

<body>
    <div class="card">
        <div class="header">
            <h1>Ficha QR del Inmueble</h1>
            <p>EduSystem</p>
        </div>

        <div class="qr-wrap">
            <img src="{{ $qrBase64 }}" alt="QR">
        </div>

        <!-- <div class="info">
            <div class="name">{{ $inmueble->tipo_de_inmueble }}</div>
            <div class="location">{{ $ubicacionNombre }}</div>

            <div class="detail">
                Dimensiones: {{ $inmueble->largo ?? '—' }} × {{ $inmueble->ancho ?? '—' }} × {{ $inmueble->alto ?? '—' }} m
            </div>
            <div class="detail">Color: {{ $inmueble->color ?? 'N/A' }}</div>
            <div class="detail">Costo Aprox.: $ {{ $inmueble->costo_aproximado ?? 'N/A' }}</div>
            <div class="detail">Cantidad: {{ $inmueble->cantidad }}</div>
            <div class="detail">Condición Legal: {{ $inmueble->condicion_legal }}</div>
        </div> -->

        <div class="footer">
            Generado el {{ date('d/m/Y H:i') }}
        </div>
    </div>
</body>

</html>