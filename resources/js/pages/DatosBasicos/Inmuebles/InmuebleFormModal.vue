<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Building, X, Plus } from '@lucide/vue';
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
import AreaQuickCreateModal from './AreaQuickCreateModal.vue';

type Area = { value: number; label: string };
type Inmueble = {
    id: number;
    tipo_de_inmueble: string;
    largo: string | number | null;
    ancho: string | number | null;
    alto: string | number | null;
    color: string | null;
    costo_aproximado: string | number | null;
    ubicacion: string | number | null;
    cantidad: number;
    condicion_legal: string;
};

const props = defineProps<{
    open: boolean;
    inmueble: Inmueble | null;
    areas: Area[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'area-created', area: Area): void;
}>();

const isEdit = computed(() => !!props.inmueble);

const condiciones = [
    { value: 'Propio', label: 'Propio' },
    { value: 'Prestado', label: 'Prestado' },
    { value: 'Alquilado', label: 'Alquilado' },
    { value: 'Donado', label: 'Donado' },
];

const form = useForm({
    tipo_de_inmueble: '',
    largo: '',
    ancho: '',
    alto: '',
    color: '',
    costo_aproximado: '',
    ubicacion: null as string | number | null,
    cantidad: '1',
    condicion_legal: 'Propio',
});

// Errores locales para validación de caracteres
const localErrors = ref({
    largo: '',
    ancho: '',
    alto: '',
    costo_aproximado: '',
    cantidad: '',
});

const firstInputRef = ref<any>(null);

// ─────────────────────────────────────────────
// Validación de inputs numéricos
// ─────────────────────────────────────────────
const validateDecimal = (value: string, field: keyof typeof localErrors.value, symbol: string) => {
    if (!value) {
        localErrors.value[field] = '';
        return;
    }
    const regex = symbol === '.' ? /^\d*\.?\d*$/ : /^\d*,?\d*$/;
    if (!regex.test(value)) {
        localErrors.value[field] = `Solo se permiten números y ${symbol === '.' ? 'puntos' : 'comas'}`;
    } else {
        localErrors.value[field] = '';
    }
};

const validateInteger = (value: string, field: keyof typeof localErrors.value) => {
    if (!value) {
        localErrors.value[field] = '';
        return;
    }
    if (!/^\d+$/.test(value)) {
        localErrors.value[field] = 'Solo se permiten números enteros';
    } else {
        localErrors.value[field] = '';
    }
};

// Watchers para validación en vivo
watch(() => form.largo, (v) => validateDecimal(String(v), 'largo', '.'));
watch(() => form.ancho, (v) => validateDecimal(String(v), 'ancho', '.'));
watch(() => form.alto, (v) => validateDecimal(String(v), 'alto', '.'));
watch(() => form.costo_aproximado, (v) => validateDecimal(String(v), 'costo_aproximado', ','));
watch(() => form.cantidad, (v) => validateInteger(String(v), 'cantidad'));

// ─────────────────────────────────────────────
// Modal rápido de área
// ─────────────────────────────────────────────
const showAreaModal = ref(false);

const handleAreaCreated = (area: Area) => {
    emit('area-created', area);
    form.ubicacion = area.value;
};

// ─────────────────────────────────────────────
// Reset al abrir
// ─────────────────────────────────────────────
watch(
    () => [props.open, props.inmueble] as const,
    async ([isOpen, inmueble]) => {
        if (!isOpen) return;

        if (inmueble) {
            form.tipo_de_inmueble = inmueble.tipo_de_inmueble;
            form.largo = inmueble.largo != null ? String(inmueble.largo) : '';
            form.ancho = inmueble.ancho != null ? String(inmueble.ancho) : '';
            form.alto = inmueble.alto != null ? String(inmueble.alto) : '';
            form.color = inmueble.color ?? '';
            form.costo_aproximado = inmueble.costo_aproximado != null ? String(inmueble.costo_aproximado) : '';
            form.ubicacion = inmueble.ubicacion;
            form.cantidad = String(inmueble.cantidad ?? 1);
            form.condicion_legal = inmueble.condicion_legal;
        } else {
            form.tipo_de_inmueble = '';
            form.largo = '';
            form.ancho = '';
            form.alto = '';
            form.color = '';
            form.costo_aproximado = '';
            form.ubicacion = null;
            form.cantidad = '';
            form.condicion_legal = 'Propio';
        }

        form.clearErrors();
        localErrors.value = {
            largo: '',
            ancho: '',
            alto: '',
            costo_aproximado: '',
            cantidad: '',
        };

        await nextTick();
        firstInputRef.value?.focus?.();
    },
);

const close = () => {
    emit('update:open', false);
};

const hasLocalErrors = computed(() =>
    Object.values(localErrors.value).some((e) => e !== ''),
);

const submit = () => {
    if (hasLocalErrors.value) return;

    const onSuccess = () => {
        form.clearErrors();
        close();
    };

    if (isEdit.value && props.inmueble) {
        form.put(`/datos/basicos/inmuebles/${props.inmueble.id}`, {
            preserveScroll: true,
            onSuccess,
        });
    } else {
        form.post('/datos/basicos/inmuebles', {
            preserveScroll: true,
            onSuccess,
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-2xl overflow-hidden border-0 p-0 shadow-2xl sm:max-w-2xl">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-slate-100 via-white to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg shadow-slate-900/20">
                    <Building class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            {{ isEdit ? 'Editar Inmueble' : 'Nuevo Inmueble' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            {{ isEdit ? 'Actualiza los datos del inmueble' : 'Registra un nuevo bien en el inventario' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="max-h-[70vh] overflow-y-auto px-5 py-4">
                <div class="space-y-4">
                    <!-- Tipo -->
                    <FormInput ref="firstInputRef" v-model="form.tipo_de_inmueble" label="Tipo de Inmueble" placeholder="Ej: Aspirador, Silla, Mesa" transform="sentence" required :error="form.errors.tipo_de_inmueble" />
                    <!-- Dimensiones -->
                    <div class="grid grid-cols-3 gap-3">
                        <FormInput v-model="form.largo" label="Largo (m)" placeholder="0.00" :error="form.errors.largo || localErrors.largo" />
                        <FormInput v-model="form.ancho" label="Ancho (m)" placeholder="0.00" :error="form.errors.ancho || localErrors.ancho" />
                        <FormInput v-model="form.alto" label="Alto (m)" placeholder="0.00" :error="form.errors.alto || localErrors.alto" />
                    </div>
                    <!-- Color + Costo -->
                    <div class="grid grid-cols-2 gap-3">
                        <FormInput v-model="form.color" label="Color" placeholder="Ej: Negro mate" transform="title" :error="form.errors.color" />
                        <FormInput v-model="form.costo_aproximado" label="Costo Aproximado" placeholder="0,00" :error="form.errors.costo_aproximado || localErrors.costo_aproximado" />
                    </div>
                    <!-- Ubicación + Cantidad -->
                    <div class="grid grid-cols-2 gap-3">
                        <FormSelect v-model="form.ubicacion" label="Ubicación" :options="areas" placeholder="Seleccionar ubicación..." required :error="form.errors.ubicacion">
                            <template #dropdown-action>
                                <button type="button" class="flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 px-3 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm shadow-emerald-900/20 transition-all hover:shadow-md hover:shadow-emerald-900/30 active:scale-95" title="Crear nueva área" @click.stop="showAreaModal = true">
                                    <Plus :size="13" :stroke-width="2.8" />
                                    Nueva
                                </button>
                            </template>
                        </FormSelect>
                        <FormInput v-model="form.cantidad" label="Cantidad" type="number" placeholder="1" required :error="form.errors.cantidad || localErrors.cantidad" />
                    </div>
                    <!-- Condición legal -->
                    <FormSelect v-model="form.condicion_legal" label="Condición Legal" :options="condiciones" required :error="form.errors.condicion_legal" />
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="primary" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" :disabled="hasLocalErrors" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
    <!-- Sub-modal: crear área -->
    <AreaQuickCreateModal v-model:open="showAreaModal" @created="handleAreaCreated" />
</template>