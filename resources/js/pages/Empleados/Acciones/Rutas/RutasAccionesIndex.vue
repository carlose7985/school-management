<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Acciones Generales', href: '/empleados/acciones' },
        ],
    },
});

const items = [
    {
        id: 'wifi',
        title: 'Control WiFi',
        subtitle: 'Infraestructura',
        icon: 'Wifi',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Redes, Accesos, Monitoreo'],
        href: '/empleados/acciones/wifi',
    },
    {
        id: 'docentes-guardia',
        title: 'Docentes Guardia',
        subtitle: 'Supervisión de Patio',
        icon: 'UserCheck',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Turnos, Asignaciones'],
        href: '/empleados/acciones/docentes-guardia',
    },
    {
        id: 'vigilantes-guardia',
        title: 'Vigilantes Guardia',
        subtitle: 'Seguridad',
        icon: 'Shield',
        color: 'from-lime-500 to-lime-600',
        features: ['Turnos, Rondas, Reportes'],
        href: '/empleados/acciones/vigilantes-guardia',
    },
    {
        id: 'evaluaciones',
        title: 'Evaluaciones',
        subtitle: 'Sistema',
        icon: 'ListChecks',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Desempeño, Rúbricas'],
        href: '/empleados/acciones/evaluaciones',
    },
    {
        id: 'pagos',
        title: 'Acciones de Pago',
        subtitle: 'Pagos',
        icon: 'Wallet',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Nómina, Bonos, Historial'],
        href: '/empleados/acciones/pagos',
    },
    {
        id: 'tallas-profesiones',
        title: 'Tallas y Profesiones',
        subtitle: 'Control de Datos',
        icon: 'Settings',
        color: 'from-orange-500 to-orange-600',
        features: ['Uniformes, Profesiones'],
        href: '/empleados/acciones/tallas-profesiones',
    },
    {
        id: 'impresiones',
        title: 'Centro de Impresiones',
        subtitle: 'Documentaciones, Clasificaciones',
        icon: 'Printer',
        color: 'from-rose-500 to-red-500',
        features: ['Impresiones, Constancias, Reportes'],
        href: '/empleados/acciones/impresiones',
    },
    {
        id: 'por-asignar',
        title: 'Por Asignar',
        subtitle: 'Estadísticas',
        icon: 'BarChart3',
        color: 'from-rose-500 to-red-500',
        features: ['Pendientes, Métricas'],
        href: '/empleados/acciones/por-asignar',
    },
    {
        id: 'modulo-9',
        title: 'Módulo Disponible',
        subtitle: 'Próximamente',
        icon: 'Sparkles',
        color: 'from-teal-500 to-teal-600',
        features: ['Por definir'],
        href: '/empleados/acciones/modulo-9',
    },
    {
        id: 'modulo-10',
        title: 'Módulo Disponible',
        subtitle: 'Próximamente',
        icon: 'Package',
        color: 'from-indigo-500 to-indigo-600',
        features: ['Por definir'],
        href: '/empleados/acciones/modulo-10',
    },
];
</script>
<template>
    <Head title="Empleados Acciones" />
    <ViewContainer title="Empleados Acciones" subtitle="Gestiones y control de acciones" icon="Settings" :show-search="false">
        <CardGrid :items="items" :columns="5" />
    </ViewContainer>
</template>