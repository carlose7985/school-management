<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ArrowLeft, Construction } from '@lucide/vue';

defineProps<{
    title: string;
    subtitle?: string;
    backHref?: string;
}>();
</script>
<template>
    <div class="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-orange-900/20">
            <Construction class="h-10 w-10 text-white" :stroke-width="2" />
        </div>
        <div class="space-y-2">
            <h1 class="text-2xl font-black tracking-tight text-slate-800 uppercase">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {{ subtitle }}
            </p>
        </div>
        <p class="max-w-md text-sm text-slate-500">
            Esta sección estará disponible próximamente.
        </p>
        <Link :href="backHref ?? '/datos/basicos'" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black tracking-widest text-white uppercase shadow-md transition-all hover:bg-slate-800">
            <ArrowLeft class="h-4 w-4" />
            Volver
        </Link>
    </div>
</template>