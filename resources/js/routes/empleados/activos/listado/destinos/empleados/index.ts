import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
export const check = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(args, options),
    method: 'get',
})

check.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/check/{empleadoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.url = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return check.definition.url
            .replace('{empleadoId}', parsedArgs.empleadoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: check.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
    const checkForm = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: check.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
        checkForm.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
        checkForm.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    check.form = checkForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
export const storeDestino = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDestino.url(options),
    method: 'post',
})

storeDestino.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/storeDestino',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
storeDestino.url = (options?: RouteQueryOptions) => {
    return storeDestino.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
storeDestino.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDestino.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
    const storeDestinoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeDestino.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
        storeDestinoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeDestino.url(options),
            method: 'post',
        })
    
    storeDestino.form = storeDestinoForm
const empleados = {
    check: Object.assign(check, check),
storeDestino: Object.assign(storeDestino, storeDestino),
}

export default empleados