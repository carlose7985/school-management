<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Zap, Info } from '@lucide/vue';
import * as Icons from '@lucide/vue';

type CardItem = {
    id: string | number;
    title: string;
    subtitle?: string;
    icon: string;
    color?: string;
    features?: string[];
    description?: string;
    href: string;
    disabled?: boolean;
};

const props = withDefaults(
    defineProps<{
        items: CardItem[];
        columns?: 2 | 3 | 4 | 5 | 6 | 8 | 12;
        gap?: 'sm' | 'md' | 'lg';
        showFeatures?: boolean;
        showDescription?: boolean;
        showWatermark?: boolean;
        enterLabel?: string;
    }>(),
    {
        columns: 4,
        gap: 'md',
        showFeatures: true,
        showDescription: true,
        showWatermark: true,
        enterLabel: 'Entrar',
    },
);

const gridColsClass = computed(() => {
    const map = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-2 lg:grid-cols-6',
        8: 'grid-cols-2 lg:grid-cols-4 xl:grid-cols-8',
        12: 'grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12',
    };
    return map[props.columns];
});

const gapClass = computed(() => {
    const map = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
    return map[props.gap];
});

const iconComponent = (name: string) => (Icons as any)[name] ?? Icons.Circle;

const cardColor = (color?: string) => {
    return color ?? 'from-blue-500 to-blue-600';
};
</script>
<template>
    <div :class="['grid h-full w-full auto-rows-fr', gridColsClass, gapClass]">
        <Link v-for="item in items" :key="item.id" :href="item.href" :class="[
            'group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/60 transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/60',
            'focus:outline-none focus:ring-4 focus:ring-blue-500/20',
            item.disabled ? 'pointer-events-none opacity-50' : '',
        ]">
            <!-- Franja inferior de color -->
            <div :class="[
                'absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r',
                cardColor(item.color),
            ]"></div>
            <!-- Watermark del ícono gigante de fondo -->
            <div v-if="showWatermark" class="pointer-events-none absolute right-[-30px] bottom-[-30px] z-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]">
                <component :is="iconComponent(item.icon)" class="h-56 w-56" :stroke-width="1.5" />
            </div>
            <!-- Cuerpo -->
            <div class="relative z-10 flex flex-1 flex-col items-center px-5 pt-7 pb-4 text-center">
                <!-- Ícono -->
                <div :class="[
                    'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110',
                    cardColor(item.color),
                ]">
                    <component :is="iconComponent(item.icon)" class="h-8 w-8 text-white" :stroke-width="2" />
                </div>
                <!-- Título -->
                <h3 class="mt-4 text-sm leading-tight font-black tracking-tight text-slate-900 uppercase">
                    {{ item.title }}
                </h3>
                <!-- Subtítulo -->
                <p v-if="item.subtitle" :class="[
                    'mt-1 text-[9px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r bg-clip-text text-transparent',
                    cardColor(item.color),
                ]">
                    {{ item.subtitle }}
                </p>
                <!-- Features -->
                <div v-if="showFeatures && item.features && item.features.length" class="mt-5 flex w-full flex-col gap-1.5">
                    <div v-for="(feature, idx) in item.features.slice(0, 3)" :key="idx" class="rounded-lg bg-slate-100/80 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-slate-600 italic">
                        {{ feature }}
                    </div>
                </div>
                <!-- Bloque descriptivo -->
                <div v-if="showDescription && item.description" class="mt-5 w-full border-t border-dashed border-slate-200 pt-4">
                    <div class="mb-2 flex items-center justify-center gap-1.5">
                        <Info class="h-3 w-3 text-slate-400" :stroke-width="2.5" />
                        <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                            Información
                        </span>
                    </div>
                    <p class="text-[10px] leading-relaxed text-slate-500 italic">
                        {{ item.description }}
                    </p>
                </div>
                <!-- Espacio flexible -->
                <div class="flex-1"></div>
                <!-- Botón Entrar -->
                <div class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[11px] font-black tracking-widest text-white uppercase shadow-md transition-all duration-300 group-hover:bg-slate-800 group-hover:shadow-lg">
                    {{ enterLabel }}
                    <Zap class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
            </div>
        </Link>
    </div>
</template>