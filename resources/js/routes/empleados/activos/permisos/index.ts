import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
import reporte from './reporte'
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
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
export const vencidos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vencidos.url(options),
    method: 'get',
})

vencidos.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/permisos/vencidos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
vencidos.url = (options?: RouteQueryOptions) => {
    return vencidos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
vencidos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vencidos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
vencidos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vencidos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
    const vencidosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: vencidos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
        vencidosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vencidos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Permisos\PermisosController::vencidos
 * @see app/Http/Controllers/Empleados/Permisos/PermisosController.php:588
 * @route '/empleados/activos/permisos/vencidos'
 */
        vencidosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vencidos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    vencidos.form = vencidosForm
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
const permisos = {
    index: Object.assign(index, index),
check: Object.assign(check, check),
vencidos: Object.assign(vencidos, vencidos),
store: Object.assign(store, store),
procesarVencido: Object.assign(procesarVencido, procesarVencido),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggle: Object.assign(toggle, toggle),
reporte: Object.assign(reporte, reporte),
}

export default permisos