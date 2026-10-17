import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/cartas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::index
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:15
 * @route '/empleados/activos/cartas'
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
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::store
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:51
 * @route '/empleados/activos/cartas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/empleados/activos/cartas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::store
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:51
 * @route '/empleados/activos/cartas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::store
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:51
 * @route '/empleados/activos/cartas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::store
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:51
 * @route '/empleados/activos/cartas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::store
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:51
 * @route '/empleados/activos/cartas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::update
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:68
 * @route '/empleados/activos/cartas/{carta}'
 */
export const update = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/empleados/activos/cartas/{carta}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::update
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:68
 * @route '/empleados/activos/cartas/{carta}'
 */
update.url = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { carta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { carta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    carta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        carta: typeof args.carta === 'object'
                ? args.carta.id
                : args.carta,
                }

    return update.definition.url
            .replace('{carta}', parsedArgs.carta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::update
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:68
 * @route '/empleados/activos/cartas/{carta}'
 */
update.put = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::update
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:68
 * @route '/empleados/activos/cartas/{carta}'
 */
    const updateForm = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::update
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:68
 * @route '/empleados/activos/cartas/{carta}'
 */
        updateForm.put = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::destroy
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:85
 * @route '/empleados/activos/cartas/{carta}'
 */
export const destroy = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/empleados/activos/cartas/{carta}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::destroy
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:85
 * @route '/empleados/activos/cartas/{carta}'
 */
destroy.url = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { carta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { carta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    carta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        carta: typeof args.carta === 'object'
                ? args.carta.id
                : args.carta,
                }

    return destroy.definition.url
            .replace('{carta}', parsedArgs.carta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::destroy
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:85
 * @route '/empleados/activos/cartas/{carta}'
 */
destroy.delete = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::destroy
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:85
 * @route '/empleados/activos/cartas/{carta}'
 */
    const destroyForm = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::destroy
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:85
 * @route '/empleados/activos/cartas/{carta}'
 */
        destroyForm.delete = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
export const imprimir = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(args, options),
    method: 'get',
})

imprimir.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/cartas/{carta}/imprimir',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
imprimir.url = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { carta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { carta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    carta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        carta: typeof args.carta === 'object'
                ? args.carta.id
                : args.carta,
                }

    return imprimir.definition.url
            .replace('{carta}', parsedArgs.carta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
imprimir.get = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
imprimir.head = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: imprimir.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
    const imprimirForm = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: imprimir.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
        imprimirForm.get = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: imprimir.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\CartaAceptacion\CartaAceptacionController::imprimir
 * @see app/Http/Controllers/Empleados/CartaAceptacion/CartaAceptacionController.php:95
 * @route '/empleados/activos/cartas/{carta}/imprimir'
 */
        imprimirForm.head = (args: { carta: number | { id: number } } | [carta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: imprimir.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    imprimir.form = imprimirForm
const cartas = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
imprimir: Object.assign(imprimir, imprimir),
}

export default cartas