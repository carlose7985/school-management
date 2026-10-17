<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
    AlertTriangle,
    RefreshCw,
    XCircle,
    User,
    IdCard,
    Calendar,
    CheckCircle2,
} from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import RenovarPermisoModal from './RenovarPermisoModal.vue';
import { whatsappModalOpen } from '@/composables/useFlashToast';

type PermisoVencido = {
    id: number;
    empleado_id: number;
    empleado: {
        id: number;
        nombres: string;
        apellidos: string;
        cedula: string;
        documento?: string | null;
        foto: string | null;
        sexo: 'M' | 'F';
    };
    descripcion: string;
    fecha_de_inicio: string;
    fecha_final: string;
    detalle: string;
};

const props = defineProps<{
    open: boolean;
    permisos: PermisoVencido[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'all-processed'): void;
}>();

// Copia local para ir eliminando los procesados
const pendientes = ref<PermisoVencido[]>(
    Array.isArray(props.permisos) ? [...props.permisos] : [],
);

// Estado de procesamiento por permiso
const processingId = ref<number | null>(null);

// Sub-modal de renovación
const showRenovarModal = ref(false);
const renovarTarget = ref<PermisoVencido | null>(null);

// Watcher para sincronizar cuando cambia el prop
watch(
    () => props.permisos,
    (newPermisos) => {
        pendientes.value = Array.isArray(newPermisos) ? [...newPermisos] : [];
    },
);

watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            pendientes.value = Array.isArray(props.permisos)
                ? [...props.permisos]
                : [];
            processingId.value = null;
        }
    },
);

const hayPendientes = computed(() => pendientes.value.length > 0);

// ─────────────────────────────────────────────
// Cancelar (marca como vencido sin crear nuevo)
// ─────────────────────────────────────────────
const cancelar = async (permiso: PermisoVencido) => {
    processingId.value = permiso.id;

    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch(
            `/empleados/activos/permisos/${permiso.id}/procesar-vencido`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
                credentials: 'same-origin',
                body: JSON.stringify({ accion: 'cancelar' }),
            },
        );

        if (!res.ok) throw new Error('Error al cancelar.');

        // Quitar de la lista
        pendientes.value = pendientes.value.filter((p) => p.id !== permiso.id);

        checkAllProcessed();
    } catch (e) {
        console.error(e);
        alert('No se pudo cancelar el permiso.');
    } finally {
        processingId.value = null;
    }
};

// ─────────────────────────────────────────────
// Renovar (abre sub-modal)
// ─────────────────────────────────────────────
const renovar = (permiso: PermisoVencido) => {
    // 🎯 NO abrir si ya hay un modal de WhatsApp activo
    if (whatsappModalOpen.value) {
        return;
    }

    renovarTarget.value = permiso;
    showRenovarModal.value = true;
};

const onRenovarSuccess = () => {
    if (renovarTarget.value) {
        pendientes.value = pendientes.value.filter(
            (p) => p.id !== renovarTarget.value!.id,
        );
    }
    showRenovarModal.value = false;
    renovarTarget.value = null;
    checkAllProcessed();
};

// ─────────────────────────────────────────────
// Verificar si ya no hay pendientes
// ─────────────────────────────────────────────
const checkAllProcessed = () => {
    if (pendientes.value.length === 0) {
        emit('all-processed');
        emit('update:open', false);
    }
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatFecha = (fecha: string): string => {
    if (!fecha) return '—';
    const d = new Date(fecha + (fecha.includes('T') ? '' : 'T00:00:00'));
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
</script>
<template>
   <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-2xl overflow-hidden border-0 p-0 shadow-2xl sm:max-w-2xl [&>button]:hidden" :class="{ 'pointer-events-none': whatsappModalOpen }" @pointer-down-outside.prevent @escape-key-down.prevent @interact-outside.prevent>      <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-5 py-4 dark:border-amber-900/30 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-slate-900">
                <div class="relative">
                    <div class="absolute inset-0 animate-ping rounded-full bg-amber-400/30"></div>
                    <div class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/20">
                        <AlertTriangle class="h-6 w-6 text-white" :stroke-width="2.2" />
                    </div>
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Permisos Vencidos Pendientes
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            Debes procesar cada uno antes de continuar
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <div class="rounded-full bg-amber-100 px-3 py-1 text-xs font-black tracking-wider text-amber-700 uppercase">
                    {{ pendientes.length }} pendiente(s)
                </div>
            </div>
            <!-- Body: Lista de pendientes -->
            <div class="max-h-[60vh] overflow-y-auto p-4">
                <!-- Empty state (no debería pasar) -->
                <div v-if="!hayPendientes" class="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <CheckCircle2 class="h-14 w-14 text-emerald-500" :stroke-width="1.8" />
                    <p class="text-sm font-black tracking-wider text-slate-700 uppercase">
                        Todos los permisos procesados
                    </p>
                </div>
                <!-- Lista -->
                <div v-else class="space-y-3">
                    <div v-for="permiso in pendientes" :key="permiso.id" class="relative overflow-hidden rounded-2xl border border-amber-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                        <!-- Franja superior -->
                        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
                        <!-- Info empleado -->
                        <div class="flex items-start gap-3 pt-1">
                            <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-amber-100 bg-slate-50">
                                <img v-if="permiso.empleado?.foto" :src="`/storage/${permiso.empleado.foto}`" class="h-full w-full object-cover" />
                                <span v-else class="text-[11px] font-black text-slate-400">
                                    {{ (permiso.empleado?.nombres?.[0] ?? '') + (permiso.empleado?.apellidos?.[0] ?? '') }}
                                </span>
                            </div>
                            <div class="flex min-w-0 flex-1 flex-col leading-tight">
                                <span class="truncate text-sm font-black tracking-tight text-slate-900 uppercase">
                                    {{ permiso.empleado?.nombres }} {{ permiso.empleado?.apellidos }}
                                </span>
                                <span class="flex items-center gap-1 font-mono text-[10px] font-bold tracking-wide text-slate-500">
                                    <IdCard class="h-3 w-3" :stroke-width="2.4" />
                                    {{ (permiso.empleado?.documento ?? '') + (permiso.empleado?.cedula ?? '') }}
                                </span>
                            </div>
                        </div>
                        <!-- Detalles del permiso -->
                        <div class="mt-3 rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-2.5">
                            <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
                                <div class="flex items-center gap-1.5">
                                    <span class="font-black tracking-widest text-amber-600 uppercase">
                                        Motivo:
                                    </span>
                                    <span class="font-bold text-slate-800">
                                        {{ permiso.descripcion }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <Calendar class="h-3 w-3 text-slate-400" :stroke-width="2.4" />
                                    <span class="font-bold text-slate-700">
                                        {{ permiso.detalle }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- Botones de acción -->
                        <div class="mt-3 flex items-center justify-end gap-2">
                            <button type="button" :disabled="processingId !== null" class="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-[10px] font-black tracking-wider text-rose-600 uppercase transition-colors hover:bg-rose-100 disabled:opacity-50" @click="cancelar(permiso)">
                                <LoadingSpinner v-if="processingId === permiso.id" size="xs" color="text-rose-600" />
                                <XCircle v-else class="h-3.5 w-3.5" :stroke-width="2.5" />
                                Cancelar
                            </button>
                            <button type="button" :disabled="processingId !== null" class="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-3 py-2 text-[10px] font-black tracking-wider text-white uppercase shadow-sm shadow-violet-900/20 transition-all hover:shadow-md disabled:opacity-50" @click="renovar(permiso)">
                                <RefreshCw class="h-3.5 w-3.5" :stroke-width="2.5" />
                                Renovar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer con advertencia -->
            <div class="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <p class="text-center text-[10px] font-bold tracking-wider text-slate-500 uppercase italic">
                    ⚠ Debes procesar todos los permisos para continuar
                </p>
            </div>
        </DialogContent>
    </Dialog>
    <!-- Sub-modal: Renovar -->
    <RenovarPermisoModal v-model:open="showRenovarModal" :permiso="renovarTarget" @success="onRenovarSuccess" />
</template>