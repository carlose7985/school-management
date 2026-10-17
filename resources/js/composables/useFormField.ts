import { ref, watch, computed, type Ref, type ComputedRef } from 'vue';

type ErrorGetter = string | Ref<string> | ComputedRef<string> | (() => string | undefined | null);

export function useFormField(
    getError: ErrorGetter,
    modelValue: Ref<unknown> | ComputedRef<unknown>,
): {
    localError: Ref<string>;
    hasError: ComputedRef<boolean>;
} {
    const localError = ref('');

    // Sincronizar cuando la fuente de error cambia
    watch(
        () => {
            if (typeof getError === 'function') {
                return (getError as () => string | undefined | null)();
            }
            if (typeof getError === 'object' && 'value' in getError) {
                return getError.value;
            }
            return getError;
        },
        (newError) => {
            localError.value = newError || '';
        },
        { immediate: true },
    );

    // Limpiar el error cuando el valor cambia
    watch(modelValue, (newVal, oldVal) => {
        if (newVal !== oldVal && localError.value) {
            localError.value = '';
        }
    });

    const hasError = computed(() => !!localError.value);

    return { localError, hasError };
}