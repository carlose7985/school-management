import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/retirados/listado',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::index
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:18
 * @route '/empleados/retirados/listado'
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
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
export const historialAsistencia = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historialAsistencia.url(args, options),
    method: 'get',
})

historialAsistencia.definition = {
    methods: ["get","head"],
    url: '/empleados/retirados/historial/{empleado}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historialAsistencia.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return historialAsistencia.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historialAsistencia.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historialAsistencia.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
historialAsistencia.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historialAsistencia.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
    const historialAsistenciaForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: historialAsistencia.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
        historialAsistenciaForm.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historialAsistencia.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Retirados\EmpleadosRetiradosController::historialAsistencia
 * @see app/Http/Controllers/Empleados/Retirados/EmpleadosRetiradosController.php:91
 * @route '/empleados/retirados/historial/{empleado}'
 */
        historialAsistenciaForm.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historialAsistencia.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    historialAsistencia.form = historialAsistenciaForm
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
const EmpleadosRetiradosController = { index, reactivar, historialAsistencia, show }

export default EmpleadosRetiradosController