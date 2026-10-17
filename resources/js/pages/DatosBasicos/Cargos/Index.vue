<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { ArrowLeft, BadgeCheck, Pencil, Power, PowerOff } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import CargoFormModal from './CargoFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Cargos', href: '/datos/basicos/cargos' },
        ],
    },
});

type Cargo = {
    id: number;
    nombre_del_cargo: string;
    status: boolean;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    cargos: Paginated<Cargo>;
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
            '/datos/basicos/cargos',
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
const editingCargo = ref<Cargo | null>(null);

const openCreate = () => {
    editingCargo.value = null;
    showFormModal.value = true;
};

const openEdit = (cargo: Cargo) => {
    editingCargo.value = cargo;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Modal toggle
// ─────────────────────────────────────────────
const showToggleModal = ref(false);
const toggleTarget = ref<Cargo | null>(null);
const toggling = ref(false);

const askToggle = (cargo: Cargo) => {
    toggleTarget.value = cargo;
    showToggleModal.value = true;
};

const confirmToggle = () => {
    if (!toggleTarget.value) return;
    toggling.value = true;
    router.post(
        `/datos/basicos/cargos/${toggleTarget.value.id}/toggle`,
        {},
        {
            preserveScroll: true,
            onFinish: () => {
                toggling.value = false;
                showToggleModal.value = false;
                toggleTarget.value = null;
            },
        },
    );
};
</script>
<template>
    <Head title="Cargos" />
    <ViewContainer title="Cargos" subtitle="Estructura de personal y puestos de trabajo" icon="BadgeCheck" v-model:search-value="search" placeholder-search="Buscar cargo..." :pagination="cargos" :autofocus-search="true">
        <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nuevo Cargo
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Nombre del Cargo</th>
                        <th class="px-4 py-3 text-center">Estado</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!cargos.data.length">
                        <td colspan="3" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <BadgeCheck class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay cargos registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="cargo in cargos.data" :key="cargo.id" class="transition-colors hover:bg-slate-50/60">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm">
                                    <BadgeCheck class="h-5 w-5" :stroke-width="2.2" />
                                </div>
                                <span class="text-sm font-bold text-slate-800">
                                    {{ cargo.nombre_del_cargo }}
                                </span>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span v-if="cargo.status" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-emerald-700 uppercase">
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
                                </span>
                                Activo
                            </span>
                            <span v-else class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                                <span class="h-2 w-2 rounded-full bg-slate-400"></span>
                                Inactivo
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" @click="openEdit(cargo)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100" title="Editar">
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="askToggle(cargo)" :class="[
                                    'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                                    cargo.status
                                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
                                ]" :title="cargo.status ? 'Desactivar' : 'Activar'">
                                    <PowerOff v-if="cargo.status" class="h-3.5 w-3.5" :stroke-width="2.5" />
                                    <Power v-else class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <template #footerStats>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Total: {{ cargos.total }} cargos
            </span>
        </template>
    </ViewContainer>
    <!-- Modal crear/editar -->
    <CargoFormModal v-model:open="showFormModal" :cargo="editingCargo" />
    <!-- Modal de confirmación toggle -->
    <ConfirmDeleteModal v-model:open="showToggleModal" :title="toggleTarget?.status ? '¿Desactivar cargo?' : '¿Activar cargo?'" :description="toggleTarget?.status
        ? 'El cargo pasará a estado inactivo. No se eliminará del sistema.'
        : 'El cargo volverá a estar activo en el sistema.'" :item-name="toggleTarget?.nombre_del_cargo ?? ''" item-label="Cargo a actualizar:" :confirm-text="toggleTarget?.status ? 'Desactivar' : 'Activar'" :processing-label="toggleTarget?.status ? 'Desactivando...' : 'Activando...'" :color="toggleTarget?.status ? 'amber' : 'emerald'" :icon="toggleTarget?.status ? 'power-off' : 'power'" :processing="toggling" :close-on-confirm="false" @confirm="confirmToggle" />
</template>