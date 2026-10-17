import { ref, onBeforeUnmount } from "vue";
import { router } from "@inertiajs/vue3";

type Options = {
    isDirty: () => boolean;
};

export function useUnsavedChanges({ isDirty }: Options) {
    const showModal = ref(false);
    const pendingUrl = ref<string | null>(null);
    const forceLeave = ref(false);
    const pendingMethod = ref<string>("get");

    // Intercepta navegación de Inertia SOLO para peticiones GET
    // (evita bloquear POST/PUT/DELETE de guardar)
    const removeListener = router.on("before", (event) => {
        if (forceLeave.value) return;
        if (!isDirty()) return;

        const visit = event.detail.visit;
        const method = (visit.method ?? "get").toLowerCase();

        // Solo interceptar navegación GET
        if (method !== "get") return;

        event.preventDefault();

        const url = visit.url
            ? typeof visit.url === "string"
                ? visit.url
                : (visit.url as URL).toString()
            : window.location.href;

        pendingUrl.value = url;
        pendingMethod.value = method;
        showModal.value = true;
    });

    // Intercepta cierre de pestaña / recarga
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
        if (forceLeave.value) return;
        if (!isDirty()) return;
        e.preventDefault();
        e.returnValue = "";
    };

    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    }

    onBeforeUnmount(() => {
        removeListener();
        if (typeof window !== "undefined") {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
        }
    });

    /** Navega a una URL. Si hay cambios, abre el modal */
    const navigate = (url: string) => {
        if (!isDirty()) {
            forceLeave.value = true;
            router.visit(url);
            return;
        }
        pendingUrl.value = url;
        showModal.value = true;
    };

    /** Cierra el modal sin salir */
    const stay = () => {
        showModal.value = false;
        pendingUrl.value = null;
    };

    /** Sale descartando cambios */
    const leave = () => {
        const url = pendingUrl.value;
        showModal.value = false;
        pendingUrl.value = null;
        if (url) {
            forceLeave.value = true;
            router.visit(url);
        }
    };

    /** Guarda y luego sale */
    const saveAndLeave = async (onSave: () => Promise<void> | void) => {
        const url = pendingUrl.value;
        await onSave();
        showModal.value = false;
        pendingUrl.value = null;
        if (url) {
            forceLeave.value = true;
            router.visit(url);
        }
    };

    return {
        showModal,
        navigate,
        stay,
        leave,
        saveAndLeave,
    };
}
