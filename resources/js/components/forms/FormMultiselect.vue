<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { ChevronDown, Search, X, Check } from '@lucide/vue';
import { useFormField } from '@/composables/useFormField';
import FormFieldWrapper from './FormFieldWrapper.vue';
import { FIELD_TEXT_PLACEHOLDER } from '@/lib/formStyles';

type Option = { [key: string]: any };

const props = withDefaults(
    defineProps<{
        modelValue?: (string | number)[];
        label?: string;
        placeholder?: string;
        options?: Option[];
        optionValue?: string;
        optionLabel?: string;
        error?: string;
        help?: string;
        disabled?: boolean;
        required?: boolean;
        searchable?: boolean;
    }>(),
    {
        modelValue: () => [],
        label: '',
        placeholder: 'Seleccionar...',
        options: () => [],
        optionValue: 'value',
        optionLabel: 'label',
        error: '',
        help: '',
        disabled: false,
        required: false,
        searchable: true,
    },
);

const emit = defineEmits(['update:modelValue']);

const open = ref(false);
const search = ref('');
const rootRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const dropUp = ref(false);

const modelRef = computed(() => props.modelValue);
const { localError, hasError } = useFormField(() => props.error, modelRef);

const normalizedOptions = computed(() =>
    props.options.map((o) => ({
        value: o[props.optionValue],
        label: o[props.optionLabel],
    })),
);

const filteredOptions = computed(() => {
    if (!search.value) return normalizedOptions.value;

    // Función auxiliar para quitar acentos y pasar a minúsculas
    const normalizeText = (text: string) => {
        return text
            .normalize('NFD') // Separa las letras de sus tildes
            .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
            .toLowerCase();
    };

    const q = normalizeText(search.value);

    return normalizedOptions.value.filter((o) => {
        const label = String(o.label || '');
        return normalizeText(label).includes(q);
    });
});


const selectedOptions = computed(() =>
    normalizedOptions.value.filter((o) => props.modelValue.includes(o.value)),
);

const toggleDropdown = () => {
    if (props.disabled) return;
    if (!open.value) {
        calculatePosition();
        open.value = true;
    } else {
        open.value = false;
    }
};

const calculatePosition = () => {
    if (!rootRef.value) return;
    const rect = rootRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedDropdownHeight = 250;
    const spaceBelow = viewportHeight - rect.bottom;
    dropUp.value = spaceBelow < estimatedDropdownHeight && rect.top > estimatedDropdownHeight;
};

const toggle = (opt: { value: any; label: string }) => {
    const current = [...props.modelValue];
    const idx = current.indexOf(opt.value);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(opt.value);
    emit('update:modelValue', current);

    // 🎯 Cerrar el dropdown al seleccionar
    open.value = false;
    search.value = '';
};

const remove = (value: any) => {
    emit('update:modelValue', props.modelValue.filter((v) => v !== value));
};

const isSelected = (value: any) => props.modelValue.includes(value);

const onClickOutside = (e: MouseEvent) => {
    if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside));

// 🎯 Autofocus al buscador cuando se abre el dropdown
watch(open, async (isOpen) => {
    if (isOpen && props.searchable) {
        await nextTick();
        setTimeout(() => {
            searchInputRef.value?.focus();
        }, 50);
    }
});

const wrapperClass = computed(() => [
    'w-full min-h-[38px] rounded-xl border bg-white transition-all duration-200 cursor-pointer px-3 py-1.5 flex flex-wrap gap-1.5 items-center',
    hasError.value
        ? 'border-red-400 ring-2 ring-red-500/10'
        : open.value
            ? 'border-blue-500 ring-2 ring-blue-500/15'
            : 'border-slate-300 hover:border-slate-400',
    props.disabled ? 'bg-slate-50 cursor-not-allowed border-slate-200' : '',
]);
</script>
<template>
    <FormFieldWrapper :label="label" :error="localError" :help="help" :required="required">
        <div ref="rootRef" class="relative w-full">
            <div :class="wrapperClass" @click="toggleDropdown">
                <div v-for="opt in selectedOptions" :key="opt.value" class="flex items-center gap-1 rounded-lg border border-blue-300/60 bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                    <span class="max-w-32 truncate">{{ opt.label }}</span>
                    <button v-if="!disabled" type="button" class="transition-colors hover:text-blue-900" @click.stop="remove(opt.value)">
                        <X :size="12" />
                    </button>
                </div>
                <span v-if="!selectedOptions.length" :class="FIELD_TEXT_PLACEHOLDER">
                    {{ placeholder }}
                </span>
                <ChevronDown :size="16" :class="[
                    'ml-auto shrink-0 text-slate-400 transition-transform duration-200',
                    open ? 'rotate-180' : '',
                ]" />
            </div>
            <transition enter-active-class="transition-all duration-200 ease-out" :enter-from-class="dropUp ? 'opacity-0 translate-y-2' : 'opacity-0 -translate-y-2'" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" :leave-to-class="dropUp ? 'opacity-0 translate-y-2' : 'opacity-0 -translate-y-2'">
                <div v-if="open" :class="[
                    'absolute z-50 flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10',
                    dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
                ]">
                    <!-- Header con buscador + slot de acción -->
                    <div v-if="searchable || $slots['dropdown-action']" class="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 p-2">
                        <div v-if="searchable" class="relative flex-1">
                            <Search class="absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-400" :size="14" />
                            <input ref="searchInputRef" v-model="search" type="text" placeholder="Buscar..." class="w-full rounded-lg border border-slate-200 bg-white py-1 pr-3 pl-8 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500" @click.stop />
                        </div>
                        <slot name="dropdown-action" />
                    </div>
                    <div class="max-h-44 divide-y divide-slate-50 overflow-y-auto">
                        <button v-for="opt in filteredOptions" :key="opt.value" type="button" class="flex w-full items-center justify-between px-3.5 py-2 text-left text-[13px] text-slate-700 transition-colors hover:bg-blue-50/80 hover:text-blue-600" @click.stop="toggle(opt)">
                            <span class="truncate font-medium">{{ opt.label }}</span>
                            <Check v-if="isSelected(opt.value)" :size="14" class="ml-2 shrink-0 text-blue-600" />
                        </button>
                        <div v-if="!filteredOptions.length" class="p-4 text-center text-xs text-slate-400 italic">
                            Sin resultados
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </FormFieldWrapper>
</template>