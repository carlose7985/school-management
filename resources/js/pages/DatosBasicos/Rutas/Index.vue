<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
        ],
    },
});

const items = [
    {
        id: 'institucion',
        title: 'Institución',
        subtitle: 'Identidad Legal',
        icon: 'Building2',
        color: 'from-cyan-500 to-cyan-600',
        features: ['Nombre Oficial'],
        href: '/datos/basicos/institucion',
    },
    {
        id: 'grados',
        title: 'Grados',
        subtitle: 'Estructura Académica',
        icon: 'GraduationCap',
        color: 'from-fuchsia-500 to-purple-600',
        features: ['Niveles, Secciones'],
        href: '/datos/basicos/grados',
    },
    {
        id: 'areas',
        title: 'Áreas de Trabajo',
        subtitle: 'Organización',
        icon: 'Briefcase',
        color: 'from-lime-500 to-lime-600',
        features: ['Departamentos, Coordinaciones'],
        href: '/datos/basicos/areas',
    },
    {
        id: 'cargos',
        title: 'Cargos',
        subtitle: 'Estructura de Personal',
        icon: 'BadgeCheck',
        color: 'from-emerald-500 to-green-600',
        features: ['Puestos y Roles'],
        href: '/datos/basicos/cargos',
    },
    {
        id: 'logos',
        title: 'Logos',
        subtitle: 'Identidad Visual',
        icon: 'Image',
        color: 'from-rose-500 to-rose-600',
        features: ['Logos, Sellos, Firmas'],
        href: '/datos/basicos/logos',
    },
    {
        id: 'festivos',
        title: 'Días Festivos',
        subtitle: 'Calendario Escolar',
        icon: 'Calendar',
        color: 'from-orange-500 to-orange-600',
        features: ['Feriados, Eventos, Cierres'],
        href: '/datos/basicos/festivos',
    },
    {
        id: 'apreciaciones',
        title: 'Apreciaciones',
        subtitle: 'Literales Comunes',
        icon: 'Zap',
        color: 'from-blue-500 to-indigo-600',
        features: ['Calificar, Gestor Edición'],
        href: '/datos/basicos/apreciaciones',
    },
    {
        id: 'inmuebles',
        title: 'Inmuebles',
        subtitle: 'Inventario',
        icon: 'BarChart3',
        color: 'from-red-500 to-rose-600',
        features: ['Inventario General'],
        href: '/datos/basicos/inmuebles',
    },
    {
        id: 'otras',
        title: 'Otras Configuraciones',
        subtitle: 'Literales Comunes',
        icon: 'Zap',
        color: 'from-blue-500 to-indigo-600',
        features: ['Calificar, Gestor Edición'],
        href: '/datos/basicos/otras',
    },
    {
        id: 'Diversas',
        title: 'Diversas',
        subtitle: 'Configuraciones Variadas',
        icon: 'Zap',
        color: 'from-blue-500 to-indigo-600',
        features: ['Calificar, Gestor Edición'],
        href: '/datos/basicos/diversas',
    },
];
</script>
<template>
    <Head title="Datos Básicos" />
    <ViewContainer title="Datos Básicos" subtitle="Configuraciones y control de acciones" icon="Settings" :show-search="false">
        <CardGrid :items="items" :columns="5" />
    </ViewContainer>
</template>