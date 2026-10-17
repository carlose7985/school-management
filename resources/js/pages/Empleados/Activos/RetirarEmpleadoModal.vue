<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { LogOut, X, User, AlertTriangle } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormSelect from '@/components/forms/FormSelect.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    nombre_completo: string;
    situacion_laboral: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

// ─────────────────────────────────────────────
// Opciones del motivo
// ─────────────────────────────────────────────
const motivos = [
    { value: 'Jubilación', label: 'Jubilación' },
    { value: 'Renuncia', label: 'Renuncia Voluntaria' },
    { value: 'Traslado', label: 'Traslado' },
    { value: 'Despido', label: 'Despido Justificado' },
    { value: 'Fallecimiento', label: 'Fallecimiento' },
    { value: 'Fin de Contrato', label: 'Fin de Contrato' },
    { value: 'Otro', label: 'Otro' },
];

const form = useForm({
    motivo_retiro: '',
    observacion: '',
});

const selectRef = ref<any>(null);

const nombreEmpleado = computed(() => props.empleado?.nombre_completo ?? '');
const cedulaCompleta = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.documento ?? ''}${props.empleado.cedula ?? ''}`;
});

// Reset al abrir
watch(
    () => [props.open, props.empleado] as const,
    async ([isOpen, empleado]) => {
        if (!isOpen) return;

        form.motivo_retiro = '';
        form.observacion = '';
        form.clearErrors();

        await nextTick();
        selectRef.value?.focus?.();
    },
);

const close = () => {
    if (form.processing) return;
    emit('update:open', false);
};

const submit = () => {
    if (!props.empleado) return;

    form.post(`/empleados/activos/listado/retirar/${props.empleado.id}`, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            form.reset();
            close();
        },
    });
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-rose-100 bg-gradient-to-r from-rose-50 via-red-50 to-white px-5 py-4 dark:border-rose-900/30 dark:from-rose-950/40 dark:via-red-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-900/20">
                    <LogOut class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Retirar Empleado
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            Registro de baja del personal
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Info empleado -->
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
                <!-- Advertencia -->
                <div class="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3">
                    <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600" :stroke-width="2.5" />
                    <div class="flex flex-col gap-1">
                        <p class="text-[11px] font-black tracking-wider text-amber-800 uppercase">
                            Esta acción es importante
                        </p>
                        <p class="text-[11px] text-amber-700 leading-relaxed">
                            El empleado pasará a estado <strong>Retirado</strong> y sus permisos activos se desactivarán.
                            No se eliminará del sistema.
                        </p>
                    </div>
                </div>
                <!-- Motivo -->
                <FormSelect ref="selectRef" v-model="form.motivo_retiro" label="Motivo del Retiro" :options="motivos" placeholder="Seleccionar motivo..." searchable required :error="form.errors.motivo_retiro" />
                <!-- Observación -->
                <div class="flex flex-col gap-1.5">
                    <label class="text-[10px] font-bold tracking-wider text-slate-800 uppercase">
                        Observación <span class="text-slate-400 italic">(opcional)</span>
                    </label>
                    <textarea v-model="form.observacion" rows="3" maxlength="500" placeholder="Detalles adicionales sobre el retiro..." class="w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[13px] font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 placeholder:italic focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"></textarea>
                    <div class="flex items-center justify-between">
                        <span v-if="form.errors.observacion" class="text-[11px] font-semibold text-red-500">
                            {{ form.errors.observacion }}
                        </span>
                        <span v-else></span>
                        <span class="text-[10px] text-slate-400 italic">
                            {{ form.observacion.length }}/500
                        </span>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" :disabled="form.processing" @click="close">
                    Cancelar
                </button>
                <AppButton variant="danger" icon-left="LogOut" :loading="form.processing" loading-text="Retirando..." @click="submit">
                    Confirmar Retiro
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>