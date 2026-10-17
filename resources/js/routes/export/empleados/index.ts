import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::documento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
export const documento = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: documento.url(options),
    method: 'post',
})

documento.definition = {
    methods: ["post"],
    url: '/export/empleados/documento',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::documento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
documento.url = (options?: RouteQueryOptions) => {
    return documento.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::documento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
documento.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: documento.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::documento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
    const documentoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: documento.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::documento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
        documentoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: documento.url(options),
            method: 'post',
        })
    
    documento.form = documentoForm
const empleados = {
    documento: Object.assign(documento, documento),
}

export default empleados