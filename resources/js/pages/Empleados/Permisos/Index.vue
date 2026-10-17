<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import {
    ArrowLeft,
    CalendarOff,
    Plus,
    Pencil,
    Trash2,
    Filter,
    X,
    FileText,
    FileSpreadsheet,
    Calendar,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import GeneratingProcessModal from '@/components/ui/GeneratingProcessModal.vue';
import PermisoFormModal from './PermisoFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
            { title: 'Permisos y Licencias', href: '/empleados/activos/permisos' },
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
    tipo_de_personal: string | null;
};

type Permiso = {
    id: number;
    empleado_id: number;
    tipo: 'Eventual' | 'Permanente';
    fecha_de_inicio: string | null;
    fecha_final: string | null;
    dia: string | null;
    dias: string[];
    descripcion: string;
    status: 'Activo' | 'Procesando' | 'Permiso Vencido';
    fecha_registro: string;
    detalle: string;
    ids_agrupados: number[];
    empleado?: Empleado;
};

type EmpleadoOption = { value: number; label: string; cedula: string };

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    permisos: Paginated<Permiso>;
    empleados: EmpleadoOption[];
    filters: {
        search: string;
        tipo: string | null;
        status: string | null;
        empleado_id: number | string | null;
        desde: string | null;
        hasta: string | null;
    };
}>();

// ─────────────────────────────────────────────
// Filtros
// ─────────────────────────────────────────────
const search = ref(props.filters.search);
const filterTipo = ref(props.filters.tipo ?? '');
const filterStatus = ref(props.filters.status ?? '');
const filterEmpleadoId = ref<number | null>(
    props.filters.empleado_id ? Number(props.filters.empleado_id) : null,
);
const filterDesde = ref(props.filters.desde ?? '');
const filterHasta = ref(props.filters.hasta ?? '');

const hayFiltrosActivos = computed(
    () =>
        !!search.value ||
        !!filterTipo.value ||
        !!filterStatus.value ||
        filterEmpleadoId.value !== null ||
        !!filterDesde.value ||
        !!filterHasta.value,
);

let timeout: ReturnType<typeof setTimeout> | null = null;

const aplicarFiltros = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        router.get(
            '/empleados/activos/permisos',
            {
                search: search.value || undefined,
                tipo: filterTipo.value || undefined,
                status: filterStatus.value || undefined,
                empleado_id: filterEmpleadoId.value || undefined,
                desde: filterDesde.value || undefined,
                hasta: filterHasta.value || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, 300);
};

watch(
    [search, filterTipo, filterStatus, filterEmpleadoId, filterDesde, filterHasta],
    aplicarFiltros,
);

const limpiarFiltros = () => {
    search.value = '';
    filterTipo.value = '';
    filterStatus.value = '';
    filterEmpleadoId.value = null;
    filterDesde.value = '';
    filterHasta.value = '';
};

// ─────────────────────────────────────────────
// Modal crear/editar
// ─────────────────────────────────────────────
const showFormModal = ref(false);
const editingPermiso = ref<Permiso | null>(null);
const preselectedEmpleadoId = ref<number | null>(null);

const openCreate = () => {
    editingPermiso.value = null;
    preselectedEmpleadoId.value = null;
    showFormModal.value = true;
};

const openEdit = (permiso: Permiso) => {
    editingPermiso.value = permiso;
    preselectedEmpleadoId.value = null;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Eliminar
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteTarget = ref<Permiso | null>(null);
const deleting = ref(false);

const askDelete = (permiso: Permiso) => {
    deleteTarget.value = permiso;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteTarget.value) return;
    deleting.value = true;
    router.delete(`/empleados/activos/permisos/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            showDeleteModal.value = false;
            deleteTarget.value = null;
        },
    });
};

// ─────────────────────────────────────────────
// Reportes
// ─────────────────────────────────────────────
const generating = ref(false);
const generatingTitle = ref('');

const generarReporteGeneral = () => {
    generating.value = true;
    generatingTitle.value = 'Reporte General';

    const params = new URLSearchParams();
    if (filterDesde.value) params.append('desde', filterDesde.value);
    if (filterHasta.value) params.append('hasta', filterHasta.value);
    if (filterStatus.value) params.append('status', filterStatus.value);

    window.open(
        `/empleados/activos/permisos/reporte/general?${params.toString()}`,
        '_blank',
    );

    setTimeout(() => {
        generating.value = false;
        generatingTitle.value = '';
    }, 1000);
};

const generarReporteIndividual = (permiso: Permiso) => {
    generating.value = true;
    generatingTitle.value = `Reporte de ${permiso.empleado?.nombres ?? ''} ${permiso.empleado?.apellidos ?? ''}`;

    const params = new URLSearchParams();
    if (filterDesde.value) params.append('desde', filterDesde.value);
    if (filterHasta.value) params.append('hasta', filterHasta.value);
    if (filterStatus.value) params.append('status', filterStatus.value);

    window.open(
        `/empleados/activos/permisos/reporte/individual/${permiso.empleado_id}?${params.toString()}`,
        '_blank',
    );

    setTimeout(() => {
        generating.value = false;
        generatingTitle.value = '';
    }, 1000);
};

// ─────────────────────────────────────────────
// Helpers
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

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    Activo: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Procesando: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Permiso Vencido': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

const tipoColors: Record<string, string> = {
    Eventual: 'bg-blue-100 text-blue-700',
    Permanente: 'bg-violet-100 text-violet-700',
};

const deleteItemName = computed(() => {
    if (!deleteTarget.value) return '';
    return `${deleteTarget.value.empleado?.nombres} ${deleteTarget.value.empleado?.apellidos} — ${deleteTarget.value.descripcion}`;
});
</script>

<template>
    <Head title="Permisos y Licencias" />

    <ViewContainer
        title="Permisos y Licencias"
        subtitle="Control de ausencias del personal"
        icon="CalendarOff"
        :show-search="false"
        :pagination="permisos"
    >
        <template #returns>
            <Link
                href="/empleados/activos"
                class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]"
            >
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>

        <template #actions>
            <AppButton
                variant="danger"
                icon-left="FileText"
                :disabled="generating"
                @click="generarReporteGeneral"
            >
                Reporte General
            </AppButton>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nuevo Permiso
            </AppButton>
        </template>

        <!-- Filtros -->
        <div class="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <!-- Búsqueda -->
            <div class="relative min-w-[200px] flex-1">
                <input
                    v-model="search"
                    autoFocus
                    type="search"
                    placeholder="Buscar por descripción o empleado..."
                    class="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-3 text-[13px] font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                />
                <Filter class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" :stroke-width="2.4" />
            </div>

            <!-- Tipo -->
            <select
                v-model="filterTipo"
                class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            >
                <option value="">Todos los tipos</option>
                <option value="Eventual">Eventual</option>
                <option value="Permanente">Permanente</option>
            </select>

            <!-- Status -->
            <select
                v-model="filterStatus"
                class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            >
                <option value="">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Permiso Vencido">Permiso Vencido</option>
            </select>

           

            <!-- Desde -->
            <div class="flex items-center gap-1.5">
                <Calendar class="h-3.5 w-3.5 text-slate-400" :stroke-width="2.4" />
                <input
                    v-model="filterDesde"
                    type="date"
                    class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                    title="Fecha de registro desde"
                />
            </div>

            <!-- Hasta -->
            <div class="flex items-center gap-1.5">
                <Calendar class="h-3.5 w-3.5 text-slate-400" :stroke-width="2.4" />
                <input
                    v-model="filterHasta"
                    type="date"
                    class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                    title="Fecha de registro hasta"
                />
            </div>

            <!-- Limpiar -->
            <button
                v-if="hayFiltrosActivos"
                type="button"
                class="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-[11px] font-black tracking-wider text-rose-600 uppercase transition-colors hover:bg-rose-100"
                @click="limpiarFiltros"
            >
                <X class="h-3.5 w-3.5" :stroke-width="2.5" />
                Limpiar
            </button>
        </div>

        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Empleado</th>
                        <th class="px-4 py-3 text-center">Tipo</th>
                        <th class="px-4 py-3 text-left">Detalle</th>
                        <th class="px-4 py-3 text-left">Descripción</th>
                        <th class="px-4 py-3 text-center">Estado</th>
                        <th class="px-4 py-3 text-center">Registro</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!permisos.data.length">
                        <td colspan="7" class="px-4 py-16 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <CalendarOff class="h-12 w-12" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay permisos registrados
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr
                        v-for="permiso in permisos.data"
                        :key="`${permiso.tipo}-${permiso.ids_agrupados.join('-')}`"
                        class="transition-colors hover:bg-slate-50/60"
                    >
                        <!-- Empleado -->
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                                    <img
                                        v-if="permiso.empleado?.foto"
                                        :src="`/storage/${permiso.empleado.foto}`"
                                        class="h-full w-full object-cover"
                                    />
                                    <span v-else class="text-[10px] font-black text-slate-400">
                                        {{ (permiso.empleado?.nombres?.[0] ?? '') + (permiso.empleado?.apellidos?.[0] ?? '') }}
                                    </span>
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="truncate text-xs font-black tracking-tight text-slate-800 uppercase">
                                        {{ permiso.empleado?.nombres }} {{ permiso.empleado?.apellidos }}
                                    </span>
                                    <span class="font-mono text-[10px] font-bold text-slate-500">
                                        {{ (permiso.empleado?.documento ?? '') + (permiso.empleado?.cedula ?? '') }}
                                    </span>
                                </div>
                            </div>
                        </td>

                        <!-- Tipo -->
                        <td class="px-4 py-3 text-center">
                            <span                                :class="[
                                    'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                    tipoColors[permiso.tipo] ?? 'bg-slate-100 text-slate-700',
                                ]"
                            >
                                {{ permiso.tipo }}
                            </span>
                        </td>

                        <!-- Detalle -->
                        <td class="px-4 py-3">
                            <div v-if="permiso.tipo === 'Permanente'" class="flex flex-wrap gap-1">
                                <span
                                    v-for="dia in permiso.dias"
                                    :key="dia"
                                    class="inline-flex items-center rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-black tracking-wider text-violet-700 uppercase"
                                >
                                    {{ dia.slice(0, 3) }}
                                </span>
                            </div>
                            <span v-else class="text-[11px] font-bold text-slate-700">
                                {{ permiso.detalle }}
                            </span>
                        </td>

                        <!-- Descripción -->
                        <td class="px-4 py-3">
                            <span class="line-clamp-2 max-w-xs text-xs text-slate-600 italic">
                                {{ permiso.descripcion }}
                            </span>
                        </td>

                        <!-- Estado -->
                        <td class="px-4 py-3 text-center">
                            <span
                                :class="[
                                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                    statusColors[permiso.status]?.bg,
                                    statusColors[permiso.status]?.text,
                                ]"
                            >
                                <span
                                    :class="[
                                        'h-1.5 w-1.5 rounded-full',
                                        statusColors[permiso.status]?.dot,
                                    ]"
                                ></span>
                                {{ permiso.status }}
                            </span>
                        </td>

                        <!-- Registro -->
                        <td class="px-4 py-3 text-center">
                            <span class="text-[10px] font-bold text-slate-500">
                                {{ formatFecha(permiso.fecha_registro) }}
                            </span>
                        </td>

                        <!-- Acciones -->
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <!-- Reporte Individual (solo Eventual) -->
                                <button
                                    v-if="permiso.tipo === 'Eventual'"
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors hover:bg-violet-100"
                                    title="Reporte individual"
                                    @click="generarReporteIndividual(permiso)"
                                >
                                    <FileSpreadsheet class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>

                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                                    title="Editar"
                                    @click="openEdit(permiso)"
                                >
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>

                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100"
                                    title="Eliminar"
                                    @click="askDelete(permiso)"
                                >
                                    <Trash2 class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template #footerStats>
            <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                Total: <span class="text-orange-600">{{ permisos.total }}</span> permisos
            </span>
        </template>
    </ViewContainer>

    <!-- Modal crear/editar -->
    <PermisoFormModal
        v-model:open="showFormModal"
        :permiso="editingPermiso"
        :empleados="empleados"
        :preselected-empleado-id="preselectedEmpleadoId"
    />

    <!-- Modal eliminar -->
    <ConfirmDeleteModal
        v-model:open="showDeleteModal"
        :title="deleteTarget?.tipo === 'Permanente' ? '¿Eliminar todos los días?' : '¿Eliminar permiso?'"
        :description="deleteTarget?.tipo === 'Permanente'
            ? `Se eliminarán TODOS los días (${deleteTarget?.dias?.join(', ') ?? ''}) de este permiso permanente.`
            : 'El permiso será eliminado permanentemente del sistema.'"
        :item-name="deleteItemName"
        :item-label="deleteTarget?.tipo === 'Permanente' ? 'Permiso a eliminar (todos los días):' : 'Permiso a eliminar:'"
        :confirm-text="deleteTarget?.tipo === 'Permanente' ? 'Eliminar todos' : 'Eliminar'"
        processing-label="Eliminando..."
        color="red"
        icon="trash"
        :processing="deleting"
        :close-on-confirm="false"
        @confirm="confirmDelete"
    />

    <!-- Modal generación de reporte -->
    <GeneratingProcessModal
        :open="generating"
        :title="`Generando ${generatingTitle}`"
        color="violet"
        icon="print"
    />
</template>