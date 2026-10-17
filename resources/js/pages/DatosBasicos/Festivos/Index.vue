<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import { ArrowLeft, Calendar, Pencil, Trash2, PartyPopper } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import FestivoFormModal from './FestivoFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Días Festivos', href: '/datos/basicos/festivos' },
        ],
    },
});

type Festivo = {
    id: number;
    fecha: string;
    descripcion: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    festivos: Paginated<Festivo>;
    filters: { search: string };
}>();

// ─────────────────────────────────────────────
// Búsqueda con debounce
// ─────────────────────────────────────────────
const search = ref(props.filters.search);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/datos/basicos/festivos',
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
const editingFestivo = ref<Festivo | null>(null);

const openCreate = () => {
    editingFestivo.value = null;
    showFormModal.value = true;
};

const openEdit = (festivo: Festivo) => {
    editingFestivo.value = festivo;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Modal eliminar
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteTarget = ref<Festivo | null>(null);
const deleting = ref(false);

const askDelete = (festivo: Festivo) => {
    deleteTarget.value = festivo;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteTarget.value) return;
    deleting.value = true;
    router.delete(`/datos/basicos/festivos/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            showDeleteModal.value = false;
            deleteTarget.value = null;
        },
    });
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatFecha = (fecha: string) => {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

const formatFechaLarga = (fecha: string) => {
    if (!fecha) return '';
    const d = new Date(fecha + 'T00:00:00');
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    return d.toLocaleDateString('es-VE', opciones);
};

const deleteItemName = computed(() => {
    if (!deleteTarget.value) return '';
    return `${formatFecha(deleteTarget.value.fecha)} · ${deleteTarget.value.descripcion}`;
});
</script>
<template>
    <Head title="Días Festivos" />
    <ViewContainer title="Días Festivos" subtitle="Calendario escolar y eventos especiales" icon="Calendar" v-model:search-value="search" placeholder-search="Buscar por fecha o descripción..." :pagination="festivos" :autofocus-search="true">
        <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nuevo Festivo
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Fecha</th>
                        <th class="px-4 py-3 text-left">Descripción</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!festivos.data.length">
                        <td colspan="3" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <PartyPopper class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay días festivos registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="festivo in festivos.data" :key="festivo.id" class="transition-colors hover:bg-slate-50/60">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
                                    <span class="text-[9px] font-bold tracking-widest uppercase leading-none">
                                        {{ new Date(festivo.fecha + 'T00:00:00').toLocaleDateString('es-VE', { month: 'short' }).toUpperCase() }}
                                    </span>
                                    <span class="text-lg font-black leading-none">
                                        {{ new Date(festivo.fecha + 'T00:00:00').getDate() }}
                                    </span>
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="text-sm font-bold text-slate-800">
                                        {{ formatFecha(festivo.fecha) }}
                                    </span>
                                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ new Date(festivo.fecha + 'T00:00:00').getFullYear() }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-sm font-medium text-slate-700">
                                {{ festivo.descripcion }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" @click="openEdit(festivo)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100" title="Editar">
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="askDelete(festivo)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100" title="Eliminar">
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
                Total: {{ festivos.total }} días festivos
            </span>
        </template>
    </ViewContainer>
    <!-- Modal crear/editar -->
    <FestivoFormModal v-model:open="showFormModal" :festivo="editingFestivo" />
    <!-- Modal de confirmación eliminar -->
    <ConfirmDeleteModal v-model:open="showDeleteModal" title="¿Eliminar día festivo?" description="El día festivo será eliminado permanentemente del calendario escolar." :item-name="deleteItemName" item-label="Festivo a eliminar:" confirm-text="Eliminar" processing-label="Eliminando..." color="red" icon="trash" :processing="deleting" :close-on-confirm="false" @confirm="confirmDelete" />
</template>