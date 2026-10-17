<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Search } from '@lucide/vue';

const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
        autofocus?: boolean;
    }>(),
    {
        autofocus: false,
    },
);

defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(async () => {
    if (props.autofocus && inputRef.value) {
        await nextTick();
        // Pequeño delay para que Inertia termine de montar
        setTimeout(() => {
            inputRef.value?.focus();
        }, 150);
    }
});
</script>
<template>
    <div class="flex flex-none items-center justify-between gap-4  px-3 pt-3">
        <div class="relative w-full max-w-md">
            <Search class="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" :size="16" />
            <input ref="inputRef" :value="modelValue" type="search" autocomplete="off" :placeholder="placeholder ?? 'Buscar...'" class="w-full rounded-2xl border border-gray-300 bg-white py-2 pr-2 pl-10 text-[13px] font-bold tracking-wider text-gray-600 italic shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="flex items-center gap-2">
            <slot name="filters" />
        </div>
    </div>
</template>