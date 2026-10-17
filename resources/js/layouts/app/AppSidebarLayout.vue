<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { Bell, Search, ChevronDown, LogOut, User as UserIcon, Settings } from '@lucide/vue';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { Toaster } from '@/components/ui/sonner';
import type { BreadcrumbItem } from '@/types';
import { logout } from '@/routes';
import { useFlashToast } from '@/composables/useFlashToast';
import WhatsAppSendModal from '@/components/ui/WhatsAppSendModal.vue';
import { whatsappModalOpen, whatsappModalData } from '@/composables/useFlashToast';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const user = computed(() => (page.props.auth as any)?.user);
const handleWhatsAppEvent = (e: any) => {
    whatsappModalData.value = e.detail;
    whatsappModalOpen.value = true;
};

onMounted(() => {
    window.addEventListener('whatsapp-message', handleWhatsAppEvent);
});

onUnmounted(() => {
    window.removeEventListener('whatsapp-message', handleWhatsAppEvent);
});
const userInitials = computed(() => {
    const name = user.value?.name ?? '';
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase() || 'U';
});

const dropdownOpen = ref(false);

function closeDropdown() {
    dropdownOpen.value = false;
}

function handleLogout() {
    router.post(logout().url);
}


    useFlashToast();
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Sidebar fijo -->
        <AppSidebar />
       
        <!-- Área de contenido (a la derecha del sidebar) -->
        <div class="ml-72 flex min-h-screen flex-col">
            <!-- Navbar -->
            <header class="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-[#0a0f1e] px-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
                <!-- Búsqueda (izquierda) -->
                <div class="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                    <Search class="h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="BUSCAR ESTUDIANTE..."
                        class="w-full bg-transparent text-xs font-bold tracking-wider text-white placeholder:text-slate-500 focus:outline-none uppercase"
                    />
                </div>

                <!-- Espacio flexible -->
                <div class="flex-1"></div>

                <!-- Acciones derecha -->
                <div class="flex items-center gap-2">
                    <!-- Botón turquesa -->
                    <button
                        type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-teal-400 transition-all hover:bg-white/[0.08] active:scale-95"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <circle cx="12" cy="12" r="9" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2" />
                        </svg>
                    </button>

                    <!-- Botón campana con badge -->
                    <button
                        type="button"
                        class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-amber-400 transition-all hover:bg-white/[0.08] active:scale-95"
                    >
                        <Bell class="h-5 w-5" />
                        <span class="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-lg shadow-red-900/50">
                            2
                        </span>
                    </button>

                    <!-- Separador -->
                    <div class="mx-2 h-8 w-px bg-white/10"></div>

                    <!-- Bloque usuario con dropdown -->
                    <div class="relative">
                        <button
                            type="button"
                            class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/[0.06]"
                            @click="dropdownOpen = !dropdownOpen"
                        >
                            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white shadow-lg shadow-blue-900/40">
                                {{ userInitials }}
                            </div>
                            <div class="hidden flex-col items-start leading-tight md:flex">
                                <span class="text-[9px] font-semibold tracking-widest text-slate-500 uppercase">Usuario:</span>
                                <span class="text-xs font-bold tracking-wide text-white uppercase">
                                    {{ user?.name ?? 'Invitado' }}
                                </span>
                            </div>
                            <ChevronDown
                                :class="['h-4 w-4 text-slate-400 transition-transform', dropdownOpen ? 'rotate-180' : '']"
                            />
                        </button>

                        <!-- Dropdown -->
                        <Transition
                            enter-active-class="transition duration-150 ease-out"
                            enter-from-class="opacity-0 -translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-1"
                        >
                            <div
                                v-if="dropdownOpen"
                                class="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0f1422] shadow-2xl shadow-black/60"
                            >
                                <div class="border-b border-white/5 px-4 py-3">
                                    <p class="truncate text-sm font-semibold text-white">{{ user?.name }}</p>
                                    <p class="truncate text-xs text-slate-500">{{ user?.email }}</p>
                                </div>
                                <div class="p-1.5">
                                    <Link
                                        href="/settings/profile"
                                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                        @click="closeDropdown"
                                    >
                                        <UserIcon class="h-4 w-4" />
                                        Mi perfil
                                    </Link>
                                    <Link
                                        href="/settings/appearance"
                                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                        @click="closeDropdown"
                                    >
                                        <Settings class="h-4 w-4" />
                                        Configuración
                                    </Link>
                                </div>
                                <div class="border-t border-white/5 p-1.5">
                                    <button
                                        type="button"
                                        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                                        @click="handleLogout"
                                    >
                                        <LogOut class="h-4 w-4" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </header>

            <!-- Contenido de la página -->
            <main class="flex-1">
                <slot />
            </main>
        </div>

        <!-- Cerrar dropdown al hacer clic fuera -->
        <div
            v-if="dropdownOpen"
            class="fixed inset-0 z-20"
            @click="closeDropdown"
        ></div>

        <Toaster position="top-right" :rich-colors="true" :close-button="true" :duration="4000" :expand="false" />
        <WhatsAppSendModal />
    </div>
</template>