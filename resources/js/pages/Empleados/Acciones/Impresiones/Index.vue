<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Acciones Generales', href: '/empleados/acciones' },
            { title: 'Centro de Impresiones', href: '/empleados/acciones/impresiones' },
        ],
    },
});

const items = [
    {
        id: 'constancias',
        title: 'Constancias de Trabajo',
        subtitle: 'Documentación Laboral',
        icon: 'FileText',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Individual, Masiva, Sello'],
        href: '/empleados/acciones/impresiones/constancias',
    },
    {
        id: 'carnets',
        title: 'Carnets Masivos',
        subtitle: 'Identificación',
        icon: 'IdCard',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Por cargo, Por área'],
        href: '/empleados/acciones/impresiones/carnets',
    },
    {
        id: 'fichas',
        title: 'Fichas Técnicas',
        subtitle: 'Expedientes',
        icon: 'UserSquare',
        color: 'from-lime-500 to-lime-600',
        features: ['Por empleado, Masiva'],
        href: '/empleados/acciones/impresiones/fichas',
    },
    {
        id: 'listados-cargo',
        title: 'Listados por Cargo',
        subtitle: 'Clasificaciones',
        icon: 'Users',
        color: 'from-orange-500 to-orange-600',
        features: ['Docente, Admin, Obrero'],
        href: '/empleados/acciones/impresiones/listados-cargo',
    },
    {
        id: 'reporte-asistencia',
        title: 'Reportes de Asistencia',
        subtitle: 'Estadísticas',
        icon: 'CalendarCheck',
        color: 'from-emerald-500 to-green-600',
        features: ['Mensual, Por cargo'],
        href: '/empleados/acciones/impresiones/reporte-asistencia',
    },
    {
        id: 'certificados',
        title: 'Certificados Especiales',
        subtitle: 'Documentación Custom',
        icon: 'Award',
        color: 'from-amber-500 to-amber-600',
        features: ['Reconocimientos, Antigüedad'],
        href: '/empleados/acciones/impresiones/certificados',
    },
    {
        id: 'rotulos',
        title: 'Rótulos y Etiquetas',
        subtitle: 'Señalética',
        icon: 'Tag',
        color: 'from-blue-500 to-indigo-600',
        features: ['Escritorios, Casilleros'],
        href: '/empleados/acciones/impresiones/rotulos',
    },
    {
        id: 'personalizado',
        title: 'Impresión Personalizada',
        subtitle: 'Avanzado',
        icon: 'Zap',
        color: 'from-red-500 to-rose-600',
        features: ['Filtros, Campos, Plantillas'],
        href: '/empleados/acciones/impresiones/personalizado',
    },
];
</script>
<template>
    <Head title="Centro de Impresiones" />
    <ViewContainer title="Centro de Impresiones" subtitle="Documentaciones, clasificaciones" icon="Printer" :show-search="false">
        <CardGrid :items="items" :columns="4" />
    </ViewContainer>
</template>