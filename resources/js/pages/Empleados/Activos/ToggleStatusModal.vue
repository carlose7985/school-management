<script setup lang="ts">
import { computed, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { Power, PowerOff, AlertCircle, User } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;    // ← opcional
    situacion_laboral: string;
    situacion_real?: string;
    color_real?: string;
    detalle_permiso?: string | null;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

const processing = ref(false);

// ¿Es Activo? (para decidir qué acción se va a hacer)
const estaActivo = computed(
    () => (props.empleado?.situacion_laboral ?? '').toLowerCase() === 'activo',
);

// ¿Es toggle permitido? Solo Activo o Inactivo
const puedeToggle = computed(() => {
    const s = (props.empleado?.situacion_laboral ?? '').toLowerCase();
    return s === 'activo' || s === 'inactivo';
});

const nombreEmpleado = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.nombres} ${props.empleado.apellidos}`.trim();
});

const cedulaCompleta = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.documento ?? ''}${props.empleado.cedula ?? ''}`;
});

const close = () => {
    emit('update:open', false);
};

const confirmToggle = () => {
    if (!props.empleado) return;
    processing.value = true;

    router.post(
        `/empleados/activos/listado/toggle-situacion/${props.empleado.id}`,
        {},
        {
            preserveScroll: true,
            preserveState: false,   // ← forzar recarga de props
            onFinish: () => {
                processing.value = false;
                close();
            },
        },
    );
};
</script>

<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md">
            <!-- ══ CASO 1: Toggle permitido (Activo o Inactivo) ══ -->
            <template v-if="puedeToggle">
                <!-- Header -->
                <div
                    :class="[
                        'relative flex items-center gap-3 border-b px-5 py-4',
                        estaActivo
                            ? 'border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white'
                            : 'border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white',
                    ]"
                >
                    <div
                        :class="[
                            'flex h-11 w-11 items-center justify-center rounded-xl shadow-lg',
                            estaActivo
                                ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-900/20'
                                : 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-900/20',
                        ]"
                    >
                        <PowerOff v-if="estaActivo" class="h-6 w-6 text-white" :stroke-width="2.2" />
                        <Power v-else class="h-6 w-6 text-white" :stroke-width="2.2" />
                    </div>
                    <div class="flex flex-1 flex-col leading-tight">
                        <DialogHeader class="space-y-0.5 text-left">
                            <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                                {{ estaActivo ? '¿Desactivar Empleado?' : '¿Activar Empleado?' }}
                            </DialogTitle>
                            <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                                {{ estaActivo ? 'Pasará a estado inactivo' : 'Volverá al estado activo' }}
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

                    <!-- Estado actual → nuevo estado -->
                    <div class="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                        <span
                            :class="[
                                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase',
                                estaActivo
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-slate-100 text-slate-500',
                            ]"
                        >
                            <span
                                :class="[
                                    'h-2 w-2 rounded-full',
                                    estaActivo ? 'bg-emerald-500' : 'bg-slate-400',
                                ]"
                            ></span>
                            {{ estaActivo ? 'Activo' : 'Inactivo' }}
                        </span>

                        <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>

                        <span
                            :class="[
                                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase',
                                estaActivo
                                    ? 'bg-slate-100 text-slate-500'
                                    : 'bg-emerald-100 text-emerald-700',
                            ]"
                        >
                            <span
                                :class="[
                                    'h-2 w-2 rounded-full',
                                    estaActivo ? 'bg-slate-400' : 'bg-emerald-500',
                                ]"
                            ></span>
                            {{ estaActivo ? 'Inactivo' : 'Activo' }}
                        </span>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                    <Button
                        type="button"
                        variant="secondary"
                        class="h-10 gap-2 font-bold tracking-wider uppercase"
                        :disabled="processing"
                        @click="close"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        :class="[
                            'h-10 gap-2 font-bold tracking-wider text-white uppercase shadow-lg',
                            estaActivo
                                ? 'bg-amber-600 shadow-amber-900/20 hover:bg-amber-700'
                                : 'bg-emerald-600 shadow-emerald-900/20 hover:bg-emerald-700',
                        ]"
                        :disabled="processing"
                        @click="confirmToggle"
                    >
                        <LoadingSpinner v-if="processing" size="sm" color="text-white" />
                        <PowerOff v-else-if="estaActivo" class="h-4 w-4" :stroke-width="2.5" />
                        <Power v-else class="h-4 w-4" :stroke-width="2.5" />
                        {{ processing ? 'Procesando...' : (estaActivo ? 'Desactivar' : 'Activar') }}
                    </Button>
                </div>
            </template>

            <!-- ══ CASO 2: Toggle NO permitido (Permiso, Reposo, etc.) ══ -->
            <template v-else>
                <!-- Header -->
                <div class="relative flex items-center gap-3 border-b border-rose-100 bg-gradient-to-r from-rose-50 via-red-50 to-white px-5 py-4">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-900/20">
                        <AlertCircle class="h-6 w-6 text-white" :stroke-width="2.2" />
                    </div>
                    <div class="flex flex-1 flex-col leading-tight">
                        <DialogHeader class="space-y-0.5 text-left">
                            <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase">
                                Acción No Permitida
                            </DialogTitle>
                            <DialogDescription class="text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                                Estado bloqueado automáticamente
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                <!-- Body -->
                <div class="space-y-4 px-5 py-4">
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

                    <!-- Mensaje -->
                    <div class="rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-3">
                        <p class="text-xs leading-relaxed text-rose-800">
                            <strong class="font-black uppercase">{{ empleado?.situacion_real ?? empleado?.situacion_laboral }}</strong>
                            <br />
                            La situación laboral cambiará automáticamente cuando termine la acción en curso.
                            <span v-if="empleado?.detalle_permiso" class="mt-2 block text-[11px] italic text-rose-700">
                                Detalle: {{ empleado.detalle_permiso }}
                            </span>
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                    <Button
                        type="button"
                        variant="secondary"
                        class="h-10 gap-2 font-bold tracking-wider uppercase"
                        @click="close"
                    >
                        Entendido
                    </Button>
                </div>
            </template>
        </DialogContent>
    </Dialog>
</template>