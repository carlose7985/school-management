<script setup lang="ts">
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { router } from '@inertiajs/vue3';
import {
    Camera,
    Upload,
    Trash2,
    User,
    ImagePlus,
    X,
    RotateCcw,
    Check,
    AlertCircle,
    Video,
    SwitchCamera,
} from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

type Empleado = {
    id: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    documento?: string | null;
    foto: string | null;
    iniciales: string;
    nombre_completo: string;
};

const props = defineProps<{
    open: boolean;
    empleado: Empleado | null;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
}>();

// ─────────────────────────────────────────────
// Estado general
// ─────────────────────────────────────────────
const mode = ref<'view' | 'camera'>('view');
const previewBase64 = ref<string | null>(null);
const selectedFileName = ref<string>('');
const error = ref<string>('');
const processing = ref(false);
const deleting = ref(false);

// ─────────────────────────────────────────────
// Estado de la cámara
// ─────────────────────────────────────────────
const videoRef = ref<HTMLVideoElement | null>(null);
const stream = ref<MediaStream | null>(null);
const devices = ref<MediaDeviceInfo[]>([]);
const currentDeviceId = ref<string>('');
const cameraLoading = ref(false);
const cameraReady = ref(false);

// ─────────────────────────────────────────────
// Estado del capture
// ─────────────────────────────────────────────
const capturedBase64 = ref<string | null>(null);

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const fileInputRef = ref<HTMLInputElement | null>(null);

const nombreEmpleado = computed(() => props.empleado?.nombre_completo ?? '');
const cedulaCompleta = computed(() => {
    if (!props.empleado) return '';
    return `${props.empleado.documento ?? ''}${props.empleado.cedula ?? ''}`;
});

const fotoActualUrl = computed(() => {
    if (!props.empleado?.foto) return null;
    return `/storage/${props.empleado.foto}`;
});

const tieneFotoActual = computed(() => !!props.empleado?.foto);
const tienePreviewNuevo = computed(() => !!previewBase64.value);

// Detectar si el navegador soporta getUserMedia
const supportsCamera = computed(() => {
    if (typeof navigator === 'undefined') return false;
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
});

// ─────────────────────────────────────────────
// Reset al abrir/cerrar
// ─────────────────────────────────────────────
const resetAll = () => {
    stopCamera();
    previewBase64.value = null;
    capturedBase64.value = null;
    selectedFileName.value = '';
    error.value = '';
    processing.value = false;
    deleting.value = false;
    mode.value = 'view';
    cameraReady.value = false;
    devices.value = [];
    currentDeviceId.value = '';
};

watch(
    () => props.open,
    (isOpen) => {
        if (!isOpen) {
            resetAll();
        }
    },
);

onBeforeUnmount(() => {
    stopCamera();
});

// ─────────────────────────────────────────────
// Convertir imagen (archivo) a JPG base64
// ─────────────────────────────────────────────
const fileToJpgBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('No se pudo procesar la imagen.'));
                    return;
                }

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                resolve(canvas.toDataURL('image/jpeg', 0.9));
            };
            img.onerror = () => reject(new Error('No se pudo leer la imagen.'));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Error al leer el archivo.'));
        reader.readAsDataURL(file);
    });
};

// ─────────────────────────────────────────────
// Manejar archivo seleccionado
// ─────────────────────────────────────────────
const onFileSelected = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    error.value = '';

    if (file.size > MAX_SIZE) {
        error.value = 'La imagen no debe pesar más de 2MB.';
        input.value = '';
        return;
    }

    if (!file.type.startsWith('image/')) {
        error.value = 'El archivo debe ser una imagen.';
        input.value = '';
        return;
    }

    try {
        const base64 = await fileToJpgBase64(file);
        previewBase64.value = base64;
        selectedFileName.value = file.name;
    } catch (e: any) {
        error.value = e?.message ?? 'Error al procesar la imagen.';
    }

    input.value = '';
};

const openFileSelector = () => {
    if (processing.value) return;
    fileInputRef.value?.click();
};

// ─────────────────────────────────────────────
// CÁMARA
// ─────────────────────────────────────────────
const startCamera = async (deviceId?: string) => {
    error.value = '';
    cameraLoading.value = true;
    cameraReady.value = false;

    // Detener stream anterior si existe
    stopCamera(false);

    try {
        const constraints: MediaStreamConstraints = {
            video: deviceId
                ? { deviceId: { exact: deviceId } }
                : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.value = mediaStream;

        // Guardar el deviceId actual
        const videoTrack = mediaStream.getVideoTracks()[0];
        if (videoTrack) {
            const settings = videoTrack.getSettings();
            if (settings.deviceId) {
                currentDeviceId.value = settings.deviceId;
            }
        }

        // Listar dispositivos disponibles
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        devices.value = allDevices.filter((d) => d.kind === 'videoinput');

        await nextTick();
        if (videoRef.value) {
            videoRef.value.srcObject = mediaStream;
            await videoRef.value.play();
            cameraReady.value = true;
        }
    } catch (e: any) {
        console.error('Error al acceder a la cámara:', e);

        if (e?.name === 'NotAllowedError') {
            error.value = 'Permiso denegado. Habilita el acceso a la cámara en tu navegador.';
        } else if (e?.name === 'NotFoundError') {
            error.value = 'No se encontró ninguna cámara conectada.';
        } else if (e?.name === 'NotReadableError') {
            error.value = 'La cámara está siendo usada por otra aplicación.';
        } else {
            error.value = 'No se pudo acceder a la cámara: ' + (e?.message ?? 'Error desconocido');
        }
    } finally {
        cameraLoading.value = false;
    }
};

const stopCamera = (resetMode = true) => {
    if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null;
    }
    if (videoRef.value) {
        videoRef.value.srcObject = null;
    }
    cameraReady.value = false;
    if (resetMode) {
        mode.value = 'view';
    }
};

const openCamera = async () => {
    if (processing.value) return;
    mode.value = 'camera';
    capturedBase64.value = null;
    await nextTick();
    await startCamera();
};

const switchCamera = async () => {
    if (devices.value.length < 2) return;

    // Buscar siguiente dispositivo
    const currentIndex = devices.value.findIndex(
        (d) => d.deviceId === currentDeviceId.value,
    );
    const nextIndex = (currentIndex + 1) % devices.value.length;
    const nextDevice = devices.value[nextIndex];

    await startCamera(nextDevice.deviceId);
};

// ─────────────────────────────────────────────
// Capturar frame de la cámara
// ─────────────────────────────────────────────
const captureFromVideo = () => {
    if (!videoRef.value) return;

    const video = videoRef.value;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    capturedBase64.value = base64;
};

// ─────────────────────────────────────────────
// Confirmar captura
// ─────────────────────────────────────────────
const confirmCapture = () => {
    if (!capturedBase64.value) return;
    previewBase64.value = capturedBase64.value;
    selectedFileName.value = 'Captura de cámara';
    stopCamera();
    capturedBase64.value = null;
};

const retakePhoto = () => {
    capturedBase64.value = null;
};

// ─────────────────────────────────────────────
// Limpiar preview
// ─────────────────────────────────────────────
const clearPreview = () => {
    previewBase64.value = null;
    selectedFileName.value = '';
    error.value = '';
};

// ─────────────────────────────────────────────
// Guardar
// ─────────────────────────────────────────────
const guardar = () => {
    if (!props.empleado || !previewBase64.value) return;

    processing.value = true;

    router.post(
        `/empleados/activos/listado/foto/${props.empleado.id}`,
        { foto: previewBase64.value },
        {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => {
                processing.value = false;
                emit('update:open', false);
            },
        },
    );
};

// ─────────────────────────────────────────────
// Eliminar
// ─────────────────────────────────────────────
const eliminarFoto = () => {
    if (!props.empleado) return;

    deleting.value = true;

    router.post(
        `/empleados/activos/listado/foto/${props.empleado.id}`,
        { foto: '' },
        {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => {
                deleting.value = false;
                emit('update:open', false);
            },
        },
    );
};

const close = () => {
    if (processing.value || deleting.value) return;
    stopCamera();
    emit('update:open', false);
};
</script>

<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogContent class="max-w-lg overflow-hidden border-0 p-0 shadow-2xl sm:max-w-lg">
            <!-- Header -->
            <div class="relative flex items-center gap-3 border-b border-cyan-100 bg-gradient-to-r from-cyan-50 via-sky-50 to-white px-5 py-4 dark:border-cyan-900/30 dark:from-cyan-950/40 dark:via-sky-950/40 dark:to-slate-900">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 shadow-lg shadow-cyan-900/20">
                    <Camera v-if="mode === 'view'" class="h-6 w-6 text-white" :stroke-width="2.2" />
                    <Video v-else class="h-6 w-6 text-white" :stroke-width="2.2" />
                </div>
                <div class="flex flex-1 flex-col leading-tight">
                    <DialogHeader class="space-y-0.5 text-left">
                        <DialogTitle class="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                            {{ mode === 'camera' ? 'Tomar Foto' : 'Actualizar Fotografía' }}
                        </DialogTitle>
                        <DialogDescription class="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            {{ mode === 'camera' ? 'Captura desde la cámara' : 'Sube o toma una nueva foto' }}
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>

            <!-- Input oculto -->
            <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onFileSelected"
            />

            <!-- ══════════════════════════════════════ -->
            <!-- VISTA: MODAL PRINCIPAL (modo view)    -->
            <!-- ══════════════════════════════════════ -->
            <template v-if="mode === 'view'">
                <div class="space-y-4 px-5 py-4">
                    <!-- Info empleado -->
                    <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
                            <User class="h-4 w-4 text-white" :stroke-width="2.2" />
                        </div>
                        <div class="flex min-w-0 flex-1 flex-col leading-tight">
                            <span class="truncate text-xs font-black tracking-tight text-slate-900 uppercase">
                                {{ nombreEmpleado }}
                            </span>
                            <span class="truncate font-mono text-[10px] font-bold tracking-wide text-slate-500">
                                {{ cedulaCompleta }}
                            </span>
                        </div>
                    </div>

                    <!-- Preview -->
                    <div class="flex flex-col items-center gap-3">
                        <div class="relative h-56 w-56 overflow-hidden rounded-3xl border-4 border-white bg-slate-50 shadow-xl">
                            <img
                                v-if="tienePreviewNuevo"
                                :src="previewBase64!"
                                alt="Preview"
                                class="h-full w-full object-cover"
                            />
                            <img
                                v-else-if="fotoActualUrl"
                                :src="fotoActualUrl"
                                :alt="nombreEmpleado"
                                class="h-full w-full object-cover"
                            />
                            <div
                                v-else
                                class="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
                            >
                                <span class="text-5xl font-black tracking-widest text-slate-400">
                                    {{ empleado?.iniciales ?? '??' }}
                                </span>
                            </div>

                            <div
                                v-if="tienePreviewNuevo"
                                class="absolute top-2 left-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase shadow-lg"
                            >
                                Nueva
                            </div>

                            <button
                                v-if="tienePreviewNuevo"
                                type="button"
                                class="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-lg backdrop-blur transition-colors hover:bg-rose-500 hover:text-white"
                                title="Descartar selección"
                                @click="clearPreview"
                            >
                                <Trash2 class="h-3.5 w-3.5" :stroke-width="2.5" />
                            </button>
                        </div>

                        <p
                            v-if="selectedFileName"
                            class="max-w-full truncate text-[10px] font-bold tracking-wider text-slate-500 italic"
                        >
                            📎 {{ selectedFileName }}
                        </p>
                    </div>

                    <!-- Botones de acción -->
                    <div v-if="!tienePreviewNuevo" class="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            class="group flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-4 transition-all hover:border-cyan-400 hover:bg-cyan-50/40 active:scale-[0.98]"
                            @click="openFileSelector"
                        >
                            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 shadow-md shadow-cyan-900/20 transition-transform group-hover:scale-110">
                                <Upload class="h-5 w-5 text-white" :stroke-width="2.4" />
                            </div>
                            <div class="text-center">
                                <p class="text-xs font-black tracking-wider text-slate-800 uppercase">
                                    Elegir Archivo
                                </p>
                                <p class="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                    PNG · JPG · WebP
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            :disabled="!supportsCamera"
                            class="group flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-4 transition-all hover:border-violet-400 hover:bg-violet-50/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                            @click="openCamera"
                        >
                            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-900/20 transition-transform group-hover:scale-110">
                                <Camera class="h-5 w-5 text-white" :stroke-width="2.4" />
                            </div>
                            <div class="text-center">
                                <p class="text-xs font-black tracking-wider text-slate-800 uppercase">
                                    Tomar Foto
                                </p>
                                <p class="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                    Usar cámara
                                </p>
                            </div>
                        </button>
                    </div>

                    <div v-else class="flex items-center justify-center">
                        <button
                            type="button"
                            class="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-black tracking-wider text-slate-600 uppercase transition-colors hover:bg-slate-200"
                            @click="clearPreview"
                        >
                            <ImagePlus class="h-3.5 w-3.5" :stroke-width="2.5" />
                            Elegir otra imagen
                        </button>
                    </div>

                    <div
                        v-if="error"
                        class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5"
                    >
                        <p class="text-xs font-bold text-rose-700">⚠ {{ error }}</p>
                    </div>

                    <p class="text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        Máx. 2MB · Se convertirá automáticamente a JPG
                    </p>
                </div>

                <!-- Footer modo view -->
                <div class="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <button
                        v-if="tieneFotoActual && !tienePreviewNuevo"
                        type="button"
                        class="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-[10px] font-black tracking-wider text-rose-600 uppercase transition-colors hover:bg-rose-100 disabled:opacity-50"
                        :disabled="deleting || processing"
                        @click="eliminarFoto"
                    >
                        <LoadingSpinner v-if="deleting" size="xs" color="text-rose-600" />
                        <Trash2 v-else class="h-3.5 w-3.5" :stroke-width="2.5" />
                        {{ deleting ? 'Eliminando...' : 'Eliminar foto' }}
                    </button>
                    <div v-else></div>

                    <div class="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            class="h-10 gap-2 font-bold tracking-wider uppercase"
                            :disabled="processing || deleting"
                            @click="close"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            class="h-10 gap-2 bg-cyan-600 font-bold tracking-wider text-white uppercase shadow-lg shadow-cyan-900/20 hover:bg-cyan-700 disabled:opacity-50"
                            :disabled="!tienePreviewNuevo || processing || deleting"
                            @click="guardar"
                        >
                            <LoadingSpinner v-if="processing" size="sm" color="text-white" />
                            <Upload v-else class="h-4 w-4" :stroke-width="2.5" />
                            {{ processing ? 'Guardando...' : 'Guardar Foto' }}
                        </Button>
                    </div>
                </div>
            </template>

            <!-- ══════════════════════════════════════ -->
            <!-- VISTA: CÁMARA (modo camera)           -->
            <!-- ══════════════════════════════════════ -->
            <template v-else>
                <div class="space-y-4 px-5 py-4">
                    <!-- Preview capturado o video en vivo -->
                    <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
                        <!-- Captura congelada -->
                        <img
                            v-if="capturedBase64"
                            :src="capturedBase64"
                            alt="Captura"
                            class="h-full w-full object-cover"
                        />

                        <!-- Video en vivo -->
                        <template v-else>
                            <video
                                ref="videoRef"
                                autoplay
                                playsinline
                                muted
                                class="h-full w-full object-cover"
                            ></video>

                            <!-- Estado de carga -->
                            <div
                                v-if="cameraLoading"
                                class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-sm"
                            >
                                <LoadingSpinner size="lg" color="text-cyan-400" />
                                <span class="text-xs font-black tracking-widest text-cyan-400 uppercase">
                                    Iniciando cámara...
                                </span>
                            </div>

                            <!-- Botón cambiar cámara (si hay más de una) -->
                            <button
                                v-if="cameraReady && devices.length > 1"
                                type="button"
                                class="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                                title="Cambiar cámara"
                                @click="switchCamera"
                            >
                                <SwitchCamera class="h-5 w-5" :stroke-width="2.4" />
                            </button>

                            <!-- Hint de grabación -->
                            <div
                                v-if="cameraReady"
                                class="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1.5 text-white shadow-lg backdrop-blur-sm"
                            >
                                <span class="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                                <span class="text-[10px] font-black tracking-widest uppercase">
                                    En Vivo
                                </span>
                            </div>
                        </template>

                        <!-- Error dentro del video -->
                        <div
                            v-if="error && !capturedBase64"
                            class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 p-6 text-center backdrop-blur-sm"
                        >
                            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20">
                                <AlertCircle class="h-7 w-7 text-rose-400" :stroke-width="2.2" />
                            </div>
                            <p class="max-w-xs text-xs leading-relaxed text-rose-200">
                                {{ error }}
                            </p>
                            <button
                                type="button"
                                class="mt-2 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-[10px] font-black tracking-widest text-white uppercase transition-colors hover:bg-white/20"
                                @click="startCamera()"
                            >
                                <RotateCcw class="h-3.5 w-3.5" :stroke-width="2.5" />
                                Reintentar
                            </button>
                        </div>
                    </div>

                    <!-- Info de la captura -->
                    <p
                        v-if="capturedBase64"
                        class="text-center text-[10px] font-bold tracking-wider text-emerald-600 uppercase"
                    >
                        ✓ Captura lista · Confirma para usar esta foto
                    </p>
                    <p
                        v-else-if="cameraReady"
                        class="text-center text-[10px] font-bold tracking-wider text-slate-500 uppercase"
                    >
                        Presiona "Capturar" para tomar la foto
                    </p>
                </div>

                <!-- Footer modo cámara -->
                <div class="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <button
                        type="button"
                        class="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-black tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-200"
                        @click="stopCamera()"
                    >
                        <X class="h-3.5 w-3.5" :stroke-width="2.5" />
                        Cancelar
                    </button>

                    <div class="flex items-center gap-2">
                        <!-- Vista capturada: botón "volver a tomar" -->
                        <template v-if="capturedBase64">
                            <Button
                                type="button"
                                variant="secondary"
                                class="h-10 gap-2 font-bold tracking-wider uppercase"
                                @click="retakePhoto"
                            >
                                <RotateCcw class="h-4 w-4" :stroke-width="2.5" />
                                Volver a Tomar
                            </Button>
                            <Button
                                type="button"
                                class="h-10 gap-2 bg-emerald-600 font-bold tracking-wider text-white uppercase shadow-lg shadow-emerald-900/20 hover:bg-emerald-700"
                                @click="confirmCapture"
                            >
                                <Check class="h-4 w-4" :stroke-width="2.5" />
                                Usar esta Foto
                            </Button>
                        </template>

                        <!-- Vista en vivo: botón capturar -->
                        <template v-else>
                            <Button
                                type="button"
                                class="h-10 gap-2 bg-rose-600 font-bold tracking-wider text-white uppercase shadow-lg shadow-rose-900/20 hover:bg-rose-700 disabled:opacity-50"
                                :disabled="!cameraReady || cameraLoading"
                                @click="captureFromVideo"
                            >
                                <Camera class="h-4 w-4" :stroke-width="2.5" />
                                Capturar
                            </Button>
                        </template>
                    </div>
                </div>
            </template>
        </DialogContent>
    </Dialog>
</template>