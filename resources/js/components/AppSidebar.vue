<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { LayoutGrid, Database, ClipboardCheck, FileDown, UserCheck, UserX, Settings2, UserPlus, Users, UsersRound, Printer } from '@lucide/vue';

type NavItem = {
    label: string;
    href: string;
    icon: any;
    match?: string;
};

type NavSection = {
    key: string;
    title: string;
    items: NavItem[];
};

const sections: NavSection[] = [
    {
        key: 'general',
        title: 'General',
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid, match: '/dashboard' },
            { label: 'Datos Básicos', href: '/datos/basicos', icon: Database, match: '/datos/basicos' },
            { label: 'Asistencia y Reportes', href: '/asistencias', icon: ClipboardCheck, match: '/asistencias' },
            { label: 'Exportación de Registros', href: '#', icon: FileDown },
        ],
    },
    {
        key: 'personal',
        title: 'Personal',
        items: [
            { label: 'Empleados generales', href: '/empleados/activos', icon: UserCheck, match: '/empleados' },            // { label: 'Empleados Inactivos', href: '#', icon: UserX },
            { label: 'Acciones Generales', href: '/empleados/acciones', icon: Settings2, match: '/empleados/acciones' },],
    },
    {
        key: 'estudiantes',
        title: 'Estudiantes',
        items: [
            { label: 'Panel de Registro', href: '#', icon: UserPlus },
            { label: 'Estudiantes Activos', href: '#', icon: Users },
            { label: 'Estudiantes Inactivos', href: '#', icon: UsersRound },
            { label: 'Acciones Generales', href: '#', icon: Settings2 },
            { label: 'Gestión de Impresiones', href: '#', icon: Printer },
        ],
    },
];

// URL actual reactiva vía Inertia
const page = usePage();
const currentPath = computed(() => page.url.split('?')[0]);

/**
 * Devuelve true si el item debe verse activo.
 * - Si tiene `match`, compara por prefijo (para subrutas hijas).
 * - Si no, compara por URL exacta.
 */
function isActive(item: NavItem): boolean {
    const target = item.match ?? item.href;
    if (target === '#') return false;
    return currentPath.value === target || currentPath.value.startsWith(target + '/');
}
</script>
<template>
    <aside class="fixed top-0 left-0 z-40 flex h-screen w-72 flex-col bg-[#0a0f1e] text-white shadow-[4px_0_24px_-4px_rgba(0,0,0,0.6)]">
        <!-- Logo -->
        <div class="flex h-16 items-center gap-3 border-b border-white/5 px-5">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 font-bold shadow-lg shadow-blue-900/50">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            </div>
            <div class="flex flex-col leading-tight">
                <span class="text-base font-bold tracking-tight">SIS ESCOLAR</span>
                <span class="text-[9px] font-semibold tracking-[0.2em] text-slate-500 uppercase">Core Edition</span>
            </div>
        </div>
        <!-- Navegación -->
        <nav class="flex-1 overflow-y-auto px-3 py-4 sidebar-scroll">
            <div v-for="section in sections" :key="section.key" class="mb-2">
                <!-- Encabezado de sección -->
                <div class="mb-2 flex items-center gap-3 px-2">
                    <span class="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                        {{ section.title }}
                    </span>
                    <div class="h-px flex-1 bg-white/10"></div>
                </div>
                <!-- Tarjeta hundida -->
                <div class="space-y-0.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1.5 backdrop-blur-sm">
                    <Link v-for="item in section.items" :key="item.label" :href="item.href" :class="[
                        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                        'text-[11px] font-bold tracking-wider uppercase',
                        isActive(item)
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-900/40'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
                    ]">
                        <span v-if="isActive(item)" class="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white shadow-md"></span>
                        <component :is="item.icon" class="h-[14px] w-[14px] shrink-0" />
                        <span class="truncate">{{ item.label }}</span>
                    </Link>
                </div>
            </div>
        </nav>
        <!-- Footer usuario -->
    </aside>
</template>
<style scoped>
.sidebar-scroll::-webkit-scrollbar {
    width: 6px;
}

.sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.15);
    border-radius: 2px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.3);
}
</style>