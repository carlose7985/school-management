<script setup lang="ts">
import { AlertCircle, LogOut, Save, Pencil } from '@lucide/vue';
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

const props = withDefaults(
    defineProps<{
        open: boolean;
        title?: string;
        description?: string;
        processing?: boolean;
        canSave?: boolean;
    }>(),
    {
        title: '¿Salir sin guardar?',
        description: 'Tienes cambios sin guardar en este formulario. ¿Qué deseas hacer?',
        processing: false,
        canSave: true,
    },
);

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'stay'): void;
    (e: 'leave'): void;
    (e: 'saveAndLeave'): void;
}>();
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header -->
            <div class="flex flex-col items-center gap-3 border-b border-amber-100 bg-gradient-to-b from-amber-50 to-white px-6 pt-7 pb-5 dark:border-amber-900/30 dark:from-amber-950/40 dark:to-slate-900">
                <div class="relative">
                    <div class="absolute inset-0 animate-ping rounded-full bg-amber-400/30"></div>
                    <div class="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 ring-8 ring-amber-50 dark:bg-amber-900/40 dark:ring-amber-950/40">
                        <AlertCircle class="h-7 w-7 text-amber-600 dark:text-amber-400" :stroke-width="2.2" />
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
            <!-- Footer con 3 botones -->
           <div class="border-t border-slate-100 bg-slate-50/60 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div class="flex flex-col gap-2">
                    <!-- Botón principal: Guardar y salir -->
                    <Button v-if="canSave" type="button" class="h-11 w-full gap-2 bg-emerald-600 font-bold tracking-wider text-white uppercase shadow-md shadow-emerald-900/20 transition-all hover:bg-emerald-700 active:scale-[0.98]" :disabled="processing" @click="emit('saveAndLeave')">
                        <LoadingSpinner v-if="processing" size="sm" color="text-white" />
                        <Save v-else class="h-4 w-4" :stroke-width="2.5" />
                        {{ processing ? 'Guardando...' : 'Guardar y salir' }}
                    </Button>
                    <!-- Fila inferior: Seguir editando + Salir sin guardar -->
                    <div class="grid grid-cols-2 gap-2">
                        <Button type="button" variant="secondary" class="h-11 gap-2 font-bold tracking-wider uppercase" :disabled="processing" @click="emit('stay')">
                            <Pencil class="h-4 w-4" :stroke-width="2.5" />
                            Seguir editando
                        </Button>
                        <Button type="button" variant="outline" class="h-11 gap-2 border-red-300 font-bold tracking-wider text-red-600 uppercase transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-red-900/40 dark:hover:bg-red-950/40" :disabled="processing" @click="emit('leave')">
                            <LogOut class="h-4 w-4" :stroke-width="2.5" />
                            Salir sin guardar
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>