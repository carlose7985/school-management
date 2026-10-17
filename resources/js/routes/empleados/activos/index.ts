import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import cartas from './cartas'
import listado from './listado'
import permisos from './permisos'
import notificaciones from './notificaciones'
/**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/activos',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:114
 * @route '/empleados/activos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:114
 * @route '/empleados/activos'
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
const activos = {
    index: Object.assign(index, index),
cartas: Object.assign(cartas, cartas),
listado: Object.assign(listado, listado),
permisos: Object.assign(permisos, permisos),
notificaciones: Object.assign(notificaciones, notificaciones),
}

export default activos