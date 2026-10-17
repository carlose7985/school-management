import type { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from '@lucide/vue';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon;
    /** Patrón de ruta(s) hijas que mantienen activo este item. Ej: 'estudiantes.*' */
    match?: string | string[];
    /** Si es true, el item está deshabilitado (próximamente) */
    disabled?: boolean;
};

export type NavGroup = {
    title: string;
    items: NavItem[];
};