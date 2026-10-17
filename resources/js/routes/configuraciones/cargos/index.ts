import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::storeFast
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:44
 * @route '/datos/basicos/cargos/store/fast'
 */
export const storeFast = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

storeFast.definition = {
    methods: ["post"],
    url: '/datos/basicos/cargos/store/fast',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::storeFast
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:44
 * @route '/datos/basicos/cargos/store/fast'
 */
storeFast.url = (options?: RouteQueryOptions) => {
    return storeFast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::storeFast
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:44
 * @route '/datos/basicos/cargos/store/fast'
 */
storeFast.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::storeFast
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:44
 * @route '/datos/basicos/cargos/store/fast'
 */
    const storeFastForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeFast.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::storeFast
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:44
 * @route '/datos/basicos/cargos/store/fast'
 */
        storeFastForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeFast.url(options),
            method: 'post',
        })
    
    storeFast.form = storeFastForm
/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
export const listActive = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})

listActive.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/cargos/list/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
listActive.url = (options?: RouteQueryOptions) => {
    return listActive.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
listActive.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
listActive.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listActive.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
    const listActiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listActive.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
 */
        listActiveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listActive.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::listActive
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:95
 * @route '/datos/basicos/cargos/list/active'
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
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/cargos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::index
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:12
 * @route '/datos/basicos/cargos'
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
* @see \App\Http\Controllers\DatosBasicos\CargosController::store
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:28
 * @route '/datos/basicos/cargos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/cargos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::store
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:28
 * @route '/datos/basicos/cargos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::store
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:28
 * @route '/datos/basicos/cargos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::store
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:28
 * @route '/datos/basicos/cargos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::store
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:28
 * @route '/datos/basicos/cargos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::update
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:67
 * @route '/datos/basicos/cargos/{cargo}'
 */
export const update = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/cargos/{cargo}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::update
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:67
 * @route '/datos/basicos/cargos/{cargo}'
 */
update.url = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cargo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cargo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cargo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cargo: typeof args.cargo === 'object'
                ? args.cargo.id
                : args.cargo,
                }

    return update.definition.url
            .replace('{cargo}', parsedArgs.cargo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::update
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:67
 * @route '/datos/basicos/cargos/{cargo}'
 */
update.put = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::update
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:67
 * @route '/datos/basicos/cargos/{cargo}'
 */
    const updateForm = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::update
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:67
 * @route '/datos/basicos/cargos/{cargo}'
 */
        updateForm.put = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\CargosController::toggle
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:85
 * @route '/datos/basicos/cargos/{cargo}/toggle'
 */
export const toggle = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/datos/basicos/cargos/{cargo}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::toggle
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:85
 * @route '/datos/basicos/cargos/{cargo}/toggle'
 */
toggle.url = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cargo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cargo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cargo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cargo: typeof args.cargo === 'object'
                ? args.cargo.id
                : args.cargo,
                }

    return toggle.definition.url
            .replace('{cargo}', parsedArgs.cargo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\CargosController::toggle
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:85
 * @route '/datos/basicos/cargos/{cargo}/toggle'
 */
toggle.post = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::toggle
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:85
 * @route '/datos/basicos/cargos/{cargo}/toggle'
 */
    const toggleForm = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\CargosController::toggle
 * @see app/Http/Controllers/DatosBasicos/CargosController.php:85
 * @route '/datos/basicos/cargos/{cargo}/toggle'
 */
        toggleForm.post = (args: { cargo: number | { id: number } } | [cargo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const cargos = {
    storeFast: Object.assign(storeFast, storeFast),
listActive: Object.assign(listActive, listActive),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
toggle: Object.assign(toggle, toggle),
}

export default cargos