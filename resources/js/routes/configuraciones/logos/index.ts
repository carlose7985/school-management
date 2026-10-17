import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/logos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::index
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:16
 * @route '/datos/basicos/logos'
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
* @see \App\Http\Controllers\DatosBasicos\LogosController::store
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:27
 * @route '/datos/basicos/logos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/logos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::store
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:27
 * @route '/datos/basicos/logos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::store
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:27
 * @route '/datos/basicos/logos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::store
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:27
 * @route '/datos/basicos/logos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::store
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:27
 * @route '/datos/basicos/logos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::destroy
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:57
 * @route '/datos/basicos/logos'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/datos/basicos/logos',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::destroy
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:57
 * @route '/datos/basicos/logos'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\LogosController::destroy
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:57
 * @route '/datos/basicos/logos'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::destroy
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:57
 * @route '/datos/basicos/logos'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\LogosController::destroy
 * @see app/Http/Controllers/DatosBasicos/LogosController.php:57
 * @route '/datos/basicos/logos'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const logos = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default logos