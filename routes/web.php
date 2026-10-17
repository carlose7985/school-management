<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'dashboard' : 'login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});


// ════════════════════════════════════════════════════════
// MÓDULO: DATOS BÁSICOS
// ════════════════════════════════════════════════════════
Route::middleware(['auth', 'verified'])
    ->prefix('datos/basicos')
    ->name('configuraciones.')
    ->group(function () {
        Route::get('/', fn() => Inertia::render('DatosBasicos/Rutas/Index'))->name('index');

        // Institución
        Route::prefix('institucion')->name('institucion.')->group(function () {
            Route::get('/', [\App\Http\Controllers\DatosBasicos\InstitucionController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\InstitucionController::class, 'store'])->name('store');
            Route::get('/imprimir', [\App\Http\Controllers\DatosBasicos\InstitucionController::class, 'imprimir'])->name('imprimir');
        });

        // Inmuebles
        Route::prefix('inmuebles')->name('inmuebles.')->group(function () {
            Route::get('/export/pdf', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'exportPdf'])->name('exportPdf');
            Route::get('/export/excel', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'exportExcel'])->name('exportExcel');
            Route::get('/', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'store'])->name('store');
            Route::put('/{inmueble}', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'update'])->name('update');
            Route::delete('/{inmueble}', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'destroy'])->name('destroy');
            Route::get('/{inmueble}/qr', [\App\Http\Controllers\DatosBasicos\InmueblesController::class, 'imprimirQr'])->name('qr');
        });

        // Grados
        Route::prefix('grados')->name('grados.')->group(function () {
            Route::get('/', [\App\Http\Controllers\DatosBasicos\GradosController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\GradosController::class, 'store'])->name('store');
            Route::put('/{grado}', [\App\Http\Controllers\DatosBasicos\GradosController::class, 'update'])->name('update');
            Route::post('/{grado}/toggle', [\App\Http\Controllers\DatosBasicos\GradosController::class, 'toggle'])->name('toggle');
            Route::get('/{grado}/qr', [\App\Http\Controllers\DatosBasicos\GradosController::class, 'imprimirQr'])->name('qr');
        });

        // Áreas de Trabajo
        Route::prefix('areas')->name('areas.')->group(function () {
            Route::post('/store/fast', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'storeFast'])->name('storeFast');
            Route::get('/list/active', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'listActive'])->name('listActive');
            Route::get('/', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'store'])->name('store');
            Route::put('/{area}', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'update'])->name('update');
            Route::post('/{area}/toggle', [\App\Http\Controllers\DatosBasicos\AreaTrabajoController::class, 'toggle'])->name('toggle');
        });

        // Logos
        Route::prefix('logos')->name('logos.')->group(function () {
            Route::get('/', [\App\Http\Controllers\DatosBasicos\LogosController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\LogosController::class, 'store'])->name('store');
            Route::delete('/', [\App\Http\Controllers\DatosBasicos\LogosController::class, 'destroy'])->name('destroy');
        });

        // Días Festivos
        Route::prefix('festivos')->name('festivos.')->group(function () {
            Route::post('/store/fast', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'storeFast'])->name('storeFast');
            Route::get('/list/active', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'listActive'])->name('listActive');
            Route::get('/', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'store'])->name('store');
            Route::put('/{festivo}', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'update'])->name('update');
            Route::delete('/{festivo}', [\App\Http\Controllers\DatosBasicos\DiaFestivoController::class, 'destroy'])->name('destroy');
        });

        // Apreciaciones
        Route::prefix('apreciaciones')->name('apreciaciones.')->group(function () {
            Route::post('/store/fast', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'storeFast'])->name('storeFast');
            Route::get('/list/active', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'listActive'])->name('listActive');
            Route::get('/', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'store'])->name('store');
            Route::put('/{apreciacion}', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'update'])->name('update');
            Route::delete('/{apreciacion}', [\App\Http\Controllers\DatosBasicos\ApreciacionController::class, 'destroy'])->name('destroy');
        });

        // Cargos
        Route::prefix('cargos')->name('cargos.')->group(function () {
            Route::post('/store/fast', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'storeFast'])->name('storeFast');
            Route::get('/list/active', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'listActive'])->name('listActive');
            Route::get('/', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'store'])->name('store');
            Route::put('/{cargo}', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'update'])->name('update');
            Route::post('/{cargo}/toggle', [\App\Http\Controllers\DatosBasicos\CargosController::class, 'toggle'])->name('toggle');
        });
    });



// ════════════════════════════════════════════════════════
// MÓDULO: EMPLEADOS
// ════════════════════════════════════════════════════════
Route::middleware(['auth', 'verified'])
    ->prefix('empleados')
    ->name('empleados.')
    ->group(function () {
        // Empleados Activos
        Route::prefix('activos')->name('activos.')->group(function () {
            // Index (cards)
            Route::get('/', fn() => Inertia::render('Empleados/Rutas/RutasActivosIndex'))->name('index');

            // Cartas de Aceptación
            Route::prefix('cartas')->name('cartas.')->group(function () {
                Route::get('/', [\App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::class, 'index'])->name('index');
                Route::post('/', [\App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::class, 'store'])->name('store');
                Route::put('/{carta}', [\App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::class, 'update'])->name('update');
                Route::delete('/{carta}', [\App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::class, 'destroy'])->name('destroy');
                Route::get('/{carta}/imprimir', [\App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::class, 'imprimir'])->name('imprimir');
            });

            // Listado General
            Route::prefix('listado')->name('listado.')->group(function () {
                Route::get('/', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'index'])->name('index');
                Route::get('/create', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'create'])->name('create');
                Route::get('/show/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'show'])->name('show');
                Route::get('/edit/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'edit'])->name('edit');
                Route::post('/store', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'store'])->name('store');
                Route::put('/update/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'update'])->name('update');
                Route::post('/retirar/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'retirar'])->name('retirar');
                Route::post('/toggle-situacion/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'toggleSituacion'])->name('toggleSituacion');
                Route::post('/cargo/{empleado}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'updateCargo'])->name('updateCargo');
                Route::post('/foto/{id}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'updateFoto'])->name('foto');
                Route::get('/carnet/{id}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'carnet'])->name('carnet');
                Route::get('/check/{empleadoId}', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'check'])->name('destinos.empleados.check');
                Route::post('/storeDestino', [\App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::class, 'storeDestino'])->name('destinos.empleados.storeDestino');
            });

            // Permisos
            Route::prefix('permisos')->name('permisos.')->group(function () {
                Route::get('/', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'index'])->name('index');
                Route::get('/check', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'check'])->name('check');
                Route::get('/vencidos', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'permisosVencidos'])->name('vencidos');
                Route::post('/', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'store'])->name('store');
                Route::post('/{permiso}/procesar-vencido', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'procesarVencido'])->name('procesarVencido');
                Route::put('/{permiso}', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'update'])->name('update');
                Route::delete('/{permiso}', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'destroy'])->name('destroy');
                Route::post('/{permiso}/toggle', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'toggle'])->name('toggle');
                Route::get('/reporte/general', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'reporteGeneral'])->name('reporte.general');
                Route::get('/reporte/individual/{empleadoId}', [\App\Http\Controllers\Empleados\Permisos\PermisosController::class, 'reporteIndividual'])->name('reporte.individual');
            });
            // Notificaciones
            Route::prefix('notificaciones')->name('notificaciones.')->group(function () {
                Route::get('/', [\App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::class, 'index'])->name('index');
                Route::get('/resumen', [\App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::class, 'resumen'])->name('resumen');
                Route::get('/{id}/pdf', [\App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::class, 'notificacionPdf'])->name('pdf');
            });
        });

    // ════════════════════════════════════════════════════════
    // EMPLEADOS RETIRADOS
    // ════════════════════════════════════════════════════════
    Route::prefix('retirados')->name('retirados.')->group(function () {
        Route::get('/listado', [\App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::class, 'index'])->name('listado.index');
        Route::post('/reactivar/{empleado}', [\App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::class, 'reactivar'])->name('reactivar');
        Route::get('/historial/{empleado}', [\App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::class, 'historialAsistencia'])->name('historial');
        Route::get('/show/{empleado}', [\App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::class, 'show'])->name('show');
    });

    // ════════════════════════════════════════════════════════
    // ACCIONES GENERALES
    // ════════════════════════════════════════════════════════
    Route::prefix('acciones')->name('acciones.')->group(function () {

        // Hub principal (cards)
        Route::get('/', fn() => Inertia::render('Empleados/Acciones/Rutas/RutasAccionesIndex'))
            ->name('index');

        // ─── CENTRO DE IMPRESIONES (sub-hub) ───
        Route::prefix('impresiones')->name('impresiones.')->group(function () {
            Route::get('/', fn() => Inertia::render('Empleados/Acciones/Impresiones/Index'))
                ->name('index');

            // Aquí irán los controladores reales luego:
            // Route::get('/constancias', [ImpresionesController::class, 'constancias'])->name('constancias');
            // Route::get('/carnets', [ImpresionesController::class, 'carnets'])->name('carnets');
        });

        // ─── Placeholders (se construirán después) ───
        $placeholders = [
            'wifi'                 => ['Control WiFi',            'Infraestructura'],
            'docentes-guardia'     => ['Docentes Guardia',        'Supervisión de patio'],
            'vigilantes-guardia'   => ['Vigilantes Guardia',      'Seguridad'],
            'evaluaciones'         => ['Evaluaciones',            'Sistema'],
            'pagos'                => ['Acciones de Pago',        'Pagos'],
            'tallas-profesiones'   => ['Tallas y Profesiones',    'Control de datos'],
            'por-asignar'          => ['Por Asignar',             'Estadísticas'],
            'modulo-9'             => ['Módulo Disponible',       'Próximamente'],
            'modulo-10'            => ['Módulo Disponible',       'Próximamente'],
        ];

        foreach ($placeholders as $slug => [$title, $subtitle]) {
            Route::get("/{$slug}", fn() => Inertia::render('Empleados/Acciones/ComingSoon', [
                'title'    => $title,
                'subtitle' => $subtitle,
            ]))->name(\Illuminate\Support\Str::camel($slug));
        }
    }); });

// ════════════════════════════════════════════════════════
// EXPORTACIÓN DE DOCUMENTOS PDF - EMPLEADOS
// ════════════════════════════════════════════════════════
Route::middleware(['auth', 'verified'])
    ->prefix('export/empleados')
    ->name('export.empleados.')
    ->group(function () {
        Route::post('/documento', [
            \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::class,
            'exportDocumento',
        ])->name('documento');
    });

// ════════════════════════════════════════════════════════
// MÓDULO: ASISTENCIAS Y REPORTES
// ════════════════════════════════════════════════════════
Route::middleware(['auth', 'verified'])
    ->prefix('asistencias')
    ->name('asistencias.')
    ->group(function () {
        // Vista principal (cards de subrutas)
        Route::get('/', fn() => Inertia::render('Asistencias/Rutas/AsistenciasIndex'))->name('index');

        // ─── EMPLEADOS ───
        Route::prefix('empleados')->name('empleados.')->group(function () {
            Route::get('/', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'index'])->name('index');
            Route::get('/cargo/{cargoId}', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'cargo'])->name('cargo');
            Route::post('/guardar', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'guardar'])->name('guardar');
            Route::get('/dias-sin-registro/{cargoId}', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'diasSinRegistro'])->name('diasSinRegistro');
            Route::post('/guardar-festivos', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'guardarFestivos'])->name('guardarFestivos');
            // 🎯 NUEVAS
            Route::get('/pre-asistencia/{cargoId}', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'preAsistencia'])->name('preAsistencia');
            Route::post('/guardar-pre-asistencia', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'guardarPreAsistencia'])->name('guardarPreAsistencia');
            Route::get('/listados-disponibles', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'listadosDisponibles'])->name('listadosDisponibles');
            Route::get('/generar-listado', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'generarListado'])->name('generarListado');

            // 📝 ACTUALIZAR ASISTENCIA (corrección manual)
            Route::get('/actualizar-asistencia', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'actualizarIndex'])->name('actualizarIndex');
            Route::get('/actualizar-asistencia/buscar', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'buscarEmpleados'])->name('buscarEmpleados');
            Route::post('/actualizar-asistencia/actualizar', [\App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::class, 'actualizarAsistenciaManual'])->name('actualizarAsistenciaManual');
        });

        // Otras subrutas (placeholders por ahora)
        Route::get('/estudiantes', fn() => Inertia::render('Asistencias/Estudiantes/Index'))->name('estudiantes');
        Route::get('/whatsapp', fn() => Inertia::render('Asistencias/WhatsApp/Index'))->name('whatsapp');
        Route::get('/pdf', fn() => Inertia::render('Asistencias/PDF/Index'))->name('pdf');
        Route::get('/excel', fn() => Inertia::render('Asistencias/Excel/Index'))->name('excel');
    });

require __DIR__ . '/settings.php';
