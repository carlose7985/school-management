<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { CalendarOff, Check, Calendar, RefreshCw, AlertTriangle, Loader2 } from '@lucide/vue';
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

type EmpleadoOption = { value: number; label: string; cedula: string };

type Permiso = {
    id: number;
    empleado_id: number;
    tipo: 'Eventual' | 'Permanente';
    fecha_de_inicio: string | null;
    fecha_final: string | null;
    dia: string | null;
    dias: string[];
    descripcion: string;
    status: string;
    ids_agrupados: number[];
};

const props = defineProps<{
    open: boolean;
    permiso: Permiso | null;
    empleados: EmpleadoOption[];
    preselectedEmpleadoId?: number | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const isEdit = computed(() => !!props.permiso);

// ═══════════════════════════════════════════════
// Catálogos
// ═══════════════════════════════════════════════
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const motivosEventual = [
    { value: 'Permiso Médico', label: 'Permiso Médico' },
    { value: 'Permiso por Cuido', label: 'Permiso por Cuido' },
    { value: 'Permiso Pre-Post', label: 'Permiso Pre-Post' },
    { value: 'Permiso Solicitado', label: 'Permiso Solicitado' },
    { value: 'Permiso por Vacaciones', label: 'Permiso por Vacaciones' },
    { value: 'Otros Permisos', label: 'Otros Permisos' },
];

const motivosPermanente = [
    { value: 'Permiso por Cuido', label: 'Permiso por Cuido' },
    { value: 'Permiso por Estudios', label: 'Permiso por Estudios' },
    { value: 'Permiso Especial', label: 'Permiso Especial' },
];

// ═══════════════════════════════════════════════
// Formulario
// ═══════════════════════════════════════════════
const form = useForm({
    empleado_id: null as number | null,
    tipo: '' as '' | 'Eventual' | 'Permanente',
    fecha_de_inicio: '',
    fecha_final: '',
    dias: [] as string[],
    descripcion: '',
});
watch(
    () => form.empleado_id,
    (val) => console.log('👤 form.empleado_id cambió a:', val),
);
const motivosOptions = computed(() =>
    form.tipo === 'Eventual' ? motivosEventual : motivosPermanente,
);

const firstInputRef = ref<any>(null);
const checking = ref(false);
const conflicto = ref<{
    tipo: string;
    mensaje: string;
    permiso?: any;
    dias_en_conflicto?: string[];
} | null>(null);

// Guardar los IDs del grupo en un ref local (para saber qué excluir al verificar)
const idsGrupoActual = ref<number[]>([]);
// ═══════════════════════════════════════════════
// Helper: normalizar fecha a 'YYYY-MM-DD'
// ═══════════════════════════════════════════════
const normalizarFecha = (fecha: string | null | undefined): string => {
    if (!fecha) return '';
    // Si ya es YYYY-MM-DD, devolver tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
    // Extraer los primeros 10 caracteres (YYYY-MM-DD)
    const match = fecha.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : '';
};
// ═══════════════════════════════════════════════
// Reset al abrir
// ═══════════════════════════════════════════════
watch(
    () => [props.open, props.permiso, props.preselectedEmpleadoId] as const,
    async ([isOpen, permiso, preselected]) => {
        if (!isOpen) return;

        if (permiso) {
            form.empleado_id = permiso.empleado_id;
            form.tipo = permiso.tipo;
            form.fecha_de_inicio = normalizarFecha(permiso.fecha_de_inicio);
            form.fecha_final = normalizarFecha(permiso.fecha_final);
            form.dias = permiso.tipo === 'Permanente' && permiso.dias?.length
                ? [...permiso.dias]
                : [];
            form.descripcion = permiso.descripcion;

            idsGrupoActual.value = permiso.ids_agrupados ?? [permiso.id];
        } else {
            form.empleado_id = preselected ?? null;
            form.tipo = '';
            form.fecha_de_inicio = '';
            form.fecha_final = '';
            form.dias = [];
            form.descripcion = '';

            idsGrupoActual.value = [];
        }

        form.clearErrors();
        conflicto.value = null;
        checking.value = false;

        await nextTick();
        firstInputRef.value?.focus?.();
    },
);

// Resetear datos al cambiar tipo (solo creación)
watch(
    () => form.tipo,
    (nuevo, anterior) => {
        if (!props.open) return;
        if (nuevo !== anterior && !props.permiso) {
            form.fecha_de_inicio = '';
            form.fecha_final = '';
            form.dias = [];
            form.descripcion = '';
        }
    },
);
let conflictoDebounce: ReturnType<typeof setTimeout> | null = null;

// ═══════════════════════════════════════════════
// Verificar conflictos (solo en CREAR, ambos tipos)
// ═══════════════════════════════════════════════
const verificarConflicto = async () => {
    // 🚫 No verificar si estamos editando
    if (isEdit.value) {
        conflicto.value = null;
        checking.value = false;
        return;
    }

    // 🚫 Necesitamos empleado + tipo
    if (!form.empleado_id || !form.tipo) {
        conflicto.value = null;
        checking.value = false;
        return;
    }

    // 🚫 Permanente: sin días no podemos verificar
    if (form.tipo === 'Permanente' && !form.dias.length) {
        conflicto.value = null;
        checking.value = false;
        return;
    }

    // Construir URL
    const params = new URLSearchParams({
        empleado_id: String(form.empleado_id),
        tipo: form.tipo,
    });

    if (form.tipo === 'Permanente') {
        form.dias.forEach((d) => params.append('dias[]', d));
    }

    checking.value = true;
    conflicto.value = null;

    try {
        const res = await fetch(
            `/empleados/activos/permisos/check?${params.toString()}`,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            },
        );

        if (!res.ok) {
            conflicto.value = null;
            return;
        }

        const data = await res.json();

        conflicto.value = data.conflicto ? data : null;
    } catch (e) {
        console.error('[check] Error:', e);
        conflicto.value = null;
    } finally {
        checking.value = false;
    }
};
// Watcher principal: cualquier cambio relevante re-verifica

watch(
    () => [
        form.empleado_id,
        form.tipo,
        form.dias.slice().join(','),
    ] as const,
    () => {
        if (!props.open) return;
        if (conflictoDebounce) clearTimeout(conflictoDebounce);
        conflictoDebounce = setTimeout(() => {
            verificarConflicto();
        }, 250);
    },
);

// Ejecutar el check al abrir el modal (por si ya hay datos precargados)
watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            // Esperar a que los datos se carguen
            nextTick(() => {
                setTimeout(() => verificarConflicto(), 300);
            });
        }
    },
);
// ═══════════════════════════════════════════════
// Acciones
// ═══════════════════════════════════════════════
const toggleDia = (dia: string) => {
    const idx = form.dias.indexOf(dia);
    if (idx >= 0) form.dias.splice(idx, 1);
    else form.dias.push(dia);
};

const close = () => {
    if (form.processing) return;
    form.reset();
    form.tipo = '';
    form.empleado_id = null;
    form.fecha_de_inicio = '';
    form.fecha_final = '';
    form.dias = [];
    conflicto.value = null;
    checking.value = false;
    idsGrupoActual.value = [];
    emit('update:open', false);
};
const submit = () => {
    if (!form.tipo) {
        form.setError('tipo', 'Selecciona el tipo de permiso.');
        return;
    }

    if (conflicto.value) return;

    if (isEdit.value && props.permiso) {
        form.put(`/empleados/activos/permisos/${props.permiso.id}`, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => close(),
        });
    } else {
        form.post('/empleados/activos/permisos', {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => close(),
        });
    }
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-orange-100 bg-gradient-to-r from-orange-50 via-red-50 to-white px-5 py-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-900/20">
                    <CalendarOff class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                            {{ isEdit ? 'Editar Permiso' : 'Nuevo Permiso' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            {{ isEdit ? 'Actualiza los datos del permiso' : 'Registra un permiso para el empleado' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="max-h-[70vh] overflow-y-auto px-5 py-4">
                <div class="space-y-4">
                    <!-- Empleado -->
                    <FormSelect v-if="!preselectedEmpleadoId" ref="firstInputRef" v-model="form.empleado_id" label="Empleado" :options="empleados" placeholder="Seleccionar empleado..." searchable required :disabled="isEdit" :error="form.errors.empleado_id" :help="isEdit ? 'No se puede cambiar el empleado de un permiso existente' : ''" />
                    <!-- Tipo: 2 botones (solo si no es edición) -->
                    <div v-if="!isEdit" class="flex flex-col gap-2">
                        <label class="text-[10px] font-bold tracking-wider text-slate-800 uppercase">
                            Tipo de Permiso <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-2 gap-3">
                            <button type="button" :class="[
                                'group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 p-4 transition-all active:scale-[0.97]',
                                form.tipo === 'Eventual'
                                    ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50',
                            ]" @click="form.tipo = 'Eventual'">
                                <div :class="[
                                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                                    form.tipo === 'Eventual'
                                        ? 'bg-white/20'
                                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200',
                                ]">
                                    <Calendar class="h-5 w-5" :stroke-width="2.3" />
                                </div>
                                <span class="text-[11px] font-black tracking-wider uppercase">
                                    Eventual
                                </span>
                                <span :class="[
                                    'text-[9px] font-bold tracking-wide',
                                    form.tipo === 'Eventual' ? 'text-white/70' : 'text-slate-400',
                                ]">
                                    Rango de fechas
                                </span>
                                <Check v-if="form.tipo === 'Eventual'" class="absolute top-2 right-2 h-4 w-4" :stroke-width="3" />
                            </button>
                            <button type="button" :class="[
                                'group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 p-4 transition-all active:scale-[0.97]',
                                form.tipo === 'Permanente'
                                    ? 'border-violet-500 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50/50',
                            ]" @click="form.tipo = 'Permanente'">
                                <div :class="[
                                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                                    form.tipo === 'Permanente'
                                        ? 'bg-white/20'
                                        : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200',
                                ]">
                                    <RefreshCw class="h-5 w-5" :stroke-width="2.3" />
                                </div>
                                <span class="text-[11px] font-black tracking-wider uppercase">
                                    Permanente
                                </span>
                                <span :class="[
                                    'text-[9px] font-bold tracking-wide',
                                    form.tipo === 'Permanente' ? 'text-white/70' : 'text-slate-400',
                                ]">
                                    Días específicos
                                </span>
                                <Check v-if="form.tipo === 'Permanente'" class="absolute top-2 right-2 h-4 w-4" :stroke-width="3" />
                            </button>
                        </div>
                        <p v-if="form.errors.tipo" class="text-[11px] font-semibold text-red-500">
                            {{ form.errors.tipo }}
                        </p>
                    </div>
                    <!-- Tipo en modo edición -->
                    <div v-else class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5">
                        <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                            Tipo:
                        </span>
                        <span class="text-xs font-black tracking-wider text-slate-800 uppercase">
                            {{ form.tipo }}
                        </span>
                    </div>
                    <!-- Eventual: fechas -->
                    <template v-if="form.tipo === 'Eventual'">
                        <div class="grid grid-cols-2 gap-3">
                            <FormInput v-model="form.fecha_de_inicio" label="Fecha de Inicio" type="date" required :error="form.errors.fecha_de_inicio" />
                            <FormInput v-model="form.fecha_final" label="Fecha Final" type="date" required :error="form.errors.fecha_final" />
                        </div>
                    </template>
                    <!-- Permanente: días -->
                    <template v-else-if="form.tipo === 'Permanente'">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[10px] font-bold tracking-wider text-slate-800 uppercase">
                                Días de la Semana <span class="text-red-500">*</span>
                            </label>
                            <div class="grid grid-cols-5 gap-2">
                                <button v-for="dia in diasSemana" :key="dia" type="button" :class="[
                                    'flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-3 text-[10px] font-black tracking-wider uppercase transition-all',
                                    form.dias.includes(dia)
                                        ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50',
                                ]" @click="toggleDia(dia)">
                                    <Check v-if="form.dias.includes(dia)" class="h-3 w-3" :stroke-width="3" />
                                    {{ dia.slice(0, 3) }}
                                </button>
                            </div>
                            <p v-if="form.errors.dias" class="text-[11px] font-semibold text-red-500">
                                {{ form.errors.dias }}
                            </p>
                            <p v-else class="text-[10px] text-slate-400 italic">
                                {{ isEdit ? 'Se eliminarán los días anteriores y se crearán los nuevos' : 'Se creará un registro por cada día seleccionado' }}
                            </p>
                        </div>
                    </template>
                    <!-- Alerta de conflicto -->
                    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
                        <div v-if="checking" class="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3">
                            <Loader2 class="h-4 w-4 animate-spin text-blue-600" :stroke-width="2.5" />
                            <span class="text-[11px] font-bold tracking-wide text-blue-700 uppercase">
                                Verificando disponibilidad...
                            </span>
                        </div>
                        <div v-else-if="conflicto" class="overflow-hidden rounded-xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-red-50 shadow-md shadow-rose-500/10">
                            <div class="flex items-start gap-3 px-4 py-3.5">
                                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-md shadow-rose-900/20">
                                    <AlertTriangle class="h-5 w-5 text-white" :stroke-width="2.5" />
                                </div>
                                <div class="flex flex-col gap-1.5">
                                   <span class="text-[11px] font-black tracking-wider text-rose-800 uppercase">
                                        ⚠ {{ conflicto.tipo === 'Eventual' ? 'Permiso Eventual Activo' : 'Permiso Permanente Activo' }}
                                    </span>
                                    <p class="text-[12px] leading-relaxed text-rose-700">
                                        {{ conflicto.mensaje }}
                                    </p>
                                    <div v-if="conflicto.tipo === 'Eventual' && conflicto.permiso" class="mt-1 rounded-lg border border-rose-200 bg-white/60 px-3 py-2">
                                        <div class="flex items-center gap-2 text-[11px]">
                                            <span class="font-bold text-rose-500 uppercase">Motivo:</span>
                                            <span class="font-bold text-rose-900">
                                                {{ conflicto.permiso.descripcion }}
                                            </span>
                                        </div>
                                        <div class="mt-0.5 flex items-center gap-2 text-[11px]">
                                            <span class="font-bold text-rose-500 uppercase">Periodo:</span>
                                            <span class="font-mono font-bold text-rose-900">
                                                {{ conflicto.permiso.detalle }}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="conflicto.tipo === 'Permanente' && conflicto.dias_en_conflicto?.length" class="mt-1 flex flex-wrap gap-1.5">
                                        <span v-for="dia in conflicto.dias_en_conflicto" :key="dia" class="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-2 py-1 text-[10px] font-black tracking-wider text-white uppercase shadow-sm">
                                            {{ dia }}
                                        </span>
                                    </div>
                                   <p class="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-rose-600 italic">
                                        <span>💡</span>
                                        <span>
                                            {{ conflicto.tipo === 'Eventual'
                                                ? 'Debes actualizar o desactivar el permiso existente antes de crear uno nuevo.'
                                                : 'Debes actualizar o desactivar los días en conflicto antes de continuar.'
                                            }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div class="h-1 bg-gradient-to-r from-rose-500 via-red-500 to-rose-500"></div>
                        </div>
                    </Transition>
                    <!-- Descripción -->
                    <FormSelect v-if="form.tipo" v-model="form.descripcion" label="Descripción" :options="motivosOptions" placeholder="Seleccionar motivo..." required :error="form.errors.descripcion" help="Motivo o tipo de permiso" />
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <button type="button" class="h-10 rounded-lg bg-slate-200 px-4 text-xs font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-300 disabled:opacity-50" :disabled="form.processing" @click="close">
                    Cancelar
                </button>
                <AppButton variant="warning" icon-left="Save" :loading="form.processing" :loading-text="isEdit ? 'Actualizando...' : 'Registrando...'" :disabled="!form.tipo || !!conflicto || checking" @click="submit">
                    {{ isEdit ? 'Actualizar' : 'Registrar' }}
                </AppButton>
            </div>
        </DialogContent>
    </Dialog>
</template>