<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    ArrowLeft,
    Image as ImageIcon,
    Upload,
    Trash2,
    FileImage,
    Building2,
} from '@lucide/vue';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Datos Básicos', href: '/datos/basicos' },
            { title: 'Logos', href: '/datos/basicos/logos' },
        ],
    },
});

type Logo = {
    id: number;
    logo_institucion: string | null;
    logo_documentos: string | null;
    logo_institucion_url: string;
    logo_documentos_url: string;
} | null;

const props = defineProps<{ logos: Logo }>();

// ─────────────────────────────────────────────
// Estado de carga por campo
// ─────────────────────────────────────────────
const uploadingField = ref<string | null>(null);

const inputInstitucion = ref<HTMLInputElement | null>(null);
const inputDocumentos = ref<HTMLInputElement | null>(null);

// ─────────────────────────────────────────────
// Subida de archivos
// ─────────────────────────────────────────────
const triggerUpload = (field: 'logo_institucion' | 'logo_documentos') => {
    if (uploadingField.value) return;
    if (field === 'logo_institucion') {
        inputInstitucion.value?.click();
    } else {
        inputDocumentos.value?.click();
    }
};

const handleFile = (
    event: Event,
    field: 'logo_institucion' | 'logo_documentos',
) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploadingField.value = field;

    router.post(
        '/datos/basicos/logos',
        {
            field,
            file,
        },
        {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                uploadingField.value = null;
                input.value = ''; // limpiar el input
            },
        },
    );
};

// ─────────────────────────────────────────────
// Eliminar logo
// ─────────────────────────────────────────────
const showDeleteModal = ref(false);
const deleteField = ref<'logo_institucion' | 'logo_documentos' | null>(null);
const deleting = ref(false);

const askDelete = (field: 'logo_institucion' | 'logo_documentos') => {
    deleteField.value = field;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (!deleteField.value) return;
    deleting.value = true;
    router.delete('/datos/basicos/logos', {
        data: { field: deleteField.value },
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            showDeleteModal.value = false;
            deleteField.value = null;
        },
    });
};

// ─────────────────────────────────────────────
// Datos de las dos cards
// ─────────────────────────────────────────────
type CardConfig = {
    field: 'logo_institucion' | 'logo_documentos';
    title: string;
    subtitle: string;
    hasFile: boolean;
    url: string;
    icon: any;
    gradient: string;
};

const cards = computed<CardConfig[]>(() => [
    {
        field: 'logo_institucion',
        title: 'Logo Institución',
        subtitle: 'Identidad Principal',
        hasFile: !!props.logos?.logo_institucion,
        url: props.logos?.logo_institucion_url ?? '/img/noImg.png',
        icon: Building2,
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        field: 'logo_documentos',
        title: 'Logo Documentos',
        subtitle: 'Encabezados y Reportes',
        hasFile: !!props.logos?.logo_documentos,
        url: props.logos?.logo_documentos_url ?? '/img/noImg.png',
        icon: FileImage,
        gradient: 'from-violet-500 to-purple-600',
    },
]);

const deleteItemName = computed(() => {
    if (deleteField.value === 'logo_institucion') return 'Logo Institución';
    if (deleteField.value === 'logo_documentos') return 'Logo Documentos';
    return '';
});
</script>
<template>
    <Head title="Logos" />
    <ViewContainer title="Logos" subtitle="Identidad visual e imágenes del sistema" icon="Image" :show-search="false">
        <template #returns>
            <Link href="/datos/basicos" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-none active:scale-[0.97]">
                <ArrowLeft :size="16" :stroke-width="2.5" />
                Volver
            </Link>
        </template>
        <!-- Inputs ocultos -->
        <input ref="inputInstitucion" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" class="hidden" @change="(e) => handleFile(e, 'logo_institucion')" />
        <input ref="inputDocumentos" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" class="hidden" @change="(e) => handleFile(e, 'logo_documentos')" />
        <!-- Grid de dos cards -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div v-for="card in cards" :key="card.field" class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                <!-- Franja de color superior -->
                <div :class="['h-1.5 bg-gradient-to-r', card.gradient]"></div>
                <!-- Header de la card -->
                <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                    <div :class="[
                        'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                        card.gradient,
                    ]">
                        <component :is="card.icon" class="h-5 w-5" :stroke-width="2.2" />
                    </div>
                    <div class="flex flex-col leading-tight">
                        <span class="text-sm font-black tracking-tight text-slate-800 uppercase">
                            {{ card.title }}
                        </span>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            {{ card.subtitle }}
                        </span>
                    </div>
                </div>
                <!-- Preview de la imagen -->
                <div class="relative flex h-72 items-center justify-center bg-slate-50 p-6">
                    <!-- Loading overlay -->
                    <div v-if="uploadingField === card.field" class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
                        <LoadingSpinner size="lg" color="text-blue-600" />
                        <span class="text-xs font-black tracking-widest text-blue-600 uppercase">
                            Subiendo...
                        </span>
                    </div>
                    <!-- Imagen -->
                    <img :src="card.url" :alt="card.title" class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105" />
                    <!-- Badge de "sin archivo" -->
                    <div v-if="!card.hasFile" class="absolute top-4 right-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black tracking-widest text-amber-700 uppercase">
                        Sin archivo
                    </div>
                </div>
                <!-- Footer con acciones -->
                <div class="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                    <button type="button" :disabled="!!uploadingField" class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-sm shadow-blue-900/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" @click="triggerUpload(card.field)">
                        <Upload class="h-4 w-4" :stroke-width="2.5" />
                        {{ card.hasFile ? 'Cambiar' : 'Subir' }}
                    </button>
                    <button v-if="card.hasFile" type="button" :disabled="!!uploadingField" class="flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-black tracking-wider text-rose-600 uppercase transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50" @click="askDelete(card.field)">
                        <Trash2 class="h-4 w-4" :stroke-width="2.5" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
        <!-- Info adicional -->
        <div class="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
            <div class="flex items-start gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <ImageIcon class="h-4 w-4 text-blue-600" :stroke-width="2.5" />
                </div>
                <div class="flex flex-col gap-1 leading-relaxed">
                    <span class="text-xs font-black tracking-wider text-blue-800 uppercase">
                        Recomendaciones
                    </span>
                    <p class="text-xs text-blue-700">
                        Formatos soportados: PNG, JPG, WEBP, SVG. Tamaño máximo: 2MB.
                        Se recomienda usar PNG con fondo transparente para mejor visualización.
                    </p>
                </div>
            </div>
        </div>
    </ViewContainer>
    <!-- Modal de confirmación eliminar -->
    <ConfirmDeleteModal v-model:open="showDeleteModal" title="¿Eliminar logo?" description="El logo será eliminado permanentemente. Podrás subir uno nuevo cuando quieras." :item-name="deleteItemName" item-label="Logo a eliminar:" confirm-text="Eliminar" processing-label="Eliminando..." color="red" icon="trash" :processing="deleting" :close-on-confirm="false" @confirm="confirmDelete" />
</template>