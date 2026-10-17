<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { ArrowLeft, UserCog } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import FormInput from '@/components/forms/FormInput.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import FormMultiselect from '@/components/forms/FormMultiselect.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AreaQuickCreateModal from '@/pages/DatosBasicos/Inmuebles/AreaQuickCreateModal.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    documento: string;
    cedula: string;
    sexo: 'M' | 'F';
    fecha_de_nacimiento: string;
    lugar_de_nacimiento: string;
    direccion_de_habitacion: string;
    parroquia: string;
    telefono: string;
    correo_electronico: string;
    grado_de_intruccion: string[] | string | null;
    profesion: string;
    cargo_en_el_perror: string;
    codigo_del_cargo: string;
    dependencia: string;
    codigo_de_dependencia: string;
    status_del_cargo: string;
    condicion_del_cargo: string;
    area_de_trabajo: number[] | string[] | null;
    funcion_en_el_plantel: string;
    carga_horaria: string;
    fecha_de_ingreso_al_plantel: string;
    fecha_de_ingreso_al_cargo: string;
};

type Cargo = { value: number; label: string };
type Area = { value: number; label: string };

const props = defineProps<{
    empleado: Empleado;
    cargos: Cargo[];
    areas: Area[];
}>();

// El título solo muestra primer nombre + primer apellido
const tituloNombre = computed(() => {
    const primerNombre = (props.empleado.nombres ?? '').trim().split(' ')[0] ?? '';
    const primerApellido = (props.empleado.apellidos ?? '').trim().split(' ')[0] ?? '';
    return `${primerNombre} ${primerApellido}`.trim().toUpperCase();
});

// Áreas locales (para agregar nuevas sin recargar)
const areas = ref<Area[]>([...props.areas]);

// ─────────────────────────────────────────────
// Normalizar grado_de_intruccion (viene como string JSON o array)
// ─────────────────────────────────────────────
function normalizeGrado(raw: any): string[] {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
        const t = raw.trim();
        if (t.startsWith('[')) {
            try {
                const p = JSON.parse(t);
                return Array.isArray(p) ? p : [];
            } catch {
                return [];
            }
        }
        return t ? [t] : [];
    }
    return [];
}

// ─────────────────────────────────────────────
// Normalizar area_de_trabajo: acepta IDs (number) o nombres (string)
// Devuelve SIEMPRE un array de IDs numéricos para el FormMultiselect
// ─────────────────────────────────────────────
function normalizeAreas(raw: any, catalogo: Area[]): number[] {
    if (!raw) return [];
    const arr = Array.isArray(raw) ? raw : [raw];

    return arr
        .map((item) => {
            // Ya es ID numérico
            if (typeof item === 'number') return item;

            // String que representa un número ("3")
            if (typeof item === 'string' && /^\d+$/.test(item.trim())) {
                return Number(item.trim());
            }

            // String con nombre de área → buscar su ID
            if (typeof item === 'string') {
                const found = catalogo.find(
                    (a) => a.label.toLowerCase() === item.toLowerCase().trim(),
                );
                return found?.value ?? null;
            }

            // Objeto { value, label }
            if (typeof item === 'object' && item !== null) {
                return (item as any).value ?? null;
            }

            return null;
        })
        .filter((v): v is number => v !== null);
}

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
// Formulario — cargado con los datos del empleado
// ─────────────────────────────────────────────
const form = useForm({
    nombres: props.empleado.nombres ?? '',
    apellidos: props.empleado.apellidos ?? '',
    documento: props.empleado.documento ?? 'V-',
    cedula: props.empleado.cedula ?? '',
    sexo: (props.empleado.sexo ?? '') as '' | 'M' | 'F',
    fecha_de_nacimiento: props.empleado.fecha_de_nacimiento ?? '',
    lugar_de_nacimiento: props.empleado.lugar_de_nacimiento ?? '',
    direccion_de_habitacion: props.empleado.direccion_de_habitacion ?? '',
    parroquia: props.empleado.parroquia ?? '',
    telefono: props.empleado.telefono ?? '',
    correo_electronico: props.empleado.correo_electronico ?? '',
    grado_de_intruccion: normalizeGrado(props.empleado.grado_de_intruccion),
    profesion: props.empleado.profesion ?? '',
    cargo_en_el_perror: props.empleado.cargo_en_el_perror ?? '',
    codigo_del_cargo: props.empleado.codigo_del_cargo ?? '',
    dependencia: props.empleado.dependencia ?? '',
    codigo_de_dependencia: props.empleado.codigo_de_dependencia ?? '',
    status_del_cargo: props.empleado.status_del_cargo ?? '',
    condicion_del_cargo: props.empleado.condicion_del_cargo ?? '',
    area_de_trabajo: normalizeAreas(props.empleado.area_de_trabajo, props.areas),
    funcion_en_el_plantel: props.empleado.funcion_en_el_plantel ?? '',
    carga_horaria: props.empleado.carga_horaria ?? '',
    fecha_de_ingreso_al_plantel: props.empleado.fecha_de_ingreso_al_plantel ?? '',
    fecha_de_ingreso_al_cargo: props.empleado.fecha_de_ingreso_al_cargo ?? '',
});

// Resetear grados al cambiar sexo
watch(
    () => form.sexo,
    () => {
        form.grado_de_intruccion = [];
    },
);

// ─────────────────────────────────────────────
// Mapear IDs seleccionados de áreas → nombres (para enviar al backend)
// ─────────────────────────────────────────────
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
    if (!form.area_de_trabajo.includes(area.value)) {
        form.area_de_trabajo = [...form.area_de_trabajo, area.value];
    }
};

// ─────────────────────────────────────────────
// Modal de cambios sin guardar
// ─────────────────────────────────────────────
const showConfirmCancel = ref(false);
const pendingUrl = ref('/empleados/activos/listado');

const handleCancel = () => {
    if (form.isDirty) {
        pendingUrl.value = '/empleados/activos/listado';
        showConfirmCancel.value = true;
        return;
    }
    router.visit('/empleados/activos/listado');
};

const confirmLeave = () => {
    showConfirmCancel.value = false;
    router.visit(pendingUrl.value);
};

// ─────────────────────────────────────────────
// Submit — envía area_de_trabajo como nombres (string[])
// ─────────────────────────────────────────────
const submit = () => {
    form
        .transform((data) => ({
            ...data,
            area_de_trabajo: areasSeleccionadasNombres.value,
        }))
        .put(`/empleados/activos/listado/update/${props.empleado.id}`, {
            preserveScroll: true,
            onFinish: () => form.transform((d) => d),
        });
};
</script>
<template>
    <Head :title="`Editar: ${tituloNombre}`" />
    <ViewContainer :title="`Actualizar: ${tituloNombre}`" subtitle="Actualización de expediente" icon="UserCog" :show-search="false">
        <template #returns>
            <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]" @click="handleCancel">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Cancelar
            </button>
        </template>
        <!-- 3 columnas -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <!-- ═══ COLUMNA 1: Datos Personales ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCog class="h-4 w-4 text-indigo-600" :stroke-width="2.5" />
                    <h3 class="text-xs font-black tracking-wider text-indigo-700 uppercase italic">
                        Datos Personales
                    </h3>
                </div>
                <div class="space-y-3">
                    <FormInput v-model="form.nombres" label="Nombres" autofocus transform="title" required :error="form.errors.nombres" />
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
                    <FormInput v-model="form.telefono" label="Teléfono" placeholder="0412-0000000" mask="0000-0000000" required :error="form.errors.telefono" />
                    <FormInput v-model="form.correo_electronico" label="Correo Electrónico" type="email" required :error="form.errors.correo_electronico" />
                    <FormMultiselect v-model="form.grado_de_intruccion" label="Grado de Instrucción" :options="gradosOptions" :disabled="!form.sexo" :placeholder="form.sexo ? 'Seleccione...' : 'Seleccione primero el sexo'" required :error="form.errors.grado_de_intruccion" :help="!form.sexo ? 'Debe seleccionar el sexo para ver las opciones' : ''" />
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
                    <div class="grid grid-cols-2 gap-3">
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
        <div class="mt-3 flex justify-center">
            <AppButton variant="primary" icon-left="Save" :loading="form.processing" loading-text="Actualizando..." @click="submit">
                Actualizar Datos
            </AppButton>
        </div>
    </ViewContainer>
    <!-- Modal para crear área rápida -->
    <AreaQuickCreateModal v-model:open="showAreaModal" @created="handleAreaCreated" />
    <!-- Modal de cambios sin guardar (confirmación al cancelar) -->
    <div v-if="showConfirmCancel" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm" @click.self="showConfirmCancel = false">
        <div class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div class="flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white px-5 py-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <svg class="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-sm font-black tracking-tight text-slate-900 uppercase">
                        ¿Descartar cambios?
                    </h3>
                    <p class="text-xs text-slate-500">
                        Tienes cambios sin guardar. ¿Seguro que deseas salir?
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2 bg-slate-50/60 px-5 py-3">
                <button type="button" class="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300" @click="showConfirmCancel = false">
                    Seguir editando
                </button>
                <button type="button" class="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-colors hover:bg-rose-700" @click="confirmLeave">
                    Salir sin guardar
                </button>
            </div>
        </div>
    </div>
</template>