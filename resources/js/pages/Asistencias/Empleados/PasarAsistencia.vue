<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import {
    ArrowLeft,
    Search,
    X,
    CheckCircle2,
    XCircle,
    Clock,
    Users,
} from '@lucide/vue';
import AppButton from '@/components/ui/AppButton.vue';
import PreAsistenciaVigilanteModal from './PreAsistenciaVigilanteModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Asistencias y Reportes', href: '/asistencias' },
            { title: 'Asistencia Empleados', href: '/asistencias/empleados' },
            { title: 'Carga de Asistencia', href: '#' },
        ],
    },
});

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
    cedula: string;
    tipo_de_personal: string;
    sexo: 'M' | 'F';
    iniciales: string;
    status_actual: 'Asistio' | 'Falto' | 'Permiso';
    metodo: string | null;
    ya_marcado: boolean;
    ya_marcado_qr: boolean;
    origen: string;
    detalle_permiso: string | null;
};

type DiaSinRegistro = {
    fecha: string;
    fecha_formateada: string;
    dia_semana: string;
    dia_numero: string;
};

const props = defineProps<{
    cargo: { id: number; nombre: string };
    fechaSeleccionada: string;
    fechaFormateada: string;
    diaSemana: string;
    esVigilante: boolean;
    vigilanteHabilitado: boolean;
    mensajeVigilante?: string | null;
    mensajeBloqueo?: string | null;
    cargoProcesado?: boolean;
    empleados: Empleado[];
    totales: { presentes: number; faltas: number; permisos: number; total_nomina: number };
    diasSinRegistro: DiaSinRegistro[];
}>();

// Estado local
const empleados = ref<Empleado[]>(props.empleados.map((e) => ({ ...e })));

watch(
    () => props.empleados,
    (newEmpleados) => {
        empleados.value = newEmpleados.map((e) => ({ ...e }));
    },
);

// Buscador
const searchInputRef = ref<HTMLInputElement | null>(null);
const search = ref('');

const normalizar = (texto: string): string =>
    texto.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

const empleadosFiltrados = computed(() => {
    if (!search.value.trim()) return empleados.value;
    const q = normalizar(search.value);
    return empleados.value.filter((e) =>
        normalizar(e.nombre_completo).includes(q) || normalizar(e.cedula).includes(q),
    );
});

// 🎯 SIEMPRE limpiar + focus al marcar (sin importar cuántos resultados haya)
const limpiarYEnfocar = () => {
    search.value = '';
    nextTick(() => {
        searchInputRef.value?.focus();
    });
};

// Cambiar status
const cambiarStatus = (emp: Empleado, nuevoStatus: 'Asistio' | 'Falto' | 'Permiso') => {
    if (emp.ya_marcado_qr) return;
    emp.status_actual = nuevoStatus;
    limpiarYEnfocar();
};

// Totales en vivo
const totalesLive = computed(() => {
    const presentes = empleados.value.filter((e) => e.status_actual === 'Asistio').length;
    const faltas = empleados.value.filter((e) => e.status_actual === 'Falto').length;
    const permisos = empleados.value.filter((e) => e.status_actual === 'Permiso').length;
    return { presentes, faltas, permisos, total_nomina: empleados.value.length };
});

// Guardar
const guardando = ref(false);

const finalizarCarga = () => {
    if (guardando.value) return;
    guardando.value = true;

    const payload = {
        fecha: props.fechaSeleccionada,
        cargo: props.cargo.nombre,
        asistencias: empleados.value
            .filter((e) => !e.ya_marcado_qr)
            .map((e) => ({ empleado_id: e.id, status: e.status_actual })),
    };

    router.post('/asistencias/empleados/guardar', payload, {
        preserveScroll: true,
        onSuccess: () => {
            router.visit('/asistencias/empleados?fecha=' + props.fechaSeleccionada);
        },
        onFinish: () => {
            guardando.value = false;
        },
    });
};

const volver = () => {
    router.visit('/asistencias/empleados?fecha=' + props.fechaSeleccionada);
};

// Pre-asistencia
const showPreAsistenciaModal = ref(false);
const preAsistenciaCargada = ref(false);

const onPreAsistenciaGuardada = (updatedStatuses: Record<number, 'Asistio' | 'Falto' | 'Permiso'>) => {
    preAsistenciaCargada.value = true;
    empleados.value = empleados.value.map((emp) => {
        if (updatedStatuses[emp.id] && !emp.ya_marcado_qr) {
            return { ...emp, status_actual: updatedStatuses[emp.id] };
        }
        return emp;
    });
};

// Focus + auto-abrir pre-asistencia
onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            searchInputRef.value?.focus();
        }, 150);
    });

    if (props.esVigilante && props.vigilanteHabilitado && !props.mensajeBloqueo && !props.cargoProcesado) {
        setTimeout(() => {
            showPreAsistenciaModal.value = true;
        }, 300);
    }
});
</script>
<template>
    <Head :title="`Asistencia - ${cargo.nombre}`" />
    <div class="min-h-screen bg-slate-100">
        <!-- HEADER -->
        <header class="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
            <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-900/20">
                    <Users class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-col leading-tight">
                    <h1 class="text-lg font-black tracking-tight text-blue-700 uppercase">{{ cargo.nombre }}</h1>
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Control de Asistencias</span>
                </div>
            </div>
            <div class="relative ml-auto w-full max-w-sm">
                <Search class="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-blue-500" :stroke-width="2.4" />
                <input ref="searchInputRef" v-model="search" type="text" placeholder="BUSCAR PERSONAL..." class="w-full rounded-full border-2 border-blue-500 bg-white py-2 pr-10 pl-11 text-[12px] font-bold tracking-wider text-slate-700 uppercase outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/20" />
                <button v-if="search" type="button" class="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300" @click="search = ''">
                    <X class="h-3.5 w-3.5" :stroke-width="2.5" />
                </button>
            </div>
            <button type="button" class="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[11px] font-black tracking-wider text-white uppercase shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95" @click="volver">
                <ArrowLeft class="h-4 w-4" :stroke-width="2.5" />
                Volver
            </button>
            <span class="text-sm font-black tracking-wide text-blue-600 uppercase">
                {{ fechaFormateada }}
            </span>
        </header>
        <!-- BLOQUEO: Cargo ya procesado -->
        <div v-if="cargoProcesado" class="flex flex-col items-center justify-center gap-4 py-32">
            <div class="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100">
                <CheckCircle2 class="h-14 w-14 text-emerald-600" :stroke-width="2.2" />
            </div>
            <h2 class="text-xl font-black tracking-tight text-emerald-600 uppercase italic">Asistencia Registrada</h2>
            <p class="max-w-md text-center text-sm font-bold text-slate-500">
                Ya se guardó la asistencia de este cargo para el día de hoy.
            </p>
            <button type="button" class="mt-4 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-lg transition-all hover:bg-slate-800 active:scale-95" @click="volver">
                Volver al listado
            </button>
        </div>
        <!-- BLOQUEO: Fin de semana / Feriado -->
        <div v-else-if="mensajeBloqueo" class="flex flex-col items-center justify-center gap-4 py-32">
            <div class="flex h-24 w-24 items-center justify-center rounded-3xl bg-rose-100">
                <XCircle class="h-14 w-14 text-rose-600" :stroke-width="2.2" />
            </div>
            <h2 class="text-2xl font-black tracking-tight text-rose-500 uppercase italic">{{ mensajeBloqueo }}</h2>
        </div>
        <!-- BLOQUEO: Vigilante no habilitado -->
        <div v-else-if="esVigilante && !vigilanteHabilitado" class="flex flex-col items-center justify-center gap-4 py-32">
            <div class="flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-100">
                <Users class="h-14 w-14 text-amber-600" :stroke-width="2.2" />
            </div>
            <h2 class="text-xl font-black tracking-tight text-amber-600 uppercase italic">
                Primero completa Obrero y Administrativo
            </h2>
            <p class="max-w-md text-center text-sm font-bold text-slate-500">
                {{ mensajeVigilante }}
            </p>
        </div>
        <!-- TABLA -->
        <template v-else>
            <div class="mx-6 mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table class="w-full">
                    <thead class="bg-slate-900 text-white">
                        <tr>
                            <th class="w-16 px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">#</th>
                            <th class="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase">Identidad del Personal</th>
                            <th class="w-96 px-4 py-3 text-center text-[10px] font-black tracking-widest uppercase">Control de Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-if="!empleadosFiltrados.length">
                            <td colspan="3" class="px-4 py-16 text-center text-sm font-bold text-slate-400 uppercase">
                                No hay empleados que coincidan
                            </td>
                        </tr>
                        <tr v-for="(emp, index) in empleadosFiltrados" :key="emp.id" :class="['transition-colors', emp.ya_marcado_qr ? 'bg-blue-50/50' : 'hover:bg-slate-50/60']">
                            <td class="px-4 py-4 text-center">
                                <span class="text-lg font-black text-slate-300">{{ index + 1 }}</span>
                            </td>
                            <td class="px-4 py-4">
                                <div class="flex flex-col leading-tight">
                                    <span class="text-sm font-black tracking-tight text-slate-900 uppercase">
                                        {{ emp.nombre_completo }}
                                    </span>
                                    <span class="mt-0.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ emp.tipo_de_personal }}
                                    </span>
                                    <span v-if="emp.ya_marcado_qr" class="mt-1 inline-flex w-fit items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[9px] font-black tracking-widest text-blue-700 uppercase">
                                        ✓ Ya marcó por QR
                                    </span>
                                    <span v-else-if="emp.detalle_permiso" class="mt-1 inline-flex w-fit items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-black tracking-widest text-amber-700 uppercase">
                                        📋 {{ emp.detalle_permiso }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                <div class="flex items-center justify-center gap-1.5">
                                    <button type="button" :disabled="emp.ya_marcado_qr" :class="[
                                        'flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black tracking-widest uppercase transition-all active:scale-[0.97]',
                                        emp.status_actual === 'Asistio'
                                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600',
                                        emp.ya_marcado_qr ? 'cursor-not-allowed opacity-60' : '',
                                    ]" @click="cambiarStatus(emp, 'Asistio')">
                                        <CheckCircle2 class="h-4 w-4" :stroke-width="2.5" />
                                        Presente
                                    </button>
                                    <button type="button" :disabled="emp.ya_marcado_qr" :class="[
                                        'flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-[0.97]',
                                        emp.status_actual === 'Falto'
                                            ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/30'
                                            : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600',
                                        emp.ya_marcado_qr ? 'cursor-not-allowed opacity-60' : '',
                                    ]" title="Falto" @click="cambiarStatus(emp, 'Falto')">
                                        <XCircle class="h-5 w-5" :stroke-width="2.5" />
                                    </button>
                                    <button type="button" :disabled="emp.ya_marcado_qr" :class="[
                                        'flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-[0.97]',
                                        emp.status_actual === 'Permiso'
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                                            : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-600',
                                        emp.ya_marcado_qr ? 'cursor-not-allowed opacity-60' : '',
                                    ]" title="Permiso" @click="cambiarStatus(emp, 'Permiso')">
                                        <Clock class="h-5 w-5" :stroke-width="2.5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- FOOTER -->
            <div class="sticky bottom-0 mt-4 flex items-center gap-4 border-t border-slate-200 bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.04)]">
                <div class="flex flex-col items-start">
                    <span class="text-2xl font-black text-emerald-600">{{ totalesLive.presentes }}</span>
                    <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">Presentes</span>
                </div>
                <div class="flex flex-col items-start">
                    <span class="text-2xl font-black text-rose-600">{{ totalesLive.faltas }}</span>
                    <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">Inasistencias</span>
                </div>
                <div class="flex flex-col items-start">
                    <span class="text-2xl font-black text-amber-600">{{ totalesLive.permisos }}</span>
                    <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">Permisos</span>
                </div>
                <div class="mx-2 h-10 w-px bg-slate-200"></div>
                <div class="flex flex-col items-start">
                    <span class="text-2xl font-black text-blue-700">{{ totalesLive.total_nomina }}</span>
                    <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">Total Nómina</span>
                </div>
                <div class="ml-auto">
                    <AppButton variant="success" icon-left="Save" :loading="guardando" loading-text="Guardando..." @click="finalizarCarga">
                        Finalizar Carga
                    </AppButton>
                </div>
            </div>
        </template>
    </div>
    <!-- Modal de Pre-asistencia -->
    <PreAsistenciaVigilanteModal v-if="esVigilante" v-model:open="showPreAsistenciaModal" :cargo-id="cargo.id" :fecha="fechaSeleccionada" @saved="onPreAsistenciaGuardada" />
</template>