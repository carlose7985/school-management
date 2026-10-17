<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { GraduationCap } from '@lucide/vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>
<template>
    <div class="grid min-h-svh lg:grid-cols-2">
        <!-- Panel izquierdo: imagen + overlay + cita -->
        <div class="relative hidden lg:block">
            <img src="/img/escuela.jpg" alt="Escuela" class="absolute inset-0 h-full w-full object-cover" />
            <!-- Overlay oscuro para legibilidad -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <!-- Contenido sobre la imagen -->
            <div class="relative z-10 flex h-full flex-col justify-end p-10 text-white">
                <!-- Badge -->
                <div class="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
                    <GraduationCap class="h-4 w-4" />
                    <span class="text-xs font-semibold tracking-wider uppercase">
                        Educación de Excelencia
                    </span>
                </div>
                <!-- Cita -->
                <blockquote class="mb-4 max-w-lg text-3xl leading-tight font-bold">
                    "La educación es el arma más poderosa para cambiar el mundo."
                </blockquote>
                <div class="flex items-center gap-3">
                    <div class="h-px w-12 bg-yellow-400"></div>
                    <span class="text-sm font-semibold tracking-wider text-yellow-400 uppercase">
                        Nelson Mandela
                    </span>
                </div>
            </div>
        </div>
        <!-- Panel derecho: formulario -->
        <div class="flex flex-col items-center justify-center bg-background p-6 md:p-10">
            <div class="w-full max-w-sm">
                <div class="flex flex-col gap-8">
                    <!-- Logo birrete -->
                    <div class="flex flex-col items-center gap-4">
                        <Link :href="home()" class="flex flex-col items-center gap-3">
                            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
                                <GraduationCap class="h-9 w-9 text-white" />
                            </div>
                        </Link>
                        <div class="space-y-2 text-center">
                            <h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
                            <p class="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                {{ description }}
                            </p>
                        </div>
                    </div>
                    <!-- Formulario (slot) -->
                    <slot />
                </div>
                <!-- Footer -->
                <p class="mt-10 text-center text-xs tracking-wider text-muted-foreground uppercase">
                    © 2026 SIS Gestión Escolar · Core Edition
                </p>
            </div>
        </div>
    </div>
</template>