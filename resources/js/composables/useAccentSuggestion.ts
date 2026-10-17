import { ref, computed, type Ref, type ComputedRef } from 'vue';
import {
    findAccentCorrection,
    normalizeForCompare,
} from '@/utils/accentsDictionary';

export type AccentSuggestion = {
    original: string;
    corrected: string;
    isLastWord: boolean;
    normalized: string;
};

export type UseAccentSuggestionReturn = {
    suggestion: ComputedRef<AccentSuggestion | null>;
    applyCorrection: () => void;
    dismissSuggestion: () => void;
    resetAccepted: () => void;
};

export function useAccentSuggestion(
    modelValue: Ref<unknown> | ComputedRef<unknown>,
    onCorrect: (newValue: string) => void,
): UseAccentSuggestionReturn {
    const dismissed = ref(false);
    const dismissedFor = ref('');

    // Palabras ya aceptadas en este input (por su versión normalizada)
    const acceptedWords = ref<Set<string>>(new Set());

    const suggestion = computed<AccentSuggestion | null>(() => {
        const value = modelValue.value;
        if (!value || typeof value !== 'string') return null;

        // Si el valor termina en espacio → no sugerir
        if (/\s$/.test(value)) return null;

        const trimmed = value.trim();
        if (!trimmed) return null;

        // ── Caso 1: una sola palabra
        if (!trimmed.includes(' ')) {
            const normalized = normalizeForCompare(trimmed);

            if (acceptedWords.value.has(normalized)) return null;

            const corrected = findAccentCorrection(trimmed);
            if (!corrected) return null;

            if (dismissed.value && dismissedFor.value === trimmed) return null;

            return {
                original: trimmed,
                corrected,
                isLastWord: false,
                normalized,
            };
        }

        // ── Caso 2: varias palabras → analizamos solo la última
        const words = trimmed.split(/\s+/);
        const lastWord = words[words.length - 1];
        if (!lastWord) return null;

        const normalized = normalizeForCompare(lastWord);

        if (acceptedWords.value.has(normalized)) return null;

        const corrected = findAccentCorrection(lastWord);
        if (!corrected) return null;

        if (dismissed.value && dismissedFor.value === lastWord) return null;

        return {
            original: lastWord,
            corrected,
            isLastWord: true,
            normalized,
        };
    });

    const applyCorrection = (): void => {
        if (!suggestion.value) return;

        const { corrected, isLastWord, normalized } = suggestion.value;
        const currentValue = String(modelValue.value ?? '');

        let newValue: string;
        if (isLastWord) {
            const words = currentValue.trim().split(/\s+/);
            words[words.length - 1] = corrected;
            newValue = words.join(' ');
        } else {
            newValue = corrected;
        }

        const nextSet = new Set(acceptedWords.value);
        nextSet.add(normalized);
        acceptedWords.value = nextSet;

        onCorrect(newValue);

        dismissed.value = false;
        dismissedFor.value = '';
    };

    const dismissSuggestion = (): void => {
        if (!suggestion.value) return;
        dismissed.value = true;
        dismissedFor.value = suggestion.value.original;
    };

    const resetAccepted = (): void => {
        acceptedWords.value = new Set();
        dismissed.value = false;
        dismissedFor.value = '';
    };

    return {
        suggestion,
        applyCorrection,
        dismissSuggestion,
        resetAccepted,
    };
}