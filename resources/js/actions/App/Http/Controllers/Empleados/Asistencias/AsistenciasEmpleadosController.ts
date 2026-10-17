import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::index
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:27
 * @route '/asistencias/empleados'
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
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
export const cargo = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cargo.url(args, options),
    method: 'get',
})

cargo.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/cargo/{cargoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
cargo.url = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cargoId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cargoId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cargoId: args.cargoId,
                }

    return cargo.definition.url
            .replace('{cargoId}', parsedArgs.cargoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
cargo.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cargo.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
cargo.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cargo.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
    const cargoForm = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cargo.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
        cargoForm.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cargo.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::cargo
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:91
 * @route '/asistencias/empleados/cargo/{cargoId}'
 */
        cargoForm.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cargo.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cargo.form = cargoForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardar
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:182
 * @route '/asistencias/empleados/guardar'
 */
export const guardar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardar.url(options),
    method: 'post',
})

guardar.definition = {
    methods: ["post"],
    url: '/asistencias/empleados/guardar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardar
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:182
 * @route '/asistencias/empleados/guardar'
 */
guardar.url = (options?: RouteQueryOptions) => {
    return guardar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardar
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:182
 * @route '/asistencias/empleados/guardar'
 */
guardar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardar
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:182
 * @route '/asistencias/empleados/guardar'
 */
    const guardarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: guardar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardar
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:182
 * @route '/asistencias/empleados/guardar'
 */
        guardarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: guardar.url(options),
            method: 'post',
        })
    
    guardar.form = guardarForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
export const diasSinRegistro = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diasSinRegistro.url(args, options),
    method: 'get',
})

diasSinRegistro.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/dias-sin-registro/{cargoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
diasSinRegistro.url = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cargoId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cargoId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cargoId: args.cargoId,
                }

    return diasSinRegistro.definition.url
            .replace('{cargoId}', parsedArgs.cargoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
diasSinRegistro.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diasSinRegistro.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
diasSinRegistro.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diasSinRegistro.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
    const diasSinRegistroForm = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: diasSinRegistro.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
        diasSinRegistroForm.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: diasSinRegistro.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::diasSinRegistro
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:254
 * @route '/asistencias/empleados/dias-sin-registro/{cargoId}'
 */
        diasSinRegistroForm.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: diasSinRegistro.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    diasSinRegistro.form = diasSinRegistroForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarFestivos
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:264
 * @route '/asistencias/empleados/guardar-festivos'
 */
export const guardarFestivos = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardarFestivos.url(options),
    method: 'post',
})

guardarFestivos.definition = {
    methods: ["post"],
    url: '/asistencias/empleados/guardar-festivos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarFestivos
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:264
 * @route '/asistencias/empleados/guardar-festivos'
 */
guardarFestivos.url = (options?: RouteQueryOptions) => {
    return guardarFestivos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarFestivos
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:264
 * @route '/asistencias/empleados/guardar-festivos'
 */
guardarFestivos.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardarFestivos.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarFestivos
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:264
 * @route '/asistencias/empleados/guardar-festivos'
 */
    const guardarFestivosForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: guardarFestivos.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarFestivos
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:264
 * @route '/asistencias/empleados/guardar-festivos'
 */
        guardarFestivosForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: guardarFestivos.url(options),
            method: 'post',
        })
    
    guardarFestivos.form = guardarFestivosForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
export const preAsistencia = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preAsistencia.url(args, options),
    method: 'get',
})

preAsistencia.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/pre-asistencia/{cargoId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
preAsistencia.url = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cargoId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cargoId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cargoId: args.cargoId,
                }

    return preAsistencia.definition.url
            .replace('{cargoId}', parsedArgs.cargoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
preAsistencia.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preAsistencia.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
preAsistencia.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preAsistencia.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
    const preAsistenciaForm = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: preAsistencia.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
        preAsistenciaForm.get = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preAsistencia.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::preAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:279
 * @route '/asistencias/empleados/pre-asistencia/{cargoId}'
 */
        preAsistenciaForm.head = (args: { cargoId: string | number } | [cargoId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preAsistencia.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    preAsistencia.form = preAsistenciaForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarPreAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:304
 * @route '/asistencias/empleados/guardar-pre-asistencia'
 */
export const guardarPreAsistencia = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardarPreAsistencia.url(options),
    method: 'post',
})

guardarPreAsistencia.definition = {
    methods: ["post"],
    url: '/asistencias/empleados/guardar-pre-asistencia',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarPreAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:304
 * @route '/asistencias/empleados/guardar-pre-asistencia'
 */
guardarPreAsistencia.url = (options?: RouteQueryOptions) => {
    return guardarPreAsistencia.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarPreAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:304
 * @route '/asistencias/empleados/guardar-pre-asistencia'
 */
guardarPreAsistencia.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guardarPreAsistencia.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarPreAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:304
 * @route '/asistencias/empleados/guardar-pre-asistencia'
 */
    const guardarPreAsistenciaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: guardarPreAsistencia.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::guardarPreAsistencia
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:304
 * @route '/asistencias/empleados/guardar-pre-asistencia'
 */
        guardarPreAsistenciaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: guardarPreAsistencia.url(options),
            method: 'post',
        })
    
    guardarPreAsistencia.form = guardarPreAsistenciaForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
export const listadosDisponibles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listadosDisponibles.url(options),
    method: 'get',
})

listadosDisponibles.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/listados-disponibles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
listadosDisponibles.url = (options?: RouteQueryOptions) => {
    return listadosDisponibles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
listadosDisponibles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listadosDisponibles.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
listadosDisponibles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listadosDisponibles.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
    const listadosDisponiblesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listadosDisponibles.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
        listadosDisponiblesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listadosDisponibles.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::listadosDisponibles
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:965
 * @route '/asistencias/empleados/listados-disponibles'
 */
        listadosDisponiblesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listadosDisponibles.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listadosDisponibles.form = listadosDisponiblesForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
export const generarListado = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarListado.url(options),
    method: 'get',
})

generarListado.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/generar-listado',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
generarListado.url = (options?: RouteQueryOptions) => {
    return generarListado.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
generarListado.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarListado.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
generarListado.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generarListado.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
    const generarListadoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generarListado.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
        generarListadoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarListado.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::generarListado
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:984
 * @route '/asistencias/empleados/generar-listado'
 */
        generarListadoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarListado.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generarListado.form = generarListadoForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
export const actualizarIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: actualizarIndex.url(options),
    method: 'get',
})

actualizarIndex.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/actualizar-asistencia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
actualizarIndex.url = (options?: RouteQueryOptions) => {
    return actualizarIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
actualizarIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: actualizarIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
actualizarIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: actualizarIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
    const actualizarIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: actualizarIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
        actualizarIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: actualizarIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarIndex
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:364
 * @route '/asistencias/empleados/actualizar-asistencia'
 */
        actualizarIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: actualizarIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    actualizarIndex.form = actualizarIndexForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
export const buscarEmpleados = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buscarEmpleados.url(options),
    method: 'get',
})

buscarEmpleados.definition = {
    methods: ["get","head"],
    url: '/asistencias/empleados/actualizar-asistencia/buscar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
buscarEmpleados.url = (options?: RouteQueryOptions) => {
    return buscarEmpleados.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
buscarEmpleados.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buscarEmpleados.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
buscarEmpleados.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: buscarEmpleados.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
    const buscarEmpleadosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: buscarEmpleados.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
        buscarEmpleadosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: buscarEmpleados.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::buscarEmpleados
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:374
 * @route '/asistencias/empleados/actualizar-asistencia/buscar'
 */
        buscarEmpleadosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: buscarEmpleados.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    buscarEmpleados.form = buscarEmpleadosForm
/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarAsistenciaManual
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:471
 * @route '/asistencias/empleados/actualizar-asistencia/actualizar'
 */
export const actualizarAsistenciaManual = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: actualizarAsistenciaManual.url(options),
    method: 'post',
})

actualizarAsistenciaManual.definition = {
    methods: ["post"],
    url: '/asistencias/empleados/actualizar-asistencia/actualizar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarAsistenciaManual
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:471
 * @route '/asistencias/empleados/actualizar-asistencia/actualizar'
 */
actualizarAsistenciaManual.url = (options?: RouteQueryOptions) => {
    return actualizarAsistenciaManual.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarAsistenciaManual
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:471
 * @route '/asistencias/empleados/actualizar-asistencia/actualizar'
 */
actualizarAsistenciaManual.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: actualizarAsistenciaManual.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarAsistenciaManual
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:471
 * @route '/asistencias/empleados/actualizar-asistencia/actualizar'
 */
    const actualizarAsistenciaManualForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: actualizarAsistenciaManual.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Empleados\Asistencias\AsistenciasEmpleadosController::actualizarAsistenciaManual
 * @see app/Http/Controllers/Empleados/Asistencias/AsistenciasEmpleadosController.php:471
 * @route '/asistencias/empleados/actualizar-asistencia/actualizar'
 */
        actualizarAsistenciaManualForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: actualizarAsistenciaManual.url(options),
            method: 'post',
        })
    
    actualizarAsistenciaManual.form = actualizarAsistenciaManualForm
const AsistenciasEmpleadosController = { index, cargo, guardar, diasSinRegistro, guardarFestivos, preAsistencia, guardarPreAsistencia, listadosDisponibles, generarListado, actualizarIndex, buscarEmpleados, actualizarAsistenciaManual }

export default AsistenciasEmpleadosController