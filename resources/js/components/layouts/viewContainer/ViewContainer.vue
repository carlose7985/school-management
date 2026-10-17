<script setup lang="ts">
import { ref, watch } from 'vue';
import Pagination from '@/components/ui/Pagination.vue';
import ViewContainerHeader from './ViewContainerHeader.vue';
import ViewContainerSearch from './ViewContainerSearch.vue';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

const props = withDefaults(
    defineProps<{
        title: string;
        subtitle?: string;
        loading?: boolean;
        showSearch?: boolean;
        placeholderSearch?: string;
        searchValue?: string;
        icon?: string | null;
        pagination?: { links: PaginationLink[] } | null;
        onSearch?: ((value: string) => void) | null;
        debounceMs?: number;
        autofocusSearch?: boolean;
        
    }>(),
    {
        subtitle: '',
        loading: false,
        showSearch: true,
        placeholderSearch: 'Buscar...',
        searchValue: '',
        icon: null,
        pagination: null,
        onSearch: null,
        debounceMs: 350,
        autofocusSearch: true,
    },
);

const emit = defineEmits<{
    (e: 'update:searchValue', value: string): void;
}>();

const internal = ref(props.searchValue);
let timeout: ReturnType<typeof setTimeout> | null = null;

// Sincronizar desde el padre
watch(
    () => props.searchValue,
    (val) => {
        if (val !== internal.value) internal.value = val;
    },
);

// Debounce + emitir al padre
watch(internal, (val) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        emit('update:searchValue', val);
        props.onSearch?.(val);
    }, props.debounceMs);
});
</script>

<template>
    <div class="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden bg-gray-200">
        <ViewContainerHeader :title="title" :subtitle="subtitle" :loading="loading" :icon="icon">
            <template #returns>
                <slot name="returns" />
            </template>
            <template #actions>
                <slot name="actions" />
            </template>
        </ViewContainerHeader>
        <ViewContainerSearch v-if="showSearch || $slots.filters" v-model="internal" :autofocus="autofocusSearch" :placeholder="placeholderSearch">
            <template #filters>
                <slot name="filters" />
            </template>
        </ViewContainerSearch>
        <slot name="subheader" />
        <main class="custom-scrollbar min-h-0 flex-1 overflow-auto p-3">
            <slot />
        </main>
        <footer v-if="pagination || $slots.footerActions || $slots.footerStats" class="z-20 flex h-12 flex-none items-center justify-between border-t border-slate-200 bg-white px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div class="flex items-center gap-3">
                <slot name="footerActions" />
                <slot name="footerStats" />
            </div>
            <div class="flex items-center">
                <Pagination v-if="pagination" :links="pagination.links" />
            </div>
        </footer>
        <footer v-if="$slots.footerBoton" class="z-20 flex flex-none items-center justify-center gap-3 px-4 py-3">
            <slot name="footerBoton" />
        </footer>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.6);
}
</style>