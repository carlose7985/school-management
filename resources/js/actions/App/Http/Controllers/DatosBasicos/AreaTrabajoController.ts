import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:62
 * @route '/datos/basicos/areas/store/fast'
 */
export const storeFast = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

storeFast.definition = {
    methods: ["post"],
    url: '/datos/basicos/areas/store/fast',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:62
 * @route '/datos/basicos/areas/store/fast'
 */
storeFast.url = (options?: RouteQueryOptions) => {
    return storeFast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:62
 * @route '/datos/basicos/areas/store/fast'
 */
storeFast.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:62
 * @route '/datos/basicos/areas/store/fast'
 */
    const storeFastForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeFast.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:62
 * @route '/datos/basicos/areas/store/fast'
 */
        storeFastForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeFast.url(options),
            method: 'post',
        })
    
    storeFast.form = storeFastForm
/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
export const listActive = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})

listActive.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/areas/list/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
listActive.url = (options?: RouteQueryOptions) => {
    return listActive.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
listActive.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
listActive.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listActive.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
    const listActiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listActive.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
 */
        listActiveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listActive.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::listActive
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:132
 * @route '/datos/basicos/areas/list/active'
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
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/areas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::index
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:15
 * @route '/datos/basicos/areas'
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
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::store
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:38
 * @route '/datos/basicos/areas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/areas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::store
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:38
 * @route '/datos/basicos/areas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::store
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:38
 * @route '/datos/basicos/areas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::store
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:38
 * @route '/datos/basicos/areas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::store
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:38
 * @route '/datos/basicos/areas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::update
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:108
 * @route '/datos/basicos/areas/{area}'
 */
export const update = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/areas/{area}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::update
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:108
 * @route '/datos/basicos/areas/{area}'
 */
update.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { area: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: typeof args.area === 'object'
                ? args.area.id
                : args.area,
                }

    return update.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::update
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:108
 * @route '/datos/basicos/areas/{area}'
 */
update.put = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::update
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:108
 * @route '/datos/basicos/areas/{area}'
 */
    const updateForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::update
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:108
 * @route '/datos/basicos/areas/{area}'
 */
        updateForm.put = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::toggle
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:92
 * @route '/datos/basicos/areas/{area}/toggle'
 */
export const toggle = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/datos/basicos/areas/{area}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::toggle
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:92
 * @route '/datos/basicos/areas/{area}/toggle'
 */
toggle.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { area: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: typeof args.area === 'object'
                ? args.area.id
                : args.area,
                }

    return toggle.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::toggle
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:92
 * @route '/datos/basicos/areas/{area}/toggle'
 */
toggle.post = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::toggle
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:92
 * @route '/datos/basicos/areas/{area}/toggle'
 */
    const toggleForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\AreaTrabajoController::toggle
 * @see app/Http/Controllers/DatosBasicos/AreaTrabajoController.php:92
 * @route '/datos/basicos/areas/{area}/toggle'
 */
        toggleForm.post = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const AreaTrabajoController = { storeFast, listActive, index, store, update, toggle }

export default AreaTrabajoController