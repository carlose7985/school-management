<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import type { NavGroup, NavItem } from '@/types';

defineProps<{
    groups: NavGroup[];
}>();

const { isCurrentOrParentUrl } = useCurrentUrl();

/**
 * Determina si un item debe verse activo.
 * - Si tiene `match`, se compara con prefijo (para que las rutas hijas
 *   mantengan activo al padre).
 * - Si no, se compara con la URL del item mismo.
 */
function isItemActive(item: NavItem): boolean {
    if (item.match) {
        const patterns = Array.isArray(item.match) ? item.match : [item.match];
        return patterns.some((pattern) => {
            // Convertir 'estudiantes.*' → '/estudiantes'
            const basePath = '/' + pattern.replace(/\.\*$/, '').replace(/\./g, '/');
            return isCurrentOrParentUrl(basePath);
        });
    }

    return isCurrentOrParentUrl(item.href);
}
</script>

<template>
    <SidebarGroup
        v-for="group in groups"
        :key="group.title"
        class="mx-2 my-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1.5 shadow-inner"
    >
        <SidebarGroupLabel
            class="h-6 px-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase"
        >
            {{ group.title }}
        </SidebarGroupLabel>
        <SidebarMenu class="gap-0.5">
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
                <SidebarMenuButton
                    as-child
                    :is-active="isItemActive(item)"
                    :tooltip="item.title"
                    class="h-9 rounded-lg text-sm"
                >
                    <Link :href="item.href">
                        <component :is="item.icon" v-if="item.icon" class="size-4" />
                        <span>{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>