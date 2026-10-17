import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::storeFast
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:78
 * @route '/datos/basicos/apreciaciones/store/fast'
 */
export const storeFast = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

storeFast.definition = {
    methods: ["post"],
    url: '/datos/basicos/apreciaciones/store/fast',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::storeFast
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:78
 * @route '/datos/basicos/apreciaciones/store/fast'
 */
storeFast.url = (options?: RouteQueryOptions) => {
    return storeFast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::storeFast
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:78
 * @route '/datos/basicos/apreciaciones/store/fast'
 */
storeFast.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::storeFast
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:78
 * @route '/datos/basicos/apreciaciones/store/fast'
 */
    const storeFastForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeFast.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::storeFast
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:78
 * @route '/datos/basicos/apreciaciones/store/fast'
 */
        storeFastForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeFast.url(options),
            method: 'post',
        })
    
    storeFast.form = storeFastForm
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
export const listActive = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})

listActive.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/apreciaciones/list/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
listActive.url = (options?: RouteQueryOptions) => {
    return listActive.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
listActive.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
listActive.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listActive.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
    const listActiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listActive.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
        listActiveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listActive.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::listActive
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:160
 * @route '/datos/basicos/apreciaciones/list/active'
 */
        listActiveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listActive.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listActive.form = listActiveForm
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/apreciaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::index
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:15
 * @route '/datos/basicos/apreciaciones'
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
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::store
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:41
 * @route '/datos/basicos/apreciaciones'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/apreciaciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::store
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:41
 * @route '/datos/basicos/apreciaciones'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::store
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:41
 * @route '/datos/basicos/apreciaciones'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::store
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:41
 * @route '/datos/basicos/apreciaciones'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::store
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:41
 * @route '/datos/basicos/apreciaciones'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::update
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:112
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
export const update = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/apreciaciones/{apreciacion}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::update
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:112
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
update.url = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apreciacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { apreciacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    apreciacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        apreciacion: typeof args.apreciacion === 'object'
                ? args.apreciacion.id
                : args.apreciacion,
                }

    return update.definition.url
            .replace('{apreciacion}', parsedArgs.apreciacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::update
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:112
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
update.put = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::update
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:112
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
    const updateForm = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::update
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:112
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
        updateForm.put = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::destroy
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:150
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
export const destroy = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/datos/basicos/apreciaciones/{apreciacion}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::destroy
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:150
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
destroy.url = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apreciacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { apreciacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    apreciacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        apreciacion: typeof args.apreciacion === 'object'
                ? args.apreciacion.id
                : args.apreciacion,
                }

    return destroy.definition.url
            .replace('{apreciacion}', parsedArgs.apreciacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::destroy
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:150
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
destroy.delete = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::destroy
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:150
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
    const destroyForm = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\ApreciacionController::destroy
 * @see app/Http/Controllers/DatosBasicos/ApreciacionController.php:150
 * @route '/datos/basicos/apreciaciones/{apreciacion}'
 */
        destroyForm.delete = (args: { apreciacion: number | { id: number } } | [apreciacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ApreciacionController = { storeFast, listActive, index, store, update, destroy }

export default ApreciacionController