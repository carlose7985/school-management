import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
export const general = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: general.url(options),
    method: 'get',
})

general.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/reporte/general',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
general.url = (options?: RouteQueryOptions) => {
    return general.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
general.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: general.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
general.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: general.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
    const generalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: general.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
        generalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: general.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::general
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
        generalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: general.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    general.form = generalForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
export const individual = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: individual.url(args, options),
    method: 'get',
})

individual.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/reporte/individual/{empleadoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
individual.url = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleadoId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    empleadoId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleadoId: args.empleadoId,
                }

    return individual.definition.url
            .replace('{empleadoId}', parsedArgs.empleadoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
individual.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: individual.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
individual.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: individual.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
    const individualForm = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: individual.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
        individualForm.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: individual.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::individual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
        individualForm.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: individual.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    individual.form = individualForm
const reporte = {
    general: Object.assign(general, general),
individual: Object.assign(individual, individual),
}

export default reporte