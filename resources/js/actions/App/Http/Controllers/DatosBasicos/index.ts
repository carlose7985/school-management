import InstitucionController from './InstitucionController'
import InmueblesController from './InmueblesController'
import GradosController from './GradosController'
import AreaTrabajoController from './AreaTrabajoController'
import LogosController from './LogosController'
import DiaFestivoController from './DiaFestivoController'
import ApreciacionController from './ApreciacionController'
import CargosController from './CargosController'
const DatosBasicos = {
    InstitucionController: Object.assign(InstitucionController, InstitucionController),
InmueblesController: Object.assign(InmueblesController, InmueblesController),
GradosController: Object.assign(GradosController, GradosController),
AreaTrabajoController: Object.assign(AreaTrabajoController, AreaTrabajoController),
LogosController: Object.assign(LogosController, LogosController),
DiaFestivoController: Object.assign(DiaFestivoController, DiaFestivoController),
ApreciacionController: Object.assign(ApreciacionController, ApreciacionController),
CargosController: Object.assign(CargosController, CargosController),
}

export default DatosBasicos