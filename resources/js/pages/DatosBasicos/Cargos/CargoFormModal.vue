<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { BadgeCheck, X } from '@lucide/vue';
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

type Cargo = {
    id: number;
    nombre_del_cargo: string;
    status: boolean;
};

const props = defineProps<{
    open: boolean;
    cargo: Cargo | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.cargo);

const form = useForm({
    nombre_del_cargo: '',
});

const firstInputRef = ref<any>(null);

watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;

        if (props.cargo) {
            form.nombre_del_cargo = props.cargo.nombre_del_cargo;
        } else {
            form.nombre_del_cargo = '';
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
    if (isEdit.value && props.cargo) {
        form.put(`/datos/basicos/cargos/${props.cargo.id}`, {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    } else {
        form.post('/datos/basicos/cargos', {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header colorido (esmeralda para diferenciar de Áreas que es lima) -->
            <div class="relative flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white px-5 py-4 dark:border-emerald-900/30 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-900/20">
                    <BadgeCheck class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ isEdit ? 'Editar Cargo' : 'Nuevo Cargo' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ isEdit ? 'Actualiza los datos del cargo' : 'Registra un nuevo cargo en el sistema' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="px-5 py-4">
                <FormInput ref="firstInputRef" v-model="form.nombre_del_cargo" label="Nombre del Cargo" placeholder="Ej: Director Académico" transform="title" required :error="form.errors.nombre_del_cargo" help="Ejemplo: Docente, Coordinador, Director" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="success" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>