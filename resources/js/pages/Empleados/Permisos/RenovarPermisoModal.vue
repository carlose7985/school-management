<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { RefreshCw, Calendar } from '@lucide/vue';
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

type PermisoVencido = {
    id: number;
    empleado_id: number;
    empleado: {
        id: number;
        nombres: string;
        apellidos: string;
        cedula: string;
        documento?: string | null;
    };
    descripcion: string;
    fecha_de_inicio: string;
    fecha_final: string;
    detalle: string;
};

const props = defineProps<{
    open: boolean;
    permiso: PermisoVencido | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'success'): void;
}>();

const motivosEventual = [
    { value: 'Permiso Médico', label: 'Permiso Médico' },
    { value: 'Permiso por Cuido', label: 'Permiso por Cuido' },
    { value: 'Permiso Pre-Post', label: 'Permiso Pre-Post' },
    { value: 'Permiso Solicitado', label: 'Permiso Solicitado' },
    { value: 'Permiso por Vacaciones', label: 'Permiso por Vacaciones' },
    { value: 'Otros Permisos', label: 'Otros Permisos' },
];

const form = ref({
    descripcion: '',
    fecha_de_inicio: '',
    fecha_final: '',
});

const errors = ref<Record<string, string>>({});
const processing = ref(false);
const firstInputRef = ref<any>(null);

const nombreEmpleado = computed(() => {
    if (!props.permiso?.empleado) return '';
    return `${props.permiso.empleado.nombres} ${props.permiso.empleado.apellidos}`.trim();
});

const cedulaCompleta = computed(() => {
    if (!props.permiso?.empleado) return '';
    return `${props.permiso.empleado.documento ?? ''}${props.permiso.empleado.cedula ?? ''}`;
});

watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;
        form.value = {
            descripcion: props.permiso?.descripcion ?? '',
            fecha_de_inicio: '',
            fecha_final: '',
        };
        errors.value = {};
        processing.value = false;

        await nextTick();
        firstInputRef.value?.focus?.();
    },
);

const close = () => {
    if (processing.value) return;
    emit('update:open', false);
};

const submit = async () => {
    if (!props.permiso) return;

    errors.value = {};
    processing.value = true;

    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch(
            `/empleados/activos/permisos/${props.permiso.id}/procesar-vencido`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    accion: 'renovar',
                    tipo: 'Eventual',
                    descripcion: form.value.descripcion,
                    fecha_de_inicio: form.value.fecha_de_inicio,
                    fecha_final: form.value.fecha_final,
                }),
            },
        );

        const data = await res.json();

        if (res.status === 422) {
            const errs: Record<string, string> = {};
            Object.keys(data.errors ?? {}).forEach((k) => {
                errs[k] = data.errors[k][0];
            });
            errors.value = errs;
            return;
        }

        if (!res.ok) {
            throw new Error(data?.message ?? 'Error al renovar.');
        }

        // Si viene whatsapp_message, dispararlo
        if (data.whatsapp_message && typeof window !== 'undefined') {
            // Emitimos un evento global para que el modal de WhatsApp se abra
            window.dispatchEvent(
                new CustomEvent('whatsapp-message', {
                    detail: data.whatsapp_message,
                }),
            );
        }

        emit('success');
        close();
    } catch (e: any) {
        errors.value = { general: e?.message ?? 'Error de conexión.' };
    } finally {
        processing.value = false;
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 via-purple-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-900/20">
                    <RefreshCw class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Renovar Permiso
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Registra las nuevas fechas del permiso
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Info empleado -->
                <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                        <Calendar class="h-5 w-5 text-white" :stroke-width="2.2" />
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
                <!-- Motivo -->
                <FormSelect ref="firstInputRef" v-model="form.descripcion" label="Motivo del Permiso" :options="motivosEventual" placeholder="Seleccionar motivo..." required :error="errors.descripcion" />
                <!-- Fechas -->
                <div class="grid grid-cols-2 gap-3">
                    <FormInput v-model="form.fecha_de_inicio" label="Fecha de Inicio" type="date" required :error="errors.fecha_de_inicio" />
                    <FormInput v-model="form.fecha_final" label="Fecha Final" type="date" required :error="errors.fecha_final" />
                </div>
                <!-- Error general -->
                <div v-if="errors.general" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5">
                    <p class="text-xs font-bold text-rose-700">⚠ {{ errors.general }}</p>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" :disabled="processing" @click="close">
                    Cancelar
                </button>
                <AppButton variant="purple" icon-left="Save" :loading="processing" loading-text="Renovando..." @click="submit">
                    Renovar Permiso
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>