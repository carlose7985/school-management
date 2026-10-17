<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import {
    ArrowLeft,
    Bell,
    FileText,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    Filter,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import GeneratingProcessModal from '@/components/ui/GeneratingProcessModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
            { title: 'Control de Notificaciones', href: '/empleados/activos/notificaciones' },
        ],
    },
});

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    foto: string | null;
    sexo: 'M' | 'F';
    cargo_nombre: string;
    iniciales: string;
};

const props = defineProps<{
    empleados: Empleado[];
    years: number[];
    mesPorDefecto: number;
    yearPorDefecto: number;
    filters: { search: string };
}>();

// ─────────────────────────────────────────────
// Estado
// ─────────────────────────────────────────────
const mes = ref(props.mesPorDefecto);
const year = ref(props.yearPorDefecto);
const search = ref(props.filters.search);

// Resumen por empleado (asistencias, faltas, permisos)
const resumen = ref<Record<number, { asistencias: number; faltas: number; permisos: number }>>({});
const loadingResumen = ref(false);

// Modal de generación
const generating = ref(false);
const generatingNombre = ref('');

const meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

// ─────────────────────────────────────────────
// Cargar resumen cuando cambia mes/año
// ─────────────────────────────────────────────
const cargarResumen = async () => {
    loadingResumen.value = true;
    try {
        const res = await fetch(
            `/empleados/activos/notificaciones/resumen?mes=${mes.value}&year=${year.value}`,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            },
        );
        resumen.value = await res.json();
    } catch (e) {
        console.error('Error cargando resumen:', e);
        resumen.value = {};
    } finally {
        loadingResumen.value = false;
    }
};

watch([mes, year], () => cargarResumen(), { immediate: true });

// ─────────────────────────────────────────────
// Búsqueda
// ─────────────────────────────────────────────
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/empleados/activos/notificaciones',
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
// Generar PDF
// ─────────────────────────────────────────────
const generarPdf = (empleado: Empleado) => {
    generating.value = true;
    generatingNombre.value = `${empleado.nombres} ${empleado.apellidos}`;

    // Abrir el PDF en nueva pestaña
    const url = `/empleados/activos/notificaciones/${empleado.id}/pdf?mes=${mes.value}&year=${year.value}`;
    window.open(url, '_blank');

    // Cerrar modal después de un tiempo
    setTimeout(() => {
        generating.value = false;
        generatingNombre.value = '';
    }, 1000);
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const getResumen = (empId: number) => {
    return resumen.value[empId] ?? { asistencias: 0, faltas: 0, permisos: 0 };
};

const anioActual = computed(() => new Date().getFullYear());
</script>
<template>
    <Head title="Control de Notificaciones" />
    <ViewContainer title="Control de Notificaciones" subtitle="Reportes y alertas automatizadas" icon="Bell" :show-search="false">
        <template #returns>
            <Link href="/empleados/activos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- Filtros -->
        <div class="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <!-- Búsqueda -->
            <div class="relative min-w-[220px] flex-1">
                <input v-model="search" type="search" autofocus placeholder="Buscar empleado..." class="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-3 text-[13px] font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15" />
                <Filter class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" :stroke-width="2.4" />
            </div>
            <!-- Mes -->
            <div class="flex items-center gap-2">
                <label class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                    Mes:
                </label>
                <select v-model="mes" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15">
                    <option v-for="m in meses" :key="m.value" :value="m.value">
                        {{ m.label }}
                    </option>
                </select>
            </div>
            <!-- Año -->
            <div class="flex items-center gap-2">
                <label class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                    Año:
                </label>
                <select v-model="year" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15">
                    <option v-for="y in years" :key="y" :value="y">
                        {{ y }}
                    </option>
                    <option v-if="!years.length" :value="anioActual">
                        {{ anioActual }}
                    </option>
                </select>
            </div>
        </div>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Empleado</th>
                        <th class="px-4 py-3 text-left">Cargo</th>
                        <th class="px-4 py-3 text-center">Asistencias</th>
                        <th class="px-4 py-3 text-center">Faltas</th>
                        <th class="px-4 py-3 text-center">Permisos</th>
                        <th class="px-4 py-3 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!empleados.length">
                        <td colspan="6" class="px-4 py-16 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <Bell class="h-12 w-12" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay empleados registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="emp in empleados" :key="emp.id" class="transition-colors hover:bg-slate-50/60">
                        <!-- Empleado -->
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-100 bg-slate-50">
                                    <img v-if="emp.foto" :src="`/storage/${emp.foto}`" class="h-full w-full object-cover" />
                                    <span v-else class="text-[11px] font-black text-slate-400">
                                        {{ emp.iniciales }}
                                    </span>
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="truncate text-xs font-black tracking-tight text-slate-800 uppercase">
                                        {{ emp.nombres }} {{ emp.apellidos }}
                                    </span>
                                    <span class="font-mono text-[10px] font-bold text-slate-500">
                                        {{ (emp.documento ?? '') + emp.cedula }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <!-- Cargo -->
                        <td class="px-4 py-3">
                            <span class="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black tracking-wider text-blue-700 uppercase">
                                {{ emp.cargo_nombre }}
                            </span>
                        </td>
                        <!-- Asistencias -->
                        <td class="px-4 py-3 text-center">
                            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-emerald-700 uppercase">
                                <CheckCircle2 class="h-3 w-3" :stroke-width="2.5" />
                                {{ getResumen(emp.id).asistencias }}
                            </span>
                        </td>
                        <!-- Faltas -->
                        <td class="px-4 py-3 text-center">
                            <span :class="[
                                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                getResumen(emp.id).faltas > 0
                                    ? 'bg-rose-100 text-rose-700'
                                    : 'bg-slate-100 text-slate-500',
                            ]">
                                <XCircle class="h-3 w-3" :stroke-width="2.5" />
                                {{ getResumen(emp.id).faltas }}
                            </span>
                        </td>
                        <!-- Permisos -->
                        <td class="px-4 py-3 text-center">
                            <span :class="[
                                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                getResumen(emp.id).permisos > 0
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-slate-100 text-slate-500',
                            ]">
                                <Clock class="h-3 w-3" :stroke-width="2.5" />
                                {{ getResumen(emp.id).permisos }}
                            </span>
                        </td>
                        <!-- Acción -->
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end">
                                <button type="button" class="flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-[10px] font-black tracking-wider text-white uppercase shadow-sm shadow-violet-900/20 transition-all hover:bg-violet-600 active:scale-95 disabled:opacity-50" :disabled="generating" title="Generar Notificación" @click="generarPdf(emp)">
                                    <FileText class="h-3.5 w-3.5" :stroke-width="2.5" />
                                    Notificación
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Footer -->
        <template #footerStats>
            <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                Total: <span class="text-blue-600">{{ empleados.length }}</span> empleados activos
            </span>
        </template>
    </ViewContainer>
    <!-- Modal de generación -->
    <GeneratingProcessModal :open="generating" title="Generando Notificación" :item-name="generatingNombre" color="violet" icon="print" />
</template>