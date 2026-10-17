<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { FileSignature, X } from '@lucide/vue';
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
};

const props = defineProps<{
    open: boolean;
    carta: Carta | null;
    cargos: Cargo[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.carta);

const documentos = [
    { value: 'V-', label: 'V- (Venezolano)' },
    { value: 'E-', label: 'E- (Extranjero)' },
    { value: 'J-', label: 'J- (Jurídico)' },
    { value: 'P-', label: 'P- (Pasaporte)' },
];

const sexos = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
];

const form = useForm({
    nombres: '',
    apellidos: '',
    documento: 'V-',
    cedula: '',
    sexo: '' as '' | 'M' | 'F',
    tipo_de_personal: '',
    fecha_registro: new Date().toISOString().slice(0, 10),
});

const firstInputRef = ref<any>(null);

watch(
    () => [props.open, props.carta] as const,
    async ([isOpen, carta]) => {
        if (!isOpen) return;

        if (carta) {
            form.nombres = carta.nombres;
            form.apellidos = carta.apellidos;
            // Extraer prefijo de la cédula si existe
            const cedulaCompleta = carta.cedula ?? '';
            const match = cedulaCompleta.match(/^(V-|E-|J-|P-)(.+)$/);
            if (match) {
                form.documento = match[1];
                form.cedula = match[2];
            } else {
                form.documento = 'V-';
                form.cedula = cedulaCompleta;
            }
            form.sexo = carta.sexo;
            form.tipo_de_personal = carta.tipo_de_personal;
            form.fecha_registro = carta.fecha_registro;
        } else {
            form.nombres = '';
            form.apellidos = '';
            form.documento = 'V-';
            form.cedula = '';
            form.sexo = '';
            form.tipo_de_personal = '';
            form.fecha_registro = new Date().toISOString().slice(0, 10);
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
    // Concatenar prefijo + cédula al enviar
    const payload = {
        ...form.data(),
       
    };

    const onSuccess = () => {
        form.clearErrors();
        close();
    };

    if (isEdit.value && props.carta) {
        form.transform(() => payload).put(
            `/empleados/activos/cartas/${props.carta.id}`,
            { preserveScroll: true, onSuccess },
        );
    } else {
        form.transform(() => payload).post('/empleados/activos/cartas', {
            preserveScroll: true,
            onSuccess,
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-xl overflow-hidden border-0 p-0 shadow-2xl sm:max-w-xl">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-cyan-100 bg-gradient-to-r from-cyan-50 via-sky-50 to-white px-5 py-4 dark:border-cyan-900/30 dark:from-cyan-950/40 dark:via-sky-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-900/20">
                    <FileSignature class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ isEdit ? 'Editar Carta' : 'Nueva Carta de Aceptación' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ isEdit ? 'Actualiza los datos de la carta' : 'Registra un nuevo ingreso' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="max-h-[70vh] overflow-y-auto px-5 py-4">
                <div class="space-y-4">
                    <!-- Nombres + Apellidos -->
                    <div class="grid grid-cols-2 gap-4">
                        <FormInput ref="firstInputRef" v-model="form.nombres" label="Nombres" placeholder="Ej: Carlos Eduardo" transform="title" required :error="form.errors.nombres" />
                        <FormInput v-model="form.apellidos" label="Apellidos" placeholder="Ej: Martínez Pérez" transform="title" required :error="form.errors.apellidos" />
                    </div>
                    <!-- Documento + Cédula -->
                    <div class="grid grid-cols-2 gap-4">
                        <FormSelect v-model="form.documento" label="Documento" :options="documentos" required :error="form.errors.documento" />
                        <FormInput v-model="form.cedula" label="Cédula" placeholder="12345678" maxlength="8" transform="digits" required :error="form.errors.cedula" />
                    </div>
                    <!-- Sexo + Fecha -->
                    <div class="grid grid-cols-2 gap-4">
                        <FormSelect v-model="form.sexo" label="Sexo" :options="sexos" placeholder="Seleccionar..." required :error="form.errors.sexo" />
                        <FormInput v-model="form.fecha_registro" label="Fecha de Registro" type="date" required :error="form.errors.fecha_registro" />
                    </div>
                    <!-- Cargo -->
                    <FormSelect v-model="form.tipo_de_personal" label="Cargo / Designación" :options="cargos" placeholder="Seleccionar cargo..." searchable required :error="form.errors.tipo_de_personal" help="Se carga desde la tabla de Cargos" />
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="info" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>