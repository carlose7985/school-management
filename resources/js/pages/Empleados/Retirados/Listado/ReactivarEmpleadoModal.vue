<script setup lang="ts">
import { watch, ref } from 'vue';
import { RotateCcw, UserCheck, AlertTriangle } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppButton from '@/components/ui/AppButton.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
    cedula: string;
    iniciales: string;
    sexo: 'M' | 'F';
    cargo_nombre: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'confirm'): void;
}>();

const procesando = ref(false);

watch(
    () => props.open,
    (isOpen) => {
        if (!isOpen) return;
        procesando.value = false;
    },
);

const close = () => {
    if (procesando.value) return;
    emit('update:open', false);
};

const confirmar = () => {
    if (procesando.value) return;
    procesando.value = true;
    emit('confirm');
};

// Resetear el estado cuando el padre cierre el modal
watch(
    () => props.empleado,
    () => {
        procesando.value = false;
    },
);
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-900/20">
                    <RotateCcw class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Reactivar Empleado
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Volver a estado Activo
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Empleado -->
                <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                    <div :class="[
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white shadow-md',
                        empleado?.sexo === 'F'
                            ? 'bg-gradient-to-br from-pink-500 to-pink-600'
                            : 'bg-gradient-to-br from-blue-500 to-blue-600',
                    ]">
                        {{ empleado?.iniciales ?? '—' }}
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col leading-tight">
                        <span class="truncate text-sm font-black tracking-tight text-slate-900 uppercase">
                            {{ empleado?.nombre_completo ?? '—' }}
                        </span>
                        <span class="truncate font-mono text-[11px] font-bold tracking-wide text-slate-500">
                            {{ empleado?.cedula ?? '—' }}
                        </span>
                        <span class="mt-0.5 text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                            {{ empleado?.cargo_nombre ?? '—' }}
                        </span>
                    </div>
                </div>
                <!-- Aviso -->
                <div class="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
                    <AlertTriangle class="h-4 w-4 shrink-0 text-amber-600" :stroke-width="2.5" />
                    <div class="flex flex-col leading-tight">
                        <span class="text-[10px] font-black tracking-widest text-amber-700 uppercase">
                            Confirmar acción
                        </span>
                        <p class="mt-0.5 text-[11px] leading-relaxed font-medium text-amber-800">
                            El empleado volverá a figurar como <strong>Activo</strong> en el listado general.
                            Su motivo de retiro será eliminado.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" :disabled="procesando" class="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" @click="close">
                    Cancelar
                </button>
                <AppButton variant="success" icon-left="UserCheck" :loading="procesando" loading-text="Reactivando..." @click="confirmar">
                    Sí, reactivar
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>