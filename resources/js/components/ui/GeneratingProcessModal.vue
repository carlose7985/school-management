<script setup lang="ts">
import { computed } from 'vue';
import {
    IdCard,
    Sparkles,
    FileText,
    Download,
    Printer,
    BarChart3,
    FileSpreadsheet,
    Loader2,
    Zap,
} from '@lucide/vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type Color = 'cyan' | 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate';
type Icon = 'carnet' | 'document' | 'download' | 'print' | 'report' | 'excel' | 'spark' | 'loader';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title?: string;
        subtitle?: string;
        itemName?: string;
        color?: Color;
        icon?: Icon;
    }>(),
    {
        title: 'Generando Documento',
        subtitle: 'Por favor espera',
        itemName: '',
        color: 'cyan',
        icon: 'carnet',
    },
);

// ─────────────────────────────────────────────
// Iconos
// ─────────────────────────────────────────────
const iconComponent = computed(() => {
    const map: Record<Icon, any> = {
        carnet: IdCard,
        document: FileText,
        download: Download,
        print: Printer,
        report: BarChart3,
        excel: FileSpreadsheet,
        spark: Sparkles,
        loader: Loader2,
    };
    return map[props.icon] ?? IdCard;
});

// ─────────────────────────────────────────────
// Gradientes por color
// ─────────────────────────────────────────────
const gradients = computed(() => {
    const map: Record<Color, {
        outer: string;
        outerId: string;
        inner: string;
        innerId: string;
        iconBg: string;
        iconShadow: string;
        pingBg: string;
        titleText: string;
        progress: string;
        progressFrom: string;
        progressVia: string;
        progressTo: string;
    }> = {
        cyan: {
            outer: '#06b6d4',
            outerId: 'cyanOuter',
            inner: '#a855f7',
            innerId: 'cyanInner',
            iconBg: 'from-cyan-500 via-blue-500 to-violet-500',
            iconShadow: 'shadow-blue-500/40',
            pingBg: 'bg-blue-400/40',
            titleText: 'from-cyan-600 via-blue-600 to-violet-600',
            progress: 'bg-cyan-100',
            progressFrom: 'from-cyan-500',
            progressVia: 'via-blue-500',
            progressTo: 'to-violet-500',
        },
        blue: {
            outer: '#3b82f6',
            outerId: 'blueOuter',
            inner: '#06b6d4',
            innerId: 'blueInner',
            iconBg: 'from-blue-500 via-cyan-500 to-sky-500',
            iconShadow: 'shadow-blue-500/40',
            pingBg: 'bg-blue-400/40',
            titleText: 'from-blue-600 via-cyan-600 to-sky-600',
            progress: 'bg-blue-100',
            progressFrom: 'from-blue-500',
            progressVia: 'via-cyan-500',
            progressTo: 'to-sky-500',
        },
        violet: {
            outer: '#8b5cf6',
            outerId: 'violetOuter',
            inner: '#ec4899',
            innerId: 'violetInner',
            iconBg: 'from-violet-500 via-purple-500 to-fuchsia-500',
            iconShadow: 'shadow-violet-500/40',
            pingBg: 'bg-violet-400/40',
            titleText: 'from-violet-600 via-purple-600 to-fuchsia-600',
            progress: 'bg-violet-100',
            progressFrom: 'from-violet-500',
            progressVia: 'via-purple-500',
            progressTo: 'to-fuchsia-500',
        },
        emerald: {
            outer: '#10b981',
            outerId: 'emeraldOuter',
            inner: '#84cc16',
            innerId: 'emeraldInner',
            iconBg: 'from-emerald-500 via-green-500 to-lime-500',
            iconShadow: 'shadow-emerald-500/40',
            pingBg: 'bg-emerald-400/40',
            titleText: 'from-emerald-600 via-green-600 to-lime-600',
            progress: 'bg-emerald-100',
            progressFrom: 'from-emerald-500',
            progressVia: 'via-green-500',
            progressTo: 'to-lime-500',
        },
        amber: {
            outer: '#f59e0b',
            outerId: 'amberOuter',
            inner: '#ef4444',
            innerId: 'amberInner',
            iconBg: 'from-amber-500 via-orange-500 to-red-500',
            iconShadow: 'shadow-amber-500/40',
            pingBg: 'bg-amber-400/40',
            titleText: 'from-amber-600 via-orange-600 to-red-600',
            progress: 'bg-amber-100',
            progressFrom: 'from-amber-500',
            progressVia: 'via-orange-500',
            progressTo: 'to-red-500',
        },
        rose: {
            outer: '#f43f5e',
            outerId: 'roseOuter',
            inner: '#ec4899',
            innerId: 'roseInner',
            iconBg: 'from-rose-500 via-pink-500 to-fuchsia-500',
            iconShadow: 'shadow-rose-500/40',
            pingBg: 'bg-rose-400/40',
            titleText: 'from-rose-600 via-pink-600 to-fuchsia-600',
            progress: 'bg-rose-100',
            progressFrom: 'from-rose-500',
            progressVia: 'via-pink-500',
            progressTo: 'to-fuchsia-500',
        },
        slate: {
            outer: '#475569',
            outerId: 'slateOuter',
            inner: '#64748b',
            innerId: 'slateInner',
            iconBg: 'from-slate-600 via-slate-700 to-slate-800',
            iconShadow: 'shadow-slate-500/40',
            pingBg: 'bg-slate-400/40',
            titleText: 'from-slate-700 via-slate-800 to-slate-900',
            progress: 'bg-slate-200',
            progressFrom: 'from-slate-500',
            progressVia: 'via-slate-600',
            progressTo: 'to-slate-700',
        },
    };
    return map[props.color] ?? map.cyan;
});
</script>
<template>
    <Dialog :open="open">
        <DialogContent class="max-w-xs overflow-hidden border-0 p-0 shadow-2xl sm:max-w-xs [&>button]:hidden" @pointer-down-outside.prevent @escape-key-down.prevent @interact-outside.prevent>
            <div class="flex flex-col items-center gap-5 px-8 py-8">
                <!-- Spinner circular colorido -->
                <div class="relative flex h-24 w-24 items-center justify-center">
                    <!-- Anillo exterior girando -->
                    <svg class="absolute inset-0 h-full w-full animate-spin" viewBox="0 0 100 100" fill="none" style="animation-duration: 1.5s;">
                        <circle cx="50" cy="50" r="46" :stroke="gradients.outer" stroke-width="4" stroke-linecap="round" stroke-dasharray="180 100" />
                    </svg>
                    <!-- Anillo interior girando al revés -->
                    <svg class="absolute inset-2 h-[80%] w-[80%] animate-spin" viewBox="0 0 100 100" fill="none" style="animation-duration: 2s; animation-direction: reverse;">
                        <circle cx="50" cy="50" r="46" :stroke="gradients.inner" stroke-width="3" stroke-linecap="round" stroke-dasharray="100 180" />
                    </svg>
                    <!-- Ícono central pulsante -->
                    <div :class="[
                        'relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                        gradients.iconBg,
                        gradients.iconShadow,
                    ]">
                        <component :is="iconComponent" class="h-6 w-6 text-white" :stroke-width="2.5" />
                        <div :class="[
                            'absolute inset-0 animate-ping rounded-2xl',
                            gradients.pingBg,
                        ]"></div>
                    </div>
                    <!-- Chispas decorativas -->
                    <Sparkles class="absolute -top-1 -right-1 h-4 w-4 animate-pulse text-amber-400" :stroke-width="2.5" />
                    <Sparkles class="absolute -bottom-1 -left-1 h-3 w-3 animate-pulse text-cyan-400" :stroke-width="2.5" style="animation-delay: 0.5s;" />
                </div>
                <!-- Texto -->
                <div class="flex flex-col items-center gap-1.5 text-center">
                    <h3 :class="[
                        'bg-gradient-to-r bg-clip-text text-sm font-black tracking-wider text-transparent uppercase',
                        gradients.titleText,
                    ]">
                        {{ title }}
                    </h3>
                    <p v-if="itemName" class="max-w-full truncate text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        {{ itemName }}
                    </p>
                    <p class="mt-1 flex items-center gap-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                        <span>{{ subtitle }}</span>
                        <span class="flex gap-0.5">
                            <span class="animate-bounce" style="animation-delay: 0ms;">.</span>
                            <span class="animate-bounce" style="animation-delay: 150ms;">.</span>
                            <span class="animate-bounce" style="animation-delay: 300ms;">.</span>
                        </span>
                    </p>
                </div>
                <!-- Barra de progreso indeterminada -->
                <div :class="['h-1 w-full overflow-hidden rounded-full', gradients.progress]">
                    <div :class="[
                        'h-full w-1/3 animate-[slide_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r',
                        gradients.progressFrom,
                        gradients.progressVia,
                        gradients.progressTo,
                    ]"></div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
<style scoped>
@keyframes slide {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(400%);
    }
}
</style>