<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Asistencias y Reportes', href: '/asistencias' },
        ],
    },
});

const items = [
    {
        id: 'empleados',
        title: 'Asistencia Empleados',
        subtitle: 'Control de Asistencia',
        icon: 'UserCheck',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Registro Diario', 'Control Estadístico', 'Justificaciones'],
        description:
            'Registra la asistencia diaria del personal docente, administrativo y obrero. Consulta estadísticas por período, gestiona justificaciones y mantén un control riguroso de la puntualidad.',
        href: '/asistencias/empleados',
    },
    {
        id: 'estudiantes',
        title: 'Asistencia Estudiantes',
        subtitle: 'Estructura Académica',
        icon: 'GraduationCap',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Lista por Grados', 'Porcentaje Diario', 'Porcentaje Mensual'],
        description:
            'Controla la asistencia de los estudiantes por grado y sección. Consulta listas por día, calcula porcentajes y genera reportes mensuales para el seguimiento académico.',
        href: '/asistencias/estudiantes',
    },
    {
        id: 'whatsapp',
        title: 'Reporte WhatsApp',
        subtitle: 'Reportes Diarios',
        icon: 'MessageSquare',
        color: 'from-lime-500 to-lime-600',
        features: ['Envío Automatizado', 'Alertas de Inasistencias', 'Resumen por Cargo'],
        description:
            'Envía reportes de asistencia diarios de forma automatizada. Notifica alertas de inasistencias al instante y comparte el resumen por cargo directamente a WhatsApp.',
        href: '/asistencias/whatsapp',
    },
    {
        id: 'pdf',
        title: 'Reporte Asistencias PDF',
        subtitle: 'Reporte Mensual',
        icon: 'FileText',
        color: 'from-rose-500 to-rose-600',
        features: ['Reportes de Empleados', 'Consolidados', 'Estadísticas'],
        description:
            'Genera reportes consolidados de asistencia en formato PDF. Consulta reportes individuales de empleados, visualiza estadísticas y exporta documentos listos para imprimir.',
        href: '/asistencias/pdf',
    },
    {
        id: 'excel',
        title: 'Reporte Asistencia Excel',
        subtitle: 'Reporte Mensual',
        icon: 'ClipboardCheck',
        color: 'from-orange-500 to-orange-600',
        features: ['Control General', 'Descargas Directas', 'Filtros por Mes y Año'],
        description:
            'Exporta la asistencia general a Excel para análisis externo. Aplica filtros por mes y año, descarga reportes directos y procesa los datos según tus necesidades.',
        href: '/asistencias/excel',
    },
];
</script>
<template>
    <Head title="Asistencias y Reportes" />
    <ViewContainer title="Asistencias y Reportes" subtitle="Gestión y control de asistencias y reportes" icon="ClipboardList" :show-search="false">
        <template #returns>
            <Link href="/dashboard" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <CardGrid :items="items" :columns="5" />
    </ViewContainer>
</template>