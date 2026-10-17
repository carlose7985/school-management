<script setup lang="ts">
import { ref } from 'vue';
import { AlertTriangle, Calendar } from '@lucide/vue';
import DiasFestivosModal from './DiasFestivosModal.vue';

type DiaSinRegistro = {
    fecha: string;
    fecha_formateada: string;
    dia_semana: string;
    dia_numero: string;
};

const props = defineProps<{
    dias: DiaSinRegistro[];
    cargoNombre: string;
}>();

const showModal = ref(false);

const abrirModal = () => {
    showModal.value = true;
};
</script>
<template>
    <div class="overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md shadow-amber-500/10">
        <div class="flex items-center gap-3 px-4 py-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-900/20">
                <AlertTriangle class="h-5 w-5 text-white" :stroke-width="2.5" />
            </div>
            <div class="flex flex-1 flex-col leading-tight">
                <span class="text-xs font-black tracking-wider text-amber-800 uppercase">
                    ⚠ {{ dias.length }} día(s) sin registro en este mes
                </span>
                <span class="text-[11px] font-bold text-amber-700">
                    Se detectaron días laborables sin asistencia cargada para el cargo <strong>{{ cargoNombre }}</strong>.
                </span>
            </div>
            <button type="button" class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-[11px] font-black tracking-wider text-white uppercase shadow-lg shadow-amber-900/20 transition-all hover:from-amber-600 hover:to-orange-600 active:scale-[0.98]" @click="abrirModal">
                <Calendar class="h-4 w-4" :stroke-width="2.5" />
                Gestionar
            </button>
        </div>
        <!-- Modal de días festivos -->
        <DiasFestivosModal v-model:open="showModal" :dias="dias" />
    </div>
</template>