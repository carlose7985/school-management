<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { ArrowLeft, UserPlus } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import FormInput from '@/components/forms/FormInput.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import FormMultiselect from '@/components/forms/FormMultiselect.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AreaQuickCreateModal from '@/pages/DatosBasicos/Inmuebles/AreaQuickCreateModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
            { title: 'Listado', href: '/empleados/activos/listado' },
            { title: 'Nuevo Registro', href: '/empleados/activos/listado/create' },
        ],
    },
});

type Cargo = { value: number; label: string };
type Area = { value: number; label: string };

const props = defineProps<{
    cargos: Cargo[];
    areas: Area[];
}>();

// Áreas locales (para agregar nuevas sin recargar)
const areas = ref<Area[]>([...props.areas]);

// ─────────────────────────────────────────────
// Catálogos
// ─────────────────────────────────────────────
const tipoDocumentoOptions = [
    { value: 'V-', label: 'V-' },
    { value: 'E-', label: 'E-' },
    { value: 'J-', label: 'J-' },
    { value: 'P-', label: 'P-' },
];

const sexoOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
];

const statusDelCargoOptions = [
    { value: 'Nacional', label: 'Nacional' },
    { value: 'Estadal', label: 'Estadal' },
    { value: 'Regional', label: 'Regional' },
];

const condicionCargoOptions = [
    { value: 'Fijo', label: 'Fijo' },
    { value: 'Contratado', label: 'Contratado' },
];

const funcionEnPlantelOptions = [
    { value: 'Director', label: 'Director' },
    { value: 'Subdirector', label: 'Subdirector' },
    { value: 'Coordinador', label: 'Coordinador' },
    { value: 'Docente de Aula', label: 'Docente de Aula' },
    { value: 'Docente Especialista', label: 'Docente Especialista' },
    { value: 'Secretaria(o)', label: 'Secretaria(o)' },
    { value: 'Aseador(a)', label: 'Aseador(a)' },
    { value: 'Cocinera(o)', label: 'Cocinera(o)' },
    { value: 'Vigilante', label: 'Vigilante' },
    { value: 'Sin Asignación', label: 'Sin Asignación' },
];

const cargaHorariaOptions = [
    { value: '00.00', label: '00.00' },
    { value: '20.00', label: '20.00' },
    { value: '33.33', label: '33.33' },
    { value: '35.00', label: '35.00' },
    { value: '37.50', label: '37.50' },
    { value: '40.00', label: '40.00' },
    { value: '53.33', label: '53.33' },
    { value: '54.00', label: '54.00' },
];

// ─────────────────────────────────────────────
// Grado de instrucción filtrado por sexo
// ─────────────────────────────────────────────
const gradosBase: { value: string; label: string; sexo: 'M' | 'F' | 'both' }[] = [
    { value: 'Primaria', label: 'Primaria', sexo: 'both' },
    { value: 'Diversificada', label: 'Diversificada', sexo: 'both' },
    { value: 'Bachiller', label: 'Bachiller', sexo: 'both' },
    { value: 'Tsu', label: 'TSU', sexo: 'both' },
    { value: 'Profe.', label: 'Profesor', sexo: 'M' },
    { value: 'Profa.', label: 'Profesora', sexo: 'F' },
    { value: 'Lcdo.', label: 'Licenciado', sexo: 'M' },
    { value: 'Lcda.', label: 'Licenciada', sexo: 'F' },
    { value: 'MSc.', label: 'MSc.', sexo: 'both' },
    { value: 'Especialista', label: 'Especialista', sexo: 'both' },
    { value: 'Dr.', label: 'Dr.', sexo: 'M' },
    { value: 'Dra.', label: 'Dra.', sexo: 'F' },
    { value: 'Otras', label: 'Otras', sexo: 'both' },
];

const gradosOptions = computed(() => {
    const sexo = form.sexo;
    return gradosBase
        .filter((g) => !sexo || g.sexo === 'both' || g.sexo === sexo)
        .map((g) => ({ value: g.value, label: g.label }));
});

// ─────────────────────────────────────────────
// Formulario
// ─────────────────────────────────────────────
const form = useForm({
    nombres: '',
    apellidos: '',
    documento: 'V-',
    cedula: '',
    sexo: '' as '' | 'M' | 'F',
    fecha_de_nacimiento: '',
    lugar_de_nacimiento: '',
    direccion_de_habitacion: '',
    parroquia: '',
    telefono: '',
    correo_electronico: '',
    grado_de_intruccion: [] as string[],
    profesion: '',
    cargo_en_el_perror: '',
    codigo_del_cargo: '',
    dependencia: '',
    codigo_de_dependencia: '',
    tipo_de_personal: null as number | null, // ID interno del select
    status_del_cargo: '',
    condicion_del_cargo: '',
    area_de_trabajo: [] as number[], // IDs internos del multiselect
    funcion_en_el_plantel: '',
    carga_horaria: '',
    fecha_de_ingreso_al_plantel: '',
    fecha_de_ingreso_al_cargo: '',
});

watch(
    () => form.sexo,
    () => {
        form.grado_de_intruccion = [];
    },
);

// ─────────────────────────────────────────────
// Computed: convertir IDs → nombres para enviar
// ─────────────────────────────────────────────
const nombreCargoSeleccionado = computed<string | null>(() => {
    if (form.tipo_de_personal === null) return null;
    return props.cargos.find((c) => c.value === form.tipo_de_personal)?.label ?? null;
});

const areasSeleccionadasNombres = computed<string[]>(() => {
    return form.area_de_trabajo
        .map((id) => areas.value.find((a) => a.value === id)?.label)
        .filter((n): n is string => !!n);
});

// ─────────────────────────────────────────────
// Modal de crear área rápida
// ─────────────────────────────────────────────
const showAreaModal = ref(false);

const handleAreaCreated = (area: Area) => {
    if (!areas.value.some((a) => a.value === area.value)) {
        areas.value = [...areas.value, area].sort((a, b) =>
            a.label.localeCompare(b.label),
        );
    }
    // Seleccionar automáticamente la nueva área
    if (!form.area_de_trabajo.includes(area.value)) {
        form.area_de_trabajo = [...form.area_de_trabajo, area.value];
    }
};

// ─────────────────────────────────────────────
// Submit — envía nombres (cargo + áreas)
// ─────────────────────────────────────────────
const submit = () => {
    form
        .transform((data) => ({
            ...data,
            tipo_de_personal: nombreCargoSeleccionado.value,
            area_de_trabajo: areasSeleccionadasNombres.value,
        }))
        .post('/empleados/activos/listado/store', {
            preserveScroll: true,
            onFinish: () => form.transform((d) => d), // reset transform
        });
};
</script>
<template>
    <Head title="Nuevo Empleado" />
    <ViewContainer title="Registro de Personal" subtitle="Carga de expediente para nuevo ingreso" icon="UserPlus" :show-search="false">
        <template #returns>
            <Link href="/empleados/activos/listado" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- 3 columnas -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <!-- ═══ COLUMNA 1: Datos Personales ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserPlus class="h-4 w-4 text-indigo-600" :stroke-width="2.5" />
                    <h3 class="text-xs font-black tracking-wider text-indigo-700 uppercase italic">
                        Datos Personales
                    </h3>
                </div>
                <div class="space-y-3">
                    <FormInput v-model="form.nombres" label="Nombres" transform="title" autofocus required :error="form.errors.nombres" />
                    <FormInput v-model="form.apellidos" label="Apellidos" transform="title" required :error="form.errors.apellidos" />
                    <div class="grid grid-cols-[100px_1fr] gap-3">
                        <FormSelect v-model="form.documento" label="Tipo" :options="tipoDocumentoOptions" required :error="form.errors.documento" />
                        <FormInput v-model="form.cedula" label="Cédula" placeholder="00000000" transform="digits" :maxlength="8" required :error="form.errors.cedula" />
                    </div>
                    <FormSelect v-model="form.sexo" label="Sexo" :options="sexoOptions" placeholder="Seleccione..." required :error="form.errors.sexo" />
                    <FormInput v-model="form.fecha_de_nacimiento" label="F. Nacimiento" type="date" required :error="form.errors.fecha_de_nacimiento" />
                    <FormInput v-model="form.lugar_de_nacimiento" label="Lugar de Nacimiento" transform="title" required :error="form.errors.lugar_de_nacimiento" />
                </div>
            </div>
            <!-- ═══ COLUMNA 2: Ubicación y Contacto ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 class="text-xs font-black tracking-wider text-blue-700 uppercase italic">
                        Ubicación y Contacto
                    </h3>
                </div>
                <div class="space-y-3">
                    <FormInput v-model="form.direccion_de_habitacion" label="Dirección de Habitación" transform="title" required :error="form.errors.direccion_de_habitacion" />
                    <FormInput v-model="form.parroquia" label="Parroquia" transform="title" required :error="form.errors.parroquia" />
                    <FormInput v-model="form.telefono" label="Teléfono" placeholder="0412-0000000" mask="0000-0000000" :maxlength="12" required :error="form.errors.telefono" />
                    <FormInput v-model="form.correo_electronico" label="Correo Electrónico" type="email" required :error="form.errors.correo_electronico" />
                    <FormMultiselect v-model="form.grado_de_intruccion" label="Grado de Instrucción" :options="gradosOptions" :disabled="!form.sexo" :placeholder="form.sexo ? 'Seleccione...' : 'Seleccione primero el sexo'" required :error="form.errors.grado_de_intruccion" />
                    <FormInput v-model="form.profesion" label="Título Obtenido" transform="title" required :error="form.errors.profesion" />
                </div>
            </div>
            <!-- ═══ COLUMNA 3: Datos Laborales ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <svg class="h-4 w-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 class="text-xs font-black tracking-wider text-violet-700 uppercase italic">
                        Datos Laborales
                    </h3>
                </div>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.cargo_en_el_perror" label="Cargo en Nómina" transform="upper" required :error="form.errors.cargo_en_el_perror" />
                        <FormInput v-model="form.codigo_del_cargo" label="Código Cargo" transform="upper" required :error="form.errors.codigo_del_cargo" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.dependencia" label="Dependencia" transform="title" required :error="form.errors.dependencia" />
                        <FormInput v-model="form.codigo_de_dependencia" label="Cód. Dependencia" transform="upper" required :error="form.errors.codigo_de_dependencia" />
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <FormSelect v-model="form.tipo_de_personal" label="Tipo Personal" :options="cargos" placeholder="Seleccione..." searchable required :error="form.errors.tipo_de_personal" />
                        <FormSelect v-model="form.status_del_cargo" label="Status" :options="statusDelCargoOptions" placeholder="Seleccione..." required :error="form.errors.status_del_cargo" />
                        <FormSelect v-model="form.condicion_del_cargo" label="Condición" :options="condicionCargoOptions" placeholder="Seleccione..." required :error="form.errors.condicion_del_cargo" />
                    </div>
                    <FormMultiselect v-model="form.area_de_trabajo" label="Áreas de Asignación" :options="areas" placeholder="Seleccione..." required :error="form.errors.area_de_trabajo">
                        <template #dropdown-action>
                            <button type="button" class="flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 px-3 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm shadow-emerald-900/20 transition-all hover:shadow-md hover:shadow-emerald-900/30 active:scale-95" title="Crear nueva área" @click.stop="showAreaModal = true">
                                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Nueva
                            </button>
                        </template>
                    </FormMultiselect>
                    <div class="grid grid-cols-2 gap-3">
                        <FormSelect v-model="form.funcion_en_el_plantel" label="Función" :options="funcionEnPlantelOptions" placeholder="Seleccione..." searchable required :error="form.errors.funcion_en_el_plantel" />
                        <FormSelect v-model="form.carga_horaria" label="Carga" :options="cargaHorariaOptions" placeholder="Seleccione..." required :error="form.errors.carga_horaria" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.fecha_de_ingreso_al_plantel" label="F.I. Plantel" type="date" required :error="form.errors.fecha_de_ingreso_al_plantel" />
                        <FormInput v-model="form.fecha_de_ingreso_al_cargo" label="F.I. Cargo" type="date" required :error="form.errors.fecha_de_ingreso_al_cargo" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Botón Guardar centrado -->
        <div class="mt-2 flex justify-center">
            <AppButton variant="primary" icon-left="Save" :loading="form.processing" loading-text="Registrando..." @click="submit">
                Registrar Empleado
            </AppButton>
        </div>
    </ViewContainer>
    <!-- Modal para crear área rápida -->
    <AreaQuickCreateModal v-model:open="showAreaModal" @created="handleAreaCreated" />
</template>