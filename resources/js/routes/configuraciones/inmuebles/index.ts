import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/inmuebles/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
    const exportPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
        exportPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportPdf
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:178
 * @route '/datos/basicos/inmuebles/export/pdf'
 */
        exportPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/inmuebles/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
    const exportExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
        exportExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::exportExcel
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:217
 * @route '/datos/basicos/inmuebles/export/excel'
 */
        exportExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportExcel.form = exportExcelForm
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/inmuebles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::index
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:21
 * @route '/datos/basicos/inmuebles'
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
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::store
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:59
 * @route '/datos/basicos/inmuebles'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/datos/basicos/inmuebles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::store
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:59
 * @route '/datos/basicos/inmuebles'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::store
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:59
 * @route '/datos/basicos/inmuebles'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::store
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:59
 * @route '/datos/basicos/inmuebles'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::store
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:59
 * @route '/datos/basicos/inmuebles'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::update
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:85
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
export const update = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/datos/basicos/inmuebles/{inmueble}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::update
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:85
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
update.url = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { inmueble: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { inmueble: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    inmueble: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        inmueble: typeof args.inmueble === 'object'
                ? args.inmueble.id
                : args.inmueble,
                }

    return update.definition.url
            .replace('{inmueble}', parsedArgs.inmueble.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::update
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:85
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
update.put = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::update
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:85
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
    const updateForm = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::update
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:85
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
        updateForm.put = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::destroy
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:110
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
export const destroy = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/datos/basicos/inmuebles/{inmueble}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::destroy
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:110
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
destroy.url = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { inmueble: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { inmueble: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    inmueble: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        inmueble: typeof args.inmueble === 'object'
                ? args.inmueble.id
                : args.inmueble,
                }

    return destroy.definition.url
            .replace('{inmueble}', parsedArgs.inmueble.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::destroy
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:110
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
destroy.delete = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::destroy
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:110
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
    const destroyForm = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::destroy
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:110
 * @route '/datos/basicos/inmuebles/{inmueble}'
 */
        destroyForm.delete = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
export const qr = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})

qr.definition = {
    methods: ["get","head"],
    url: '/datos/basicos/inmuebles/{inmueble}/qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
qr.url = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { inmueble: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { inmueble: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    inmueble: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        inmueble: typeof args.inmueble === 'object'
                ? args.inmueble.id
                : args.inmueble,
                }

    return qr.definition.url
            .replace('{inmueble}', parsedArgs.inmueble.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
qr.get = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
qr.head = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qr.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
    const qrForm = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: qr.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
        qrForm.get = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DatosBasicos\InmueblesController::qr
 * @see app/Http/Controllers/DatosBasicos/InmueblesController.php:120
 * @route '/datos/basicos/inmuebles/{inmueble}/qr'
 */
        qrForm.head = (args: { inmueble: number | { id: number } } | [inmueble: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: qr.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    qr.form = qrForm
const inmuebles = {
    exportPdf: Object.assign(exportPdf, exportPdf),
exportExcel: Object.assign(exportExcel, exportExcel),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
qr: Object.assign(qr, qr),
}

export default inmuebles