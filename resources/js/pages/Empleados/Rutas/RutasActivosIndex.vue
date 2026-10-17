<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Empleados', href: '/empleados' },
            { title: 'Empleados Activos', href: '/empleados/activos' },
        ],
    },
});

const items = [
    {
        id: 'cartas',
        title: 'Cartas de Aceptación',
        subtitle: 'Gestión de Ingresos y Documentos',
        icon: 'UserCheck',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Emisión de Cartas', 'Control de Aceptación', 'Historial de Ingresos'],
        description:
            'Registra el ingreso de nuevo personal docente, administrativo y obrero. Emite cartas de aceptación, controla su recepción y mantén un historial completo de cada incorporación al plantel.',
        href: '/empleados/activos/cartas',
    },
    {
        id: 'listado',
        title: 'Listado General Empleados Activos',
        subtitle: 'Registro y Control de Personal',
        icon: 'ListChecks',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Fichas Técnicas', 'Directorio de Personal', 'Control de Permisos'],
        description:
            'Administra el directorio completo de empleados activos. Consulta fichas técnicas, actualiza datos laborales, gestiona cambios de cargo y mantén la información del personal siempre actualizada.',
        href: '/empleados/activos/listado',
    },
    {
        id: 'notificaciones',
        title: 'Control de Notificaciones',
        subtitle: 'Reportes y Alertas Automatizadas',
        icon: 'MessageSquare',
        color: 'from-lime-500 to-lime-600',
        features: ['Envío Automatizado', 'Alertas de Inasistencias', 'Resumen por Cargo'],
        description:
            'Genera notificaciones de asistencia de forma automatizada. Envía alertas de inasistencias, consulta reportes por cargo y período, y mantén un control riguroso de la asistencia del personal.',
        href: '/empleados/activos/notificaciones',
    },
    {
        id: 'permisos',
        title: 'Permisos y Licencias',
        subtitle: 'Control de Ausencias',
        icon: 'CalendarOff',
        color: 'from-orange-500 to-red-500',
        features: ['Permisos Eventuales', 'Permisos Permanentes', 'Historial'],
        description:
            'Registra permisos eventuales por rango de fechas y permisos permanentes por días específicos. Controla la disponibilidad del personal y genera reportes detallados para la toma de decisiones.',
        href: '/empleados/activos/permisos',
    },
     {
        id: 'inactivos',
        title: 'Listado general empleados Inactivos',
        subtitle: 'Control de Retirados',
        icon: 'UserX',
        color: 'from-violet-500 to-green-500',
        features: ['Empleados Retirados', 'Retiros Permanentes', 'Historial de Retiros'],
        description:
            'Listado general empleados retirados con historial detallado.',
        href: '/empleados/retirados/listado',
    },
];
</script>
<template>
    <Head title="Empleados generales" />
    <ViewContainer title="Empleados generales" subtitle="Gestión y control del personal" icon="Users" :show-search="false">
        <template #returns>
            <Link href="/dashboard" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <CardGrid :items="items" :columns="5" />
    </ViewContainer>
</template>