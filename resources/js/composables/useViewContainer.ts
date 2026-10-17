import { ref, watch, type Ref } from 'vue';

type UseViewContainerOptions = {
    searchValue: Ref<string>;
    onSearch?: (value: string) => void;
    debounceMs?: number;
};

export function useViewContainer({
    searchValue,
    onSearch,
    debounceMs = 350,
}: UseViewContainerOptions) {
    const internalSearch = ref(searchValue.value);
    const inputRef = ref<HTMLInputElement | null>(null);
    let timeout: ReturnType<typeof setTimeout> | null = null;

    // Sincronizar cambios externos
    watch(searchValue, (val) => {
        if (val !== internalSearch.value) {
            internalSearch.value = val;
        }
    });

    // Debounce al escribir
    watch(internalSearch, (val) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch?.(val);
        }, debounceMs);
    });

    function focus() {
        inputRef.value?.focus();
    }

    function clear() {
        internalSearch.value = '';
    }

    return {
        internalSearch,
        inputRef,
        focus,
        clear,
    };
}