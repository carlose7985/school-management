import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::exportDocumento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
export const exportDocumento = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportDocumento.url(options),
    method: 'post',
})

exportDocumento.definition = {
    methods: ["post"],
    url: '/export/empleados/documento',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::exportDocumento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
exportDocumento.url = (options?: RouteQueryOptions) => {
    return exportDocumento.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::exportDocumento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
exportDocumento.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportDocumento.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::exportDocumento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
    const exportDocumentoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: exportDocumento.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExportDocumentos\ExportDocEmpleadosPdfController::exportDocumento
 * @see app/Http/Controllers/ExportDocumentos/ExportDocEmpleadosPdfController.php:28
 * @route '/export/empleados/documento'
 */
        exportDocumentoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: exportDocumento.url(options),
            method: 'post',
        })
    
    exportDocumento.form = exportDocumentoForm
const ExportDocEmpleadosPdfController = { exportDocumento }

export default ExportDocEmpleadosPdfController