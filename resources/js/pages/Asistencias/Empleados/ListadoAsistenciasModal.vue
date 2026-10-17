<script setup lang="ts">
import { ref, watch } from 'vue';
import { FileText, Printer, Loader2 } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import FormSelect from '@/components/forms/FormSelect.vue';

type CargoOption = { value: string; label: string };

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const cargos = ref<CargoOption[]>([]);
const cargoSeleccionado = ref<string>('todos');
const cargando = ref(false);
const generando = ref(false);

// Cargar cargos al abrir
watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;
        await cargarCargos();
        cargoSeleccionado.value = 'todos';
    },
);

const cargarCargos = async () => {
    cargando.value = true;
    try {
        const res = await fetch('/asistencias/empleados/listados-disponibles', {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        cargos.value = [
            { value: 'todos', label: 'Todos los cargos' },
            ...(data.cargos ?? []),
        ];
    } catch (e) {
        console.error('Error cargando cargos:', e);
        cargos.value = [{ value: 'todos', label: 'Todos los cargos' }];
    } finally {
        cargando.value = false;
    }
};

const generarPdf = () => {
    if (generando.value) return;
    generando.value = true;

    const params = new URLSearchParams();
    if (cargoSeleccionado.value && cargoSeleccionado.value !== 'todos') {
        params.append('cargo', cargoSeleccionado.value);
    }

    const url = `/asistencias/empleados/generar-listado?${params.toString()}`;

    // Abrir PDF en nueva pestaña
    window.open(url, '_blank');

    setTimeout(() => {
        generando.value = false;
        emit('update:open', false);
    }, 800);
};

const close = () => {
    if (generando.value) return;
    emit('update:open', false);
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/20">
                    <FileText class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Listado por Cargo
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            Genera el PDF para pasar lista
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-5">
                <!-- Loading -->
                <div v-if="cargando" class="flex items-center justify-center gap-2 py-8">
                    <Loader2 class="h-5 w-5 animate-spin text-amber-500" :stroke-width="2.5" />
                    <span class="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Cargando cargos...
                    </span>
                </div>
                <template v-else>
                    <!-- Info -->
                    <div class="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-2.5">
                        <p class="text-[11px] leading-relaxed text-amber-700">
                            Selecciona <strong>"Todos los cargos"</strong> para generar un solo PDF con todos,
                            o elige uno específico para imprimir solo ese.
                        </p>
                    </div>
                    <!-- Select -->
                    <FormSelect v-model="cargoSeleccionado" label="Seleccionar cargo" :options="cargos" placeholder="Seleccionar cargo..." searchable required />
                </template>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-center border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                <button type="button" :disabled="generando || cargando" class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-xs font-black tracking-widest text-white uppercase shadow-lg shadow-blue-900/20 transition-all hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60" @click="generarPdf">
                    <Loader2 v-if="generando" class="h-4 w-4 animate-spin" :stroke-width="2.5" />
                    <Printer v-else class="h-4 w-4" :stroke-width="2.5" />
                    {{ generando ? 'Generando...' : 'Generar PDF' }}
                </button>
            </div>
        </DialogContent>
    </Dialog>
</template>