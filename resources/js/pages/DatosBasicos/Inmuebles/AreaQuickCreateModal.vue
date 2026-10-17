<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { Briefcase, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'created', area: { value: number; label: string }): void;
}>();

const nombre = ref('');
const error = ref('');
const processing = ref(false);
const firstInputRef = ref<any>(null);

watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;
        nombre.value = '';
        error.value = '';
        await nextTick();
        firstInputRef.value?.focus?.();
    },
);

const close = () => {
    emit('update:open', false);
};

const submit = async () => {
    if (!nombre.value.trim()) {
        error.value = 'El nombre es obligatorio.';
        return;
    }

    processing.value = true;
    error.value = '';

    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch('/datos/basicos/areas/store/fast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
            },
            credentials: 'same-origin',
            body: JSON.stringify({ nombre_del_area: nombre.value.trim() }),
        });

        const data = await res.json();

        if (!res.ok) {
            error.value =
                data?.errors?.nombre_del_area?.[0] ??
                data?.message ??
                'No se pudo crear el área.';
            processing.value = false;
            return;
        }

        emit('created', data.area);
        processing.value = false;
        close();
    } catch (e) {
        error.value = 'Error de conexión. Intenta de nuevo.';
        processing.value = false;
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-sm overflow-hidden border-0 p-0 shadow-2xl sm:max-w-sm">
            <div class="relative flex items-center gap-3 border-b border-lime-100 bg-gradient-to-r from-lime-50 via-green-50 to-white px-5 py-4 dark:border-lime-900/30 dark:from-lime-950/40 dark:via-green-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-lime-500 to-lime-600 shadow-lg shadow-lime-900/20">
                    <Briefcase class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Nueva Área
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            Creación rápida desde Inmuebles
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <div class="px-5 py-4">
                <FormInput ref="firstInputRef" v-model="nombre" label="Nombre del Área" placeholder="Ej: Coordinación Académica" transform="upper" required :error="error" help="Se guardará en mayúsculas automáticamente" @keyup.enter="submit" />
            </div>
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="success" icon-left="Plus" :loading="processing" loading-text="Creando..." @click="submit">
                    Crear Área
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>