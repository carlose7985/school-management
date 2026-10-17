<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { Calendar, X, Check } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppButton from '@/components/ui/AppButton.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'generate', payload: { year: number; meses: number[] }): void;
}>();

const yearActual = new Date().getFullYear();
const year = ref<number>(yearActual);
const mesesSeleccionados = ref<number[]>([]);
const error = ref('');

const meses = [
    { value: 1, label: 'Ene' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Abr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Ago' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dic' },
];

const todoSeleccionado = computed(() => mesesSeleccionados.value.length === 12);

watch(
    () => props.open,
    (isOpen) => {
        if (!isOpen) return;
        year.value = yearActual;
        mesesSeleccionados.value = [];
        error.value = '';
    },
);

const toggleMes = (mes: number) => {
    const idx = mesesSeleccionados.value.indexOf(mes);
    if (idx >= 0) {
        mesesSeleccionados.value.splice(idx, 1);
    } else {
        mesesSeleccionados.value.push(mes);
    }
};

const toggleTodos = () => {
    if (todoSeleccionado.value) {
        mesesSeleccionados.value = [];
    } else {
        mesesSeleccionados.value = meses.map((m) => m.value);
    }
};

const close = () => {
    emit('update:open', false);
};

const generar = () => {
    if (!mesesSeleccionados.value.length) {
        error.value = 'Selecciona al menos un mes.';
        return;
    }
    if (!year.value || year.value < 2000 || year.value > 2100) {
        error.value = 'Año inválido.';
        return;
    }
    error.value = '';
    emit('generate', {
        year: year.value,
        meses: [...mesesSeleccionados.value].sort((a, b) => a - b),
    });
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/20">
                    <Calendar class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Historial de Asistencias
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Periodo para: {{ empleado?.nombre_completo }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
               
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Año -->
                <div class="flex flex-col gap-1.5">
                    <label class="text-[10px] font-black tracking-wider text-slate-700 uppercase">
                        Año Escolar
                    </label>
                    <input v-model.number="year" type="number" min="2000" max="2100" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-[14px] font-bold tracking-tight text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15" />
                </div>
                <!-- Meses -->
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <label class="text-[10px] font-black tracking-wider text-slate-700 uppercase">
                            Selecciona Meses
                        </label>
                        <button type="button" class="text-[10px] font-black tracking-wider text-blue-600 uppercase transition-colors hover:text-blue-800" @click="toggleTodos">
                            {{ todoSeleccionado ? 'Quitar todos' : 'Todos' }}
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <button v-for="mes in meses" :key="mes.value" type="button" :class="[
                            'flex items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-2 text-[10px] font-black tracking-wider uppercase transition-all',
                            mesesSeleccionados.includes(mes.value)
                                ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/30'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50',
                        ]" @click="toggleMes(mes.value)">
                            <Check v-if="mesesSeleccionados.includes(mes.value)" class="h-3 w-3" :stroke-width="3" />
                            {{ mes.label }}
                        </button>
                    </div>
                </div>
                <!-- Error -->
                <div v-if="error" class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                    <p class="text-[11px] font-bold text-rose-700">⚠ {{ error }}</p>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300" @click="close">
                    Cancelar
                </button>
                <AppButton variant="primary" icon-left="Calendar" @click="generar">
                    Generar
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>