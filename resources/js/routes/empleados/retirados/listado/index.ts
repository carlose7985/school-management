import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
const listado = {
    index: Object.assign(index, index),
}

export default listado