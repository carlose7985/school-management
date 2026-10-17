import DashboardController from './DashboardController'
import DatosBasicos from './DatosBasicos'
import Empleados from './Empleados'
import ExportDocumentos from './ExportDocumentos'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
DatosBasicos: Object.assign(DatosBasicos, DatosBasicos),
Empleados: Object.assign(Empleados, Empleados),
ExportDocumentos: Object.assign(ExportDocumentos, ExportDocumentos),
Settings: Object.assign(Settings, Settings),
}

export default Controllers