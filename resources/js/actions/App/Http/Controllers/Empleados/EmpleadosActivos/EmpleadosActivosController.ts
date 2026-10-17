import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::index
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:25
 * @route '/empleados/activos/listado'
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
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::create
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:133
 * @route '/empleados/activos/listado/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
export const show = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/show/{empleado}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
show.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return show.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
show.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
show.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
    const showForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
        showForm.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::show
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:171
 * @route '/empleados/activos/listado/show/{empleado}'
 */
        showForm.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
export const edit = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/edit/{empleado}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
edit.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return edit.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
edit.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
edit.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
    const editForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
        editForm.get = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::edit
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:178
 * @route '/empleados/activos/listado/edit/{empleado}'
 */
        editForm.head = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::store
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:153
 * @route '/empleados/activos/listado/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::store
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:153
 * @route '/empleados/activos/listado/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::store
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:153
 * @route '/empleados/activos/listado/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::store
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:153
 * @route '/empleados/activos/listado/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::store
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:153
 * @route '/empleados/activos/listado/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::update
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:199
 * @route '/empleados/activos/listado/update/{empleado}'
 */
export const update = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/empleados/activos/listado/update/{empleado}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::update
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:199
 * @route '/empleados/activos/listado/update/{empleado}'
 */
update.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return update.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::update
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:199
 * @route '/empleados/activos/listado/update/{empleado}'
 */
update.put = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::update
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:199
 * @route '/empleados/activos/listado/update/{empleado}'
 */
    const updateForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::update
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:199
 * @route '/empleados/activos/listado/update/{empleado}'
 */
        updateForm.put = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::retirar
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:366
 * @route '/empleados/activos/listado/retirar/{empleado}'
 */
export const retirar = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retirar.url(args, options),
    method: 'post',
})

retirar.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/retirar/{empleado}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::retirar
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:366
 * @route '/empleados/activos/listado/retirar/{empleado}'
 */
retirar.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return retirar.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::retirar
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:366
 * @route '/empleados/activos/listado/retirar/{empleado}'
 */
retirar.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retirar.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::retirar
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:366
 * @route '/empleados/activos/listado/retirar/{empleado}'
 */
    const retirarForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: retirar.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::retirar
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:366
 * @route '/empleados/activos/listado/retirar/{empleado}'
 */
        retirarForm.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: retirar.url(args, options),
            method: 'post',
        })
    
    retirar.form = retirarForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::toggleSituacion
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:210
 * @route '/empleados/activos/listado/toggle-situacion/{empleado}'
 */
export const toggleSituacion = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleSituacion.url(args, options),
    method: 'post',
})

toggleSituacion.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/toggle-situacion/{empleado}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::toggleSituacion
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:210
 * @route '/empleados/activos/listado/toggle-situacion/{empleado}'
 */
toggleSituacion.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return toggleSituacion.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::toggleSituacion
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:210
 * @route '/empleados/activos/listado/toggle-situacion/{empleado}'
 */
toggleSituacion.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleSituacion.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::toggleSituacion
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:210
 * @route '/empleados/activos/listado/toggle-situacion/{empleado}'
 */
    const toggleSituacionForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleSituacion.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::toggleSituacion
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:210
 * @route '/empleados/activos/listado/toggle-situacion/{empleado}'
 */
        toggleSituacionForm.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleSituacion.url(args, options),
            method: 'post',
        })
    
    toggleSituacion.form = toggleSituacionForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateCargo
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:221
 * @route '/empleados/activos/listado/cargo/{empleado}'
 */
export const updateCargo = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateCargo.url(args, options),
    method: 'post',
})

updateCargo.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/cargo/{empleado}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateCargo
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:221
 * @route '/empleados/activos/listado/cargo/{empleado}'
 */
updateCargo.url = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { empleado: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { empleado: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    empleado: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        empleado: typeof args.empleado === 'object'
                ? args.empleado.id
                : args.empleado,
                }

    return updateCargo.definition.url
            .replace('{empleado}', parsedArgs.empleado.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateCargo
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:221
 * @route '/empleados/activos/listado/cargo/{empleado}'
 */
updateCargo.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateCargo.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateCargo
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:221
 * @route '/empleados/activos/listado/cargo/{empleado}'
 */
    const updateCargoForm = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCargo.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateCargo
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:221
 * @route '/empleados/activos/listado/cargo/{empleado}'
 */
        updateCargoForm.post = (args: { empleado: number | { id: number } } | [empleado: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCargo.url(args, options),
            method: 'post',
        })
    
    updateCargo.form = updateCargoForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateFoto
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:233
 * @route '/empleados/activos/listado/foto/{id}'
 */
export const updateFoto = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFoto.url(args, options),
    method: 'post',
})

updateFoto.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/foto/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateFoto
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:233
 * @route '/empleados/activos/listado/foto/{id}'
 */
updateFoto.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateFoto.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateFoto
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:233
 * @route '/empleados/activos/listado/foto/{id}'
 */
updateFoto.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFoto.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateFoto
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:233
 * @route '/empleados/activos/listado/foto/{id}'
 */
    const updateFotoForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateFoto.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::updateFoto
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:233
 * @route '/empleados/activos/listado/foto/{id}'
 */
        updateFotoForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateFoto.url(args, options),
            method: 'post',
        })
    
    updateFoto.form = updateFotoForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
export const carnet = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: carnet.url(args, options),
    method: 'get',
})

carnet.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/carnet/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
carnet.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return carnet.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
carnet.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: carnet.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
carnet.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: carnet.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
    const carnetForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: carnet.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
        carnetForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: carnet.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::carnet
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:265
 * @route '/empleados/activos/listado/carnet/{id}'
 */
        carnetForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: carnet.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    carnet.form = carnetForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
export const check = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(args, options),
    method: 'get',
})

check.definition = {
    methods: ["get","head"],
    url: '/empleados/activos/listado/check/{empleadoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.url = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return check.definition.url
            .replace('{empleadoId}', parsedArgs.empleadoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
check.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: check.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
    const checkForm = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: check.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
        checkForm.get = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::check
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:335
 * @route '/empleados/activos/listado/check/{empleadoId}'
 */
        checkForm.head = (args: { empleadoId: string | number } | [empleadoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    check.form = checkForm
/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
export const storeDestino = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDestino.url(options),
    method: 'post',
})

storeDestino.definition = {
    methods: ["post"],
    url: '/empleados/activos/listado/storeDestino',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
storeDestino.url = (options?: RouteQueryOptions) => {
    return storeDestino.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
storeDestino.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDestino.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
    const storeDestinoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeDestino.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\EmpleadosActivos\EmpleadosActivosController::storeDestino
 * @see app/Http/Controllers/Empleados/EmpleadosActivos/EmpleadosActivosController.php:347
 * @route '/empleados/activos/listado/storeDestino'
 */
        storeDestinoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeDestino.url(options),
            method: 'post',
        })
    
    storeDestino.form = storeDestinoForm
const EmpleadosActivosController = { index, create, show, edit, store, update, retirar, toggleSituacion, updateCargo, updateFoto, carnet, check, storeDestino }

export default EmpleadosActivosController