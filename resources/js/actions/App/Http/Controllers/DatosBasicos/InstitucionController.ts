import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/institucion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::index
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:13
 * @route '/datos/basicos/institucion'
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
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::store
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:24
 * @route '/datos/basicos/institucion'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/institucion',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::store
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:24
 * @route '/datos/basicos/institucion'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::store
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:24
 * @route '/datos/basicos/institucion'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::store
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:24
 * @route '/datos/basicos/institucion'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::store
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:24
 * @route '/datos/basicos/institucion'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
export const imprimir = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(options),
    method: 'get',
})

imprimir.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/institucion/imprimir',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
imprimir.url = (options?: RouteQueryOptions) => {
    return imprimir.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
imprimir.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
imprimir.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: imprimir.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
    const imprimirForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: imprimir.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
        imprimirForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: imprimir.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InstitucionController::imprimir
 * @see app/Http/Controllers/DatosBasicos/InstitucionController.php:43
 * @route '/datos/basicos/institucion/imprimir'
 */
        imprimirForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: imprimir.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    imprimir.form = imprimirForm
const InstitucionController = { index, store, imprimir }

export default InstitucionController