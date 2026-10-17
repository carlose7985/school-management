import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import empleados from './empleados'
/**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asistencias',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:234
 * @route '/asistencias'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:234
 * @route '/asistencias'
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
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
export const estudiantes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estudiantes.url(options),
    method: 'get',
})

estudiantes.definition = {
    methods: ["get","head"],
    url: '/asistencias/estudiantes',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
estudiantes.url = (options?: RouteQueryOptions) => {
    return estudiantes.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
estudiantes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estudiantes.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
estudiantes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: estudiantes.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
    const estudiantesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: estudiantes.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
        estudiantesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estudiantes.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:256
 * @route '/asistencias/estudiantes'
 */
        estudiantesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estudiantes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    estudiantes.form = estudiantesForm
/**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
export const whatsapp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: whatsapp.url(options),
    method: 'get',
})

whatsapp.definition = {
    methods: ["get","head"],
    url: '/asistencias/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
whatsapp.url = (options?: RouteQueryOptions) => {
    return whatsapp.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
whatsapp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: whatsapp.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
whatsapp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: whatsapp.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
    const whatsappForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: whatsapp.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
        whatsappForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: whatsapp.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:257
 * @route '/asistencias/whatsapp'
 */
        whatsappForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: whatsapp.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    whatsapp.form = whatsappForm
/**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/asistencias/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
    const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
        pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:258
 * @route '/asistencias/pdf'
 */
        pdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
/**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/asistencias/excel',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
excel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: excel.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
    const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: excel.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
        excelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:259
 * @route '/asistencias/excel'
 */
        excelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    excel.form = excelForm
const asistencias = {
    index: Object.assign(index, index),
empleados: Object.assign(empleados, empleados),
estudiantes: Object.assign(estudiantes, estudiantes),
whatsapp: Object.assign(whatsapp, whatsapp),
pdf: Object.assign(pdf, pdf),
excel: Object.assign(excel, excel),
}

export default asistencias