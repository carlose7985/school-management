<script setup lang="ts">
import { ref, watch } from 'vue';
import {
    Printer,
    Download,
    Copy,
    ExternalLink,
    Check,
    Loader2,
    AlertCircle,
    IdCard,
    X,
} from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

type CarnetData = {
    url: string;
    filename: string;
    empleado: {
        nombre: string;
        cedula: string;
    };
};

const props = defineProps<{
    open: boolean;
    carnet: CarnetData | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

// Estados de las acciones
const copying = ref(false);
const copied = ref(false);
const error = ref('');

// Reset al abrir
watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            error.value = '';
            copied.value = false;
            copying.value = false;
        }
    },
);

const close = () => {
    emit('update:open', false);
};

// ─────────────────────────────────────────────
// Imprimir (abre el modal de impresión del navegador con solo la imagen)
// ─────────────────────────────────────────────
const imprimir = () => {
    if (!props.carnet) return;

    const ventana = window.open('', '_blank');
    if (!ventana) {
        error.value = 'Permite las ventanas emergentes para imprimir.';
        return;
    }

    ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Imprimir Carnet</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #f1f5f9;
                }
                img {
                    max-width: 100%;
                    max-height: 100vh;
                    object-fit: contain;
                }
                @media print {
                    body { background: white; }
                    img { max-height: 100vh; width: auto; }
                }
            </style>
        </head>
        <body>
            <img src="${props.carnet.url}" onload="setTimeout(() => window.print(), 500)" />
        </body>
        </html>
    `);
    ventana.document.close();
};

// ─────────────────────────────────────────────
// Descargar
// ─────────────────────────────────────────────
const descargar = async () => {
    if (!props.carnet) return;

    try {
        const res = await fetch(props.carnet.url);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = props.carnet.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (e) {
        error.value = 'No se pudo descargar el carnet.';
    }
};

// ─────────────────────────────────────────────
// Copiar al portapapeles
// ─────────────────────────────────────────────
const copiar = async () => {
    if (!props.carnet) return;

    copying.value = true;
    error.value = '';

    try {
        const res = await fetch(props.carnet.url);
        const blob = await res.blob();

        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
        ]);

        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2500);
    } catch (e) {
        error.value = 'Tu navegador no permite copiar imágenes. Usa "Descargar".';
    } finally {
        copying.value = false;
    }
};

// ─────────────────────────────────────────────
// Abrir en nueva pestaña
// ─────────────────────────────────────────────
const abrirNuevaPestana = () => {
    if (!props.carnet) return;
    window.open(props.carnet.url, '_blank');
};
</script>
<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-xl overflow-hidden border-0 p-0 shadow-2xl sm:max-w-xl">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-cyan-100 bg-gradient-to-r from-cyan-50 via-sky-50 to-white px-5 py-4 dark:border-cyan-900/30 dark:from-cyan-950/40 dark:via-sky-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 shadow-lg shadow-cyan-900/20">
                    <IdCard class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Carnet Generado
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ carnet?.empleado.nombre }} · {{ carnet?.empleado.cedula }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Preview del carnet -->
            <div class="flex max-h-[55vh] items-center justify-center overflow-auto bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 p-6">
                <img v-if="carnet" :src="carnet.url" alt="Carnet" class="max-h-full max-w-full rounded-xl shadow-2xl shadow-slate-900/20 transition-transform hover:scale-[1.02]" />
            </div>
            <!-- Acciones -->
            <div class="space-y-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div class="grid grid-cols-4 gap-2">
                    <!-- Copiar -->
                    <button type="button" :disabled="copying" class="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white py-3 transition-all hover:border-cyan-400 hover:shadow-md active:scale-[0.97] disabled:opacity-50" @click="copiar">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors" :class="copied ? 'bg-emerald-100' : 'bg-cyan-100'">
                            <Check v-if="copied" class="h-4 w-4 text-emerald-600" :stroke-width="2.5" />
                            <Loader2 v-else-if="copying" class="h-4 w-4 animate-spin text-cyan-600" :stroke-width="2.5" />
                            <Copy v-else class="h-4 w-4 text-cyan-600" :stroke-width="2.5" />
                        </div>
                        <span class="text-[9px] font-black tracking-wider uppercase" :class="copied ? 'text-emerald-700' : 'text-slate-700'">
                            {{ copied ? 'Copiado' : 'Copiar' }}
                        </span>
                    </button>
                    <!-- Descargar -->
                    <button type="button" class="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white py-3 transition-all hover:border-emerald-400 hover:shadow-md active:scale-[0.97]" @click="descargar">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                            <Download class="h-4 w-4 text-emerald-600" :stroke-width="2.5" />
                        </div>
                        <span class="text-[9px] font-black tracking-wider text-slate-700 uppercase">
                            Descargar
                        </span>
                    </button>
                    <!-- Imprimir -->
                    <button type="button" class="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white py-3 transition-all hover:border-violet-400 hover:shadow-md active:scale-[0.97]" @click="imprimir">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
                            <Printer class="h-4 w-4 text-violet-600" :stroke-width="2.5" />
                        </div>
                        <span class="text-[9px] font-black tracking-wider text-slate-700 uppercase">
                            Imprimir
                        </span>
                    </button>
                    <!-- Nueva pestaña -->
                    <button type="button" class="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white py-3 transition-all hover:border-amber-400 hover:shadow-md active:scale-[0.97]" @click="abrirNuevaPestana">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                            <ExternalLink class="h-4 w-4 text-amber-600" :stroke-width="2.5" />
                        </div>
                        <span class="text-[9px] font-black tracking-wider text-slate-700 uppercase">
                            Ver más
                        </span>
                    </button>
                </div>
                <!-- Error -->
                <div v-if="error" class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                    <AlertCircle class="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" :stroke-width="2.5" />
                    <p class="text-[11px] font-bold text-rose-700">{{ error }}</p>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Button type="button" variant="secondary" class="h-10 gap-2 font-bold tracking-wider uppercase" @click="close">
                    Cerrar
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>