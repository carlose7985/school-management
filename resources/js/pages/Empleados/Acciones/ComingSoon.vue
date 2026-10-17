<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { Construction } from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';

defineProps<{
    title: string;
    subtitle: string;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Acciones Generales', href: '/empleados/acciones' },
        ],
    },
});
</script>
<template>
    <Head :title="title" />
    <ViewContainer :title="title" :subtitle="subtitle" icon="Settings" :show-search="false">
        <div class="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-6 py-24 text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-lg shadow-slate-900/30">
                <Construction class="h-10 w-10" :stroke-width="2" />
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-black tracking-tight text-slate-800 uppercase">
                    Módulo en Construcción
                </h2>
                <p class="max-w-md text-sm font-medium text-slate-500">
                    Este módulo está reservado y será implementado próximamente.
                </p>
            </div>
        </div>
    </ViewContainer>
</template>