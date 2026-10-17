<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { Calendar, Check, AlertTriangle, X } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/ui/AppButton.vue';



type DiaSinRegistro = {
    fecha: string;
    fecha_formateada: string;
    dia_semana: string;
    dia_numero: string;
};

const props = defineProps<{
    open: boolean;
    dias: DiaSinRegistro[];
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'saved'): void;   // ← NUEVO
}>();


const diasSeleccionados = ref<string[]>([]);
const descripcion = ref('');
const error = ref('');
const processing = ref(false);

watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            diasSeleccionados.value = [];
            descripcion.value = '';
            error.value = '';
            processing.value = false;
        }
    },
);

const toggleDia = (fecha: string) => {
    const idx = diasSeleccionados.value.indexOf(fecha);
    if (idx >= 0) diasSeleccionados.value.splice(idx, 1);
    else diasSeleccionados.value.push(fecha);
};

const todosSeleccionados = computed(
    () => diasSeleccionados.value.length === props.dias.length,
);

const toggleTodos = () => {
    if (todosSeleccionados.value) {
        diasSeleccionados.value = [];
    } else {
        diasSeleccionados.value = props.dias.map((d) => d.fecha);
    }
};

const close = () => {
    if (processing.value) return;
    emit('update:open', false);
};

const guardar = () => {
    if (!diasSeleccionados.value.length) {
        error.value = 'Selecciona al menos un día.';
        return;
    }
    if (!descripcion.value.trim()) {
        error.value = 'Escribe una descripción para los días festivos.';
        return;
    }

    error.value = '';
    processing.value = true;

    router.post(
        '/asistencias/empleados/guardar-festivos',
        {
            dias: diasSeleccionados.value,
            descripcion: descripcion.value.trim(),
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                emit('saved');
                close();
            },
            onFinish: () => {
                processing.value = false;
            },
        },
    );
};
</script>
<template>
    <Dialog :open="open" @update:update:open="close" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/20">
                    <Calendar class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Registrar Días Festivos
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Selecciona los días que son feriados
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Info -->
                <div class="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-2.5">
                    <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600" :stroke-width="2.5" />
                    <p class="text-[11px] leading-relaxed text-amber-700">
                        Los días seleccionados se registrarán como <strong>feriados</strong>. No se contarán como falta de asistencia en los reportes.
                    </p>
                </div>
                <!-- Seleccionar todos -->
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Días sin registro ({{ dias.length }})
                    </span>
                    <button type="button" class="text-[10px] font-black tracking-wider text-blue-600 uppercase transition-colors hover:text-blue-800" @click="toggleTodos">
                        {{ todosSeleccionados ? 'Quitar todos' : 'Seleccionar todos' }}
                    </button>
                </div>
                <!-- Lista de días -->
                <div class="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto">
                    <button v-for="dia in dias" :key="dia.fecha" type="button" :class="[
                        'flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-2.5 transition-all',
                        diasSeleccionados.includes(dia.fecha)
                            ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/30'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50',
                    ]" @click="toggleDia(dia.fecha)">
                        <Check v-if="diasSeleccionados.includes(dia.fecha)" class="h-3 w-3" :stroke-width="3" />
                        <span class="text-[10px] font-black tracking-wider uppercase">
                            {{ dia.dia_semana }}
                        </span>
                        <span class="text-lg font-black">
                            {{ dia.dia_numero }}
                        </span>
                    </button>
                </div>
                <!-- Descripción -->
                <FormInput v-model="descripcion" label="Descripción" placeholder="Ej: Día de la Independencia" transform="sentence" required :error="error" />
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" :disabled="processing" @click="close">
                    Cancelar
                </button>
                <AppButton variant="warning" icon-left="Save" :loading="processing" loading-text="Guardando..." @click="guardar">
                    Guardar Festivos
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>