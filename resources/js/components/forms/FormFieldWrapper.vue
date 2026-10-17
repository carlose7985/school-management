<script setup lang="ts">
import { AlertCircle } from '@lucide/vue';

defineProps<{
    label?: string;
    error?: string;
    help?: string;
    required?: boolean;
}>();
</script>

<template>
    <div class="relative flex w-full flex-col gap-1.5">
        <!-- Label -->
        <label
            v-if="label"
            class="flex items-center gap-1 text-[10px] font-bold tracking-wider text-gray-900 uppercase"
        >
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <!-- Contenido (input, select, etc.) -->
        <slot />

        <!-- Error -->
        <transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
        >
            <p
                v-if="error"
                class="flex items-center gap-1 text-[11px] font-semibold text-red-500"
            >
                <AlertCircle :size="12" />
                {{ error }}
            </p>
        </transition>

        <!-- Help -->
        <p v-if="help && !error" class="text-[10px] text-slate-400 italic">
            {{ help }}
        </p>
    </div>
</template>