<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, nextTick } from 'vue';
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    CalendarX,
    Users,
    Briefcase,
    Lock,
    CheckCircle2,
    AlertTriangle,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ProcesarPermisosModal from '@/pages/Empleados/Permisos/ProcesarPermisosModal.vue';
import DiasFestivosModal from './DiasFestivosModal.vue';
import ListadoAsistenciasModal from './ListadoAsistenciasModal.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Asistencias y Reportes', href: '/asistencias' },
            { title: 'Asistencia Empleados', href: '/asistencias/empleados' },
        ],
    },
});

type Cargo = {
    id: number;
    nombre: string;
    total_empleados: number;
    empleados_vigilantes: number;
    masculino: number;
    femenino: number;
    total: number;
    estado: 'por-cargar' | 'incompleto' | 'completado' | 'sin-personal';
    procesado: boolean;
    incompleto: boolean;
    restringido: boolean;
    mensaje_restriccion: string | null;
    dias_sin_registro: Array<{
        fecha: string;
        fecha_formateada: string;
        dia_semana: string;
        dia_numero: string;
    }>;
    dias_sin_registro_total: number;
    faltas: {
        masculino: number;
        femenino: number;
        total: number;
    };
    permisos: {
        masculino: number;
        femenino: number;
        total: number;
    };
};

type Feriado = { id: number; descripcion: string } | null;

const props = defineProps<{
    fechaSeleccionada: string;
    fechaFormateada: string;
    diaSemana: string;
    tipoDia: 'normal' | 'fin-semana' | 'feriado';
    feriado: Feriado;
    fechaAnterior: string;
    fechaSiguiente: string;
    puedeAvanzar: boolean;
    cargos: Cargo[];
    totalesGenerales: { masculino: number; femenino: number; total: number };
    permisosVencidos: any[];
    permisosVencidosTotal: number;
}>();

const irA = (fecha: string) => {
    router.get('/asistencias/empleados', { fecha }, { preserveScroll: true, preserveState: true, replace: true });
};

const dateInputRef = ref<(HTMLInputElement & { showPicker?: () => void }) | null>(null);
const abrirCalendario = () => {
    const input = dateInputRef.value;
    if (!input) return;
    if (input.showPicker) input.showPicker();
    else {
        input.focus();
        input.click();
    }
};

const onFechaChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    irA(target.value);
};

const irAnterior = () => irA(props.fechaAnterior);
const irSiguiente = () => {
    if (props.puedeAvanzar) irA(props.fechaSiguiente);
};

const estadoStyles: Record<string, { bg: string; text: string; label: string }> = {
    'por-cargar': { bg: 'bg-slate-100', text: 'text-slate-600', label: 'POR CARGAR' },
    incompleto: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'INCOMPLETO' },
    completado: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'CARGADO HOY' },
    'sin-personal': { bg: 'bg-slate-100', text: 'text-slate-400', label: 'SIN PERSONAL' },
};

const getEstadoStyle = (estado: string) => estadoStyles[estado] ?? estadoStyles['por-cargar'];

const abrirCargo = (cargo: Cargo) => {
    if (cargo.total_empleados === 0) return;
    if (cargo.restringido) return;
    if (cargo.procesado) return;
    router.visit(`/asistencias/empleados/cargo/${cargo.id}?fecha=${props.fechaSeleccionada}`);
};

const showFestivosModal = ref(false);
const festivosCargoTarget = ref<Cargo | null>(null);

const abrirModalFestivos = (cargo: Cargo, e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    festivosCargoTarget.value = cargo;
    showFestivosModal.value = true;
};

const onFestivosGuardados = () => {
    showFestivosModal.value = false;
    festivosCargoTarget.value = null;
    router.reload({ only: ['cargos', 'totalesGenerales'] });
};

const showPermisosVencidosModal = ref(props.permisosVencidosTotal > 0);
const onPermisosProcesados = () => {
    showPermisosVencidosModal.value = false;
    router.reload({ only: ['cargos', 'totalesGenerales'] });
};

// Modal de listados para asistencia
const showListadoModal = ref(false);
</script>
<template>
    <Head title="Asistencia de Empleados" />
    <ViewContainer title="Gestión de Asistencias" subtitle="Registro y actualización de asistencias" icon="ClipboardList" :show-search="false">
        <template #returns>
            <Link href="/asistencias" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <template #actions>
            <AppButton variant="info" icon-left="Pencil" @click="router.visit('/asistencias/empleados/actualizar-asistencia')">
                Actualizar Asistencia
            </AppButton>
            <AppButton variant="warning" icon-left="FileSpreadsheet" @click="showListadoModal = true">
                Listados para Asistencias
            </AppButton>
        </template>
        <!-- ═══ SELECTOR DE FECHA ═══ -->
        <div class="mb-5 flex justify-center">
            <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1 shadow-lg shadow-slate-200/60">
                <button type="button" class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 active:scale-95" title="Día anterior" @click="irAnterior">
                    <ChevronLeft :size="18" :stroke-width="2.5" />
                </button>
                <button type="button" class="group relative flex min-w-[260px] cursor-pointer flex-col items-center px-3 py-1 transition-colors hover:bg-slate-50" @click="abrirCalendario">
                    <span class="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase">Registro Diario</span>
                    <span class="text-sm font-black tracking-tight text-slate-900 uppercase italic">{{ fechaFormateada }}</span>
                    <span class="text-[8px] font-bold tracking-wider text-slate-400 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                        📅 Click para abrir calendario
                    </span>
                    <input ref="dateInputRef" type="date" :value="fechaSeleccionada" :max="new Date().toISOString().split('T')[0]" class="pointer-events-none absolute inset-0 h-0 w-0 opacity-0" @change="onFechaChange" />
                </button>
                <button type="button" :disabled="!puedeAvanzar" :class="[
                    'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                    puedeAvanzar ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 active:scale-95' : 'cursor-not-allowed text-slate-300',
                ]" title="Día siguiente" @click="irSiguiente">
                    <ChevronRight :size="18" :stroke-width="2.5" />
                </button>
            </div>
        </div>
        <!-- ═══ CASO 1: Fin de semana o feriado ═══ -->
        <div v-if="tipoDia === 'fin-semana' || tipoDia === 'feriado'" class="flex flex-col items-center justify-center gap-5 py-16">
            <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-100">
                <CalendarX class="h-12 w-12 text-rose-600" :stroke-width="2.2" />
            </div>
            <div class="flex flex-col items-center gap-2">
                <h2 v-if="tipoDia === 'fin-semana'" class="text-2xl font-black tracking-tight text-rose-500 uppercase italic">
                    Fin de Semana ({{ diaSemana }})
                </h2>
                <h2 v-else class="text-2xl font-black tracking-tight text-rose-500 uppercase italic">Día Feriado</h2>
                <p v-if="feriado" class="max-w-md text-center text-sm font-bold tracking-wider text-slate-500 uppercase">
                    {{ feriado.descripcion }}
                </p>
                <p v-else class="max-w-md text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
                    No se registra asistencia en esta fecha
                </p>
            </div>
        </div>
        <!-- ═══ CASO 2: Día laborable ═══ -->
        <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <button v-for="cargo in cargos" :key="cargo.id" type="button" :disabled="cargo.restringido || cargo.total_empleados === 0 || cargo.procesado" :class="[
                'group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm transition-all duration-300',
                !cargo.restringido && cargo.total_empleados > 0 && !cargo.procesado
                    ? 'hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg active:scale-[0.98]'
                    : 'cursor-not-allowed',
                cargo.procesado && !cargo.restringido ? 'opacity-80' : '',
                !cargo.procesado && (cargo.restringido || cargo.total_empleados === 0) ? 'opacity-60' : '',
            ]" @click="abrirCargo(cargo)">
                <!-- Bolita flotante: Días sin registro -->
                <div v-if="cargo.dias_sin_registro_total > 0" class="group/warn absolute top-2 left-2 z-30">
                    <button type="button" class="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-900/30 transition-transform hover:scale-110 active:scale-95" @click="abrirModalFestivos(cargo, $event)">
                        <span class="text-[10px] font-black text-white">!</span>
                        <span class="absolute -bottom-0.5 -right-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-white px-0.5 text-[7px] font-black text-amber-600 shadow-md ring-1 ring-amber-500">
                            {{ cargo.dias_sin_registro_total }}
                        </span>
                        <div class="pointer-events-none absolute top-full left-0 z-40 mt-2 w-48 scale-95 rounded-lg bg-slate-900 px-2.5 py-2 text-left text-white opacity-0 shadow-xl transition-all duration-200 group-hover/warn:scale-100 group-hover/warn:opacity-100">
                            <p class="text-[8px] font-black tracking-wider text-amber-400 uppercase">⚠ Días sin registro</p>
                            <p class="mt-1 text-[9px] leading-tight text-slate-300">
                                {{ cargo.dias_sin_registro_total }} día(s) sin asistencia.
                            </p>
                            <p class="mt-1 text-[8px] italic text-white/70">Click para gestionar</p>
                            <div class="absolute -top-1 left-3 h-2 w-2 rotate-45 bg-slate-900"></div>
                        </div>
                    </button>
                </div>
                <!-- Badge estado (arriba derecha) -->
                <div :class="[
                    'absolute top-2 right-2 z-20 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase shadow-sm',
                    cargo.incompleto
                        ? 'bg-amber-100 text-amber-700'
                        : cargo.restringido
                            ? 'bg-amber-100 text-amber-700'
                            : getEstadoStyle(cargo.estado).bg + ' ' + getEstadoStyle(cargo.estado).text,
                ]" :title="cargo.mensaje_restriccion ?? ''">
                    <template v-if="cargo.incompleto">INCOMPLETO</template>
                    <template v-else-if="cargo.restringido">BLOQUEADO</template>
                    <template v-else>{{ getEstadoStyle(cargo.estado).label }}</template>
                </div>
                <!-- Header -->
                <div class="flex flex-col items-center px-3 pt-5 pb-2.5">
                    <div :class="[
                        'flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg transition-transform',
                        cargo.incompleto
                            ? 'bg-gradient-to-br from-amber-400 to-amber-500'
                            : cargo.restringido
                                ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                                : cargo.procesado
                                    ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                                    : 'bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110',
                    ]">
                        <AlertTriangle v-if="cargo.incompleto" class="h-5 w-5 text-white" :stroke-width="2.2" />
                        <Lock v-else-if="cargo.restringido" class="h-5 w-5 text-white" :stroke-width="2.2" />
                        <CheckCircle2 v-else-if="cargo.procesado" class="h-5 w-5 text-white" :stroke-width="2.2" />
                        <Briefcase v-else class="h-5 w-5 text-white" :stroke-width="2.2" />
                    </div>
                    <h3 class="mt-2 text-[11px] leading-tight font-black tracking-tight text-slate-900 uppercase italic">
                        {{ cargo.nombre }}
                    </h3>
                    <p class="text-[7px] font-bold tracking-[0.15em] text-slate-400 uppercase">Personal de Plantilla</p>
                </div>
                <!-- Cuerpo -->
                <div class="flex flex-1 flex-col border-t border-dashed border-slate-100 px-2.5 pt-2.5 pb-2.5">
                    <!-- ═══ CASO: INCOMPLETO (normales cargados, faltan vigilantes) ═══ -->
                    <template v-if="cargo.incompleto">
                        <div class="grid grid-cols-2 gap-1">
                            <div class="flex items-center justify-center gap-1 rounded-lg border border-blue-100 bg-blue-50/50 py-1">
                                <span class="text-lg font-black text-blue-600">♂</span>
                                <div class="flex flex-col leading-none">
                                    <span class="text-[10px] font-black tracking-widest text-blue-800 uppercase">Masc.</span>
                                    <span class="text-xs font-black text-blue-900">{{ cargo.masculino }}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-center gap-1 rounded-lg border border-pink-100 bg-pink-50/50 py-1">
                                <span class="text-lg font-black text-pink-600">♀</span>
                                <div class="flex flex-col leading-none">
                                    <span class="text-[10px] font-black tracking-widest text-pink-800 uppercase">Fem.</span>
                                    <span class="text-xs font-black text-pink-900">{{ cargo.femenino }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center justify-center gap-1 rounded-lg border border-green-300 bg-green-50/50 py-1">
                            <div class="flex flex-col leading-none">
                                <span class="text-[10px] font-black tracking-widest text-gray-800 uppercase">Total</span>
                                <span class="text-xs font-black text-gray-900">{{ cargo.total }}</span>
                            </div>
                        </div>
                        <!-- Aviso vigilantes pendientes -->
                        <div class="mt-3 flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 px-2 py-3">
                            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-900/20">
                                <AlertTriangle class="h-6 w-6 text-white" :stroke-width="2.2" />
                            </div>
                            <p class="text-[8px] font-black tracking-widest text-amber-700 uppercase">
                                Falta Cargar Vigilantes
                            </p>
                            <p class="text-center text-[9px] leading-tight font-bold text-amber-800">
                                {{ cargo.mensaje_restriccion }}
                            </p>
                            <p class="mt-1 text-[8px] italic text-amber-600">
                                Usa la card de Vigilante
                            </p>
                        </div>
                    </template>
                    <!-- ═══ CASO: RESTRINGIDO (bloqueado por dependencia) ═══ -->
                    <template v-else-if="cargo.restringido">
                        <div class="flex flex-1 flex-col items-center justify-center gap-1.5 px-1">
                            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                                <Lock class="h-4 w-4 text-amber-600" :stroke-width="1.8" />
                            </div>
                            <p class="text-[8px] font-black tracking-widest text-amber-600 uppercase">Bloqueado</p>
                            <p class="line-clamp-3 text-[7px] leading-tight text-slate-500 italic">
                                {{ cargo.mensaje_restriccion }}
                            </p>
                        </div>
                    </template>
                    <!-- ═══ CASO: SIN REGISTROS (0 asistió) ═══ -->
                    <template v-else-if="cargo.total === 0">
                        <div class="flex flex-1 flex-col items-center justify-center gap-1.5">
                            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                                <Users class="h-4 w-4 text-slate-300" :stroke-width="1.8" />
                            </div>
                            <p class="text-[8px] font-black tracking-widest text-slate-400 uppercase">Sin registros</p>
                        </div>
                    </template>
                    <!-- ═══ CASO: NORMAL (con datos) ═══ -->
                    <template v-else>
                        <div class="grid grid-cols-2 gap-1">
                            <div class="flex items-center justify-center gap-1 rounded-lg border border-blue-100 bg-blue-50/50 py-1">
                                <span class="text-lg font-black text-blue-600">♂</span>
                                <div class="flex flex-col leading-none">
                                    <span class="text-[10px] font-black tracking-widest text-blue-800 uppercase">Masc.</span>
                                    <span class="text-xs font-black text-blue-900">{{ cargo.masculino }}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-center gap-1 rounded-lg border border-pink-100 bg-pink-50/50 py-1">
                                <span class="text-lg font-black text-pink-600">♀</span>
                                <div class="flex flex-col leading-none">
                                    <span class="text-[10px] font-black tracking-widest text-pink-800 uppercase">Fem.</span>
                                    <span class="text-xs font-black text-pink-900">{{ cargo.femenino }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center justify-center gap-1 rounded-lg border border-green-300 bg-green-50/50 py-1">
                            <div class="flex flex-col leading-none">
                                <span class="text-[10px] font-black tracking-widest text-gray-800 uppercase">Total</span>
                                <span class="text-xs font-black text-gray-900">{{ cargo.total }}</span>
                            </div>
                        </div>
                        <!-- 🌊 Anillo de progreso gigante -->
                        <div class="relative mt-3 flex flex-1 items-center justify-center">
                            <svg class="h-38 w-38 -rotate-90 transform" viewBox="0 0 100 100">
                                <!-- Fondo -->
                                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-100" />
                                <!-- Progreso -->
                                <circle cx="50" cy="50" r="42" fill="none" :stroke="cargo.total === cargo.total_empleados ? 'url(#gradGreen)' : 'url(#gradBlue)'" stroke-width="6" stroke-linecap="round" :stroke-dasharray="264" :stroke-dashoffset="264 - (264 * Math.min(100, (cargo.total / Math.max(cargo.total_empleados, 1)) * 100)) / 100" class="transition-all duration-700" />
                                <defs>
                                    <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#3b82f6" />
                                        <stop offset="100%" stop-color="#2563eb" />
                                    </linearGradient>
                                    <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#10b981" />
                                        <stop offset="100%" stop-color="#22c55e" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <!-- Contenido del centro -->
                            <div class="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                <span :class="[
                                    'text-2xl font-black leading-none',
                                    cargo.total === cargo.total_empleados ? 'text-emerald-600' : 'text-blue-600',
                                ]">
                                    {{ Math.round((cargo.total / Math.max(cargo.total_empleados, 1)) * 100) }}%
                                </span>
                                <span class="text-[9px] font-black tracking-widest text-slate-900 uppercase">
                                    {{ cargo.total }}/{{ cargo.total_empleados }}
                                </span>
                                <div class="mt-1 flex items-center gap-1">
                                    <div class="flex flex-col items-center rounded-md bg-rose-50 px-1.5 py-0.5 ring-1 ring-rose-100">
                                        <span class="text-[8px] font-black tracking-wider text-rose-500 uppercase">Faltas</span>
                                        <span class="text-[10px] font-black leading-none text-rose-700">{{ cargo.faltas.total }}</span>
                                    </div>
                                    <div class="flex flex-col items-center rounded-md bg-amber-50 px-1.5 py-0.5 ring-1 ring-amber-100">
                                        <span class="text-[8px] font-black tracking-wider text-amber-600 uppercase">Perm.</span>
                                        <span class="text-[10px] font-black leading-none text-amber-700">{{ cargo.permisos.total }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- Footer -->
                <div v-if="cargo.incompleto" class="mt-auto flex items-center justify-center gap-1 border-t border-slate-100 bg-amber-50 py-1.5 text-[8px] font-black tracking-widest text-amber-600 uppercase">
                    <AlertTriangle class="h-2.5 w-2.5" :stroke-width="2.5" />
                    Incompleto · Falta Vigilante
                </div>
                <div v-else-if="cargo.restringido" class="mt-auto flex items-center justify-center gap-1 border-t border-slate-100 bg-amber-50 py-1.5 text-[8px] font-black tracking-widest text-amber-600 uppercase">
                    <Lock class="h-2.5 w-2.5" :stroke-width="2.5" />
                    Bloqueado
                </div>
                <div v-else-if="cargo.procesado" class="mt-auto flex items-center justify-center gap-1 border-t border-slate-100 bg-emerald-50 py-1.5 text-[8px] font-black tracking-widest text-emerald-600 uppercase">
                    <CheckCircle2 class="h-2.5 w-2.5" :stroke-width="2.5" />
                    Asistencia Registrada
                </div>
                <div v-else-if="cargo.total_empleados > 0" class="mt-auto flex items-center justify-center gap-1 border-t border-slate-100 bg-slate-50/60 py-1.5 text-[8px] font-black tracking-widest text-slate-500 uppercase transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <span>Iniciar Carga</span>
                    <span class="text-amber-500">⚡</span>
                </div>
                <div v-else class="mt-auto flex items-center justify-center border-t border-slate-100 bg-slate-50/60 py-1.5 text-[8px] font-black tracking-widest text-slate-300 uppercase">
                    Sin Acción
                </div>
                <!-- Franja inferior -->
                <div :class="[
                    'absolute inset-x-0 bottom-0 h-1 transition-all',
                    cargo.incompleto
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                        : cargo.restringido
                            ? 'bg-slate-300'
                            : cargo.procesado
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 group-hover:h-1.5',
                ]"></div>
            </button>
        </div>
        <!-- ═══ FOOTER ═══ -->
        <template v-if="tipoDia === 'normal'" #footerStats>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-lg font-black text-blue-600">♂</span>
                    <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">Masculino:</span>
                    <span class="text-sm font-black text-blue-700">{{ totalesGenerales.masculino }}</span>
                </div>
                <div class="h-4 w-px bg-slate-300"></div>
                <div class="flex items-center gap-2">
                    <span class="text-lg font-black text-pink-600">♀</span>
                    <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">Femenino:</span>
                    <span class="text-sm font-black text-pink-700">{{ totalesGenerales.femenino }}</span>
                </div>
                <div class="h-4 w-px bg-slate-300"></div>
                <div class="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5">
                    <span class="text-[10px] font-black tracking-widest text-white uppercase">Total:</span>
                    <span class="text-sm font-black text-white">{{ totalesGenerales.total }}</span>
                </div>
            </div>
        </template>
    </ViewContainer>
    <!-- Modales -->
    <DiasFestivosModal v-if="festivosCargoTarget" v-model:open="showFestivosModal" :dias="festivosCargoTarget.dias_sin_registro" @saved="onFestivosGuardados" />
    <ProcesarPermisosModal v-if="props.permisosVencidosTotal > 0" v-model:open="showPermisosVencidosModal" :permisos="props.permisosVencidos ?? []" @all-processed="onPermisosProcesados" />
    <ListadoAsistenciasModal v-model:open="showListadoModal" />
</template>