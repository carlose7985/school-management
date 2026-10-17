<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'info' => fn() => $request->session()->get('info'),
                'warning' => fn() => $request->session()->get('warning'),
                'message' => fn() => $request->session()->get('message'),
                'conflicto' => fn() => $request->session()->get('conflicto'),
                'responsable' => fn() => $request->session()->get('responsable'),
                'result' => fn() => $request->session()->get('result'),
                'estudiante_retirado' => fn() => $request->session()->get('estudiante_retirado'),
                'abrir_modal_periodo' => fn() => $request->session()->get('abrir_modal_periodo'),
                'alerta_pendientes' => fn() => $request->session()->get('alerta_pendientes'),
                'student_id' => fn() => $request->session()->get('student_id'),
                'student_type' => fn() => $request->session()->get('student_type'),
                'last_scan' => fn() => $request->session()->get('last_scan'),
                'estudiante_retirado_id' => fn() => $request->session()->get('estudiante_retirado_id'),
                'whatsapp_message' => fn() => $request->session()->get('whatsapp_message'),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}