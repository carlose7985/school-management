import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:67
 * @route '/datos/basicos/festivos/store/fast'
 */
export const storeFast = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

storeFast.definition = {
    methods: ["post"],
    url: '/datos/basicos/festivos/store/fast',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:67
 * @route '/datos/basicos/festivos/store/fast'
 */
storeFast.url = (options?: RouteQueryOptions) => {
    return storeFast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:67
 * @route '/datos/basicos/festivos/store/fast'
 */
storeFast.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFast.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:67
 * @route '/datos/basicos/festivos/store/fast'
 */
    const storeFastForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeFast.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::storeFast
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:67
 * @route '/datos/basicos/festivos/store/fast'
 */
        storeFastForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeFast.url(options),
            method: 'post',
        })
    
    storeFast.form = storeFastForm
/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
export const listActive = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})

listActive.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/festivos/list/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
listActive.url = (options?: RouteQueryOptions) => {
    return listActive.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
listActive.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listActive.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
listActive.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listActive.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
    const listActiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listActive.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
 */
        listActiveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listActive.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::listActive
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:131
 * @route '/datos/basicos/festivos/list/active'
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
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/festivos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::index
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:16
 * @route '/datos/basicos/festivos'
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
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::store
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:40
 * @route '/datos/basicos/festivos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/festivos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::store
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:40
 * @route '/datos/basicos/festivos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::store
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:40
 * @route '/datos/basicos/festivos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::store
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:40
 * @route '/datos/basicos/festivos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::store
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:40
 * @route '/datos/basicos/festivos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::update
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:94
 * @route '/datos/basicos/festivos/{festivo}'
 */
export const update = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/festivos/{festivo}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::update
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:94
 * @route '/datos/basicos/festivos/{festivo}'
 */
update.url = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { festivo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { festivo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    festivo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        festivo: typeof args.festivo === 'object'
                ? args.festivo.id
                : args.festivo,
                }

    return update.definition.url
            .replace('{festivo}', parsedArgs.festivo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::update
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:94
 * @route '/datos/basicos/festivos/{festivo}'
 */
update.put = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::update
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:94
 * @route '/datos/basicos/festivos/{festivo}'
 */
    const updateForm = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::update
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:94
 * @route '/datos/basicos/festivos/{festivo}'
 */
        updateForm.put = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::destroy
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:120
 * @route '/datos/basicos/festivos/{festivo}'
 */
export const destroy = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/datos/basicos/festivos/{festivo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::destroy
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:120
 * @route '/datos/basicos/festivos/{festivo}'
 */
destroy.url = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { festivo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { festivo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    festivo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        festivo: typeof args.festivo === 'object'
                ? args.festivo.id
                : args.festivo,
                }

    return destroy.definition.url
            .replace('{festivo}', parsedArgs.festivo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::destroy
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:120
 * @route '/datos/basicos/festivos/{festivo}'
 */
destroy.delete = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::destroy
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:120
 * @route '/datos/basicos/festivos/{festivo}'
 */
    const destroyForm = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\DiaFestivoController::destroy
 * @see app/Http/Controllers/DatosBasicos/DiaFestivoController.php:120
 * @route '/datos/basicos/festivos/{festivo}'
 */
        destroyForm.delete = (args: { festivo: number | { id: number } } | [festivo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const festivos = {
    storeFast: Object.assign(storeFast, storeFast),
listActive: Object.assign(listActive, listActive),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default festivos