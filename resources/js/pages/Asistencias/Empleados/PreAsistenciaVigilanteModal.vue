<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { Shield, CheckCircle2, XCircle, Clock, Save, AlertTriangle, Loader2 } from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppButton from '@/components/ui/AppButton.vue';

type VigilantePre = {
    empleado_id: number;
    nombre_completo: string;
    cedula: string;
    tipo_de_personal: string;
    sexo: 'M' | 'F';
    iniciales: string;
    dias_guardia: string[];
    status_actual: 'Asistio' | 'Falto' | 'Permiso';
    vigilante_guardia_id: number;
};

const props = defineProps<{
    open: boolean;
    cargoId: number;
    fecha: string;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'saved', statuses: Record<number, 'Asistio' | 'Falto' | 'Permiso'>): void;
}>();

const loading = ref(false);
const saving = ref(false);
const vigilantes = ref<VigilantePre[]>([]);
const diaGuardia = ref<string[]>([]);

// Cargar datos al abrir
watch(
    () => props.open,
    async (isOpen) => {
        if (!isOpen) return;
        await cargarPreAsistencia();
    },
);

const cargarPreAsistencia = async () => {
    loading.value = true;
    try {
        const res = await fetch(
            `/asistencias/empleados/pre-asistencia/${props.cargoId}?fecha=${props.fecha}`,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            },
        );
        const data = await res.json();
        vigilantes.value = (data.vigilantes ?? []).map((v: VigilantePre) => ({ ...v }));
        diaGuardia.value = data.dia_guardia ?? [];
    } catch (e) {
        console.error(e);
        vigilantes.value = [];
    } finally {
        loading.value = false;
    }
};

const cambiarStatus = (v: VigilantePre, status: 'Asistio' | 'Falto' | 'Permiso') => {
    v.status_actual = status;
};

const guardar = async () => {
    saving.value = true;
    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch('/asistencias/empleados/guardar-pre-asistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                registros: vigilantes.value.map((v) => ({
                    empleado_id: v.empleado_id,
                    status: v.status_actual,
                })),
            }),
        });

        if (!res.ok) throw new Error('Error al guardar la pre-asistencia.');

        // 🎯 Construir el mapa de statuses: { empleado_id: status }
        const statuses: Record<number, 'Asistio' | 'Falto' | 'Permiso'> = {};
        vigilantes.value.forEach((v) => {
            statuses[v.empleado_id] = v.status_actual;
        });

        emit('saved', statuses);
        emit('update:open', false);
    } catch (e) {
        console.error(e);
        alert('No se pudo guardar la pre-asistencia.');
    } finally {
        saving.value = false;
    }
};

const close = () => {
    if (saving.value) return;
    emit('update:open', false);
};

const tituloGuardia = computed(() => {
    if (!diaGuardia.value.length) return 'Sin guardia anterior';
    return 'Guardia del ' + diaGuardia.value.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
});
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-3xl overflow-hidden border-0 p-0 shadow-2xl sm:max-w-3xl">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-900/20">
                    <Shield class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Pre-Asistencia de Vigilantes
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            {{ tituloGuardia }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="max-h-[60vh] overflow-y-auto px-5 py-4">
                <!-- Loading -->
                <div v-if="loading" class="flex flex-col items-center justify-center gap-3 py-12">
                    <Loader2 class="h-8 w-8 animate-spin text-blue-500" :stroke-width="2.5" />
                    <p class="text-xs font-bold tracking-widest text-slate-500 uppercase">
                        Cargando pre-asistencia...
                    </p>
                </div>
                <!-- Vacío -->
                <div v-else-if="!vigilantes.length" class="flex flex-col items-center justify-center gap-3 py-12">
                    <AlertTriangle class="h-12 w-12 text-amber-500" :stroke-width="1.8" />
                    <p class="text-sm font-black tracking-wider text-slate-600 uppercase">
                        No hay vigilantes con guardia anterior
                    </p>
                    <p class="text-xs text-slate-400 italic">
                        Ningún vigilante tuvo guardia el {{ diaGuardia.join(', ') || 'día anterior' }}.
                    </p>
                </div>
                <!-- Lista -->
                <div v-else class="space-y-2">
                    <div class="mb-3 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50/60 px-3 py-2.5">
                        <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-blue-600" :stroke-width="2.5" />
                        <p class="text-[11px] leading-relaxed text-blue-700">
                            Marca el status de cada vigilante que tuvo guardia el
                            <strong>{{ diaGuardia.join(', ') }}</strong>. Este status se heredará en los próximos días.
                        </p>
                    </div>
                    <div v-for="v in vigilantes" :key="v.empleado_id" class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md">
                        <!-- Info -->
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-[11px] font-black text-white">
                            {{ v.iniciales }}
                        </div>
                        <div class="flex min-w-0 flex-1 flex-col leading-tight">
                            <span class="truncate text-xs font-black tracking-tight text-slate-800 uppercase">
                                {{ v.nombre_completo }}
                            </span>
                            <span class="font-mono text-[10px] font-bold text-slate-500">
                                {{ v.cedula }} · {{ v.tipo_de_personal }}
                            </span>
                        </div>
                        <!-- Botones -->
                        <div class="flex items-center gap-1.5">
                            <button type="button" :class="[
                                'flex h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-black tracking-wider uppercase transition-all',
                                v.status_actual === 'Asistio'
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600',
                            ]" @click="cambiarStatus(v, 'Asistio')">
                                <CheckCircle2 class="h-3.5 w-3.5" :stroke-width="2.5" />
                                Presente
                            </button>
                            <button type="button" :class="[
                                'flex h-9 w-9 items-center justify-center rounded-full transition-all',
                                v.status_actual === 'Falto'
                                    ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600',
                            ]" title="Falto" @click="cambiarStatus(v, 'Falto')">
                                <XCircle class="h-4 w-4" :stroke-width="2.5" />
                            </button>
                            <button type="button" :class="[
                                'flex h-9 w-9 items-center justify-center rounded-full transition-all',
                                v.status_actual === 'Permiso'
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-600',
                            ]" title="Permiso" @click="cambiarStatus(v, 'Permiso')">
                                <Clock class="h-4 w-4" :stroke-width="2.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" :disabled="saving" @click="close">
                    Cerrar
                </button>
                <AppButton v-if="vigilantes.length > 0" variant="primary" icon-left="Save" :loading="saving" loading-text="Guardando..." @click="guardar">
                    Guardar Pre-Asistencia
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>