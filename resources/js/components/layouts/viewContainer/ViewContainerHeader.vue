<script setup lang="ts">
import { Loader2 } from '@lucide/vue';
import { computed } from 'vue';
import * as Icons from '@lucide/vue';

const props = defineProps<{
    title: string;
    subtitle?: string;
    loading?: boolean;
    icon?: string | null;
}>();

const IconComponent = computed(() =>
    props.icon ? (Icons as any)[props.icon] : null,
);
</script>

<template>
    <header class="flex flex-none items-center justify-between border-b border-slate-100 bg-gray-100 px-2 py-2 shadow-sm">
        <div class="flex items-center gap-3">
            <div v-if="IconComponent" class="group relative">
                <div class="absolute inset-0 rounded-[1.2rem] bg-gradient-to-br from-emerald-400 to-blue-600 opacity-20 blur-lg transition-opacity group-hover:opacity-40"></div>
                <div class="relative flex items-center justify-center rounded-[1.2rem] border border-white/20 bg-gradient-to-br from-[#4ade80] via-[#3b82f6] to-[#6366f1] p-3.5 shadow-xl">
                    <component :is="IconComponent" :size="18" class="text-white" :stroke-width="2.2" />
                </div>
            </div>

            <div class="flex flex-col">
                <h2 class="flex items-center gap-3 text-[22px] leading-none font-black tracking-tighter text-blue-800 uppercase">
                    {{ title }}
                    <span v-if="loading" class="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2 py-1">
                        <Loader2 class="animate-spin text-blue-500" :size="14" />
                        <span class="text-[9px] font-black tracking-widest text-blue-500 uppercase">Cargando</span>
                    </span>
                </h2>
                <p v-if="subtitle" class="mt-1.5 text-[10px] leading-none font-bold tracking-[0.2em] text-slate-400 uppercase">
                    {{ subtitle }}
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <slot name="returns" />
            <slot name="actions" />
        </div>
    </header>
</template>