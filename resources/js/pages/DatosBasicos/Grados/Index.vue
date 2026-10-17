<script setup lang="ts">
import { Head, router, Link } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { QrCode, Power, PowerOff, Users, Hash, GraduationCap, Pencil , ArrowLeft } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import GradoFormModal from './GradoFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Grados', href: '/datos/basicos/grados' },
        ],
    },
});

type Docente = { value: number; label: string; cedula: string };
type Grado = {
    id: number;
    nombre_del_grado: string;
    seccion: string;
    docente: number[] | null;
    docentes_nombres: string;
    limite_de_estudiantes: number | null;
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
    grados: Paginated<Grado>;
    docentes: Docente[];
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
            '/datos/basicos/grados',
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
const editingGrado = ref<Grado | null>(null);

const openCreate = () => {
    editingGrado.value = null;
    showFormModal.value = true;
};

const openEdit = (grado: Grado) => {
    editingGrado.value = grado;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Modal toggle (activar/desactivar)
// ─────────────────────────────────────────────
const showToggleModal = ref(false);
const toggleTarget = ref<Grado | null>(null);
const toggling = ref(false);

const askToggle = (grado: Grado) => {
    toggleTarget.value = grado;
    showToggleModal.value = true;
};

const confirmToggle = () => {
    if (!toggleTarget.value) return;
    toggling.value = true;
    router.post(
        `/datos/basicos/grados/${toggleTarget.value.id}/toggle`,
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

// ─────────────────────────────────────────────
// QR
// ─────────────────────────────────────────────
const printQr = (grado: Grado) => {
    window.open(`/datos/basicos/grados/${grado.id}/qr`, '_blank');
};


</script>

<template>
    <Head title="Grados" />

    <ViewContainer
        title="Grados"
        subtitle="Estructura académica por grado y sección"
        icon="GraduationCap"
        v-model:search-value="search"
        placeholder-search="Buscar por grado o sección..."
        :pagination="grados"
    >
       <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 active:scale-[0.97]">
            <ArrowLeft :size="16" :stroke-width="2.5" />
            Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nuevo Grado
            </AppButton>
        </template>

        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Grado / Sección</th>
                        <th class="px-4 py-3 text-left">Docentes</th>
                        <th class="px-4 py-3 text-center">Límite</th>
                        <th class="px-4 py-3 text-center">Estado</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!grados.data.length">
                        <td colspan="5" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <GraduationCap class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold uppercase tracking-wider">
                                    No hay grados registrados
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr
                        v-for="grado in grados.data"
                        :key="grado.id"
                        class="transition-colors hover:bg-slate-50/60"
                    >
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-sm">
                                    <GraduationCap class="h-5 w-5" :stroke-width="2.2" />
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="text-sm font-bold text-slate-800">
                                        {{ grado.nombre_del_grado }}
                                    </span>
                                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        Sección {{ grado.seccion }}
                                    </span>
                                </div>
                            </div>
                        </td>

                        <td class="px-4 py-3">
                            <div class="flex items-start gap-2">
                                <Users class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" :stroke-width="2" />
                                <span class="text-xs font-medium text-slate-600 italic">
                                    {{ grado.docentes_nombres }}
                                </span>
                            </div>
                        </td>

                        <td class="px-4 py-3 text-center">
                            <span class="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                                <Hash class="h-3 w-3" :stroke-width="2.5" />
                                {{ grado.limite_de_estudiantes ?? 0 }}
                            </span>
                        </td>

                        <td class="px-4 py-3 text-center">
                            <span
                                v-if="grado.status"
                                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-emerald-700 uppercase"
                            >
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
                                </span>
                                Activo
                            </span>
                            <span
                                v-else
                                class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black tracking-widest text-slate-500 uppercase"
                            >
                                <span class="h-2 w-2 rounded-full bg-slate-400"></span>
                                Inactivo
                            </span>
                        </td>

                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button
                                    type="button"
                                    @click="openEdit(grado)"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                                    title="Editar"
                                >
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>

                                <button
                                    type="button"
                                    @click="askToggle(grado)"
                                    :class="[
                                        'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                                        grado.status
                                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
                                    ]"
                                    :title="grado.status ? 'Desactivar' : 'Activar'"
                                >
                                    <PowerOff v-if="grado.status" class="h-3.5 w-3.5" :stroke-width="2.5" />
                                    <Power v-else class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>

                                <button
                                    type="button"
                                    @click="printQr(grado)"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors hover:bg-violet-100"
                                    title="Imprimir QR"
                                >
                                    <QrCode class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template #footerStats>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Total: {{ grados.total }} grados
            </span>
        </template>
    </ViewContainer>

    <!-- Modal crear/editar -->
    <GradoFormModal
        v-model:open="showFormModal"
        :grado="editingGrado"
        :docentes="docentes"
    />

    <!-- Modal de confirmación toggle -->
    <ConfirmDeleteModal
        v-model:open="showToggleModal"
        :title="toggleTarget?.status ? '¿Desactivar grado?' : '¿Activar grado?'"
        :description="toggleTarget?.status
            ? 'El grado pasará a estado inactivo. No se eliminará del sistema.'
            : 'El grado volverá a estar activo en el sistema.'"
        :item-name="toggleTarget ? `${toggleTarget.nombre_del_grado} - Sección ${toggleTarget.seccion}` : ''"
        item-label="Grado a actualizar:"
        :confirm-text="toggleTarget?.status ? 'Desactivar' : 'Activar'"
        :processing-label="toggleTarget?.status ? 'Desactivando...' : 'Activando...'"
        :color="toggleTarget?.status ? 'amber' : 'emerald'"
        :icon="toggleTarget?.status ? 'power-off' : 'power'"
        :processing="toggling"
        :close-on-confirm="false"
        @confirm="confirmToggle"
    />
</template>