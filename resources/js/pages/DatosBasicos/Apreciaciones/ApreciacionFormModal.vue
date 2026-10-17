<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Award, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormInput from '@/components/forms/FormInput.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';

type Apreciacion = {
    id: number;
    literal: string;
    numeral: string | null;
    status: 'Aprobado' | 'Reprobado';
};

const props = defineProps<{
    open: boolean;
    apreciacion: Apreciacion | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.apreciacion);

// Literales: S-D primero
const literales = [
    { value: 'S-D', label: 'S-D' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'Inasistente', label: 'Inasistente' },
];

const estados = [
    { value: 'Aprobado', label: 'Aprobado' },
    { value: 'Reprobado', label: 'Reprobado' },
];

const form = useForm({
    literal: '',
    numeral: '',
    status: '',
});

const firstInputRef = ref<any>(null);

watch(
    () => [props.open, props.apreciacion] as const,
    async ([isOpen, apreciacion]) => {
        if (!isOpen) return;

        if (apreciacion) {
            form.literal = apreciacion.literal;
            form.numeral = apreciacion.numeral ?? '';
            form.status = apreciacion.status;
        } else {
            // Reset manual (no usar form.reset, ver bug de Inertia)
            form.literal = '';
            form.numeral = '';
            form.status = '';
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
    const onSuccess = () => {
        form.literal = '';
        form.numeral = '';
        form.status = '';
        form.clearErrors();
        close();
    };

    if (isEdit.value && props.apreciacion) {
        form.put(`/datos/basicos/apreciaciones/${props.apreciacion.id}`, {
            preserveScroll: true,
            onSuccess,
        });
    } else {
        form.post('/datos/basicos/apreciaciones', {
            preserveScroll: true,
            onSuccess,
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header colorido -->
            <div class="relative flex items-center gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-white px-5 py-4 dark:border-blue-900/30 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-900/20">
                    <Award class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ isEdit ? 'Editar Apreciación' : 'Nueva Apreciación' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ isEdit ? 'Actualiza los datos de la apreciación' : 'Registra una nueva apreciación' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <FormSelect ref="firstInputRef" v-model="form.literal" label="Literal" :options="literales" required :error="form.errors.literal" help="Selecciona el literal de calificación" />
                <FormInput v-model="form.numeral" label="Numeral" placeholder="Opcional — se usará más adelante" :error="form.errors.numeral" help="Déjalo vacío por ahora" />
                <FormSelect v-model="form.status" label="Estado" :options="estados" required :error="form.errors.status" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="primary" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>