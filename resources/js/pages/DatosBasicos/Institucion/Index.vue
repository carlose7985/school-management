<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { computed, nextTick, ref, watch } from 'vue';
import { FileText, Hash, MapPin } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import FormInput from '@/components/forms/FormInput.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal.vue';
import { useUnsavedChanges } from '@/composables/useUnsavedChanges';
import AppButton from '@/components/ui/AppButton.vue';
defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Institución', href: '/datos/basicos/institucion' },
        ],
    },
});

type Institucion = {
    id?: number;
    nombre_de_la_institucion: string | null;
    email: string | null;
    telefono: string | null;
    rif: string | null;
    nif: string | null;
    fecha_de_fundada: string | null;
    circuito: string | null;
    dependencia: string | null;
    zona_educativa: string | null;
    codigo_de_dependencia: string | null;
    codigo_dea: string | null;
    codigo_estadistico: string | null;
    codigo_cenae: string | null;
    codigo_circuito: string | null;
    codigo_primaria: string | null;
    codigo_electoral: string | null;
    numero_de_aulas: number | null;
    numero_de_secciones: number | null;
    otras_aulas: number | null;
    direccion: string | null;
    estado: string | null;
    municipio: string | null;
    parroquia: string | null;
    comuna: string | null;
    turno: string | null;
    medio: string | null;
    tipo_de_escuela: string | null;
};

const props = defineProps<{ institucion: Institucion | null }>();

const isEditing = ref(false);
const firstInputRef = ref<any>(null);

const form = useForm({
    nombre_de_la_institucion: props.institucion?.nombre_de_la_institucion ?? '',
    email: props.institucion?.email ?? '',
    telefono: props.institucion?.telefono ?? '',
    rif: props.institucion?.rif ?? '',
    nif: props.institucion?.nif ?? '',
    fecha_de_fundada: props.institucion?.fecha_de_fundada ?? '',
    circuito: props.institucion?.circuito ?? '',
    dependencia: props.institucion?.dependencia ?? '',
    zona_educativa: props.institucion?.zona_educativa ?? '',
    codigo_de_dependencia: props.institucion?.codigo_de_dependencia ?? '',
    codigo_dea: props.institucion?.codigo_dea ?? '',
    codigo_estadistico: props.institucion?.codigo_estadistico ?? '',
    codigo_cenae: props.institucion?.codigo_cenae ?? '',
    codigo_circuito: props.institucion?.codigo_circuito ?? '',
    codigo_primaria: props.institucion?.codigo_primaria ?? '',
    codigo_electoral: props.institucion?.codigo_electoral ?? '',
    numero_de_aulas: props.institucion?.numero_de_aulas ?? '',
    numero_de_secciones: props.institucion?.numero_de_secciones ?? '',
    otras_aulas: props.institucion?.otras_aulas ?? '',
    direccion: props.institucion?.direccion ?? '',
    estado: props.institucion?.estado ?? '',
    municipio: props.institucion?.municipio ?? '',
    parroquia: props.institucion?.parroquia ?? '',
    comuna: props.institucion?.comuna ?? '',
    turno: props.institucion?.turno ?? '',
    medio: props.institucion?.medio ?? '',
    tipo_de_escuela: props.institucion?.tipo_de_escuela ?? '',
});

const isDirty = computed(() => form.isDirty);

const { showModal, navigate, stay, leave, saveAndLeave } = useUnsavedChanges({
    isDirty: () => form.isDirty,
});

// Opciones de selects
const dependencias = [
    { value: 'Nacional', label: 'Nacional' },
    { value: 'Estadal', label: 'Estadal' },
    { value: 'Municipal', label: 'Municipal' },
    { value: 'Privado', label: 'Privado' },
    { value: 'Subvencionado', label: 'Subvencionado' },
];

const turnos = [
    { value: 'Mañana', label: 'Mañana' },
    { value: 'Tarde', label: 'Tarde' },
    { value: 'Completo', label: 'Completo' },
    { value: 'Nocturno', label: 'Nocturno' },
];

const medios = [
    { value: 'Rural', label: 'Rural' },
    { value: 'Urbano', label: 'Urbano' },
    { value: 'Indígena', label: 'Indígena' },
];

const tipos = [
    { value: 'Nacional', label: 'Nacional' },
    { value: 'Estadal', label: 'Estadal' },
    { value: 'Municipal', label: 'Municipal' },
    { value: 'Privado', label: 'Privado' },
];

// ─────────────────────────────────────────────
// Acciones
// ─────────────────────────────────────────────
const handleEdit = async () => {
    isEditing.value = true;
    await nextTick();
    firstInputRef.value?.focus?.();
};

const handleCancel = () => {
    form.reset();
    isEditing.value = false;
};

const handleSave = () => {
    form.post('/datos/basicos/institucion', {
        preserveScroll: true,
        onSuccess: () => {
            isEditing.value = false;
        },
    });
};

const handleBack = () => {
    navigate('/datos/basicos');
};

const handleExportPdf = () => {
    window.open('/datos/basicos/institucion/imprimir', '_blank');
};

// Guardar y salir desde el modal
const handleSaveAndLeave = () => {
    form.post('/datos/basicos/institucion', {
        preserveScroll: true,
        onSuccess: () => {
            isEditing.value = false;
            leave();
        },
    });
};

const antiguedad = computed(() => {
    const fecha = form.fecha_de_fundada;
    if (!fecha) return '';

    const fundacion = new Date(fecha);
    if (isNaN(fundacion.getTime())) return '';

    const hoy = new Date();
    let años = hoy.getFullYear() - fundacion.getFullYear();
    const mes = hoy.getMonth() - fundacion.getMonth();
    const dia = hoy.getDate() - fundacion.getDate();

    // Ajuste si aún no ha pasado el aniversario este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        años--;
    }

    if (años < 0) return '';
    if (años === 0) return 'Menos de 1 año';
    if (años === 1) return '1 año';
    return `${años} años`;
});
</script>
<template>
    <Head title="Institución" />
    <ViewContainer title="Datos Generales" subtitle="Registro y actualización datos de la institución" icon="Building2" :show-search="false" :show-footer="false">
        <template #returns>
            <AppButton variant="dark" icon-left="ArrowLeft" :disabled="form.processing" @click="handleBack">
                Volver
            </AppButton>
        </template>
       <template #actions>
            <template v-if="!isEditing">
                <AppButton variant="primary" icon-left="Edit3" :disabled="form.processing" @click="handleEdit">
                    Editar Información
                </AppButton>
                <AppButton variant="warning" icon-left="Download" :disabled="form.processing" @click="handleExportPdf">
                    Exportar PDF
                </AppButton>
            </template>
            <template v-else>
                <AppButton variant="light" icon-left="X" :disabled="form.processing" @click="handleCancel">
                    Cancelar
                </AppButton>
                <AppButton variant="success" icon-left="Save" :loading="form.processing" loading-text="Guardando..." @click="handleSave">
                    Guardar
                </AppButton>
            </template>
        </template>
        <!-- 3 columnas -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <!-- ═══ COLUMNA 1: Identidad Legal ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileText class="h-4 w-4 text-blue-600" :stroke-width="2.5" />
                    <h3 class="text-xs font-black tracking-wider text-blue-700 uppercase">
                        Identidad Legal
                    </h3>
                </div>
                <div class="space-y-3">
                    <FormInput ref="firstInputRef" v-model="form.nombre_de_la_institucion" label="Nombre Oficial" :readonly="!isEditing" transform="title|collapseSpaces" :error="form.errors.nombre_de_la_institucion" />
                    <FormInput v-model="form.email" label="Correo Electrónico" type="email" :readonly="!isEditing" :error="form.errors.email" />
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.telefono" label="Teléfono" mask="0000-0000000" maxlength="12" :readonly="!isEditing" :error="form.errors.telefono" />
                        <FormInput v-model="form.rif" label="RIF" transform="upper" :readonly="!isEditing" :error="form.errors.rif" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.nif" label="NIF" :readonly="!isEditing" :error="form.errors.nif" />
                        <FormInput v-model="form.fecha_de_fundada" label="Fundación" type="date" :readonly="!isEditing" :error="form.errors.fecha_de_fundada" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
  
                    <FormInput v-model="form.circuito" label="Circuito" transform="title" :readonly="!isEditing" :error="form.errors.circuito" />
                    <FormSelect v-model="form.dependencia" label="Dependencia" :options="dependencias" :disabled="!isEditing" :error="form.errors.dependencia" />
                   </div>
                    <FormInput v-model="form.zona_educativa" label="Dependencia Estadal / Zona" transform="title" :readonly="!isEditing" :error="form.errors.zona_educativa" />
                </div>
            </div>
            <!-- ═══ COLUMNA 2: Códigos y Estructura ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Hash class="h-4 w-4 text-blue-600" :stroke-width="2.5" />
                    <h3 class="text-xs font-black tracking-wider text-blue-700 uppercase">
                        Códigos y Estructura
                    </h3>
                </div>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.codigo_dea" label="Código DEA" :readonly="!isEditing" transform="upper" :error="form.errors.codigo_dea" />
                        <FormInput v-model="form.codigo_estadistico" label="Cód. Estadístico" :readonly="!isEditing" :error="form.errors.codigo_estadistico" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.codigo_cenae" label="Cód. CENAE" :readonly="!isEditing" :error="form.errors.codigo_cenae" />
                        <FormInput v-model="form.codigo_circuito" label="Cód. Circuito" :readonly="!isEditing" :error="form.errors.codigo_circuito" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.codigo_de_dependencia" label="Cód. Dependencia" :readonly="!isEditing" :error="form.errors.codigo_de_dependencia" />
                        <FormInput v-model="form.codigo_electoral" label="Cód. Electoral" :readonly="!isEditing" :error="form.errors.codigo_electoral" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.codigo_primaria" label="Cód. Primaria" :readonly="!isEditing" :error="form.errors.codigo_primaria" />
                        <FormInput v-model="form.numero_de_aulas" label="Aulas" type="number" :readonly="!isEditing" :error="form.errors.numero_de_aulas" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.otras_aulas" label="Otras Aulas" type="number" :readonly="!isEditing" :error="form.errors.otras_aulas" />
                        <FormInput v-model="form.numero_de_secciones" label="Secciones" type="number" :readonly="!isEditing" :error="form.errors.numero_de_secciones" />
                    </div>
                    <FormInput v-model="antiguedad" label="Antigüedad del Plantel" readonly />
                </div>
            </div>
            <!-- ═══ COLUMNA 3: Ubicación y Turnos ═══ -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin class="h-4 w-4 text-blue-600" :stroke-width="2.5" />
                    <h3 class="text-xs font-black tracking-wider text-blue-700 uppercase">
                        Ubicación y Turnos
                    </h3>
                </div>
                <div class="space-y-3">
                    <FormInput v-model="form.direccion" label="Dirección Exacta" transform="title" :readonly="!isEditing" :error="form.errors.direccion" />
                    <FormInput v-model="form.estado" label="Estado" transform="title" :readonly="!isEditing" :error="form.errors.estado" />
                    <FormInput v-model="form.municipio" label="Municipio" transform="title" :readonly="!isEditing" :error="form.errors.municipio" />
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.parroquia" label="Parroquia" transform="title" :readonly="!isEditing" :error="form.errors.parroquia" />
                        <FormInput v-model="form.comuna" label="Comuna" transform="title" :readonly="!isEditing" :error="form.errors.comuna" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <FormSelect v-model="form.turno" label="Turno" :options="turnos" :disabled="!isEditing" :error="form.errors.turno" />
                        <FormSelect v-model="form.medio" label="Medio" :options="medios" :disabled="!isEditing" :error="form.errors.medio" />
                    </div>
                    <FormSelect v-model="form.tipo_de_escuela" label="Tipo de Escuela" :options="tipos" :disabled="!isEditing" :error="form.errors.tipo_de_escuela" />
                </div>
            </div>
        </div>
    </ViewContainer>
    <UnsavedChangesModal v-model:open="showModal" title="¿Salir sin guardar?" description="Tienes cambios sin guardar en los datos de la institución." :processing="form.processing" @stay="stay" @leave="leave" @save-and-leave="handleSaveAndLeave" />
</template>