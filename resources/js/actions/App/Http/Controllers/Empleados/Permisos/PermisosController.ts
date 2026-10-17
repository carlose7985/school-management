import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::index
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:34
 * @route '/empleados/activos/permisos'
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
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
export const check = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})

check.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
check.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
check.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: check.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
    const checkForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: check.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
        checkForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::check
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:494
 * @route '/empleados/activos/permisos/check'
 */
        checkForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    check.form = checkForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
export const permisosVencidos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permisosVencidos.url(options),
    method: 'get',
})

permisosVencidos.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/vencidos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
permisosVencidos.url = (options?: RouteQueryOptions) => {
    return permisosVencidos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
permisosVencidos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permisosVencidos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
permisosVencidos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permisosVencidos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
    const permisosVencidosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: permisosVencidos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
        permisosVencidosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: permisosVencidos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::permisosVencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
        permisosVencidosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: permisosVencidos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    permisosVencidos.form = permisosVencidosForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::store
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:228
 * @route '/empleados/activos/permisos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/empleados/activos/permisos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::store
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:228
 * @route '/empleados/activos/permisos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::store
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:228
 * @route '/empleados/activos/permisos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::store
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:228
 * @route '/empleados/activos/permisos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::store
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:228
 * @route '/empleados/activos/permisos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::procesarVencido
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:603
 * @route '/empleados/activos/permisos/{permiso}/procesar-vencido'
 */
export const procesarVencido = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: procesarVencido.url(args, options),
    method: 'post',
})

procesarVencido.definition = {
    methods: ["post"],
    url: '/empleados/activos/permisos/{permiso}/procesar-vencido',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::procesarVencido
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:603
 * @route '/empleados/activos/permisos/{permiso}/procesar-vencido'
 */
procesarVencido.url = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permiso: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permiso: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permiso: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permiso: typeof args.permiso === 'object'
                ? args.permiso.id
                : args.permiso,
                }

    return procesarVencido.definition.url
            .replace('{permiso}', parsedArgs.permiso.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::procesarVencido
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:603
 * @route '/empleados/activos/permisos/{permiso}/procesar-vencido'
 */
procesarVencido.post = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: procesarVencido.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::procesarVencido
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:603
 * @route '/empleados/activos/permisos/{permiso}/procesar-vencido'
 */
    const procesarVencidoForm = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: procesarVencido.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::procesarVencido
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:603
 * @route '/empleados/activos/permisos/{permiso}/procesar-vencido'
 */
        procesarVencidoForm.post = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: procesarVencido.url(args, options),
            method: 'post',
        })
    
    procesarVencido.form = procesarVencidoForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::update
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:376
 * @route '/empleados/activos/permisos/{permiso}'
 */
export const update = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/empleados/activos/permisos/{permiso}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::update
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:376
 * @route '/empleados/activos/permisos/{permiso}'
 */
update.url = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permiso: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permiso: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permiso: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permiso: typeof args.permiso === 'object'
                ? args.permiso.id
                : args.permiso,
                }

    return update.definition.url
            .replace('{permiso}', parsedArgs.permiso.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::update
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:376
 * @route '/empleados/activos/permisos/{permiso}'
 */
update.put = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::update
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:376
 * @route '/empleados/activos/permisos/{permiso}'
 */
    const updateForm = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::update
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:376
 * @route '/empleados/activos/permisos/{permiso}'
 */
        updateForm.put = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::destroy
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:447
 * @route '/empleados/activos/permisos/{permiso}'
 */
export const destroy = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/empleados/activos/permisos/{permiso}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::destroy
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:447
 * @route '/empleados/activos/permisos/{permiso}'
 */
destroy.url = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permiso: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permiso: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permiso: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permiso: typeof args.permiso === 'object'
                ? args.permiso.id
                : args.permiso,
                }

    return destroy.definition.url
            .replace('{permiso}', parsedArgs.permiso.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::destroy
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:447
 * @route '/empleados/activos/permisos/{permiso}'
 */
destroy.delete = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::destroy
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:447
 * @route '/empleados/activos/permisos/{permiso}'
 */
    const destroyForm = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::destroy
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:447
 * @route '/empleados/activos/permisos/{permiso}'
 */
        destroyForm.delete = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::toggle
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:470
 * @route '/empleados/activos/permisos/{permiso}/toggle'
 */
export const toggle = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/empleados/activos/permisos/{permiso}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::toggle
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:470
 * @route '/empleados/activos/permisos/{permiso}/toggle'
 */
toggle.url = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permiso: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permiso: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permiso: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permiso: typeof args.permiso === 'object'
                ? args.permiso.id
                : args.permiso,
                }

    return toggle.definition.url
            .replace('{permiso}', parsedArgs.permiso.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::toggle
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:470
 * @route '/empleados/activos/permisos/{permiso}/toggle'
 */
toggle.post = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::toggle
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:470
 * @route '/empleados/activos/permisos/{permiso}/toggle'
 */
    const toggleForm = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::toggle
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:470
 * @route '/empleados/activos/permisos/{permiso}/toggle'
 */
        toggleForm.post = (args: { permiso: number | { id: number } } | [permiso: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
export const reporteGeneral = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reporteGeneral.url(options),
    method: 'get',
})

reporteGeneral.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/reporte/general',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
reporteGeneral.url = (options?: RouteQueryOptions) => {
    return reporteGeneral.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
reporteGeneral.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reporteGeneral.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
reporteGeneral.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reporteGeneral.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
    const reporteGeneralForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reporteGeneral.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
        reporteGeneralForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reporteGeneral.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteGeneral
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:677
 * @route '/empleados/activos/permisos/reporte/general'
 */
        reporteGeneralForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reporteGeneral.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reporteGeneral.form = reporteGeneralForm
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
export const reporteIndividual = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reporteIndividual.url(args, options),
    method: 'get',
})

reporteIndividual.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/reporte/individual/{empleadoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
reporteIndividual.url = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleadoId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    empleadoId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleadoId: args.empleadoId,
                }

    return reporteIndividual.definition.url
            .replace('{empleadoId}', parsedArgs.empleadoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
reporteIndividual.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reporteIndividual.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
reporteIndividual.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reporteIndividual.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
    const reporteIndividualForm = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reporteIndividual.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
        reporteIndividualForm.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reporteIndividual.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::reporteIndividual
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:699
 * @route '/empleados/activos/permisos/reporte/individual/{empleadoId}'
 */
        reporteIndividualForm.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reporteIndividual.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reporteIndividual.form = reporteIndividualForm
const PermisosController = { index, check, permisosVencidos, store, procesarVencido, update, destroy, toggle, reporteGeneral, reporteIndividual }

export default PermisosController