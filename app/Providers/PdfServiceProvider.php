<?php

namespace App\Providers;

use App\Models\EmpleadoActivo;
use App\Models\Institucion;
use App\Models\Logo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class PdfServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Configurar idioma español para Carbon a nivel global en este provider
        Carbon::setLocale('es');

        // Inyecta datos globalmente a todas las vistas dentro de 'pdf.*'
        View::composer('pdf.*', function ($view) {

            // 1. Obtener Director
            $director = EmpleadoActivo::where('funcion_en_el_plantel', 'like', '%Director%')->first()
                ?? EmpleadoActivo::first();

            // Formatear solo Primer Nombre y Primer Apellido
            $primerNombre = '';
            $primerApellido = '';

            if ($director) {
                // Separa los nombres por espacio y toma el primero
                $nombresArr = explode(' ', trim($director->nombres));
                $primerNombre = $nombresArr[0] ?? '';

                // Separa los apellidos por espacio y toma el primero
                $apellidosArr = explode(' ', trim($director->apellidos));
                $primerApellido = $apellidosArr[0] ?? '';
            }

            // 🎯 Grado de instrucción del director (es multiselect → array o string JSON)
            $gradosDirector = [];
            if ($director && $director->grado_de_intruccion) {
                $g = $director->grado_de_intruccion;

                if (is_array($g)) {
                    $gradosDirector = $g;
                } elseif (is_string($g) && str_starts_with(trim($g), '[')) {
                    // Viene como JSON string
                    $gradosDirector = json_decode($g, true) ?? [];
                } elseif (is_string($g) && trim($g) !== '') {
                    // Viene como string simple: "MSc."
                    $gradosDirector = [trim($g)];
                }
            }

            // 🎯 Grado principal (el primero) y todos separados por coma
            $gradoPrincipalDirector = $gradosDirector[0] ?? '';
            $gradosCompletoDirector = implode(' ', $gradosDirector);

            // 2. Datos de la Institución
            $institucion = Institucion::first();

            // 3. Logos de la Institución
            $logo = Logo::first();

            $logoDocumento = ($logo && $logo->logo_documentos && Storage::disk('public')->exists($logo->logo_documentos))
                ? storage_path('app/public/' . $logo->logo_documentos)
                : public_path('img/noImgdoc.jpeg');

            $logoInstitucion = ($logo && $logo->logo_institucion && Storage::disk('public')->exists($logo->logo_institucion))
                ? storage_path('app/public/' . $logo->logo_institucion)
                : public_path('img/noImgdoc.jpeg');

            // 4. Fechas Actuales
            $now = Carbon::now();
            $dia = $now->format('d');
            $mes = $now->translatedFormat('F'); // Nombre del mes en español
            $aho = $now->format('Y');

            // Compartir variables con las vistas Blade
            $view->with([
                'globalDirector'              => $director,
                'globalDirectorNombre'        => $primerNombre,
                'globalDirectorApellido'      => $primerApellido,
                'globalDirectorCompleto'      => trim("{$primerNombre} {$primerApellido}"),

                // 🎯 NUEVAS VARIABLES: Grado de instrucción del director
                'globalDirectorGrado'         => $gradoPrincipalDirector,
                'globalDirectorGrados'        => $gradosDirector,
                'globalDirectorGradosCompleto' => $gradosCompletoDirector,

                'globalInstitucion'           => $institucion,
                'globalLogoDocumento'         => $logoDocumento,
                'globalLogoInstitucion'       => $logoInstitucion,
                'globalDia'                   => $dia,
                'globalMes'                   => ucfirst($mes),
                'globalAho'                   => $aho,
            ]);
        });
    }
}
