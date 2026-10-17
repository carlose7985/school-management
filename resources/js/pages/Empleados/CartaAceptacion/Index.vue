<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import {
    ArrowLeft,
    FileSignature,
    Pencil,
    Trash2,
    FileDown,
    User,
    IdCard,
    Briefcase,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import CartaFormModal from './CartaFormModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
            { title: 'Cartas de Aceptación', href: '/empleados/activos/cartas' },
        ],
    },
});

type Cargo = { value: string; label: string };
type Carta = {
    id: number;
    nombres: string;
    apellidos: string;
    documento: string;
    cedula: string;
    sexo: 'M' | 'F';
    tipo_de_personal: string;
    fecha_registro: string;
    nombre_completo: string;
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
    cartas: Paginated<Carta>;
    cargos: Cargo[];
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
            '/empleados/activos/cartas',
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
const editingCarta = ref<Carta | null>(null);

const openCreate = () => {
    editingCarta.value = null;
    showFormModal.value = true;
};

const openEdit = (carta: Carta) => {
    editingCarta.value = carta;
    showFormModal.value = true;
};

// ─────────────────────────────────────────────
// Eliminar
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteTarget = ref<Carta | null>(null);
const deleting = ref(false);

const askDelete = (carta: Carta) => {
    deleteTarget.value = carta;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteTarget.value) return;
    deleting.value = true;
    router.delete(`/empleados/activos/cartas/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            showDeleteModal.value = false;
            deleteTarget.value = null;
        },
    });
};

// ─────────────────────────────────────────────
// Imprimir PDF
// ─────────────────────────────────────────────
const imprimir = (carta: Carta) => {
    window.open(`/empleados/activos/cartas/${carta.id}/imprimir`, '_blank');
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatFecha = (fecha: string) => {
    if (!fecha) return '—';
    const d = new Date(fecha + (fecha.includes('T') ? '' : 'T00:00:00'));
    return d.toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const deleteItemName = computed(() => {
    if (!deleteTarget.value) return '';
    return `${deleteTarget.value.nombre_completo} · ${deleteTarget.value.cedula}`;
});
</script>
<template>
    <Head title="Cartas de Aceptación" />
    <ViewContainer title="Cartas de Aceptación" subtitle="Gestión de ingresos y documentos" icon="FileSignature" v-model:search-value="search" placeholder-search="Buscar por nombre, cédula o documento..." :pagination="cartas" :autofocus-search="true">
        <template #returns>
            <Link href="/empleados/activos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="primary" icon-left="Plus" @click="openCreate">
                Nueva Carta
            </AppButton>
        </template>
        <!-- Tabla -->
        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table class="w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        <th class="px-4 py-3 text-left">Empleado</th>
                        <th class="px-4 py-3 text-left">Cédula</th>
                        <th class="px-4 py-3 text-left">Documento</th>
                        <th class="px-4 py-3 text-left">Cargo</th>
                        <th class="px-4 py-3 text-center">Sexo</th>
                        <th class="px-4 py-3 text-center">Fecha</th>
                        <th class="px-4 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="!cartas.data.length">
                        <td colspan="7" class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center gap-3 text-slate-400">
                                <FileSignature class="h-10 w-10" :stroke-width="1.5" />
                                <p class="text-sm font-bold tracking-wider uppercase">
                                    No hay cartas registradas
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="carta in cartas.data" :key="carta.id" class="transition-colors hover:bg-slate-50/60">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-sm">
                                    <User class="h-5 w-5" :stroke-width="2.2" />
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="text-sm font-bold text-slate-800">
                                        {{ carta.nombre_completo }}
                                    </span>
                                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ carta.sexo === 'M' ? 'Masculino' : 'Femenino' }}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700">
                                <IdCard class="h-3.5 w-3.5 text-slate-400" :stroke-width="2.2" />
                                {{ carta.cedula }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-xs font-medium text-slate-600">
                                {{ carta.documento }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black tracking-wider text-blue-700 uppercase">
                                <Briefcase class="h-3 w-3" :stroke-width="2.5" />
                                {{ carta.cargo_nombre }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span :class="[
                                'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase',
                                carta.sexo === 'M'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-pink-100 text-pink-700',
                            ]">
                                {{ carta.sexo }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="text-xs font-medium text-slate-600">
                                {{ formatFecha(carta.fecha_registro) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" @click="imprimir(carta)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100" title="Imprimir PDF">
                                    <FileDown class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="openEdit(carta)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100" title="Editar">
                                    <Pencil class="h-3.5 w-3.5" :stroke-width="2.5" />
                                </button>
                                <button type="button" @click="askDelete(carta)" class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100" title="Eliminar">
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
                Total: {{ cartas.total }} cartas
            </span>
        </template>
    </ViewContainer>
    <!-- Modal crear/editar -->
    <CartaFormModal v-model:open="showFormModal" :carta="editingCarta" :cargos="cargos" />
    <!-- Modal eliminar -->
    <ConfirmDeleteModal v-model:open="showDeleteModal" title="¿Eliminar carta de aceptación?" description="La carta será eliminada permanentemente del sistema." :item-name="deleteItemName" item-label="Carta a eliminar:" confirm-text="Eliminar" processing-label="Eliminando..." color="red" icon="trash" :processing="deleting" :close-on-confirm="false" @confirm="confirmDelete" />
</template>