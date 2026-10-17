<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import {
    ArrowLeft,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    User,
    Shield,
    AlertTriangle,
    Calendar,
    CalendarX, 
    X,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Asistencias y Reportes', href: '/asistencias' },
            { title: 'Asistencia Empleados', href: '/asistencias/empleados' },
            { title: 'Actualizar Asistencia', href: '/asistencias/empleados/actualizar-asistencia' },
        ],
    },
});

type Status = 'Asistio' | 'Falto' | 'Permiso';

type AsistenciaActual = {
    id: number;
    status: Status;
    metodo: string | null;
} | null;

type GuardiaActual = {
    id: number;
    status: Status | null;
    dias_guardia: string[] | null;
} | null;

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
    cedula: string;
    tipo_de_personal: string;
    funcion_en_el_plantel: string;
    sexo: 'M' | 'F';
    iniciales: string | null;
    es_vigilante: boolean;
    asistencia_actual: AsistenciaActual;
    guardia_actual: GuardiaActual;
};

type BloqueoInfo = {
    bloqueado: boolean;
    tipo_dia: 'laborable' | 'fin-semana' | 'feriado';
    mensaje: string | null;
    feriado?: { id: number; descripcion: string } | null;
};

const bloqueo = ref<BloqueoInfo>({
    bloqueado: false,
    tipo_dia: 'laborable',
    mensaje: null,
    feriado: null,
});
// ─────────────────────────────────────────────
// Fecha por defecto: hoy
// ─────────────────────────────────────────────
const hoy = new Date();
const year = ref<number>(hoy.getFullYear());
const month = ref<number>(hoy.getMonth() + 1);
const day = ref<number>(hoy.getDate());

const fechaSeleccionada = computed(() => {
    const y = year.value;
    const m = String(month.value).padStart(2, '0');
    const d = String(day.value).padStart(2, '0');
    return `${d}-${m}-${y}`;
});

// Rango de años: últimos 5 años
const yearsOptions = computed(() => {
    const actual = hoy.getFullYear();
    const arr = [];
    for (let i = 0; i < 5; i++) arr.push(actual - i);
    return arr;
});

const monthsOptions = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

// Días según el mes/año
const daysOptions = computed(() => {
    const total = new Date(year.value, month.value, 0).getDate();
    const arr = [];
    for (let i = 1; i <= total; i++) arr.push(i);
    return arr;
});

// Ajustar día si cambia el mes (ej: de 31 a 28)
watch([year, month], () => {
    const max = new Date(year.value, month.value, 0).getDate();
    if (day.value > max) day.value = max;
});

// ─────────────────────────────────────────────
// Búsqueda
// ─────────────────────────────────────────────
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref('');
const empleados = ref<Empleado[]>([]);
const cargando = ref(false);
const errorCarga = ref<string | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const buscar = async () => {
    cargando.value = true;
    errorCarga.value = null;

    try {
        const params = new URLSearchParams({
            fecha: fechaSeleccionada.value,
            q: searchQuery.value.trim(),
        });

        const res = await fetch(`/asistencias/empleados/actualizar-asistencia/buscar?${params}`, {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // 🚫 Detectar bloqueo
        if (data.bloqueado) {
            bloqueo.value = {
                bloqueado: true,
                tipo_dia: data.tipo_dia,
                mensaje: data.mensaje,
                feriado: data.feriado ?? null,
            };
            empleados.value = [];
            return;
        }

        // ✅ Día laborable
        bloqueo.value = {
            bloqueado: false,
            tipo_dia: 'laborable',
            mensaje: null,
            feriado: null,
        };
        empleados.value = data.empleados ?? [];
    } catch (e: any) {
        console.error('Error buscando:', e);
        errorCarga.value = 'Error al buscar empleados.';
        empleados.value = [];
    } finally {
        cargando.value = false;
    }
};

// Debounce del input
watch(searchQuery, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => buscar(), 300);
});

// Re-buscar al cambiar la fecha
watch(fechaSeleccionada, async () => {
    await buscar();
    // Solo enfocar si NO está bloqueado
    if (!bloqueo.value.bloqueado) {
        await nextTick();
        searchInputRef.value?.focus();
    }
});

onMounted(async () => {
    await nextTick();
    searchInputRef.value?.focus();
    buscar();
});

// ─────────────────────────────────────────────
// Actualizar status
// ─────────────────────────────────────────────
const updatingEmpleadoId = ref<number | null>(null);
const updatingKey = ref<string | null>(null); // `${empleadoId}-${status}`

// Toast/badge de confirmación
const toast = ref<{ visible: boolean; type: 'success' | 'error'; message: string } | null>(null);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const showToast = (type: 'success' | 'error', message: string) => {
    toast.value = { visible: true, type, message };
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        if (toast.value) toast.value.visible = false;
    }, 2600);
};

const actualizarStatus = async (empleado: Empleado, status: Status) => {
    const key = `${empleado.id}-${status}`;

    if (updatingKey.value === key) return;

    // Si ya tiene ese mismo status, no hacer nada
    if (empleado.asistencia_actual?.status === status) {
        showToast('success', `Ya estaba como "${status}".`);
        return;
    }

    updatingKey.value = key;

    try {
        const res = await fetch('/asistencias/empleados/actualizar-asistencia/actualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                empleado_id: empleado.id,
                fecha: fechaSeleccionada.value,
                status,
            }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.error ?? `HTTP ${res.status}`);
        }

        // Actualizar localmente
        const idx = empleados.value.findIndex((e) => e.id === empleado.id);
        if (idx !== -1) {
            empleados.value[idx] = {
                ...empleados.value[idx],
                asistencia_actual: data.asistencia,
                guardia_actual: data.guardia
                    ? { ...empleados.value[idx].guardia_actual, ...data.guardia }
                    : empleados.value[idx].guardia_actual,
            };
        }

        const nombre = empleado.nombre_completo;
        const esVig = empleado.es_vigilante && data.guardia;
        showToast(
            'success',
            `${nombre} → ${status}${esVig ? ' (guardia también actualizada)' : ''}`,
        );

        searchQuery.value = '';
        await nextTick();
        searchInputRef.value?.focus();
        await buscar();
    } catch (e: any) {
        console.error('Error actualizando:', e);
        showToast('error', e.message ?? 'Error al actualizar.');
    } finally {
        updatingKey.value = null;
    }
};

// ─────────────────────────────────────────────
// Utilidades visuales
// ─────────────────────────────────────────────
const statusConfig: Record<Status, { bg: string; text: string; ring: string; icon: any; label: string }> = {
    Asistio: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        ring: 'ring-emerald-200',
        icon: CheckCircle2,
        label: 'Asistió',
    },
    Falto: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        ring: 'ring-rose-200',
        icon: XCircle,
        label: 'Faltó',
    },
    Permiso: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        ring: 'ring-amber-200',
        icon: Clock,
        label: 'Permiso',
    },
};
</script>
<template>
    <Head title="Actualizar Asistencia" />
    <ViewContainer title="Actualizar Asistencia" subtitle="Corrige asistencias por empleado y fecha" icon="RefreshCw" :show-search="false">
        <template #returns>
            <Link href="/asistencias/empleados" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- ═══ FILTROS DE FECHA ═══ -->
        <div class="mb-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div class="flex items-center gap-1.5">
                <Calendar class="h-4 w-4 text-slate-400" :stroke-width="2.5" />
                <span class="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Fecha:
                </span>
            </div>
             <!-- Día -->
            <select v-model.number="day" class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black tracking-wider text-slate-700 uppercase shadow-sm transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none">
                <option v-for="d in daysOptions" :key="d" :value="d">
                    {{ String(d).padStart(2, '0') }}
                </option>
            </select> 
            <!-- Mes -->
            <select v-model.number="month" class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black tracking-wider text-slate-700 uppercase shadow-sm transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none">
                <option v-for="m in monthsOptions" :key="m.value" :value="m.value">
                    {{ m.label }}
                </option>
            </select>
            <!-- Año -->
            <select v-model.number="year" class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black tracking-wider text-slate-700 uppercase shadow-sm transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none">
                <option v-for="y in yearsOptions" :key="y" :value="y">{{ y }}</option>
            </select>
           
           
            <div class="ml-2 rounded-lg bg-slate-900 px-3 py-1.5 font-mono text-[11px] font-black tracking-wider text-white">
                {{ fechaSeleccionada }}
            </div>
        </div>
        <!-- ═══ BUSCADOR ═══ -->
       <!-- ═══ CASO BLOQUEADO: Fin de semana o feriado ═══ -->
        <div v-if="bloqueo.bloqueado" class="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed py-16" :class="bloqueo.tipo_dia === 'fin-semana'
                ? 'border-rose-200 bg-rose-50/40'
                : 'border-amber-200 bg-amber-50/40'
            ">
            <div class="flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg" :class="bloqueo.tipo_dia === 'fin-semana'
                    ? 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-900/20'
                    : 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-900/20'
                ">
                <CalendarX class="h-10 w-10 text-white" :stroke-width="2.2" />
            </div>
            <div class="flex flex-col items-center gap-2">
                <h2 class="text-xl font-black tracking-tight uppercase italic" :class="bloqueo.tipo_dia === 'fin-semana' ? 'text-rose-500' : 'text-amber-600'">
                    {{
                        bloqueo.tipo_dia === 'fin-semana'
                            ? 'Día No Laborable'
                            : 'Día Feriado'
                    }}
                </h2>
                <p class="max-w-md text-center text-sm font-bold tracking-wide uppercase" :class="bloqueo.tipo_dia === 'fin-semana' ? 'text-rose-600' : 'text-amber-700'">
                    {{ bloqueo.mensaje }}
                </p>
                <div class="mt-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-sm" :class="bloqueo.tipo_dia === 'fin-semana'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                    ">
                    <AlertTriangle class="h-3 w-3" :stroke-width="2.5" />
                    No se puede actualizar esta fecha
                </div>
                <p class="mt-3 max-w-sm text-center text-[11px] font-medium text-slate-500 italic">
                    Cambia a un día laborable para continuar con la búsqueda y actualización de asistencias.
                </p>
            </div>
        </div>
        <!-- ═══ BUSCADOR (solo si el día es laborable) ═══ -->
        <template v-else>
            <div class="mb-5 flex justify-center">
                <div class="relative w-full max-w-2xl">
                    <div class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                        <Search v-if="!cargando" class="h-4 w-4 text-slate-400" :stroke-width="2.5" />
                        <Loader2 v-else class="h-4 w-4 animate-spin text-blue-500" :stroke-width="2.5" />
                    </div>
                    <input ref="searchInputRef" v-model="searchQuery" type="text" placeholder="Buscar por nombre, apellido o cédula..." autocomplete="off" class="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 pr-24 pl-11 text-sm font-bold tracking-wide text-slate-800 shadow-lg shadow-slate-200/60 transition-all placeholder:font-medium placeholder:text-slate-300 focus:border-blue-500 focus:shadow-blue-200/60 focus:ring-4 focus:ring-blue-100 focus:outline-none" />
                    <button v-if="searchQuery" type="button" class="absolute top-1/2 right-14 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700" title="Limpiar búsqueda" @click="searchQuery = ''; searchInputRef?.focus()">
                        <X class="h-3.5 w-3.5" :stroke-width="2.5" />
                    </button>
                    <div class="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase">
                        {{ empleados.length }}
                    </div>
                </div>
            </div>
            <!-- ═══ ESTADO VACÍO ═══ -->
            <div v-if="errorCarga" class="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-xs font-bold tracking-wider text-rose-700 uppercase">
                {{ errorCarga }}
            </div>
            <div v-if="!cargando && empleados.length === 0 && !errorCarga" class="flex flex-col items-center justify-center gap-3 py-16">
                <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <User class="h-8 w-8 text-slate-300" :stroke-width="1.8" />
                </div>
                <p class="text-xs font-black tracking-widest text-slate-400 uppercase">
                    {{ searchQuery ? 'Sin resultados' : 'Comienza a buscar' }}
                </p>
                <p class="max-w-sm text-center text-[11px] leading-relaxed text-slate-400">
                    Escribe un nombre, apellido o cédula para encontrar empleados y actualizar su asistencia.
                </p>
            </div>
            <!-- ═══ LISTA DE EMPLEADOS ═══ -->
            <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                <!-- ... todo el bloque de cards igual ... -->
            </div>
        </template>
        <!-- ═══ ESTADO VACÍO ═══ -->
        <div v-if="errorCarga" class="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-xs font-bold tracking-wider text-rose-700 uppercase">
            {{ errorCarga }}
        </div>
        <div v-if="!cargando && empleados.length === 0 && !errorCarga" class="flex flex-col items-center justify-center gap-3 py-16">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <User class="h-8 w-8 text-slate-300" :stroke-width="1.8" />
            </div>
            <p class="text-xs font-black tracking-widest text-slate-400 uppercase">
                {{ searchQuery ? 'Sin resultados' : 'Comienza a buscar' }}
            </p>
            <p class="max-w-sm text-center text-[11px] leading-relaxed text-slate-400">
                Escribe un nombre, apellido o cédula para encontrar empleados y actualizar su asistencia.
            </p>
        </div>
        <!-- ═══ LISTA DE EMPLEADOS ═══ -->
        <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="emp in empleados" :key="emp.id" class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                <!-- Barra superior según status -->
                <div :class="[
                    'absolute inset-x-0 top-0 h-1',
                    emp.asistencia_actual
                        ? emp.asistencia_actual.status === 'Asistio'
                            ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                            : emp.asistencia_actual.status === 'Falto'
                                ? 'bg-gradient-to-r from-rose-400 to-rose-500'
                                : 'bg-gradient-to-r from-amber-400 to-amber-500'
                        : 'bg-slate-200',
                ]"></div>
                <!-- Header -->
                <div class="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                    <!-- Avatar -->
                    <div :class="[
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white shadow-md',
                        emp.sexo === 'F'
                            ? 'bg-gradient-to-br from-pink-500 to-pink-600'
                            : 'bg-gradient-to-br from-blue-500 to-blue-600',
                    ]">
                        {{ emp.iniciales ?? (emp.nombres?.charAt(0) ?? '?') + (emp.apellidos?.charAt(0) ?? '') }}
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col leading-tight">
                        <span class="truncate text-xs font-black tracking-tight text-slate-900 uppercase">
                            {{ emp.nombre_completo }}
                        </span>
                        <span class="truncate font-mono text-[10px] font-bold tracking-wide text-slate-500">
                            {{ emp.cedula }}
                        </span>
                    </div>
                    <!-- Badge vigilante -->
                    <div v-if="emp.es_vigilante" class="flex h-6 items-center gap-1 rounded-full bg-indigo-100 px-2 text-[8px] font-black tracking-wider text-indigo-700 uppercase" title="Es vigilante — al actualizar se sincroniza su guardia">
                        <Shield class="h-3 w-3" :stroke-width="2.5" />
                        Vig.
                    </div>
                </div>
                <!-- Info cargo -->
                <div class="flex items-center gap-2 px-4 py-2">
                    <span class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-slate-600 uppercase">
                        {{ emp.tipo_de_personal }}
                    </span>
                    <span class="truncate text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                        {{ emp.funcion_en_el_plantel }}
                    </span>
                </div>
                <!-- Status actual -->
                <div class="border-t border-dashed border-slate-100 px-4 py-2">
                    <div class="flex items-center justify-between">
                        <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                            Estado actual:
                        </span>
                        <div v-if="emp.asistencia_actual" :class="[
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider uppercase ring-1',
                            statusConfig[emp.asistencia_actual.status].bg,
                            statusConfig[emp.asistencia_actual.status].text,
                            statusConfig[emp.asistencia_actual.status].ring,
                        ]">
                            <component :is="statusConfig[emp.asistencia_actual.status].icon" class="h-3 w-3" :stroke-width="2.5" />
                            {{ statusConfig[emp.asistencia_actual.status].label }}
                        </div>
                        <span v-else class="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black tracking-wider text-slate-400 uppercase">
                            Sin registro
                        </span>
                    </div>
                    <!-- Aviso guardia (si es vigilante y tiene guardia) -->
                    <div v-if="emp.es_vigilante && emp.guardia_actual" class="mt-1.5 flex items-center gap-1.5 rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-bold tracking-wide text-indigo-600">
                        <AlertTriangle class="h-3 w-3 shrink-0" :stroke-width="2.5" />
                        <span class="truncate">
                            Guardia: {{ emp.guardia_actual.status ?? 'Sin status' }}
                            <span v-if="emp.guardia_actual.dias_guardia?.length">
                                · {{ emp.guardia_actual.dias_guardia.join(', ') }}
                            </span>
                        </span>
                    </div>
                </div>
                <!-- Acciones -->
               <div class="grid grid-cols-3 gap-1.5 border-t border-slate-100 bg-slate-50/60 px-3 py-2.5">
                    <button v-for="st in (['Asistio', 'Falto', 'Permiso'] as Status[])" :key="st" type="button" :disabled="updatingKey !== null" :class="[
                        'flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[10px] font-black tracking-wider uppercase transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
                        emp.asistencia_actual?.status === st
                            ? st === 'Asistio'
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/20'
                                : st === 'Falto'
                                    ? 'bg-rose-500 text-white shadow-md shadow-rose-900/20'
                                    : 'bg-amber-500 text-white shadow-md shadow-amber-900/20'
                            : st === 'Asistio'
                                ? 'bg-white text-emerald-600 ring-1 ring-emerald-200 hover:bg-emerald-50'
                                : st === 'Falto'
                                    ? 'bg-white text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50'
                                    : 'bg-white text-amber-600 ring-1 ring-amber-200 hover:bg-amber-50',
                    ]" @click="actualizarStatus(emp, st)">
                        <!-- 🎯 Solo el botón clickeado muestra spinner -->
                        <Loader2 v-if="updatingKey === `${emp.id}-${st}`" class="h-3 w-3 animate-spin" :stroke-width="2.5" />
                        <component v-else :is="statusConfig[st].icon" class="h-3 w-3" :stroke-width="2.5" />
                        {{ st === 'Asistio' ? 'Asistió' : st === 'Falto' ? 'Faltó' : 'Permiso' }}
                    </button>
                </div>
            </div>
        </div>
        <!-- ═══ TOAST ═══ -->
        <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="translate-y-4 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-200 ease-in" leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
            <div v-if="toast?.visible" :class="[
                'fixed bottom-6 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-2 rounded-2xl px-4 py-3 shadow-2xl',
                toast.type === 'success'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                    : 'bg-gradient-to-r from-rose-500 to-rose-600',
            ]">
                <CheckCircle2 v-if="toast.type === 'success'" class="h-4 w-4 text-white" :stroke-width="2.5" />
                <XCircle v-else class="h-4 w-4 text-white" :stroke-width="2.5" />
                <span class="text-xs font-black tracking-wider text-white uppercase">
                    {{ toast.message }}
                </span>
            </div>
        </Transition>
    </ViewContainer>
</template>