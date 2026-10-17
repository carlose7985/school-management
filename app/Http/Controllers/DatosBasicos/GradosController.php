<?php

namespace App\Http\Controllers\DatosBasicos;

use App\Http\Controllers\Controller;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use App\Models\Grado;
use App\Models\EmpleadoActivo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradosController extends Controller
{
    /**
     * Listado con búsqueda y paginación.
     */
    public function index(Request $request)
    {
        $search = trim($request->get('search', ''));

        $grados = Grado::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre_del_grado', 'like', "%{$search}%")
                        ->orWhere('seccion', 'like', "%{$search}%");
                });
            })
            ->orderBy('nombre_del_grado')
            ->orderBy('seccion')
            ->paginate(6)
            ->withQueryString();

        // ✅ Recolectar TODOS los IDs de docentes de una sola vez
        $allDocenteIds = $grados->getCollection()
            ->flatMap(fn($g) => $g->docente ?? [])
            ->unique()
            ->values()
            ->all();

        // ✅ Una sola query para todos los docentes
        $docentesMap = empty($allDocenteIds)
            ? collect()
            : EmpleadoActivo::whereIn('id', $allDocenteIds)
            ->get(['id', 'nombres', 'apellidos'])
            ->keyBy('id');

        // ✅ Transform usando el mapa (sin queries extra)
        $grados->getCollection()->transform(function ($grado) use ($docentesMap) {
            $ids = $grado->docente ?? [];

            if (empty($ids)) {
                $grado->docentes_nombres = 'Sin asignar';
            } else {
                $grado->docentes_nombres = collect($ids)
                    ->map(function ($id) use ($docentesMap) {
                        $d = $docentesMap->get($id);
                        if (! $d) return null;

                        $nombre = $this->extraerPrimerElemento($d->nombres);
                        $apellido = $this->extraerPrimerElemento($d->apellidos);
                        return trim("{$nombre} {$apellido}");
                    })
                    ->filter()
                    ->implode('  ||  ') ?: 'Sin asignar';
            }

            return $grado;
        });

        // Docentes para el multiselect del modal
        $docentes = EmpleadoActivo::query()
            ->where('tipo_de_personal', 'Docente')
            ->orderBy('id', 'asc')
            ->get(['id', 'nombres', 'apellidos', 'cedula'])
            ->map(fn($d) => [
                'value' => $d->id,
                'label' => trim("{$d->nombres} {$d->apellidos}"),
                'cedula' => $d->cedula,
            ]);

        return Inertia::render('DatosBasicos/Grados/Index', [
            'grados' => $grados,
            'docentes' => $docentes,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
    /**
     * Guarda un nuevo grado.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_del_grado' => ['required', 'string', 'in:1er Grado,2do Grado,3er Grado,4to Grado,5to Grado,6to Grado'],
            'seccion' => ['required', 'string', 'in:A,B,C,D,E,U'],
            'docente' => ['nullable', 'array', 'max:2'],
            'docente.*' => ['integer', 'exists:empleado_activos,id'],
            'limite_de_estudiantes' => ['nullable', 'integer', 'min:0'],
        ]);

        // Validar que no exista ya la combinación grado + sección
        $existe = Grado::where('nombre_del_grado', $validated['nombre_del_grado'])
            ->where('seccion', $validated['seccion'])
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'nombre_del_grado' => 'Ya existe un grado con esa sección.',
            ]);
        }

        Grado::create([
            'nombre_del_grado' => $validated['nombre_del_grado'],
            'seccion' => $validated['seccion'],
            'docente' => $validated['docente'] ?? [],
            'limite_de_estudiantes' => $validated['limite_de_estudiantes'] ?? 0,
            'status' => true,
        ]);

        return back()->with('success', 'Grado registrado correctamente.');
    }

    /**
     * Actualiza un grado existente.
     */
    public function update(Request $request, Grado $grado)
    {
        $validated = $request->validate([
            'nombre_del_grado' => ['required', 'string', 'in:1er Grado,2do Grado,3er Grado,4to Grado,5to Grado,6to Grado'],
            'seccion' => ['required', 'string', 'in:A,B,C,D,E,U'],
            'docente' => ['nullable', 'array', 'max:2'],
            'docente.*' => ['integer', 'exists:empleado_activos,id'],
            'limite_de_estudiantes' => ['nullable', 'integer', 'min:0'],
        ]);

        // Validar duplicado (excluyendo el actual)
        $existe = Grado::where('nombre_del_grado', $validated['nombre_del_grado'])
            ->where('seccion', $validated['seccion'])
            ->where('id', '!=', $grado->id)
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'nombre_del_grado' => 'Ya existe otro grado con esa sección.',
            ]);
        }

        $grado->update([
            'nombre_del_grado' => $validated['nombre_del_grado'],
            'seccion' => $validated['seccion'],
            'docente' => $validated['docente'] ?? [],
            'limite_de_estudiantes' => $validated['limite_de_estudiantes'] ?? 0,
        ]);

        return back()->with('success', 'Grado actualizado correctamente.');
    }

    /**
     * Activa / desactiva un grado (no se elimina).
     */
    public function toggle(Grado $grado)
    {
        $grado->update(['status' => !$grado->status]);

        return back()->with(
            'success',
            $grado->status ? 'Grado activado.' : 'Grado desactivado.'
        );
    }

    /**
     * Genera el PDF con el QR del grado.
     */
    public function imprimirQr(Grado $grado)
    {
        $docentes = EmpleadoActivo::whereIn('id', $grado->docente ?? [])
            ->get(['nombres', 'apellidos', 'cedula']);

        $qrPayload = $this->buildQrPayload($grado, $docentes);

        // 🎯 Generar el QR localmente como PNG base64
        $qrCode = new QrCode(
            data: $qrPayload,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Medium,
            size: 400,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
        );

        $writer = new PngWriter();
        $result = $writer->write($qrCode);

        // Convertir a base64 para incrustar en el HTML del PDF
        $qrBase64 = 'data:image/png;base64,' . base64_encode($result->getString());

        $pdf = Pdf::loadView('pdf.grados.grado-qr', [
            'grado' => $grado,
            'docentes' => $docentes,
            'qrPayload' => $qrPayload,
            'qrBase64' => $qrBase64,
        ])->setPaper([0, 0, 400, 500], 'portrait');

        return $pdf->stream("qr-grado-{$grado->nombre_del_grado}-{$grado->seccion}.pdf");
    }

    /**
     * Texto que llevará el QR (puedes cambiarlo según necesites).
     */
    private function buildQrPayload(Grado $grado, $docentes): string
    {
        $docentesStr = $docentes->map(function ($d) {
            $nombre = $this->extraerPrimerElemento($d->nombres);
            $apellido = $this->extraerPrimerElemento($d->apellidos);

            return trim("{$nombre} {$apellido}");
        })->implode(' | ');

        return implode("\n", [
            "GRADO: {$grado->nombre_del_grado}",
            "SECCIÓN: {$grado->seccion}",
            "DOCENTES: " . ($docentesStr ?: 'Sin asignar'),
            "LÍMITE: {$grado->limite_de_estudiantes} estudiantes",
            "SISTEMA: EduSystem",
        ]);
    }

    /**
     * Resuelve los nombres de los docentes a partir del array de IDs.
     */
    private function resolveDocentesNombres(?array $ids): string
    {
        if (empty($ids)) return 'Sin asignar';

        return EmpleadoActivo::whereIn('id', $ids)
            ->get(['nombres', 'apellidos'])
            ->map(function ($d) {
                $nombre = $this->extraerPrimerElemento($d->nombres);
                $apellido = $this->extraerPrimerElemento($d->apellidos);

                return trim("{$nombre} {$apellido}");
            })
            ->implode('  ||  ');
    }

    /**
     * Extrae el primer nombre o apellido, pero conserva "Del Valle" / "del Valle" completo.
     */
    private function extraerPrimerElemento(?string $texto): string
    {
        $texto = trim($texto ?? '');
        if (empty($texto)) return '';

        // Si comienza por "del valle" (sin importar mayúsculas/minúsculas) seguido de otro texto o al final
        if (preg_match('/^del\s+valle(?:\s+.*)?$/i', $texto)) {
            return 'Del Valle';
        }

        // De lo contrario, toma solo la primera palabra
        return explode(' ', $texto)[0];
    }
}
