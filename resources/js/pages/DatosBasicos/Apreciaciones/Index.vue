<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import { ArrowLeft, Award, Pencil, Trash2, CheckCircle2, XCircle } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import ApreciacionFormModal from './ApreciacionFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Apreciaciones', href: '/datos/basicos/apreciaciones' },
        ],
    },
});

type Apreciacion = {
    id: number;
    literal: string;
    numeral: string | null;
    status: 'Aprobado' | 'Reprobado';
    nombre_completo?: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

const props = defineProps<{
    apreciaciones: Paginated<Apreciacion>;
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
            '/datos/basicos/apreciaciones',
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
const editingApreciacion = ref<Apreciacion | null>(null);

const openCreate = () => {
    editingApreciacion.value = null;
    showFormModal.value = true;
};

const openEdit = (apreciacion: Apreciacion) => {
    editingApreciacion.value = apreciacion;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Modal eliminar
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteTarget = ref<Apreciacion | null>(null);
const deleting = ref(false);

const askDelete = (apreciacion: Apreciacion) => {
    deleteTarget.value = apreciacion;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteTarget.value) return;
    deleting.value = true;
    router.delete(`/datos/basicos/apreciaciones/${deleteTarget.value.id}`, {
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
const getNombreCompleto = (apreciacion: Apreciacion) => {
    return apreciacion.numeral
        ? `${apreciacion.literal}-${apreciacion.numeral}`
        : apreciacion.literal;
};

const deleteItemName = computed(() => {
    if (!deleteTarget.value) return '';
    return getNombreCompleto(deleteTarget.value);
});
</script>
<template>
    <Head title="Apreciaciones" />
    <ViewContainer title="Apreciaciones" subtitle="Literales y calificaciones del sistema" icon="Award" v-model:search-value="search" placeholder-search="Buscar por literal, numeral o estado..." :pagination="apreciaciones" :autofocus-search="true">
        <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nueva Apreciación
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Literal</th>
                        <th class="px-4 py-3 text-left">Numeral</th>
                        <th class="px-4 py-3 text-center">Estado</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!apreciaciones.data.length">
                        <td colspan="4" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <Award class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay apreciaciones registradas
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="apreciacion in apreciaciones.data" :key="apreciacion.id" class="transition-colors hover:bg-slate-50/60">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-sm">
                                    {{ apreciacion.literal === 'Inasistente' ? 'I' : apreciacion.literal === 'S/D' ? '—' : apreciacion.literal }}
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="text-sm font-bold text-slate-800">
                                        {{ getNombreCompleto(apreciacion) }}
                                    </span>
                                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        Literal
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span v-if="apreciacion.numeral" class="text-sm font-medium text-slate-700">
                                {{ apreciacion.numeral }}
                            </span>
                            <span v-else class="text-xs italic text-slate-400">
                                — sin numeral —
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span v-if="apreciacion.status === 'Aprobado'" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-emerald-700 uppercase">
                                <CheckCircle2 class="h-3 w-3" :stroke-width="2.5" />
                                Aprobado
                            </span>
                            <span v-else class="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-rose-700 uppercase">
                                <XCircle class="h-3 w-3" :stroke-width="2.5" />
                                Reprobado
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" @click="openEdit(apreciacion)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100" title="Editar">
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="askDelete(apreciacion)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100" title="Eliminar">
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
                Total: {{ apreciaciones.total }} apreciaciones
            </span>
        </template>
    </ViewContainer>
    <!-- Modal crear/editar -->
    <ApreciacionFormModal v-model:open="showFormModal" :apreciacion="editingApreciacion" />
    <!-- Modal de confirmación eliminar -->
    <ConfirmDeleteModal v-model:open="showDeleteModal" title="¿Eliminar apreciación?" description="La apreciación será eliminada permanentemente del sistema." :item-name="deleteItemName" item-label="Apreciación a eliminar:" confirm-text="Eliminar" processing-label="Eliminando..." color="red" icon="trash" :processing="deleting" :close-on-confirm="false" @confirm="confirmDelete" />
</template>