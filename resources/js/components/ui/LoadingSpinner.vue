<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from '@lucide/vue';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'inline' | 'overlay' | 'fullscreen';

const props = withDefaults(
    defineProps<{
        size?: Size;
        variant?: Variant;
        label?: string;
        color?: string;
    }>(),
    {
        size: 'md',
        variant: 'inline',
        label: '',
        color: 'text-blue-600',
    },
);

const sizeClass = computed(() => {
    const map: Record<Size, string> = {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
    };
    return map[props.size];
});

const labelSizeClass = computed(() => {
    const map: Record<Size, string> = {
        xs: 'text-[10px]',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
    };
    return map[props.size];
});
</script>
<template>
    <!-- Variante: overlay (cubre el contenedor padre, requiere relative en el padre) -->
    <div v-if="variant === 'overlay'" class="absolute inset-0 z-50 flex items-center justify-center rounded-[inherit] bg-white/70 backdrop-blur-sm dark:bg-slate-900/70">
        <div class="flex flex-col items-center gap-3">
            <Loader2 :class="['animate-spin', sizeClass, color]" :stroke-width="2.5" />
            <span v-if="label" :class="['font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300', labelSizeClass]">
                {{ label }}
            </span>
        </div>
    </div>
    <!-- Variante: fullscreen (cubre toda la pantalla) -->
    <Teleport v-else-if="variant === 'fullscreen'" to="body">
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
            <div class="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-6 shadow-2xl">
                <Loader2 :class="['animate-spin text-blue-400', sizeClass]" :stroke-width="2.5" />
                <span v-if="label" :class="['font-bold tracking-wider text-slate-200 uppercase', labelSizeClass]">
                    {{ label }}
                </span>
            </div>
        </div>
    </Teleport>
    <!-- Variante: inline (por defecto, para usar dentro de botones) -->
    <span v-else class="inline-flex items-center gap-2">
        <Loader2 :class="['animate-spin', sizeClass, color]" :stroke-width="2.5" />
        <span v-if="label" :class="['font-semibold', labelSizeClass]">{{ label }}</span>
    </span>
</template>