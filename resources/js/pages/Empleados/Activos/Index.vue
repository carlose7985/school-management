<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Eye,
    Pencil,
    FileText,
    Trash2,
    Users,
    Cake,
    IdCard,
    Loader2,
    Camera,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ChangeCargoModal from './ChangeCargoModal.vue';
import ToggleStatusModal from './ToggleStatusModal.vue';
import UploadPhotoModal from './UploadPhotoModal.vue';
import CarnetPreviewModal from './CarnetPreviewModal.vue';
import GeneratingProcessModal from '@/components/ui/GeneratingProcessModal.vue';
import DocumentosEmpleadoModal from './DocumentosEmpleadoModal.vue';
import RetirarEmpleadoModal from './RetirarEmpleadoModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
            { title: 'Listado General', href: '/empleados/activos/listado' },
        ],
    },
});

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;    // ← agregar
    sexo: 'M' | 'F';
    foto: string | null;
    fecha_de_nacimiento: string | null;
    fecha_de_ingreso_al_plantel: string | null;
    direccion_de_habitacion: string | null;
    telefono: string | null;
    correo_electronico: string | null;
    grado_de_intruccion: string | string[] | null; tipo_de_personal: string;
    situacion_laboral: string;
    nombre_completo: string;
    edad: number | null;
    iniciales: string;
    cargo_nombre: string;
    // Campos calculados en el backend
    situacion_real?: string;
    color_real?: string;
    detalle_permiso?: string | null;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};
type Cargo = { value: number; label: string };
const props = defineProps<{
    empleados: Paginated<Empleado>;
    cargos: Cargo[];   // ← asegúrate de tener esta prop
    filters: { search: string };
}>();

// ─────────────────────────────────────────────
// Búsqueda con debounce
// ─────────────────────────────────────────────
const search = ref(props.filters.search);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const generatingCarnetFor = ref<number | null>(null);
const generatingCarnetNombre = ref<string>('');
watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/empleados/activos/listado',
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, 300);
});

// ─────────────────────────────────────────────
// Helpers de formato
// ─────────────────────────────────────────────
const formatFecha = (fecha: string | null): string => {
    if (!fecha) return '—';
    const d = new Date(fecha + (fecha.includes('T') ? '' : 'T00:00:00'));
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const formatGradoInstruccion = (grados: any): string => {
    if (!grados) return '—';

    // Caso 1: array normal
    if (Array.isArray(grados)) {
        return grados.length ? grados.join(' ') : '—';
    }

    // Caso 2: string JSON (ej: '["Profa.","MSc."]')
    if (typeof grados === 'string') {
        const trimmed = grados.trim();
        if (trimmed.startsWith('[')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed) && parsed.length) {
                    return parsed.join(' ');
                }
                return '—';
            } catch {
                return trimmed || '—';
            }
        }
        return trimmed || '—';
    }

    return '—';
};

// Colores de status según el backend
const statusColorMap: Record<string, { bg: string; text: string; dot: string }> = {
    emerald: { bg: 'bg-emerald-500', text: 'text-white', dot: 'bg-emerald-300' },
    rose: { bg: 'bg-rose-500', text: 'text-white', dot: 'bg-rose-300' },
    purple: { bg: 'bg-purple-500', text: 'text-white', dot: 'bg-purple-300' },
    amber: { bg: 'bg-amber-500', text: 'text-white', dot: 'bg-amber-300' },
    blue: { bg: 'bg-blue-500', text: 'text-white', dot: 'bg-blue-300' },
    cyan: { bg: 'bg-cyan-500', text: 'text-white', dot: 'bg-cyan-300' },
    slate: { bg: 'bg-slate-500', text: 'text-white', dot: 'bg-slate-300' },
    gray: { bg: 'bg-gray-500', text: 'text-white', dot: 'bg-gray-300' },
};

const getStatusColor = (color?: string) => {
    return statusColorMap[color ?? 'slate'] ?? statusColorMap.slate;
};

// ─────────────────────────────────────────────
// Botones de acción
// ─────────────────────────────────────────────
const handleCreate = () => {
    router.visit('/empleados/activos/listado/create');
};

const handleShow = (empleado: Empleado) => {
    router.visit(`/empleados/activos/listado/show/${empleado.id}`);
};

const handleEdit = (empleado: Empleado) => {
    router.visit(`/empleados/activos/listado/edit/${empleado.id}`);
};

const handleCarnet = async (empleado: Empleado) => {
    await openCarnetModal(empleado);
};

const handleImprimir = (empleado: Empleado) => {
    openDocumentosModal(empleado);
};

const handleRetirar = (empleado: Empleado) => {
    openRetirarModal(empleado);
};

// ─────────────────────────────────────────────
// Modal de cambiar cargo
// ─────────────────────────────────────────────
const showCargoModal = ref(false);
const cargoTarget = ref<Empleado | null>(null);

const openCargoModal = (empleado: Empleado) => {
    cargoTarget.value = empleado;
    showCargoModal.value = true;
};

// ─────────────────────────────────────────────
// Modal de toggle status
// ─────────────────────────────────────────────
const showToggleModal = ref(false);
const toggleTarget = ref<Empleado | null>(null);

const openToggleModal = (empleado: Empleado) => {
    toggleTarget.value = empleado;
    showToggleModal.value = true;
};

// ─────────────────────────────────────────────
// Modal de foto
// ─────────────────────────────────────────────
const showPhotoModal = ref(false);
const photoTarget = ref<Empleado | null>(null);

const openPhotoModal = (empleado: Empleado) => {
    photoTarget.value = empleado;
    showPhotoModal.value = true;
};

// ─────────────────────────────────────────────
// Modal de vista previa del carnet
// ─────────────────────────────────────────────
const showCarnetModal = ref(false);
const carnetData = ref<any>(null);
const generatingCarnet = ref(false);

const openCarnetModal = async (empleado: Empleado) => {
    if (generatingCarnetFor.value !== null) return; // evitar doble clic

    generatingCarnetFor.value = empleado.id;

    try {
        const res = await fetch(`/empleados/activos/listado/carnet/${empleado.id}`, {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data?.message ?? 'Error al generar el carnet.');
        }

        carnetData.value = data;
        showCarnetModal.value = true;
    } catch (e: any) {
        console.error(e);
        alert(e?.message ?? 'No se pudo generar el carnet.');
    } finally {
        generatingCarnetFor.value = null;
    }
};
// ─────────────────────────────────────────────
// Modal de documentos
// ─────────────────────────────────────────────
const showDocumentosModal = ref(false);
const documentosTarget = ref<Empleado | null>(null);

const openDocumentosModal = (empleado: Empleado) => {
    documentosTarget.value = empleado;
    showDocumentosModal.value = true;
};

// ─────────────────────────────────────────────
// Modal de retirar empleado
// ─────────────────────────────────────────────
const showRetirarModal = ref(false);
const retirarTarget = ref<Empleado | null>(null);

const openRetirarModal = (empleado: Empleado) => {
    retirarTarget.value = empleado;
    showRetirarModal.value = true;
};

</script>
<template>
    <Head title="Directorio de Personal" />
    <ViewContainer title="Directorio de Personal" subtitle="Gestiones administrativas" icon="Users" v-model:search-value="search" placeholder-search="Buscar..." :pagination="empleados" :autofocus-search="true">
        <template #returns>
            <Link href="/empleados/activos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="success" icon-left="Plus" @click="handleCreate">
                Nuevo Registro
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <!-- Header -->
                <thead>
                    <tr class="bg-blue-700 text-white">
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">
                            Foto
                        </th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">
                            Datos Personales
                        </th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">
                            Otros Datos
                        </th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">
                            Contacto / Habitación
                        </th>
                        <th class="px-4 py-3 text-center text-[10px] font-black tracking-widest uppercase">
                            Laboral
                        </th>
                        <th class="px-4 py-3 text-center text-[10px] font-black tracking-widest uppercase">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <!-- Body -->
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!empleados.data.length">
                        <td colspan="6" class="px-4 py-16 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <Users class="h-12 w-12" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay empleados registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="emp in empleados.data" :key="emp.id" class="align-top transition-colors hover:bg-slate-50/60">
                        <!-- FOTO -->
                        <td class="px-4 py-4">
                            <button type="button" class="group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 shadow-sm transition-all hover:border-cyan-400 hover:shadow-md active:scale-95" title="Cambiar foto" @click="openPhotoModal(emp)">
                                <img v-if="emp.foto" :src="`/storage/${emp.foto}`" :alt="emp.nombre_completo" class="h-full w-full object-cover" />
                                <span v-else class="text-lg font-black tracking-widest text-slate-300">
                                    {{ emp.iniciales }}
                                </span>
                                <!-- Overlay de cámara al hover -->
                                <div class="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                    <Camera class="h-5 w-5 text-white" :stroke-width="2.4" />
                                </div>
                            </button>
                        </td>
                        <!-- DATOS PERSONALES -->
                        <td class="px-4 py-4">
                            <div class="flex items-start gap-3">
                                <!-- Bloque de datos -->
                                <div class="flex flex-1 flex-col gap-1.5">
                                    <!-- Nombre -->
                                    <span class="text-[13px] leading-tight font-black tracking-tight text-slate-900 uppercase">
                                        {{ emp.nombre_completo }}
                                    </span>
                                    <!-- Cédula -->
                                    <div class="flex items-center gap-1.5 text-[11px]">
                                        <IdCard class="h-3 w-3 text-slate-500" :stroke-width="2.4" />
                                        <span class="font-bold tracking-wide text-slate-700">
                                            {{ emp.cedula }}
                                        </span>
                                    </div>
                                    <!-- Fecha de nacimiento + Tooltip de edad -->
                                    <div class="flex items-center gap-1.5 text-[11px]">
                                        <Calendar class="h-3 w-3 text-slate-500" :stroke-width="2.4" />
                                        <span class="font-bold tracking-wide text-slate-700">
                                            {{ formatFecha(emp.fecha_de_nacimiento) }}
                                        </span>
                                        <!-- Tooltip de edad -->
                                        <div v-if="emp.edad" class="group/age relative inline-flex">
                                            <button type="button" class="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-sm transition-transform group-hover/age:scale-110" aria-label="Edad">
                                                <Cake class="h-3 w-3" :stroke-width="2.5" />
                                            </button>
                                            <div class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover/age:scale-100 group-hover/age:opacity-100">
                                                <div class="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 whitespace-nowrap text-white shadow-lg shadow-blue-900/30">
                                                    <Cake class="h-2.5 w-2.5" :stroke-width="2.5" />
                                                    <span class="text-[11px] font-black tracking-wide uppercase">
                                                        {{ emp.edad }} años
                                                    </span>
                                                    <div class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-blue-600"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Botón QR alineado a la derecha -->
                                <button type="button" :disabled="generatingCarnetFor !== null" :class="[
                                    'flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-all active:scale-95',
                                    generatingCarnetFor === emp.id
                                        ? 'cursor-wait bg-cyan-400 text-white shadow-cyan-900/20'
                                        : generatingCarnetFor !== null
                                            ? 'cursor-not-allowed bg-slate-300 text-white'
                                            : 'bg-cyan-500 text-white shadow-cyan-900/20 hover:bg-cyan-600',
                                ]" :title="generatingCarnetFor === emp.id ? 'Generando carnet...' : 'Imprimir carnet'" @click="handleCarnet(emp)">
                                    <Loader2 v-if="generatingCarnetFor === emp.id" class="h-4 w-4 animate-spin" :stroke-width="2.5" />
                                    <IdCard v-else class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                        <!-- OTROS DATOS -->
                        <td class="px-4 py-4">
                            <div class="flex flex-col gap-1.5">
                                <span class="text-xs font-bold text-slate-700">
                                    {{ emp.cargo_nombre }}
                                </span>
                                <div class="flex items-center gap-1.5 text-[10px]">
                                    <span class="font-bold tracking-wider text-slate-400 uppercase">
                                        Nivel Aca.:
                                    </span>
                                    <span class="font-bold text-slate-600 italic">
                                        {{ formatGradoInstruccion(emp.grado_de_intruccion) }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <Calendar class="h-3 w-3 shrink-0 text-slate-400" :stroke-width="2.2" />
                                    <span class="font-medium text-slate-600">
                                        {{ formatFecha(emp.fecha_de_ingreso_al_plantel) }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <!-- CONTACTO / HABITACIÓN -->
                        <td class="px-4 py-4">
                            <div class="flex flex-col gap-1.5">
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <MapPin class="h-3 w-3 shrink-0 text-blue-400" :stroke-width="2.2" />
                                    <span class="font-medium tracking-wide text-slate-600 uppercase">
                                        {{ emp.direccion_de_habitacion ?? '—' }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <Phone class="h-3 w-3 shrink-0 text-emerald-500" :stroke-width="2.2" />
                                    <span class="font-medium text-slate-600">
                                        {{ emp.telefono ?? '—' }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <Mail class="h-3 w-3 shrink-0 text-rose-500" :stroke-width="2.2" />
                                    <span class="truncate font-medium text-blue-600 italic">
                                        {{ emp.correo_electronico ?? '—' }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <!-- LABORAL -->
                       <td class="px-4 py-4">
                            <div class="flex flex-col items-center gap-2">
                                <!-- Botón con Tooltip -->
                                <div class="group/status relative w-full">
                                    <button type="button" :class="[
                                        'flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-sm transition-all hover:shadow-md active:scale-[0.97]',
                                        getStatusColor(emp.color_real).bg,
                                        getStatusColor(emp.color_real).text,
                                    ]" title="Cambiar estado laboral" @click="openToggleModal(emp)">
                                        <span :class="[
                                            'h-1.5 w-1.5 animate-pulse rounded-full',
                                            getStatusColor(emp.color_real).dot,
                                        ]"></span>
                                        {{ emp.situacion_real ?? emp.situacion_laboral }}
                                    </button>
                                    <!-- Tooltip con la descripción (solo si hay detalle) -->
                                    <div v-if="emp.detalle_permiso" class="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover/status:scale-100 group-hover/status:opacity-100">
                                        <div :class="[
                                            'relative flex items-center gap-2 rounded-xl px-3 py-2 whitespace-nowrap text-white shadow-lg',
                                            getStatusColor(emp.color_real).bg,
                                        ]">
                                            <FileText class="h-3 w-3 shrink-0" :stroke-width="2.5" />
                                            <div class="flex flex-col leading-tight">
                                                <span class="text-[9px] font-bold tracking-widest uppercase opacity-80">
                                                    {{ emp.situacion_real }}
                                                </span>
                                                <span class="text-[11px] font-black tracking-wide">
                                                    {{ emp.detalle_permiso }}
                                                </span>
                                            </div>
                                            <!-- Flecha del tooltip -->
                                            <div :class="[
                                                'absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-sm',
                                                getStatusColor(emp.color_real).bg,
                                            ]"></div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-0.5 items-center text-center transition-all hover:border-blue-400 hover:bg-blue-100 hover:shadow-md active:scale-[0.97]" title="Cambiar cargo" @click="openCargoModal(emp)">
                                    <span class="text-[9px] font-bold tracking-wider text-blue-500 uppercase">
                                        Cargo:
                                    </span>
                                    <span class="ml-1 text-[11px] font-black text-blue-800">
                                        {{ emp.cargo_nombre }}
                                    </span>
                                </button>
                            </div>
                        </td>
                        <!-- ACCIONES -->
                        <td class="px-4 py-4">
                            <div class="flex items-center justify-center gap-1.5">
                                <button type="button" @click="handleShow(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-900/20 transition-all hover:bg-blue-600 active:scale-95" title="Ver detalle">
                                    <Eye class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="handleEdit(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-900/20 transition-all hover:bg-blue-600 active:scale-95" title="Editar">
                                    <Pencil class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                               
                                <button type="button" @click="handleImprimir(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500 text-white shadow-sm shadow-violet-900/20 transition-all hover:bg-violet-600 active:scale-95" title="Imprimir documentos">
                                    <FileText class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="handleRetirar(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm shadow-rose-900/20 transition-all hover:bg-rose-600 active:scale-95" title="Retirar">
                                    <Trash2 class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Footer con totales -->
        <template #footerStats>
            <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                Total Registros: <span class="text-blue-600">{{ empleados.total }}</span>
            </span>
        </template>
    </ViewContainer>
    <!-- Modal de cambiar cargo -->
    <ChangeCargoModal v-model:open="showCargoModal" :empleado="cargoTarget" :cargos="cargos" />
    <!-- Modal de cambiar status -->
    <ToggleStatusModal v-model:open="showToggleModal" :empleado="toggleTarget" />
    <!-- Modal de foto -->
    <UploadPhotoModal v-model:open="showPhotoModal" :empleado="photoTarget" />
    <!-- Modal de vista previa del carnet -->
    <CarnetPreviewModal v-model:open="showCarnetModal" :carnet="carnetData" />
    <!-- Modal de documentos -->
    <DocumentosEmpleadoModal v-model:open="showDocumentosModal" :empleado="documentosTarget" />
    <!-- Modal de proceso de generación -->
    <GeneratingProcessModal :open="generatingCarnetFor !== null" title="Generando Carnet" :item-name="generatingCarnetNombre" color="cyan" icon="carnet" />
    <!-- Modal de retirar empleado -->
    <RetirarEmpleadoModal v-model:open="showRetirarModal" :empleado="retirarTarget" />

   
</template>