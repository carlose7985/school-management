import { watch } from "vue";
import { usePage } from "@inertiajs/vue3";
import { toast } from "vue-sonner";

type Flash = {
    success?: string | null;
    error?: string | null;
    warning?: string | null;
    info?: string | null;
    whatsapp_message?: {
        destinatario: string;
        numero: string;
        numero_whatsapp: string;
        mensaje: string;
        url_send: string;
        url_pick: string;
        tiene_telefono: boolean;
    } | null;
};

// Estado global para el modal de WhatsApp
import { ref } from "vue";

export const whatsappModalOpen = ref(false);
export const whatsappModalData = ref<Flash["whatsapp_message"]>(null);

export function useFlashToast() {
    const page = usePage();

    watch(
        () => (page.props as any).flash as Flash | undefined,
        (flash) => {
            if (!flash) return;

            // Toasts
            if (flash.success) {
                toast.success("Éxito", { description: flash.success });
            }
            if (flash.error) {
                toast.error("Error", { description: flash.error });
            }
            if (flash.warning) {
                toast.warning("Atención", { description: flash.warning });
            }
            if (flash.info) {
                toast.info("Información", { description: flash.info });
            }

            // Modal de WhatsApp
            if (flash.whatsapp_message) {
                whatsappModalData.value = flash.whatsapp_message;
                whatsappModalOpen.value = true;
            }
        },
        { deep: true, immediate: true },
    );
}
