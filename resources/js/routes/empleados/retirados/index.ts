import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import listado from './listado'
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::reactivar
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:72
 * @route '/empleados/retirados/reactivar/{empleado}'
 */
export const reactivar = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reactivar.url(args, options),
    method: 'post',
})

reactivar.definition = {
    methods: ["post"],
    url: '/empleados/retirados/reactivar/{empleado}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::reactivar
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:72
 * @route '/empleados/retirados/reactivar/{empleado}'
 */
reactivar.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return reactivar.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::reactivar
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:72
 * @route '/empleados/retirados/reactivar/{empleado}'
 */
reactivar.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reactivar.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::reactivar
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:72
 * @route '/empleados/retirados/reactivar/{empleado}'
 */
    const reactivarForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reactivar.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::reactivar
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:72
 * @route '/empleados/retirados/reactivar/{empleado}'
 */
        reactivarForm.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reactivar.url(args, options),
            method: 'post',
        })
    
    reactivar.form = reactivarForm
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
export const historial = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historial.url(args, options),
    method: 'get',
})

historial.definition = {
    methods: ["get","head"],
    url: '/empleados/retirados/historial/{empleado}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historial.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return historial.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historial.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historial.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historial.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historial.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
    const historialForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: historial.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
        historialForm.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historial.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historial
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
        historialForm.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historial.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    historial.form = historialForm
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
export const show = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/empleados/retirados/show/{empleado}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
show.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return show.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
show.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
show.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
    const showForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
        showForm.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::show
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:55
 * @route '/empleados/retirados/show/{empleado}'
 */
        showForm.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const retirados = {
    listado: Object.assign(listado, listado),
reactivar: Object.assign(reactivar, reactivar),
historial: Object.assign(historial, historial),
show: Object.assign(show, show),
}

export default retirados