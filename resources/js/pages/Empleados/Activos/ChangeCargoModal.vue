<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Briefcase, User } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormSelect from '@/components/forms/FormSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';

type Cargo = { value: number; label: string };
type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    tipo_de_personal: string | null; // ← nombre del cargo (string)
    cargo_nombre: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
    cargos: Cargo[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

// El select guarda el ID internamente, pero enviamos el nombre
const form = useForm({
    tipo_de_personal: null as number | null, // ID del select
});

const selectRef = ref<any>(null);

// ─────────────────────────────────────────────
// Computed: nombre del cargo seleccionado (lo que se envía al backend)
// ─────────────────────────────────────────────
const nombreCargoSeleccionado = computed<string | null>(() => {
    if (form.tipo_de_personal === null) return null;
    const found = props.cargos.find((c) => c.value === form.tipo_de_personal);
    return found?.label ?? null;
});

// Nombre completo del empleado
const nombreEmpleado = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.nombres} ${props.empleado.apellidos}`.trim();
});

const cedulaCompleta = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.documento ?? ''}${props.empleado.cedula ?? ''}`;
});

// ─────────────────────────────────────────────
// Normalizar tipo_de_personal (string nombre) → ID del select
// ─────────────────────────────────────────────
function normalizeTipoPersonal(raw: any, cargos: Cargo[]): number | null {
    if (raw === null || raw === undefined || raw === '') return null;

    // Si ya es numérico
    if (typeof raw === 'number') return raw;
    if (typeof raw === 'string' && /^\d+$/.test(raw.trim())) {
        return Number(raw.trim());
    }

    // Si es un nombre, buscar su ID en el catálogo
    if (typeof raw === 'string') {
        const found = cargos.find(
            (c) => c.label.toLowerCase() === raw.toLowerCase().trim(),
        );
        return found?.value ?? null;
    }

    return null;
}

// Reset al abrir
watch(
    () => [props.open, props.empleado] as const,
    async ([isOpen, empleado]) => {
        if (!isOpen) return;

        if (empleado) {
            form.tipo_de_personal = normalizeTipoPersonal(
                empleado.tipo_de_personal,
                props.cargos,
            );
        } else {
            form.tipo_de_personal = null;
        }

        form.clearErrors();

        await nextTick();
        selectRef.value?.focus?.();
    },
);

const close = () => {
    emit('update:open', false);
};

// ─────────────────────────────────────────────
// Submit — envía tipo_de_personal como NOMBRE (string)
// ─────────────────────────────────────────────
const submit = () => {
    if (!props.empleado) return;
    if (!nombreCargoSeleccionado.value) return; // seguridad

    form
        .transform((data) => ({
            ...data,
            tipo_de_personal: nombreCargoSeleccionado.value,
        }))
        .post(`/empleados/activos/listado/cargo/${props.empleado.id}`, {
            preserveScroll: true,
            onSuccess: () => close(),
            onFinish: () => form.transform((d) => d), // reset transform
        });
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white px-5 py-4 dark:border-emerald-900/30 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-900/20">
                    <Briefcase class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Cambiar Cargo
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            Actualiza el tipo de personal
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Info del empleado -->
                <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
                        <User class="h-5 w-5 text-white" :stroke-width="2.2" />
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col leading-tight">
                        <span class="truncate text-sm font-black tracking-tight text-slate-900 uppercase">
                            {{ nombreEmpleado }}
                        </span>
                        <span class="truncate font-mono text-[11px] font-bold tracking-wide text-slate-500">
                            {{ cedulaCompleta }}
                        </span>
                    </div>
                </div>
                <!-- Cargo actual -->
                <div v-if="empleado?.cargo_nombre" class="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-2.5">
                    <span class="text-[10px] font-black tracking-widest text-blue-500 uppercase">
                        Cargo actual:
                    </span>
                    <span class="text-xs font-black tracking-wide text-blue-800 uppercase">
                        {{ empleado.cargo_nombre }}
                    </span>
                </div>
                <!-- Select de nuevo cargo -->
                <FormSelect ref="selectRef" v-model="form.tipo_de_personal" label="Nuevo Cargo" :options="cargos" placeholder="Seleccionar cargo..." searchable required :error="form.errors.tipo_de_personal" help="Busca por nombre para encontrar el cargo" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" :disabled="form.processing" @click="close">
                    Cancelar
                </Button>
                <AppButton variant="success" icon-left="Save" :loading="form.processing" loading-text="Actualizando..." :disabled="!form.tipo_de_personal" @click="submit">
                    Actualizar Cargo
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>