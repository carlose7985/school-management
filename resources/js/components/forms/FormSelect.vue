<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { ChevronDown, Search, Check, X } from '@lucide/vue';
import { computePosition, autoUpdate, offset, flip, shift, size } from '@floating-ui/dom';
import { useFormField } from '@/composables/useFormField';
import FormFieldWrapper from './FormFieldWrapper.vue';
import { FIELD_TEXT_VALUE, FIELD_TEXT_PLACEHOLDER, FIELD_TEXT_LAYOUT } from '@/lib/formStyles';

type Option = { [key: string]: any };

const props = withDefaults(
    defineProps<{
        modelValue?: string | number | null;
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
        modelValue: null,
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
const triggerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);

const modelRef = computed(() => props.modelValue);
const { localError, hasError } = useFormField(() => props.error, modelRef);

const normalizedOptions = computed(() =>
    props.options.map((o) => ({
        value: o[props.optionValue],
        label: o[props.optionLabel],
    })),
);


const filteredOptions = computed(() => {
    if (!props.searchable || !search.value) return normalizedOptions.value;

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

const selectedLabel = computed(() => {
    const found = normalizedOptions.value.find((o) => o.value === props.modelValue);
    return found?.label ?? '';
});

const select = (opt: { value: any; label: string }) => {
    emit('update:modelValue', opt.value);
    open.value = false;
    search.value = '';
};

const clear = () => emit('update:modelValue', null);

const wrapperClass = computed(() => [
    'relative w-full rounded-xl border bg-white transition-all duration-200 cursor-pointer select-none',
    hasError.value
        ? 'border-red-400 ring-2 ring-red-500/10'
        : open.value
            ? 'border-blue-500 ring-2 ring-blue-500/15'
            : 'border-slate-300 hover:border-slate-400',
    props.disabled ? 'bg-slate-50 cursor-not-allowed border-slate-200' : '',
]);

let cleanupFloating: (() => void) | null = null;

const updatePosition = () => {
    if (!triggerRef.value || !dropdownRef.value) return;
    computePosition(triggerRef.value, dropdownRef.value, {
        placement: 'bottom-start',
        middleware: [
            offset(6),
            flip({ fallbackPlacements: ['top-start'] }),
            shift({ padding: 12 }),
            size({
                apply({ rects, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                        maxHeight: `${Math.min(availableHeight, 280)}px`,
                    });
                },
            }),
        ],
    }).then(({ x, y }) => {
        if (dropdownRef.value) {
            Object.assign(dropdownRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        }
    });
};

watch(open, async (isOpen) => {
    if (isOpen) {
        await nextTick();
        if (triggerRef.value && dropdownRef.value) {
            cleanupFloating = autoUpdate(triggerRef.value, dropdownRef.value, updatePosition);
        }
        // 🎯 Autofocus al buscador interno
        if (props.searchable && searchInputRef.value) {
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
                searchInputRef.value?.focus();
            }, 50);
        }
    } else {
        if (cleanupFloating) cleanupFloating();
    }
});

const onClickOutside = (e: MouseEvent) => {
    if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onUnmounted(() => {
    document.removeEventListener('mousedown', onClickOutside);
    if (cleanupFloating) cleanupFloating();
});

defineExpose({
    focus: () => triggerRef.value?.focus(),
});
</script>
<template>
    <FormFieldWrapper :label="label" :error="localError" :help="help" :required="required">
       <div ref="rootRef" class="relative">
            <div ref="triggerRef" :class="wrapperClass" @click="!disabled && (open = !open)">
                <div class="flex items-center justify-between px-3.5 py-2">
                    <span :class="[
                        FIELD_TEXT_LAYOUT,
                        'pr-2',
                        modelValue !== null && modelValue !== ''
                            ? FIELD_TEXT_VALUE
                            : FIELD_TEXT_PLACEHOLDER,
                    ]">
                        {{ selectedLabel || placeholder }}
                    </span>
                    <div class="flex shrink-0 items-center gap-1.5">
                        <button v-if="modelValue !== null && modelValue !== '' && !disabled" type="button" class="rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" @click.stop="clear">
                            <X :size="13" />
                        </button>
                        <ChevronDown :size="15" :class="[
                            'text-slate-400 transition-transform duration-200',
                            open ? 'rotate-180 text-blue-500' : '',
                        ]" />
                    </div>
                </div>
                <transition enter-active-class="transition ease-out duration-150" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="open" ref="dropdownRef" class="fixed z-50 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-md">
                       <div v-if="searchable || $slots['dropdown-action']" class="flex items-center gap-2 border-b border-slate-100/80 bg-slate-50/50 p-2">
                            <div v-if="searchable" class="relative flex-1">
                                <Search class="absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-400" :size="13" />
                               <input ref="searchInputRef" v-model="search" type="text" placeholder="Buscar..." class="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" @click.stop />
                            </div>
                            <!-- Slot para acción adicional (ej: botón "Nueva") -->
                            <slot name="dropdown-action" />
                        </div>
                        <div class="overflow-y-auto p-1">
                            <button v-for="opt in filteredOptions" :key="opt.value" type="button" :class="[
                                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors duration-150',
                                opt.value === modelValue
                                    ? 'bg-blue-100 font-semibold text-slate-900'
                                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                            ]" @click.stop="select(opt)">
                                <span class="truncate pr-2">{{ opt.label }}</span>
                                <Check v-if="opt.value === modelValue" :size="14" class="shrink-0 text-blue-900" />
                            </button>
                            <div v-if="!filteredOptions.length" class="py-6 text-center text-xs text-slate-400 italic">
                                Sin resultados
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            
        </div>
    </FormFieldWrapper>
</template>