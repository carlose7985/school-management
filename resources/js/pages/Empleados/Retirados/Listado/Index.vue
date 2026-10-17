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
    FileText,
    Users,
    Cake,
    IdCard,
    RotateCcw,
    UserX,
    Loader2,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import HistorialAsistenciaModal from './HistorialAsistenciaModal.vue';
import ReactivarEmpleadoModal from './ReactivarEmpleadoModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Retirados', href: '/empleados/retirados/listado' },
        ],
    },
});

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    sexo: 'M' | 'F';
    foto: string | null;
    fecha_de_nacimiento: string | null;
    fecha_de_ingreso_al_plantel: string | null;
    direccion_de_habitacion: string | null;
    telefono: string | null;
    correo_electronico: string | null;
    grado_de_intruccion: string | string[] | null;
    tipo_de_personal: string;
    situacion_laboral: string;
    status_de_actualizacion: string | null;
    nombre_completo: string;
    edad: number | null;
    iniciales: string;
    cargo_nombre: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    empleados: Paginated<Empleado>;
    filters: { search: string };
}>();

// ─────────────────────────────────────────────
// Búsqueda con debounce
// ─────────────────────────────────────────────
const search = ref(props.filters.search ?? '');
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/empleados/retirados/listado',
            { search: value || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
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
    if (Array.isArray(grados)) return grados.length ? grados.join(' ') : '—';
    if (typeof grados === 'string') {
        const t = grados.trim();
        if (t.startsWith('[')) {
            try {
                const p = JSON.parse(t);
                return Array.isArray(p) && p.length ? p.join(' ') : '—';
            } catch {
                return t || '—';
            }
        }
        return t || '—';
    }
    return '—';
};

// ─────────────────────────────────────────────
// Acciones
// ─────────────────────────────────────────────
const handleShow = (emp: Empleado) => {
    router.visit(`/empleados/retirados/show/${emp.id}`);
};

// ─────────────────────────────────────────────
// Modal de historial de asistencia
// ─────────────────────────────────────────────
const showHistorialModal = ref(false);
const historialTarget = ref<Empleado | null>(null);
const generandoHistorial = ref(false);

const abrirHistorial = (emp: Empleado) => {
    historialTarget.value = emp;
    showHistorialModal.value = true;
};

const onGenerarHistorial = (payload: { year: number; meses: number[] }) => {
    if (!historialTarget.value) return;

    generandoHistorial.value = true;

    const params = new URLSearchParams();
    params.append('year', String(payload.year));
    payload.meses.forEach((m) => params.append('meses[]', String(m)));

    const url = `/empleados/retirados/historial/${historialTarget.value.id}?${params.toString()}`;
    window.open(url, '_blank');

    setTimeout(() => {
        generandoHistorial.value = false;
        showHistorialModal.value = false;
        historialTarget.value = null;
    }, 800);
};

// ─────────────────────────────────────────────
// Modal de reactivar
// ─────────────────────────────────────────────
const showReactivarModal = ref(false);
const reactivarTarget = ref<Empleado | null>(null);

const abrirReactivar = (emp: Empleado) => {
    reactivarTarget.value = emp;
    showReactivarModal.value = true;
};

const onReactivarConfirmado = () => {
    if (!reactivarTarget.value) return;

    router.post(
        `/empleados/retirados/reactivar/${reactivarTarget.value.id}`,
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                showReactivarModal.value = false;
                reactivarTarget.value = null;
            },
        },
    );
};
</script>
<template>
    <Head title="Empleados Retirados" />
    <ViewContainer title="Directorio de Retirados" subtitle="Personal dado de baja del plantel" icon="UserX" v-model:search-value="search" placeholder-search="Buscar por nombre, cédula..." :pagination="empleados" :autofocus-search="true">
        <template #returns>
            <Link href="/empleados/activos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead>
                    <tr class="bg-rose-700 text-white">
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">Foto</th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">Datos Personales</th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">Otros Datos</th>
                        <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">Contacto</th>
                        <th class="px-4 py-3 text-center text-[10px] font-black tracking-widest uppercase">Retiro</th>
                        <th class="px-4 py-3 text-center text-[10px] font-black tracking-widest uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!empleados.data.length">
                        <td colspan="6" class="px-4 py-16 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <UserX class="h-12 w-12" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay empleados retirados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="emp in empleados.data" :key="emp.id" class="align-top transition-colors hover:bg-slate-50/60">
                        <!-- FOTO -->
                        <td class="px-4 py-4">
                            <div class="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50 shadow-sm">
                                <img v-if="emp.foto" :src="`/storage/${emp.foto}`" :alt="emp.nombre_completo" class="h-full w-full object-cover grayscale" />
                                <span v-else class="text-lg font-black tracking-widest text-slate-300">
                                    {{ emp.iniciales }}
                                </span>
                                <!-- Overlay rojo (retirado) -->
                                <div class="absolute inset-0 ring-2 ring-inset ring-rose-300/50"></div>
                            </div>
                        </td>
                        <!-- DATOS PERSONALES -->
                        <td class="px-4 py-4">
                            <div class="flex flex-col gap-1.5">
                                <span class="text-[13px] leading-tight font-black tracking-tight text-slate-900 uppercase">
                                    {{ emp.nombre_completo }}
                                </span>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <IdCard class="h-3 w-3 text-slate-500" :stroke-width="2.4" />
                                    <span class="font-bold tracking-wide text-slate-700">
                                        {{ (emp.documento ?? 'V-') + emp.cedula }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <Calendar class="h-3 w-3 text-slate-500" :stroke-width="2.4" />
                                    <span class="font-bold tracking-wide text-slate-700">
                                        {{ formatFecha(emp.fecha_de_nacimiento) }}
                                    </span>
                                    <div v-if="emp.edad" class="group/age relative inline-flex">
                                        <button type="button" class="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-sm transition-transform group-hover/age:scale-110">
                                            <Cake class="h-3 w-3" :stroke-width="2.5" />
                                        </button>
                                        <div class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover/age:scale-100 group-hover/age:opacity-100">
                                            <div class="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 whitespace-nowrap text-white shadow-lg">
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
                        </td>
                        <!-- OTROS DATOS -->
                        <td class="px-4 py-4">
                            <div class="flex flex-col gap-1.5">
                                <span class="text-xs font-bold text-slate-700">
                                    {{ emp.cargo_nombre }}
                                </span>
                                <div class="flex items-center gap-1.5 text-[10px]">
                                    <span class="font-bold tracking-wider text-slate-400 uppercase">Nivel Aca.:</span>
                                    <span class="font-bold text-slate-600 italic">
                                        {{ formatGradoInstruccion(emp.grado_de_intruccion) }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 text-[11px]">
                                    <Calendar class="h-3 w-3 shrink-0 text-slate-400" :stroke-width="2.2" />
                                    <span class="font-medium text-slate-600">
                                        Ingreso: {{ formatFecha(emp.fecha_de_ingreso_al_plantel) }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <!-- CONTACTO -->
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
                        <!-- RETIRO -->
                        <td class="px-4 py-4">
                            <div class="flex flex-col items-center gap-2">
                                <div class="group/reason relative w-full">
                                    <div class="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm">
                                        <UserX class="h-3 w-3" :stroke-width="2.5" />
                                        Retirado
                                    </div>
                                    <!-- Tooltip del motivo -->
                                    <div v-if="emp.status_de_actualizacion" class="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-56 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover/reason:scale-100 group-hover/reason:opacity-100">
                                        <div class="relative rounded-xl bg-rose-600 px-3 py-2 text-white shadow-lg">
                                            <div class="flex items-center gap-1.5">
                                                <FileText class="h-3 w-3 shrink-0" :stroke-width="2.5" />
                                                <span class="text-[9px] font-black tracking-widest uppercase opacity-80">
                                                    Motivo del retiro
                                                </span>
                                            </div>
                                            <p class="mt-1 text-[10px] leading-tight font-bold">
                                                {{ emp.status_de_actualizacion }}
                                            </p>
                                            <div class="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-sm bg-rose-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <!-- ACCIONES -->
                        <td class="px-4 py-4">
                            <div class="flex items-center justify-center gap-1.5">
                                <!-- Ver detalle -->
                                <button type="button" @click="handleShow(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-900/20 transition-all hover:bg-blue-600 active:scale-95" title="Ver detalle">
                                    <Eye class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                                <!-- Historial de asistencia -->
                                <button type="button" :disabled="generandoHistorial" @click="abrirHistorial(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500 text-white shadow-sm shadow-violet-900/20 transition-all hover:bg-violet-600 active:scale-95 disabled:opacity-50" title="Historial de asistencia">
                                    <FileText class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                                <!-- Reactivar -->
                                <button type="button" @click="abrirReactivar(emp)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-900/20 transition-all hover:bg-emerald-600 active:scale-95" title="Reactivar empleado">
                                    <RotateCcw class="h-4 w-4" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Footer Stats -->
        <template #footerStats>
            <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                Total Retirados: <span class="text-rose-600">{{ empleados.total }}</span>
            </span>
        </template>
    </ViewContainer>
    <!-- Modal de historial -->
    <HistorialAsistenciaModal v-model:open="showHistorialModal" :empleado="historialTarget" @generate="onGenerarHistorial" />
    <!-- Modal de reactivar -->
    <ReactivarEmpleadoModal v-model:open="showReactivarModal" :empleado="reactivarTarget" @confirm="onReactivarConfirmado" />
</template>