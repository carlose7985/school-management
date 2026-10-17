<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { GraduationCap, X } from '@lucide/vue';
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
import FormMultiselect from '@/components/forms/FormMultiselect.vue';
import AppButton from '@/components/ui/AppButton.vue';

type Docente = { value: number; label: string; cedula: string };

type Grado = {
    id: number;
    nombre_del_grado: string;
    seccion: string;
    docente: number[] | null;
    limite_de_estudiantes: number | null;
    status: boolean;
};

const props = defineProps<{
    open: boolean;
    grado: Grado | null;
    docentes: Docente[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.grado);

const grados = [
    { value: '1er Grado', label: '1er Grado' },
    { value: '2do Grado', label: '2do Grado' },
    { value: '3er Grado', label: '3er Grado' },
    { value: '4to Grado', label: '4to Grado' },
    { value: '5to Grado', label: '5to Grado' },
    { value: '6to Grado', label: '6to Grado' },
];

const secciones = [
    { value: 'A', label: 'Sección A' },
    { value: 'B', label: 'Sección B' },
    { value: 'C', label: 'Sección C' },
    { value: 'D', label: 'Sección D' },
    { value: 'E', label: 'Sección E' },
    { value: 'F', label: 'Sección F' },
    { value: 'U', label: 'Sección U' },
];

const form = useForm({
    nombre_del_grado: '',
    seccion: '',
    docente: [] as number[],
    limite_de_estudiantes: '' as string | number,
});

const firstInputRef = ref<any>(null);

// Reset / cargar al abrir
watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;

        if (props.grado) {
            form.nombre_del_grado = props.grado.nombre_del_grado;
            form.seccion = props.grado.seccion;
            form.docente = props.grado.docente ?? [];
            // Cargar limpio: si es null/0, queda vacío (sin ceros)
            form.limite_de_estudiantes =
                props.grado.limite_de_estudiantes && props.grado.limite_de_estudiantes > 0
                    ? props.grado.limite_de_estudiantes
                    : '';
        } else {
            form.nombre_del_grado = '';
            form.seccion = '';
            form.limite_de_estudiantes = '';
            form.docente = [];
            form.limite_de_estudiantes = '';

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
    if (isEdit.value && props.grado) {
        form.put(`/datos/basicos/grados/${props.grado.id}`, {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    } else {
        form.post('/datos/basicos/grados', {
            preserveScroll: true,
            onSuccess: () => close(),
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header colorido -->
            <div class="relative flex items-center gap-3 border-b border-purple-100 bg-gradient-to-r from-fuchsia-50 via-purple-50 to-white px-5 py-4 dark:border-purple-900/30 dark:from-purple-950/40 dark:via-fuchsia-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg shadow-purple-900/20">
                    <GraduationCap class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ isEdit ? 'Editar Grado' : 'Nuevo Grado' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ isEdit ? 'Actualiza los datos del grado' : 'Registra un nuevo grado en el sistema' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="max-h-[60vh] overflow-y-auto px-5 py-4">
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <FormSelect ref="firstInputRef" v-model="form.nombre_del_grado" label="Nombre del Grado" :options="grados" placeholder="Seleccionar grado..." required :error="form.errors.nombre_del_grado" />
                        <FormSelect v-model="form.seccion" label="Sección" :options="secciones" placeholder="Seleccionar sección..." required :error="form.errors.seccion" />
                    </div>
                    <FormMultiselect v-model="form.docente" label="Docentes (máx. 2)" :options="docentes" placeholder="Seleccionar docentes..." :error="form.errors.docente" help="Puedes asignar hasta 2 docentes por grado" />
                    <FormInput v-model="form.limite_de_estudiantes" label="Límite de Estudiantes" type="number" placeholder="" :error="form.errors.limite_de_estudiantes" />
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="purple" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>