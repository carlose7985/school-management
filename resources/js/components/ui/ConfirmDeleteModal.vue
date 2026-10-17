<script setup lang="ts">
import { computed } from 'vue';
import { AlertTriangle, Trash2, Power, PowerOff } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from './LoadingSpinner.vue';

type Color = 'red' | 'amber' | 'emerald' | 'blue' | 'violet' | 'slate';
type Icon = 'trash' | 'power' | 'power-off' | 'alert';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title?: string;
        description?: string;
        itemName?: string;
        itemLabel?: string;
        confirmText?: string;
        cancelText?: string;
        processingLabel?: string;
        processing?: boolean;
        closeOnConfirm?: boolean;
        color?: Color;
        icon?: Icon;
    }>(),
    {
        title: '¿Confirmar acción?',
        description: 'Esta acción requiere confirmación.',
        itemName: '',
        itemLabel: 'Elemento:',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        processingLabel: 'Procesando...',
        processing: false,
        closeOnConfirm: false,
        color: 'red',
        icon: 'alert',
    },
);

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
}>();

// Mapa de colores a clases Tailwind (usando safelist mental)
const colorMap: Record<Color, {
    gradient: string;
    border: string;
    iconBg: string;
    iconRing: string;
    iconColor: string;
    pingColor: string;
    cardBg: string;
    cardBorder: string;
    labelText: string;
    buttonBg: string;
}> = {
    red: {
        gradient: 'from-red-50 to-white dark:from-red-950/40 dark:to-slate-900',
        border: 'border-red-100 dark:border-red-900/30',
        iconBg: 'bg-red-100 dark:bg-red-900/40',
        iconRing: 'ring-red-50 dark:ring-red-950/40',
        iconColor: 'text-red-600 dark:text-red-400',
        pingColor: 'bg-red-400/30',
        cardBg: 'bg-red-50/50 dark:bg-red-950/20',
        cardBorder: 'border-red-200/60 dark:border-red-900/30',
        labelText: 'text-red-500',
        buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-900/20',
    },
    amber: {
        gradient: 'from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900',
        border: 'border-amber-100 dark:border-amber-900/30',
        iconBg: 'bg-amber-100 dark:bg-amber-900/40',
        iconRing: 'ring-amber-50 dark:ring-amber-950/40',
        iconColor: 'text-amber-600 dark:text-amber-400',
        pingColor: 'bg-amber-400/30',
        cardBg: 'bg-amber-50/50 dark:bg-amber-950/20',
        cardBorder: 'border-amber-200/60 dark:border-amber-900/30',
        labelText: 'text-amber-600',
        buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-900/20',
    },
    emerald: {
        gradient: 'from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900',
        border: 'border-emerald-100 dark:border-emerald-900/30',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        iconRing: 'ring-emerald-50 dark:ring-emerald-950/40',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        pingColor: 'bg-emerald-400/30',
        cardBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
        cardBorder: 'border-emerald-200/60 dark:border-emerald-900/30',
        labelText: 'text-emerald-600',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20',
    },
    blue: {
        gradient: 'from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-900',
        border: 'border-blue-100 dark:border-blue-900/30',
        iconBg: 'bg-blue-100 dark:bg-blue-900/40',
        iconRing: 'ring-blue-50 dark:ring-blue-950/40',
        iconColor: 'text-blue-600 dark:text-blue-400',
        pingColor: 'bg-blue-400/30',
        cardBg: 'bg-blue-50/50 dark:bg-blue-950/20',
        cardBorder: 'border-blue-200/60 dark:border-blue-900/30',
        labelText: 'text-blue-600',
        buttonBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20',
    },
    violet: {
        gradient: 'from-violet-50 to-white dark:from-violet-950/40 dark:to-slate-900',
        border: 'border-violet-100 dark:border-violet-900/30',
        iconBg: 'bg-violet-100 dark:bg-violet-900/40',
        iconRing: 'ring-violet-50 dark:ring-violet-950/40',
        iconColor: 'text-violet-600 dark:text-violet-400',
        pingColor: 'bg-violet-400/30',
        cardBg: 'bg-violet-50/50 dark:bg-violet-950/20',
        cardBorder: 'border-violet-200/60 dark:border-violet-900/30',
        labelText: 'text-violet-600',
        buttonBg: 'bg-violet-600 hover:bg-violet-700 shadow-violet-900/20',
    },
    slate: {
        gradient: 'from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900',
        border: 'border-slate-200 dark:border-slate-700/50',
        iconBg: 'bg-slate-200 dark:bg-slate-700/60',
        iconRing: 'ring-slate-100 dark:ring-slate-800/60',
        iconColor: 'text-slate-600 dark:text-slate-300',
        pingColor: 'bg-slate-400/30',
        cardBg: 'bg-slate-100/60 dark:bg-slate-800/40',
        cardBorder: 'border-slate-200 dark:border-slate-700/50',
        labelText: 'text-slate-500',
        buttonBg: 'bg-slate-700 hover:bg-slate-800 shadow-slate-900/20',
    },
};

const styles = computed(() => colorMap[props.color]);

const iconComponent = computed(() => {
    const map: Record<Icon, any> = {
        trash: Trash2,
        power: Power,
        'power-off': PowerOff,
        alert: AlertTriangle,
    };
    return map[props.icon];
});

const handleOpenChange = (value: boolean) => {
    if (props.processing) return;
    emit('update:open', value);
    if (!value) emit('cancel');
};

const handleConfirm = () => {
    emit('confirm');
    if (props.closeOnConfirm) {
        emit('update:open', false);
    }
};

const handleCancel = () => {
    if (props.processing) return;
    emit('update:open', false);
    emit('cancel');
};
</script>

<template>
    <Dialog :open="open" @update:open="handleOpenChange">
        <DialogContent
            class="max-w-md overflow-hidden border-0 p-0 shadow-2xl sm:max-w-md"
            :class="{ 'pointer-events-none': processing }"
        >
            <!-- Header con color dinámico -->
            <div
                :class="[
                    'relative flex flex-col items-center gap-3 border-b px-6 pt-8 pb-6 bg-gradient-to-b',
                    styles.gradient,
                    styles.border,
                ]"
            >
                <div class="relative">
                    <div :class="['absolute inset-0 animate-ping rounded-full', styles.pingColor]"></div>
                    <div
                        :class="[
                            'relative flex h-16 w-16 items-center justify-center rounded-full ring-8',
                            styles.iconBg,
                            styles.iconRing,
                        ]"
                    >
                        <component
                            :is="iconComponent"
                            :class="['h-8 w-8', styles.iconColor]"
                            :stroke-width="2.2"
                        />
                    </div>
                </div>
                <DialogHeader class="space-y-1.5 text-center">
                    <DialogTitle class="text-lg text-center font-black tracking-tight text-slate-900 uppercase dark:text-white">
                        {{ title }}
                    </DialogTitle>
                    <DialogDescription class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {{ description }}
                    </DialogDescription>
                </DialogHeader>
            </div>

            <!-- Cuerpo con el nombre del item -->
            <div v-if="itemName" class="px-6 py-5">
                <div :class="['rounded-xl border px-4 py-3', styles.cardBg, styles.cardBorder]">
                    <p :class="['text-[10px] font-bold tracking-wider uppercase', styles.labelText]">
                        {{ itemLabel }}
                    </p>
                    <p class="mt-1 truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                        {{ itemName }}
                    </p>
                </div>
            </div>

            <!-- Footer con botones -->
            <DialogFooter class="flex flex-row gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <Button
                    type="button"
                    variant="secondary"
                    class="flex-1 font-bold tracking-wider uppercase"
                    :disabled="processing"
                    @click="handleCancel"
                >
                    {{ cancelText }}
                </Button>
                <Button
                    type="button"
                    :class="[
                        'flex-1 gap-2 font-bold tracking-wider text-white uppercase shadow-lg',
                        styles.buttonBg,
                    ]"
                    :disabled="processing"
                    @click="handleConfirm"
                >
                    <LoadingSpinner v-if="processing" size="sm" color="text-white" />
                    <component v-else :is="iconComponent" class="h-4 w-4" :stroke-width="2.5" />
                    {{ processing ? processingLabel : confirmText }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>