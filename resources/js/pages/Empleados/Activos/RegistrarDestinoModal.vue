<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { MapPin, X } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'success'): void;
}>();

const destino = ref('');
const error = ref('');
const processing = ref(false);
const inputRef = ref<any>(null);

watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;
        destino.value = '';
        error.value = '';
        processing.value = false;
        await nextTick();
        inputRef.value?.focus?.();
    },
);

const close = () => {
    if (processing.value) return;
    emit('update:open', false);
};

const guardar = async () => {
    if (!props.empleado) return;

    if (!destino.value.trim()) {
        error.value = 'El destino es obligatorio.';
        return;
    }

    processing.value = true;
    error.value = '';

    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch('/empleados/activos/listado/storeDestino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                empleado_id: props.empleado.id,
                destino: destino.value.trim(),
            }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data?.message ?? 'No se pudo guardar el destino.');
        }

        emit('success');
    } catch (e: any) {
        error.value = e?.message ?? 'Error de conexión.';
    } finally {
        processing.value = false;
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-900/20">
                    <MapPin class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Registrar Destino
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Institución de destino / cargo
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="px-5 py-4">
                <FormInput ref="inputRef" v-model="destino" label="Institución de Destino / Cargo" placeholder="Ej: E.B. Carlos Rafael Contreras" transform="upper" required :error="error" help="Se guardará para futuras constancias" @keyup.enter="guardar" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300" :disabled="processing" @click="close">
                    Cancelar
                </button>
                <AppButton variant="success" icon-left="Save" :loading="processing" loading-text="Guardando..." @click="guardar">
                    Guardar y Generar
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>