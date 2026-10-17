<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import {
    ArrowLeft,
    Building,
    Pencil,
    Trash2,
    QrCode,
    FileDown,
    FileSpreadsheet,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import InmuebleFormModal from './InmuebleFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Inmuebles', href: '/datos/basicos/inmuebles' },
        ],
    },
});

type Area = { value: number; label: string };
type Inmueble = {
    id: number;
    tipo_de_inmueble: string;
    largo: string | number | null;
    ancho: string | number | null;
    alto: string | number | null;
    color: string | null;
    costo_aproximado: string | number | null;
    ubicacion: string | number | null;
    ubicacion_nombre?: string;
    cantidad: number;
    condicion_legal: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    inmuebles: Paginated<Inmueble>;
    areas: Area[];
    filters: { search: string };
}>();

// Áreas como ref local (para agregar nuevas desde el quick-modal sin recargar)
const areas = ref<Area[]>([...props.areas]);

watch(
    () => props.areas,
    (newVal) => {
        // Re-sincronizar solo si cambia la cantidad
        if (newVal.length !== areas.value.length) {
            areas.value = [...newVal];
        }
    },
);

const handleAreaCreated = (area: Area) => {
    // Agregar a la lista local si no está ya
    if (!areas.value.some((a) => a.value === area.value)) {
        areas.value = [...areas.value, area].sort((a, b) =>
            a.label.localeCompare(b.label),
        );
    }
};

// ─────────────────────────────────────────────
// Búsqueda
// ─────────────────────────────────────────────
const search = ref(props.filters.search);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/datos/basicos/inmuebles',
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, 250);
});

// ─────────────────────────────────────────────
// Modal crear/editar
// ─────────────────────────────────────────────
const showFormModal = ref(false);
const editingInmueble = ref<Inmueble | null>(null);

const openCreate = () => {
    editingInmueble.value = null;
    showFormModal.value = true;
};

const openEdit = (inmueble: Inmueble) => {
    editingInmueble.value = inmueble;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Eliminar
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteTarget = ref<Inmueble | null>(null);
const deleting = ref(false);

const askDelete = (inmueble: Inmueble) => {
    deleteTarget.value = inmueble;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteTarget.value) return;
    deleting.value = true;
    router.delete(`/datos/basicos/inmuebles/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            showDeleteModal.value = false;
            deleteTarget.value = null;
        },
    });
};

// ─────────────────────────────────────────────
// Exportaciones y QR
// ─────────────────────────────────────────────
const exportPdf = () => {
    const params = new URLSearchParams({ search: search.value }).toString();
    window.open(`/datos/basicos/inmuebles/export/pdf?${params}`, '_blank');
};

const exportExcel = () => {
    const params = new URLSearchParams({ search: search.value }).toString();
    window.location.href = `/datos/basicos/inmuebles/export/excel?${params}`;
};

const printQr = (inmueble: Inmueble) => {
    window.open(`/datos/basicos/inmuebles/${inmueble.id}/qr`, '_blank');
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatDimensiones = (i: Inmueble) => {
    const parts = [i.largo, i.ancho, i.alto].map((v) =>
        v != null && v !== '' ? Number(v) : null,
    );
    if (parts.every((p) => p === null)) return '—';
    return parts.map((p) => (p === null ? '—' : p)).join(' × ');
};

const formatCosto = (i: Inmueble) => {
    if (i.costo_aproximado == null || i.costo_aproximado === '') return '—';
    const num = Number(i.costo_aproximado);
    if (isNaN(num)) return '—';
    return `$${num.toFixed(2).replace('.', ',')}`;
};

const condicionColor: Record<string, string> = {
    Propio: 'bg-emerald-100 text-emerald-700',
    Prestado: 'bg-amber-100 text-amber-700',
    Alquilado: 'bg-blue-100 text-blue-700',
    Donado: 'bg-violet-100 text-violet-700',
};

const deleteItemName = computed(() => {
    if (!deleteTarget.value) return '';
    return `${deleteTarget.value.tipo_de_inmueble} · ${deleteTarget.value.ubicacion_nombre ?? deleteTarget.value.ubicacion}`;
});
</script>
<template>
    <Head title="Inmuebles" />
    <ViewContainer title="Inmuebles" subtitle="Inventario general" icon="Building" v-model:search-value="search" placeholder-search="Buscar por tipo, ubicación, color o condición..." :pagination="inmuebles" :autofocus-search="true">
        <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="success" icon-left="Plus" @click="openCreate">
                Nuevo Inmueble
            </AppButton>
            <AppButton variant="danger" icon-left="FileDown" @click="exportPdf">
                PDF
            </AppButton>
            <AppButton variant="success" icon-left="FileSpreadsheet" @click="exportExcel">
                Excel
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Tipo</th>
                        <th class="px-4 py-3 text-left">Ubicación</th>
                        <th class="px-4 py-3 text-center">Dimensiones</th>
                        <th class="px-4 py-3 text-center">Cant.</th>
                        <th class="px-4 py-3 text-center">Costo</th>
                        <th class="px-4 py-3 text-center">Condición</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!inmuebles.data.length">
                        <td colspan="7" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <Building class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay inmuebles registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="inmueble in inmuebles.data" :key="inmueble.id" class="transition-colors hover:bg-slate-50/60">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
                                    <Building class="h-5 w-5" :stroke-width="2.2" />
                                </div>
                                <span class="text-sm font-bold text-slate-800">
                                    {{ inmueble.tipo_de_inmueble }}
                                </span>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-xs font-medium text-slate-600">
                                {{ inmueble.ubicacion_nombre ?? inmueble.ubicacion ?? '—' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="text-xs font-mono font-bold text-slate-700">
                                {{ formatDimensiones(inmueble) }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                                {{ inmueble.cantidad }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="text-xs font-bold text-emerald-600">
                                {{ formatCosto(inmueble) }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span :class="[
                                'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                condicionColor[inmueble.condicion_legal] ?? 'bg-slate-100 text-slate-700',
                            ]">
                                {{ inmueble.condicion_legal }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" @click="printQr(inmueble)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors hover:bg-violet-100" title="Imprimir QR">
                                    <QrCode class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="openEdit(inmueble)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100" title="Editar">
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="askDelete(inmueble)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100" title="Eliminar">
                                    <Trash2 class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <template #footerStats>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Total: {{ inmuebles.total }} inmuebles
            </span>
        </template>
    </ViewContainer>
    <!-- Modal crear/editar -->
    <InmuebleFormModal v-model:open="showFormModal" :inmueble="editingInmueble" :areas="areas" @area-created="handleAreaCreated" />
    <!-- Modal eliminar -->
    <ConfirmDeleteModal v-model:open="showDeleteModal" title="¿Eliminar inmueble?" description="El inmueble será eliminado permanentemente del inventario." :item-name="deleteItemName" item-label="Inmueble a eliminar:" confirm-text="Eliminar" processing-label="Eliminando..." color="red" icon="trash" :processing="deleting" :close-on-confirm="false" @confirm="confirmDelete" />
</template>