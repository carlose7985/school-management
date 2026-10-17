<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from '@lucide/vue';
import * as Icons from '@lucide/vue';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant =
    | 'primary' | 'success' | 'danger' | 'warning' | 'info'
    | 'dark' | 'light' | 'ghost' | 'outline'
    | 'outline-danger' | 'outline-success'
    | 'purple' | 'pink' | 'orange' | 'teal' | 'indigo';

const props = withDefaults(
    defineProps<{
        size?: Size;
        variant?: Variant;
        loading?: boolean;
        loadingText?: string;
        iconLeft?: string | null;
        iconRight?: string | null;
        iconOnly?: boolean;
        fullWidth?: boolean;
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
    }>(),
    {
        size: 'md',
        variant: 'primary',
        loading: false,
        loadingText: '',
        iconLeft: null,
        iconRight: null,
        iconOnly: false,
        fullWidth: false,
        type: 'button',
        disabled: false,
    },
);

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>();

const sizeClasses = computed(() => {
    const map: Record<Size, { base: string; icon: number; only: string; spinner: number }> = {
        xs: { base: 'px-2.5 py-1 text-[10px] gap-1 rounded-md', icon: 12, only: 'p-1.5', spinner: 12 },
        sm: { base: 'px-3 py-1.5 text-[11px] gap-1.5 rounded-lg', icon: 14, only: 'p-2', spinner: 14 },
        md: { base: 'px-4 py-2.5 text-xs gap-2 rounded-xl', icon: 16, only: 'p-2.5', spinner: 16 },
        lg: { base: 'px-5 py-3 text-sm gap-2 rounded-xl', icon: 18, only: 'p-3', spinner: 18 },
        xl: { base: 'px-6 py-4 text-base gap-2.5 rounded-2xl', icon: 20, only: 'p-4', spinner: 20 },
    };
    return map[props.size] ?? map.md;
});

const variantClasses = computed(() => {
    const map: Record<Variant, string> = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:ring-blue-500',
        success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:ring-emerald-500',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 focus:ring-rose-500',
        warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 focus:ring-amber-500',
        info: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:ring-cyan-500',
        dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/25 hover:shadow-slate-900/40 focus:ring-slate-700',
        light: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm focus:ring-slate-400',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400',
        outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600 focus:ring-blue-500',
        'outline-danger': 'bg-transparent hover:bg-rose-50 text-rose-600 border-2 border-rose-600 focus:ring-rose-500',
        'outline-success': 'bg-transparent hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-600 focus:ring-emerald-500',
        purple: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 focus:ring-violet-500',
        pink: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 focus:ring-fuchsia-500',
        orange: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 focus:ring-orange-500',
        teal: 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 focus:ring-teal-500',
        indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:ring-indigo-500',
    };
    return map[props.variant] ?? map.primary;
});

const LeftIcon = computed(() => (props.iconLeft ? (Icons as any)[props.iconLeft] : null));
const RightIcon = computed(() => (props.iconRight ? (Icons as any)[props.iconRight] : null));

const isDisabled = computed(() => props.disabled || props.loading);

const buttonClass = computed(() => [
    'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'active:scale-[0.97]',
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
    sizeClasses.value.base,
    props.iconOnly ? sizeClasses.value.only : '',
    variantClasses.value,
    props.fullWidth ? 'w-full' : '',
]);

const onClick = (e: MouseEvent) => {
    if (isDisabled.value) return;
    emit('click', e);
};
</script>
<template>
    <button :type="type" :class="buttonClass" :disabled="isDisabled" @click="onClick">
        <!-- Spinner o ícono izquierdo -->
        <Loader2 v-if="loading" class="animate-spin" :size="sizeClasses.spinner" />
        <component v-else-if="LeftIcon" :is="LeftIcon" :size="sizeClasses.icon" :stroke-width="2.5" />
        <!-- Texto -->
        <span v-if="!iconOnly">
            <template v-if="loading && loadingText">{{ loadingText }}</template>
            <template v-else>
                <slot />
            </template>
        </span>
        <!-- Ícono derecho -->
        <component v-if="RightIcon && !loading" :is="RightIcon" :size="sizeClasses.icon" :stroke-width="2.5" />
    </button>
</template>