<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>QR Grado</title>
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
            border: 2px solid #1e40af;
            border-radius: 12px;
            padding: 20px;
            background: white;
        }

        .header {
            border-bottom: 2px solid #1e40af;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .header h1 {
            font-size: 16px;
            color: #1e40af;
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

        .grade-name {
            font-size: 18px;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .section-name {
            font-size: 12px;
            color: #1e40af;
            text-transform: uppercase;
            letter-spacing: 3px;
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
            <h1>Ficha QR del Grado</h1>
            <p>EduSystem</p>
        </div>

        <div class="qr-wrap">
            {{-- ✅ AHORA: QR generado localmente como base64 --}}
            <img src="{{ $qrBase64 }}" alt="QR del Grado" style="width: 180px; height: 180px;">
        </div>

        <!-- <div class="info">
            <div class="grade-name">{{ $grado->nombre_del_grado }}</div>
            <div class="section-name">Sección {{ $grado->seccion }}</div>

            <div class="detail">
                Docentes:
                {{ $docentes->isNotEmpty()
                    ? $docentes->map(fn($d) => $d->nombres . ' ' . $d->apellidos)->implode(' • ')
                    : 'Sin asignar' }}
            </div>

            <div class="detail">Límite: {{ $grado->limite_de_estudiantes }} estudiantes</div>
            <div class="detail">Estado: {{ $grado->status ? 'Activo' : 'Inactivo' }}</div>
        </div> -->

        <div class="footer">
            Generado el {{ date('d/m/Y H:i') }}
        </div>
    </div>

</body>

</html>