<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Calendar, X } from '@lucide/vue';
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

type Festivo = {
    id: number;
    fecha: string;
    descripcion: string;
};

const props = defineProps<{
    open: boolean;
    festivo: Festivo | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.festivo);

const form = useForm({
    fecha: '',
    descripcion: '',
});

const firstInputRef = ref<any>(null);

watch(
    () => [props.open, props.festivo] as const,
    async ([isOpen, festivo]) => {
        if (!isOpen) return;

        if (festivo) {
            form.fecha = festivo.fecha;
            form.descripcion = festivo.descripcion;
        } else {
            // 🎯 Asignación manual (no usar form.reset())
            form.fecha = '';
            form.descripcion = '';
        }

        form.clearErrors();

        await nextTick();
        firstInputRef.value?.focus?.();
    },
);
const close = () => {
    emit('update:open', false);
};

const submit = () => {
    if (isEdit.value && props.festivo) {
        form.put(`/datos/basicos/festivos/${props.festivo.id}`, {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    } else {
        form.post('/datos/basicos/festivos', {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header colorido -->
            <div class="relative flex items-center gap-3 border-b border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-white px-5 py-4 dark:border-orange-900/30 dark:from-orange-950/40 dark:via-amber-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-900/20">
                    <Calendar class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ isEdit ? 'Editar Día Festivo' : 'Nuevo Día Festivo' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ isEdit ? 'Actualiza los datos del festivo' : 'Registra un evento especial en el calendario' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <FormInput ref="firstInputRef" v-model="form.fecha" label="Fecha" type="date" required :error="form.errors.fecha" />
                <FormInput v-model="form.descripcion" label="Descripción" placeholder="Ej: Día de la Independencia" transform="sentence" required :error="form.errors.descripcion" help="Motivo o nombre del día festivo" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="warning" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>