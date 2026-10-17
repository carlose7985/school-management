<script setup lang="ts">
import { ref, watch } from 'vue';
import {
    FileText,
    FileCheck,
    FileSignature,
    CalendarClock,
    CalendarDays,
    X,
} from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import RegistrarDestinoModal from './RegistrarDestinoModal.vue';
import HistorialAsistenciaModal from './HistorialAsistenciaModal.vue';
import GeneratingProcessModal from '@/components/ui/GeneratingProcessModal.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    nombre_completo: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

// Estado de sub-modales
const showDestinoModal = ref(false);
const showHistorialModal = ref(false);
const generating = ref(false);
const generatingType = ref<string>('');

// Reset al abrir
watch(
    () => props.open,
    (isOpen) => {
        if (!isOpen) {
            showDestinoModal.value = false;
            showHistorialModal.value = false;
            generating.value = false;
        }
    },
);

// ─────────────────────────────────────────────
// Opciones
// ─────────────────────────────────────────────
const documentos = [
    {
        type: 'ficha-tecnica',
        label: 'Ficha Técnica',
        descripcion: 'Datos completos del empleado',
        icon: FileText,
        color: 'blue',
        gradient: 'from-blue-500 to-blue-600',
        needsExtra: false,
    },
    {
        type: 'constancia-liberacion',
        label: 'Constancia Liberación',
        descripcion: 'Requiere destino',
        icon: FileCheck,
        color: 'emerald',
        gradient: 'from-emerald-500 to-green-600',
        needsExtra: true,
        extraType: 'destino',
    },
    {
        type: 'fiel-cumplimiento',
        label: 'Fiel Cumplimiento',
        descripcion: 'Carta de cabal cumplimiento',
        icon: FileSignature,
        color: 'violet',
        gradient: 'from-violet-500 to-purple-600',
        needsExtra: false,
    },
    {
        type: 'historial-asistencia',
        label: 'Historial Asistencias',
        descripcion: 'Requiere año y meses',
        icon: CalendarClock,
        color: 'amber',
        gradient: 'from-amber-500 to-orange-600',
        needsExtra: true,
        extraType: 'historial',
    },
    {
        type: 'solicitud-vacaciones',
        label: 'Solicitud de Vacaciones',
        descripcion: 'Formato de solicitud',
        icon: CalendarDays,
        color: 'rose',
        gradient: 'from-rose-500 to-pink-600',
        needsExtra: false,
    },
];

// ─────────────────────────────────────────────
// Descargar / Generar PDF
// ─────────────────────────────────────────────
const descargarPdf = async (payload: any, tipoLabel: string) => {
    if (!props.empleado) return;

    generating.value = true;
    generatingType.value = tipoLabel;

    try {
        const csrfToken = (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        const res = await fetch('/export/empleados/documento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/pdf, application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                empleadoId: props.empleado.id,
                ...payload,
            }),
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error('Error al generar PDF: ' + errText);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        // Abrir el PDF en nueva pestaña
        window.open(url, '_blank');

        // Liberar después de un tiempo
        setTimeout(() => URL.revokeObjectURL(url), 60000);

        // Cerrar modal principal
        emit('update:open', false);
    } catch (e: any) {
        console.error(e);
        alert(e?.message ?? 'No se pudo generar el PDF.');
    } finally {
        generating.value = false;
        generatingType.value = '';
    }
};

// ─────────────────────────────────────────────
// Click en cada opción
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Click en cada opción
// ─────────────────────────────────────────────
const handleOption = async (doc: any) => {
    if (doc.needsExtra) {
        if (doc.extraType === 'destino') {
            // 🎯 Verificar si ya tiene destino registrado
            if (!props.empleado) return;

            generating.value = true;
            generatingType.value = 'Verificando...';

            try {
                const res = await fetch(
                    `/empleados/activos/listado/check/${props.empleado.id}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    },
                );

                const data = await res.json();

                if (data.exists || data.tiene_destino) {
                    // Ya tiene destino → generar directo
                    generating.value = false;
                    generatingType.value = '';
                    descargarPdf(
                        { type: 'constancia-liberacion' },
                        'Constancia Liberación',
                    );
                } else {
                    // No tiene destino → abrir sub-modal
                    generating.value = false;
                    generatingType.value = '';
                    showDestinoModal.value = true;
                }
            } catch (e: any) {
                generating.value = false;
                generatingType.value = '';
                console.error(e);
                // En caso de error, abrir el sub-modal por si acaso
                showDestinoModal.value = true;
            }

            return;
        }

        if (doc.extraType === 'historial') {
            showHistorialModal.value = true;
            return;
        }
    }

    // Generar directo
    descargarPdf({ type: doc.type }, doc.label);
};

// ─────────────────────────────────────────────
// Callbacks de los sub-modales
// ─────────────────────────────────────────────
const handleDestinoSuccess = () => {
    showDestinoModal.value = false;
    descargarPdf({ type: 'constancia-liberacion' }, 'Constancia Liberación');
};

const handleHistorialSuccess = (payload: { year: number; meses: number[] }) => {
    showHistorialModal.value = false;
    descargarPdf(
        { type: 'historial-asistencia', ...payload },
        'Historial Asistencias',
    );
};

const close = () => {
    if (generating.value) return;
    emit('update:open', false);
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg shadow-slate-900/20">
                    <FileText class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            Documentos del Empleado
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            {{ empleado?.nombre_completo }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
                
            </div>
            <!-- Cédula info -->
            <div class="border-b border-slate-100 bg-slate-50/60 px-5 py-2.5">
                <div class="flex items-center justify-between text-[10px] font-black tracking-widest uppercase">
                    <span class="text-slate-400">Cédula:</span>
                    <span class="font-mono text-slate-700">
                        {{ (empleado?.documento ?? '') + (empleado?.cedula ?? '') }}
                    </span>
                </div>
            </div>
            <!-- Lista de documentos -->
            <div class="max-h-[60vh] overflow-y-auto p-2">
                <button v-for="doc in documentos" :key="doc.type" type="button" :disabled="generating" class="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50" @click="handleOption(doc)">
                    <div :class="[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform group-hover:scale-110',
                        doc.gradient,
                    ]">
                        <component :is="doc.icon" class="h-5 w-5" :stroke-width="2.3" />
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col leading-tight">
                        <span class="truncate text-xs font-black tracking-wider text-slate-800 uppercase">
                            {{ doc.label }}
                        </span>
                        <span class="truncate text-[10px] font-medium text-slate-400 italic">
                            {{ doc.descripcion }}
                        </span>
                    </div>
                    <div v-if="doc.needsExtra" class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>
        </DialogContent>
    </Dialog>
    <!-- Sub-modal: Registrar Destino -->
    <RegistrarDestinoModal v-model:open="showDestinoModal" :empleado="empleado" @success="handleDestinoSuccess" />
    <!-- Sub-modal: Historial Asistencia -->
    <HistorialAsistenciaModal v-model:open="showHistorialModal" :empleado="empleado" @generate="handleHistorialSuccess" />
    <!-- Modal de generación -->
    <GeneratingProcessModal :open="generating" :title="`Generando ${generatingType}`" :item-name="empleado?.nombre_completo ?? ''" color="blue" icon="print" />
</template>