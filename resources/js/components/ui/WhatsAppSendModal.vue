<script setup lang="ts">
import { computed } from 'vue';
import {
    MessageCircle,
    Phone,
    User,
    Send,
    Users,
    X,
    AlertTriangle,
    MessageSquare,
} from '@lucide/vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { whatsappModalOpen, whatsappModalData } from '@/composables/useFlashToast';

const close = () => {
    whatsappModalOpen.value = false;
    setTimeout(() => {
        whatsappModalData.value = null;
    }, 300);
};

const enviarAlEmpleado = () => {
    if (!whatsappModalData.value) return;
    window.open(whatsappModalData.value.url_send, '_blank');
    close();
};

const elegirContacto = () => {
    if (!whatsappModalData.value) return;
    window.open(whatsappModalData.value.url_pick, '_blank');
    close();
};

const tieneTelefono = computed(
    () => !!whatsappModalData.value?.tiene_telefono,
);
</script>
<template>
   <Dialog :open="whatsappModalOpen" @update:open="close">
        <DialogContent class="z-[200] max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white px-5 py-4 dark:border-emerald-900/30 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-900/20">
                    <MessageCircle class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            Enviar por WhatsApp
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            Envía el comprobante al empleado
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            <!-- Body -->
            <div class="space-y-4 px-5 py-4">
                <!-- Info del destinatario -->
                <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
                        <User class="h-5 w-5 text-white" :stroke-width="2.2" />
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col leading-tight">
                        <span class="truncate text-sm font-black tracking-tight text-slate-900 uppercase">
                            {{ whatsappModalData?.destinatario }}
                        </span>
                        <span class="flex items-center gap-1.5 truncate font-mono text-[11px] font-bold tracking-wide text-slate-500">
                            <Phone class="h-3 w-3" :stroke-width="2.4" />
                            {{ whatsappModalData?.numero }}
                        </span>
                    </div>
                </div>
                <!-- Aviso: sin teléfono -->
                <div v-if="!tieneTelefono" class="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3">
                    <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600" :stroke-width="2.5" />
                    <div class="flex flex-col gap-1">
                        <p class="text-[11px] font-black tracking-wider text-amber-800 uppercase">
                            Sin teléfono registrado
                        </p>
                        <p class="text-[11px] leading-relaxed text-amber-700">
                            Este empleado no tiene teléfono registrado. Usa la opción
                            <strong>"Elegir contacto"</strong> para seleccionar manualmente.
                        </p>
                    </div>
                </div>
                <!-- Preview del mensaje -->
                <div class="flex flex-col gap-2">
                    <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Vista previa del mensaje
                    </span>
                    <div class="max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4">
                        <pre class="whitespace-pre-wrap font-sans text-[11px] leading-relaxed text-slate-700">{{ whatsappModalData?.mensaje }}</pre>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <!-- Botón: Enviar al empleado (si tiene teléfono) -->
                <button v-if="tieneTelefono" type="button" class="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 text-xs font-black tracking-wider text-white uppercase shadow-lg shadow-emerald-900/20 transition-all hover:from-emerald-700 hover:to-green-700 active:scale-[0.98]" @click="enviarAlEmpleado">
                    <Send class="h-4 w-4" :stroke-width="2.5" />
                    Enviar a {{ whatsappModalData?.destinatario }}
                </button>
                <!-- Botón: Elegir otro contacto -->
                <button type="button" class="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 text-xs font-black tracking-wider text-slate-700 uppercase transition-all hover:border-emerald-300 hover:bg-emerald-50/40 active:scale-[0.98]" @click="elegirContacto">
                    <Users class="h-4 w-4" :stroke-width="2.5" />
                    Elegir otro contacto
                </button>
                <!-- Botón: Cerrar -->
                <button type="button" class="h-9 w-full rounded-lg bg-slate-100 text-[11px] font-black tracking-wider text-slate-500 uppercase transition-colors hover:bg-slate-200" @click="close">
                    Cerrar
                </button>
            </div>
        </DialogContent>
    </Dialog>
</template>