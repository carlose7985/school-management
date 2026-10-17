import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import impresiones from './impresiones'
/**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:179
 * @route '/empleados/acciones'
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
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
export const wifi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wifi.url(options),
    method: 'get',
})

wifi.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/wifi',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
wifi.url = (options?: RouteQueryOptions) => {
    return wifi.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
wifi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wifi.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
wifi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wifi.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
    const wifiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: wifi.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
        wifiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wifi.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/wifi'
 */
        wifiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wifi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    wifi.form = wifiForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
export const docentesGuardia = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: docentesGuardia.url(options),
    method: 'get',
})

docentesGuardia.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/docentes-guardia',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
docentesGuardia.url = (options?: RouteQueryOptions) => {
    return docentesGuardia.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
docentesGuardia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: docentesGuardia.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
docentesGuardia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: docentesGuardia.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
    const docentesGuardiaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: docentesGuardia.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
        docentesGuardiaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: docentesGuardia.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/docentes-guardia'
 */
        docentesGuardiaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: docentesGuardia.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    docentesGuardia.form = docentesGuardiaForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
export const vigilantesGuardia = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vigilantesGuardia.url(options),
    method: 'get',
})

vigilantesGuardia.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/vigilantes-guardia',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
vigilantesGuardia.url = (options?: RouteQueryOptions) => {
    return vigilantesGuardia.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
vigilantesGuardia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vigilantesGuardia.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
vigilantesGuardia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vigilantesGuardia.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
    const vigilantesGuardiaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: vigilantesGuardia.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
        vigilantesGuardiaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vigilantesGuardia.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/vigilantes-guardia'
 */
        vigilantesGuardiaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vigilantesGuardia.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    vigilantesGuardia.form = vigilantesGuardiaForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
export const evaluaciones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluaciones.url(options),
    method: 'get',
})

evaluaciones.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/evaluaciones',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
evaluaciones.url = (options?: RouteQueryOptions) => {
    return evaluaciones.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
evaluaciones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluaciones.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
evaluaciones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: evaluaciones.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
    const evaluacionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: evaluaciones.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
        evaluacionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evaluaciones.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/evaluaciones'
 */
        evaluacionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evaluaciones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    evaluaciones.form = evaluacionesForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
export const pagos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pagos.url(options),
    method: 'get',
})

pagos.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/pagos',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
pagos.url = (options?: RouteQueryOptions) => {
    return pagos.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
pagos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pagos.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
pagos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pagos.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
    const pagosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pagos.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
        pagosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pagos.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/pagos'
 */
        pagosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pagos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pagos.form = pagosForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
export const tallasProfesiones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tallasProfesiones.url(options),
    method: 'get',
})

tallasProfesiones.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/tallas-profesiones',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
tallasProfesiones.url = (options?: RouteQueryOptions) => {
    return tallasProfesiones.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
tallasProfesiones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tallasProfesiones.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
tallasProfesiones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tallasProfesiones.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
    const tallasProfesionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tallasProfesiones.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
        tallasProfesionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tallasProfesiones.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/tallas-profesiones'
 */
        tallasProfesionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tallasProfesiones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tallasProfesiones.form = tallasProfesionesForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
export const porAsignar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: porAsignar.url(options),
    method: 'get',
})

porAsignar.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/por-asignar',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
porAsignar.url = (options?: RouteQueryOptions) => {
    return porAsignar.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
porAsignar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: porAsignar.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
porAsignar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: porAsignar.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
    const porAsignarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: porAsignar.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
        porAsignarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: porAsignar.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/por-asignar'
 */
        porAsignarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: porAsignar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    porAsignar.form = porAsignarForm
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
export const modulo9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: modulo9.url(options),
    method: 'get',
})

modulo9.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/modulo-9',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
modulo9.url = (options?: RouteQueryOptions) => {
    return modulo9.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
modulo9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: modulo9.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
modulo9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: modulo9.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
    const modulo9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: modulo9.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
        modulo9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: modulo9.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-9'
 */
        modulo9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: modulo9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    modulo9.form = modulo9Form
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
export const modulo10 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: modulo10.url(options),
    method: 'get',
})

modulo10.definition = {
    methods: ["get","head"],
    url: '/empleados/acciones/modulo-10',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
modulo10.url = (options?: RouteQueryOptions) => {
    return modulo10.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
modulo10.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: modulo10.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
modulo10.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: modulo10.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
    const modulo10Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: modulo10.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
        modulo10Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: modulo10.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:206
 * @route '/empleados/acciones/modulo-10'
 */
        modulo10Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: modulo10.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    modulo10.form = modulo10Form
const acciones = {
    index: Object.assign(index, index),
impresiones: Object.assign(impresiones, impresiones),
wifi: Object.assign(wifi, wifi),
docentesGuardia: Object.assign(docentesGuardia, docentesGuardia),
vigilantesGuardia: Object.assign(vigilantesGuardia, vigilantesGuardia),
evaluaciones: Object.assign(evaluaciones, evaluaciones),
pagos: Object.assign(pagos, pagos),
tallasProfesiones: Object.assign(tallasProfesiones, tallasProfesiones),
porAsignar: Object.assign(porAsignar, porAsignar),
modulo9: Object.assign(modulo9, modulo9),
modulo10: Object.assign(modulo10, modulo10),
}

export default acciones