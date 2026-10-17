<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'DejaVu Sans', 'Segoe UI', Arial, sans-serif;
        }

        body {
            width: 600px;
            height: 1000px;
            background: #f1f5f9;
            padding: 30px;
        }

        .card {
            width: 540px;
            height: 940px;
            background: #ffffff;
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
            position: relative;
        }

        /* ═══ HEADER CON GRADIENTE ═══ */
        .header {
            height: 200px;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
            padding: 28px 32px;
            color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        /* Círculos decorativos de fondo */
        .header::before {
            content: '';
            position: absolute;
            top: -80px;
            right: -60px;
            width: 220px;
            height: 220px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
        }

        .header::after {
            content: '';
            position: absolute;
            bottom: -100px;
            left: -50px;
            width: 180px;
            height: 180px;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 50%;
        }

        .header-top {
            display: flex;
            align-items: center;
            gap: 16px;
            position: relative;
            z-index: 2;
        }

        .logo-box {
            width: 72px;
            height: 72px;
            background: #ffffff;
            border-radius: 16px;
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            flex-shrink: 0;
        }

        .logo-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .header-text {
            flex: 1;
        }

        .header-title {
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.3px;
            line-height: 1.15;
            margin-bottom: 6px;
        }

        .header-subtitle {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.85;
        }

        .header-badge {
            position: absolute;
            bottom: 24px;
            left: 32px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            z-index: 2;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.3);
        }

        /* ═══ CUERPO ═══ */
        .body {
            padding: 40px 32px 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: calc(940px - 200px);
        }

        /* ═══ QR ═══ */
        .qr-wrapper {
            width: 260px;
            height: 260px;
            padding: 14px;
            background: #ffffff;
            border: 3px solid #e2e8f0;
            border-radius: 24px;
            box-shadow: 0 12px 30px rgba(30, 64, 175, 0.12);
            position: relative;
            margin-bottom: 32px;
        }

        .qr-wrapper::before {
            content: '';
            position: absolute;
            top: -6px;
            left: -6px;
            right: -6px;
            bottom: -6px;
            border-radius: 28px;
            background: linear-gradient(135deg, #1e40af, #06b6d4);
            z-index: -1;
            opacity: 0.15;
        }

        .qr-wrapper img {
            width: 100%;
            height: 100%;
            display: block;
        }

        /* ═══ NOMBRE ═══ */
        .nombre {
            font-size: 26px;
            font-weight: 900;
            color: #0f172a;
            text-align: center;
            text-transform: uppercase;
            line-height: 1.15;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
        }

        .cedula {
            font-size: 18px;
            font-weight: 800;
            color: #1e40af;
            letter-spacing: 3px;
            margin-bottom: 24px;
            font-family: 'Courier New', monospace;
        }

        /* ═══ DIVIDER ═══ */
        .divider {
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #1e40af, #06b6d4);
            border-radius: 2px;
            margin-bottom: 28px;
        }

        /* ═══ INFO ═══ */
        .info-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
        }

        .info-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 20px;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #1e40af;
        }

        .info-label {
            font-size: 10px;
            font-weight: 900;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        .info-value {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            text-align: right;
            max-width: 60%;
        }

        /* ═══ ID DEL QR ═══ */
        .qr-id {
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 22px;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            border-radius: 16px;
            color: #ffffff;
            width: 100%;
            box-shadow: 0 10px 24px rgba(30, 64, 175, 0.25);
        }

        .qr-id-icon {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
        }

        .qr-id-content {
            flex: 1;
            min-width: 0;
        }

        .qr-id-label {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.75;
            margin-bottom: 2px;
        }

        .qr-id-value {
            font-size: 13px;
            font-weight: 900;
            letter-spacing: 0.8px;
            font-family: 'Courier New', monospace;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* ═══ FOOTER BAR ═══ */
        .footer-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #1e40af);
        }
    </style>
</head>

<body>
    <div class="card">
        <!-- HEADER -->
        <div class="header">
            <div class="header-top">
                <div class="logo-box">
                    <img src="{{ $logoInstitucion }}" alt="Logo">
                </div>
                <div class="header-text">
                    <div class="header-title">
                        {{ $institucion->nombre_de_la_institucion ?? 'Institución Educativa' }}
                    </div>
                    <div class="header-subtitle">
                        Carnet de Identificación
                    </div>
                </div>
            </div>

            <div class="header-badge">
                <span class="status-dot"></span>
                Personal Activo
            </div>
        </div>

        <!-- BODY -->
        <div class="body">
            <!-- QR -->
            <div class="qr-wrapper">
                <img src="{{ $qrBase64 }}" alt="QR">
            </div>

            <!-- NOMBRE -->
            <div class="nombre">
                {{ $empleado->nombres }}<br>{{ $empleado->apellidos }}
            </div>
            <div class="cedula">
                {{ $empleado->documento }}{{ $empleado->cedula }}
            </div>

            <!-- DIVIDER -->
            <div class="divider"></div>

            <!-- INFO -->
            <div class="info-container">
                <div class="info-row">
                    <span class="info-label">Cargo</span>
                    <span class="info-value">{{ $empleado->cargo_nombre }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Dependencia</span>
                    <span class="info-value">{{ $empleado->dependencia ?? '—' }}</span>
                </div>
            </div>

            <!-- ID DEL QR -->
            <div class="qr-id">
                <div class="qr-id-icon">🔐</div>
                <div class="qr-id-content">
                    <div class="qr-id-label">ID de Asistencia</div>
                    <div class="qr-id-value">{{ $empleado->codigo_qr }}</div>
                </div>
            </div>
        </div>

        <div class="footer-bar"></div>
    </div>
</body>

</html>