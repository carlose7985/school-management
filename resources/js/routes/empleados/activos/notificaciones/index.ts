import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/notificaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::index
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:22
 * @route '/empleados/activos/notificaciones'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
export const resumen = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resumen.url(options),
    method: 'get',
})

resumen.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/notificaciones/resumen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
resumen.url = (options?: RouteQueryOptions) => {
    return resumen.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
resumen.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resumen.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
resumen.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resumen.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
    const resumenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: resumen.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
        resumenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: resumen.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::resumen
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:181
 * @route '/empleados/activos/notificaciones/resumen'
 */
        resumenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: resumen.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    resumen.form = resumenForm
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
export const pdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/notificaciones/{id}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
pdf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return pdf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
pdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
pdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
    const pdfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
        pdfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Notificaciones\NotificacionesController::pdf
 * @see app/Http/Controllers/Empleados/Notificaciones/NotificacionesController.php:89
 * @route '/empleados/activos/notificaciones/{id}/pdf'
 */
        pdfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const notificaciones = {
    index: Object.assign(index, index),
resumen: Object.assign(resumen, resumen),
pdf: Object.assign(pdf, pdf),
}

export default notificaciones