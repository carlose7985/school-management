import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import institucion from './institucion'
import inmuebles from './inmuebles'
import grados from './grados'
import areas from './areas'
import logos from './logos'
import festivos from './festivos'
import apreciaciones from './apreciaciones'
import cargos from './cargos'
/**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:25
 * @route '/datos/basicos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:25
 * @route '/datos/basicos'
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
const configuraciones = {
    index: Object.assign(index, index),
institucion: Object.assign(institucion, institucion),
inmuebles: Object.assign(inmuebles, inmuebles),
grados: Object.assign(grados, grados),
areas: Object.assign(areas, areas),
logos: Object.assign(logos, logos),
festivos: Object.assign(festivos, festivos),
apreciaciones: Object.assign(apreciaciones, apreciaciones),
cargos: Object.assign(cargos, cargos),
}

export default configuraciones