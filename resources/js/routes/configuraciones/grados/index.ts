import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/grados',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::index
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:22
 * @route '/datos/basicos/grados'
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
* @see \App\Http\Controllers\DatosBasicos\GradosController::store
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:97
 * @route '/datos/basicos/grados'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/grados',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::store
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:97
 * @route '/datos/basicos/grados'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::store
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:97
 * @route '/datos/basicos/grados'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::store
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:97
 * @route '/datos/basicos/grados'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::store
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:97
 * @route '/datos/basicos/grados'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::update
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:132
 * @route '/datos/basicos/grados/{grado}'
 */
export const update = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/grados/{grado}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::update
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:132
 * @route '/datos/basicos/grados/{grado}'
 */
update.url = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { grado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    grado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grado: typeof args.grado === 'object'
                ? args.grado.id
                : args.grado,
                }

    return update.definition.url
            .replace('{grado}', parsedArgs.grado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::update
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:132
 * @route '/datos/basicos/grados/{grado}'
 */
update.put = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::update
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:132
 * @route '/datos/basicos/grados/{grado}'
 */
    const updateForm = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::update
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:132
 * @route '/datos/basicos/grados/{grado}'
 */
        updateForm.put = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\GradosController::toggle
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:167
 * @route '/datos/basicos/grados/{grado}/toggle'
 */
export const toggle = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/datos/basicos/grados/{grado}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::toggle
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:167
 * @route '/datos/basicos/grados/{grado}/toggle'
 */
toggle.url = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { grado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    grado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grado: typeof args.grado === 'object'
                ? args.grado.id
                : args.grado,
                }

    return toggle.definition.url
            .replace('{grado}', parsedArgs.grado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::toggle
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:167
 * @route '/datos/basicos/grados/{grado}/toggle'
 */
toggle.post = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::toggle
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:167
 * @route '/datos/basicos/grados/{grado}/toggle'
 */
    const toggleForm = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::toggle
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:167
 * @route '/datos/basicos/grados/{grado}/toggle'
 */
        toggleForm.post = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
export const qr = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})

qr.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/grados/{grado}/qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
qr.url = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { grado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    grado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grado: typeof args.grado === 'object'
                ? args.grado.id
                : args.grado,
                }

    return qr.definition.url
            .replace('{grado}', parsedArgs.grado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
qr.get = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
qr.head = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qr.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
    const qrForm = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: qr.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
        qrForm.get = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\GradosController::qr
 * @see app/Http/Controllers/DatosBasicos/GradosController.php:180
 * @route '/datos/basicos/grados/{grado}/qr'
 */
        qrForm.head = (args: { grado: number | { id: number } } | [grado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    qr.form = qrForm
const grados = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
toggle: Object.assign(toggle, toggle),
qr: Object.assign(qr, qr),
}

export default grados