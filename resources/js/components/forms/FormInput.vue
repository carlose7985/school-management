<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { Wand2, X } from '@lucide/vue';
import * as Icons from '@lucide/vue';
import { applyTransform, applyMask, onlyDigits, romanize } from '@/utils/formHelpers';
import { useFormField } from '@/composables/useFormField';
import { useAccentSuggestion } from '@/composables/useAccentSuggestion';
import FormFieldWrapper from './FormFieldWrapper.vue';
import { FIELD_INPUT_BASE } from '@/lib/formStyles';

const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        label?: string;
        placeholder?: string;
        type?: string;
        error?: string;
        help?: string;
        disabled?: boolean;
        required?: boolean;
        readonly?: boolean;
        autofocus?: boolean;
        transform?: string;
        mask?: string;
        maxlength?: string | number | null;
        prefixIcon?: string | null;
        suffixIcon?: string | null;
        suggestAccents?: boolean;
        normalizeRoman?: boolean;
    }>(),
    {
        modelValue: '',
        label: '',
        placeholder: '',
        type: 'text',
        error: '',
        help: '',
        disabled: false,
        required: false,
        readonly: false,
        autofocus: false,
        transform: '',
        mask: '',
        maxlength: null,
        prefixIcon: null,
        suffixIcon: null,
        suggestAccents: true,
        normalizeRoman: true,
    },
);

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'enter', 'corrected']);

const inputRef = ref<HTMLInputElement | null>(null);
const focused = ref(false);

const modelRef = computed(() => props.modelValue);
const { localError, hasError } = useFormField(() => props.error, modelRef);

const { suggestion, applyCorrection, dismissSuggestion, resetAccepted } = useAccentSuggestion(
    modelRef,
    (newValue: string) => {
        emit('update:modelValue', newValue);
        emit('corrected', newValue);
    },
);

const showSuggestion = computed(
    () => !!(props.suggestAccents && focused.value && suggestion.value && !props.disabled),
);

const processValue = (raw: string) => {
    let value = raw;
    if (/^\s+$/.test(value)) return value;
    if (props.transform) value = applyTransform(value, props.transform);
    if (props.mask) value = applyMask(value, props.mask);
    if (props.type === 'number') value = onlyDigits(value);
    if (props.normalizeRoman) value = romanize(value);
    return value;
};

const onInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    const rawCursor = input.selectionStart ?? 0;
    const processed = processValue(rawValue);

    if (processed === rawValue) {
        emit('update:modelValue', processed);
        return;
    }

    let newCursor = rawCursor;
    if (rawValue.length !== processed.length) {
        const beforeCursor = rawValue.substring(0, rawCursor);
        newCursor = processValue(beforeCursor).length;
    }

    emit('update:modelValue', processed);

    await nextTick();
    if (inputRef.value) {
        const finalCursor = Math.min(newCursor, processed.length);
        inputRef.value.setSelectionRange(finalCursor, finalCursor);
    }
};

const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && showSuggestion.value) {
        event.preventDefault();
        applyCorrection();
        return;
    }
    if (event.key === 'Escape' && showSuggestion.value) {
        dismissSuggestion();
        return;
    }
    if (props.type === 'number' || props.mask) {
        const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (allowed.includes(event.key)) return;
        if (event.ctrlKey || event.metaKey) return;
        if (!/^\d$/.test(event.key)) event.preventDefault();
    }
};

const onEnter = (e: Event) => emit('enter', e);
const onBlur = (e: Event) => {
    emit('blur', e);
    setTimeout(() => {
        focused.value = false;
    }, 150);
};
const onFocus = (e: Event) => {
    focused.value = true;
    emit('focus', e);
};

onMounted(() => {
    if (props.autofocus && inputRef.value) {
        setTimeout(() => inputRef.value?.focus(), 100);
    }
});

const wrapperClass = computed(() => [
    'relative flex items-center w-full rounded-xl border transition-all duration-200 bg-white',
    hasError.value
        ? 'border-red-400 ring-2 ring-red-500/10'
        : focused.value
            ? 'border-blue-500 ring-2 ring-blue-500/15'
            : 'border-slate-300 hover:border-slate-400',
    props.disabled ? 'bg-slate-50 cursor-not-allowed border-slate-200' : '',
]);

const inputClass = computed(() => [
    FIELD_INPUT_BASE,
    props.prefixIcon ? 'pl-2' : 'pl-3.5',
    props.suffixIcon || showSuggestion.value ? 'pr-2' : 'pr-3.5',
]);

const PrefixIcon = computed(() => (props.prefixIcon ? (Icons as any)[props.prefixIcon] : null));
const SuffixIcon = computed(() => (props.suffixIcon ? (Icons as any)[props.suffixIcon] : null));

defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select(),
    getInput: () => inputRef.value,
    resetAccentSuggestion: () => resetAccepted(),
});
</script>
<template>
    <FormFieldWrapper :label="label" :error="localError" :help="help" :required="required">
        <div :class="wrapperClass">
            <div v-if="PrefixIcon" class="pl-3.5 text-slate-400">
                <component :is="PrefixIcon" :size="16" />
            </div>
            <input ref="inputRef" :type="type === 'number' ? 'text' : type" :value="modelValue" :required="required" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength ?? undefined" :class="inputClass" @input="onInput" @keydown="onKeydown" @keyup.enter="onEnter" @blur="onBlur" @focus="onFocus" />
            <div v-if="showSuggestion && !SuffixIcon" class="animate-pulse pr-3 text-amber-500">
                <Wand2 :size="16" />
            </div>
            <div v-if="SuffixIcon" class="pr-3.5 text-slate-400">
                <component :is="SuffixIcon" :size="16" />
            </div>
            <!-- Burbuja de sugerencia -->
            <transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 -translate-y-1 scale-95">
                <div v-if="showSuggestion" class="absolute top-full left-0 z-40 mt-1.5" @mousedown.prevent>
                    <div class="relative">
                        <div class="absolute -top-1 left-6 h-2.5 w-2.5 rotate-45 border-t border-l border-amber-300 bg-amber-50"></div>
                        <div class="relative flex max-w-md items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 shadow-lg shadow-amber-900/10">
                            <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400">
                                <Wand2 :size="14" class="text-white" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                                    ¿Quisiste decir?
                                </span>
                                <span class="text-sm font-bold text-amber-900">
                                    {{ suggestion?.corrected }}
                                </span>
                            </div>
                            <button type="button" class="ml-2 flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-[10px] font-black tracking-wider text-white uppercase transition-colors hover:bg-amber-600" @mousedown.prevent="applyCorrection">
                                Corregir
                                <kbd class="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold">Tab</kbd>
                            </button>
                            <button type="button" class="rounded-lg p-1.5 text-amber-700 transition-colors hover:bg-amber-100" title="Descartar" @mousedown.prevent="dismissSuggestion">
                                <X :size="14" />
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </FormFieldWrapper>
</template>