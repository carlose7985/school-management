<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    ArrowLeft,
    User,
    MapPin,
    GraduationCap,
    Briefcase,
    IdCard,
    Calendar,
    Cake,
    Phone,
    Mail,
    Home,
    Hash,
    Building2,
    Award,
    Clock,
    Users,
    Shield,
    FileText,
    UserCheck,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    documento: string;
    cedula: string;
    sexo: 'M' | 'F';
    foto: string | null;
    fecha_de_nacimiento: string | null;
    lugar_de_nacimiento: string | null;
    edad: number | null;
    direccion_de_habitacion: string | null;
    parroquia: string | null;
    telefono: string | null;
    correo_electronico: string | null;
    grado_de_intruccion: string | string[] | null;
    profesion: string | null;
    cargo_en_el_perror: string | null;
    codigo_del_cargo: string | null;
    dependencia: string | null;
    codigo_de_dependencia: string | null;
    tipo_de_personal: string | null;
    status_del_cargo: string | null;
    condicion_del_cargo: string | null;
    area_de_trabajo: number[] | null;
    areas_nombres: string[];
    funcion_en_el_plantel: string | null;
    carga_horaria: string | null;
    fecha_de_ingreso_al_plantel: string | null;
    fecha_de_ingreso_al_cargo: string | null;
    situacion_laboral: string | null;
    nombre_completo: string;
    iniciales: string;
    cargo_nombre: string;
    permiso_activo_hoy?: {
        estado: string;
        color: string;
        descripcion: string | null;
        tipo: string | null;
    };
};

const props = defineProps<{
    empleado: Empleado;
}>();

// ─────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────
type TabKey = 'personales' | 'contacto' | 'academico' | 'laborales';

const tabs = [
    {
        key: 'personales' as TabKey,
        label: 'Datos Personales',
        icon: User,
        activeGradient: 'from-indigo-500 to-indigo-600',
    },
    {
        key: 'contacto' as TabKey,
        label: 'Dirección y Contacto',
        icon: MapPin,
        activeGradient: 'from-blue-500 to-blue-600',
    },
    {
        key: 'academico' as TabKey,
        label: 'Académico',
        icon: GraduationCap,
        activeGradient: 'from-violet-500 to-violet-600',
    },
    {
        key: 'laborales' as TabKey,
        label: 'Laborales',
        icon: Briefcase,
        activeGradient: 'from-emerald-500 to-emerald-600',
    },
];

const activeTab = ref<TabKey>('personales');

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatFecha = (fecha: string | null): string => {
    if (!fecha) return '—';
    const d = new Date(fecha + (fecha.includes('T') ? '' : 'T00:00:00'));
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};


const gradosList = computed<string[]>(() => {
    const raw = props.empleado.grado_de_intruccion;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
        const t = raw.trim();
        if (t.startsWith('[')) {
            try {
                const parsed = JSON.parse(t);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return t ? [t] : [];
    }
    return [];
});

const statusColors: Record<string, { bg: string; text: string; ring: string }> = {
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-500/20' },
    rose: { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'ring-rose-500/20' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', ring: 'ring-purple-500/20' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-500/20' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'ring-blue-500/20' },
    slate: { bg: 'bg-slate-100', text: 'text-slate-700', ring: 'ring-slate-500/20' },
};

const getStatusColor = (color?: string) =>
    statusColors[color ?? 'emerald'] ?? statusColors.emerald;

const currentStatus = computed(() => props.empleado.permiso_activo_hoy ?? {
    estado: props.empleado.situacion_laboral ?? 'Activo',
    color: 'emerald',
    descripcion: null,
    tipo: null,
});

// ─────────────────────────────────────────────
// Helper: calcular años y meses entre una fecha y hoy
// ─────────────────────────────────────────────
const calcularTiempo = (fecha: string | null): string => {
    if (!fecha) return '—';

    const inicio = new Date(fecha + (fecha.includes('T') ? '' : 'T00:00:00'));
    if (isNaN(inicio.getTime())) return '—';

    const hoy = new Date();

    let anios = hoy.getFullYear() - inicio.getFullYear();
    let meses = hoy.getMonth() - inicio.getMonth();
    let dias = hoy.getDate() - inicio.getDate();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            0,
        ).getDate();
        dias += ultimoDiaMesAnterior;
    }
    if (meses < 0) {
        anios--;
        meses += 12;
    }

    if (anios < 0) return '—';
    if (anios === 0 && meses === 0) return 'Menos de 1 mes';

    const partes: string[] = [];
    if (anios > 0) partes.push(`${anios} ${anios === 1 ? 'año' : 'años'}`);
    if (meses > 0) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);

    return partes.join(' y ');
};

// ─────────────────────────────────────────────
// Años en el Plantel y Años en el Cargo
// ─────────────────────────────────────────────
const aniosEnPlantel = computed(() =>
    calcularTiempo(props.empleado.fecha_de_ingreso_al_plantel),
);

const aniosEnCargo = computed(() =>
    calcularTiempo(props.empleado.fecha_de_ingreso_al_cargo),
);
</script>
<template>
    <Head :title="`Expediente: ${empleado.nombre_completo}`" />
    <ViewContainer :title="`Expediente: ${empleado.nombre_completo}`" subtitle="Detalle completo del empleado" icon="UserCheck" :show-search="false">
        <template #returns>
            <Link href="/empleados/activos/listado" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- ═══ HEADER CON FOTO ═══ -->
        <div class="mb-3 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-sm">
            <div class="flex flex-col items-center gap-6 p-4 md:flex-row md:items-center">
                <!-- Foto -->
                <div class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-lg">
                    <img v-if="empleado.foto" :src="`/storage/${empleado.foto}`" :alt="empleado.nombre_completo" class="h-full w-full object-cover" />
                    <span v-else class="text-3xl font-black tracking-widest text-slate-300">
                        {{ empleado.iniciales }}
                    </span>
                </div>
                <!-- Info -->
                <div class="flex flex-1 flex-col items-center gap-3 md:items-start">
                    <span class="text-sm font-black tracking-tight text-slate-900 uppercase italic">
                        {{ empleado.nombre_completo }}
                    </span>
                    <p class="flex items-center gap-2 text-sm text-slate-500">
                        <IdCard class="h-4 w-4" :stroke-width="2.2" />
                        <span class="font-mono font-bold tracking-wider">
                            {{ (empleado.documento ?? '') + (empleado.cedula ?? '') }}
                        </span>
                    </p>
                    <div class="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                        <span :class="[
                            'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase ring-2',
                            getStatusColor(currentStatus.color).bg,
                            getStatusColor(currentStatus.color).text,
                            getStatusColor(currentStatus.color).ring,
                        ]">
                            <span class="relative flex h-2 w-2">
                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50"></span>
                                <span class="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
                            </span>
                            {{ currentStatus.estado }}
                        </span>
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-black tracking-widest text-blue-700 uppercase">
                            <Briefcase class="h-3 w-3" :stroke-width="2.5" />
                            {{ empleado.cargo_nombre }}
                        </span>
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black tracking-widest text-slate-700 uppercase">
                            {{ empleado.sexo === 'M' ? 'Masculino' : 'Femenino' }}
                        </span>
                        <span v-if="empleado.edad" class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm">
                            <Cake class="h-3 w-3" :stroke-width="2.5" />
                            {{ empleado.edad }} años
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- ═══ TABS ═══ -->
        <div class="mb-4 flex flex-wrap gap-2">
            <button v-for="tab in tabs" :key="tab.key" type="button" :class="[
                'group relative flex items-center gap-2 overflow-hidden rounded-xl border-2 px-4 py-2.5 text-xs font-black tracking-wider uppercase transition-all duration-200',
                activeTab === tab.key
                    ? `border-transparent bg-gradient-to-r ${tab.activeGradient} text-white shadow-lg`
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700',
            ]" @click="activeTab = tab.key">
                <component :is="tab.icon" class="h-4 w-4" :stroke-width="2.5" />
                {{ tab.label }}
            </button>
        </div>
       <!-- ═══ CONTENIDO ═══ -->
        <Transition mode="out-in" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <!-- ══ DATOS PERSONALES (2 columnas) ══ -->
            <div v-if="activeTab === 'personales'" key="personales" class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- Columna 1: Nombre -->
                <div class="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                            <User class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-indigo-900 uppercase italic">
                                Identidad
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-indigo-400 uppercase">
                                Nombres y documento
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Nombres" :icon="User" color="indigo">
                            <span class="font-bold text-slate-800 uppercase">{{ empleado.nombres }}</span>
                        </DetailRow>
                        <DetailRow label="Apellidos" :icon="User" color="indigo">
                            <span class="font-bold text-slate-800 uppercase">{{ empleado.apellidos }}</span>
                        </DetailRow>
                        <DetailRow label="Documento / Cédula" :icon="IdCard" color="indigo">
                            <span class="font-mono font-bold tracking-wide text-slate-800">
                                {{ (empleado.documento ?? '') + (empleado.cedula ?? '') }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
                <!-- Columna 2: Datos físicos -->
                <div class="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                            <Users class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-indigo-900 uppercase italic">
                                Datos Físicos
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-indigo-400 uppercase">
                                Nacimiento y origen
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Sexo" :icon="Users" color="indigo">
                            <span class="font-bold text-slate-800">
                                {{ empleado.sexo === 'M' ? 'Masculino' : 'Femenino' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Fecha de Nacimiento" :icon="Calendar" color="indigo">
                            <span class="font-bold text-slate-800">
                                {{ formatFecha(empleado.fecha_de_nacimiento) }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Edad" :icon="Cake" color="indigo">
                            <span class="font-bold text-slate-800">
                                {{ empleado.edad ? `${empleado.edad} años` : '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Lugar de Nacimiento" :icon="MapPin" color="indigo">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.lugar_de_nacimiento || '—' }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
            </div>
            <!-- ══ DIRECCIÓN Y CONTACTO (2 columnas) ══ -->
            <div v-else-if="activeTab === 'contacto'" key="contacto" class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- Columna 1: Ubicación -->
                <div class="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                            <Home class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-blue-900 uppercase italic">
                                Ubicación
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-blue-400 uppercase">
                                Domicilio del empleado
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Dirección de Habitación" :icon="Home" color="blue">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.direccion_de_habitacion || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Parroquia" :icon="MapPin" color="blue">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.parroquia || '—' }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
                <!-- Columna 2: Contacto -->
                <div class="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                            <Phone class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-blue-900 uppercase italic">
                                Contacto
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-blue-400 uppercase">
                                Canales de comunicación
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Teléfono" :icon="Phone" color="blue">
                            <span class="font-mono font-bold tracking-wide text-slate-800">
                                {{ empleado.telefono || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Correo Electrónico" :icon="Mail" color="blue">
                            <span class="font-bold text-blue-600 italic">
                                {{ empleado.correo_electronico || '—' }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
            </div>
            <!-- ══ ACADÉMICO (2 columnas) ══ -->
            <div v-else-if="activeTab === 'academico'" key="academico" class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- Columna 1: Grado -->
                <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
                            <GraduationCap class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-violet-900 uppercase italic">
                                Nivel Académico
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-violet-400 uppercase">
                                Grados alcanzados
                            </p>
                        </div>
                    </div>
                    <div class="p-5">
                        <div v-if="gradosList.length" class="flex flex-wrap gap-2">
                            <span v-for="(grado, i) in gradosList" :key="i" class="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-black tracking-wide text-violet-800 uppercase">
                                <GraduationCap class="h-3 w-3" :stroke-width="2.5" />
                                {{ grado }}
                            </span>
                        </div>
                        <p v-else class="text-sm italic text-slate-400">Sin registros</p>
                    </div>
                </div>
                <!-- Columna 2: Título -->
                <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
                            <FileText class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-violet-900 uppercase italic">
                                Título Profesional
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-violet-400 uppercase">
                                Profesión obtenida
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Título Obtenido" :icon="FileText" color="violet">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.profesion || '—' }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
            </div>
            <!-- ══ LABORALES (3 columnas) ══ -->
            <div v-else key="laborales" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <!-- Columna 1: Cargo -->
                <div class="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                            <Briefcase class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-emerald-900 uppercase italic">
                                Cargo
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
                                Datos del puesto
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                        <DetailRow label="Cargo en Nómina" :icon="Briefcase" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.cargo_en_el_perror || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Código de Cargo" :icon="Hash" color="emerald">
                            <span class="font-mono font-bold tracking-wide text-slate-800">
                                {{ empleado.codigo_del_cargo || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Tipo de Personal" :icon="UserCheck" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.cargo_nombre || '—' }}
                            </span>
                        </DetailRow>

                     <DetailRow label="Dependencia" :icon="Building2" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.dependencia || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Cód. Dependencia" :icon="Hash" color="emerald">
                            <span class="font-mono font-bold tracking-wide text-slate-800">
                                {{ empleado.codigo_de_dependencia || '—' }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
                <!-- Columna 2: Dependencia -->
                <div class="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                    <div class="flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                            <Building2 class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-emerald-900 uppercase italic">
                                Función y Asignación
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
                                Ubicación administrativa
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                       
                        <DetailRow label="Función en el Plantel" :icon="Users" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.funcion_en_el_plantel || '—' }}
                            </span>
                        </DetailRow>
                       <DetailRow label="Status del Cargo" :icon="Shield" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.status_del_cargo || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Condición" :icon="FileText" color="emerald">
                            <span class="font-bold text-slate-800 uppercase">
                                {{ empleado.condicion_del_cargo || '—' }}
                            </span>
                        </DetailRow>
 

                   <DetailRow label="Asignacion(es)" :icon="Users" color="emerald">
   
                        <div v-if="empleado.areas_nombres?.length" class="flex flex-wrap gap-2">
                            <span v-for="(area, i) in empleado.areas_nombres" :key="i" class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-black tracking-wide text-emerald-800 uppercase">
                                <Building2 class="h-3 w-3" :stroke-width="2.5" />
                                {{ area }}
                            </span>
                        </div>
                        <p v-else class="text-sm italic text-slate-400">Sin áreas asignadas</p>
                        </DetailRow>
                    </div>
                </div>
                <!-- Columna 3: Status y Fechas -->
                <div class="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:col-span-2 lg:col-span-1">
                    <div class="flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                            <Shield class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div>
                            <h3 class="text-xs font-black tracking-wider text-emerald-900 uppercase italic">
                               Fechas
                            </h3>
                            <p class="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
                                Carga laboral
                            </p>
                        </div>
                    </div>
                    <div class="divide-y divide-slate-100">
                       
                        <DetailRow label="Carga Horaria" :icon="Clock" color="emerald">
                            <span class="font-mono font-bold tracking-wide text-slate-800">
                                {{ empleado.carga_horaria || '—' }}
                            </span>
                        </DetailRow>
                        <DetailRow label="F. Ingreso Plantel" :icon="Calendar" color="emerald">
                            <span class="font-bold text-slate-800">
                                {{ formatFecha(empleado.fecha_de_ingreso_al_plantel) }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Años en el Plantel" :icon="Award" color="emerald">
                            <span class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 px-2.5 py-1 text-xs font-black tracking-wide text-emerald-800 uppercase">
                                <Award class="h-3 w-3" :stroke-width="2.5" />
                                {{ aniosEnPlantel }}
                            </span>
                        </DetailRow>
                        <DetailRow label="F. Ingreso Cargo" :icon="Calendar" color="emerald">
                            <span class="font-bold text-slate-800">
                                {{ formatFecha(empleado.fecha_de_ingreso_al_cargo) }}
                            </span>
                        </DetailRow>
                        <DetailRow label="Años en el Cargo" :icon="Award" color="emerald">
                            <span class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 px-2.5 py-1 text-xs font-black tracking-wide text-emerald-800 uppercase">
                                <Award class="h-3 w-3" :stroke-width="2.5" />
                                {{ aniosEnCargo }}
                            </span>
                        </DetailRow>
                    </div>
                </div>
              
            </div>
        </Transition>
    </ViewContainer>
</template>
<!-- Componente local: DetailRow -->
<script lang="ts">
import { defineComponent, h } from 'vue';

const labelColors: Record<string, string> = {
    indigo: 'text-indigo-500',
    blue: 'text-blue-500',
    violet: 'text-violet-500',
    emerald: 'text-emerald-500',
    slate: 'text-slate-500',
};

const iconColors: Record<string, string> = {
    indigo: 'text-indigo-400',
    blue: 'text-blue-400',
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    slate: 'text-slate-400',
};
export default {
    components: {
        DetailRow: defineComponent({
            props: {
                label: { type: String, required: true },
                icon: { type: [Object, Function] as any, default: null },
                color: { type: String, default: 'slate' },
            },
            setup(props, { slots }) {
                return () => {
                    const IconComp = props.icon as any;

                    return h(
                        'div',
                        {
                            class: 'flex flex-col gap-1.5 px-5 py-3 transition-colors hover:bg-slate-50/50 sm:flex-row sm:items-center sm:gap-6 sm:py-3.5',
                        },
                        [
                            h(
                                'div',
                                {
                                    class: 'flex w-full shrink-0 items-center gap-2 sm:w-1/3',
                                },
                                [
                                    IconComp
                                        ? h(IconComp, {
                                              size: 14,
                                              'stroke-width': 2.4,
                                              class: iconColors[props.color] ?? iconColors.slate,
                                          })
                                        : null,
                                    h(
                                        'span',
                                        {
                                            class: `text-[10px] font-black tracking-widest uppercase ${labelColors[props.color] ?? labelColors.slate}`,
                                        },
                                        props.label,
                                    ),
                                ],
                            ),
                            h(
                                'div',
                                {
                                    class: 'flex flex-1 items-center justify-start sm:justify-end',
                                },
                                slots.default ? slots.default() : h('span', { class: 'text-sm text-slate-400' }, '—'),
                            ),
                        ],
                    );
                };
            },
        }),
    },
};

</script>