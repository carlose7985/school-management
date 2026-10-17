<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/vue';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

const props = withDefaults(
    defineProps<{
        links: PaginationLink[];
        showFirstLast?: boolean;
    }>(),
    {
        showFirstLast: true,
    },
);

// ═══════════════════════════════════════════════
// Extraer current, last y URLs de los links de Laravel
// ═══════════════════════════════════════════════
const currentPage = computed(() => {
    const active = props.links.find((l) => l.active);
    return active ? Number(active.label) : 1;
});

const totalPages = computed(() => {
    // El penúltimo link (antes de "Next") es la última página
    const numericLinks = props.links
        .filter((l) => /^\d+$/.test(l.label))
        .map((l) => Number(l.label));
    return numericLinks.length ? Math.max(...numericLinks) : 1;
});

// Mapa: página → URL
const urlByPage = computed(() => {
    const map: Record<number, string> = {};
    props.links.forEach((l) => {
        if (/^\d+$/.test(l.label) && l.url) {
            map[Number(l.label)] = l.url;
        }
    });
    return map;
});

// URLs especiales
const firstUrl = computed(() => urlByPage.value[1] ?? null);
const lastUrl = computed(() => urlByPage.value[totalPages.value] ?? null);
const prevUrl = computed(() => {
    const prevLink = props.links.find((l) => l.label.includes('Previous'));
    return prevLink?.url ?? null;
});
const nextUrl = computed(() => {
    const nextLink = props.links.find((l) => l.label.includes('Next'));
    return nextLink?.url ?? null;
});

// ═══════════════════════════════════════════════
// Generar números de página con "..."
// ═══════════════════════════════════════════════
const pageNumbers = computed<(number | '...')[]>(() => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | '...')[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages.value; i++) {
        if (
            i === 1 ||
            i === totalPages.value ||
            (i >= currentPage.value - delta && i <= currentPage.value + delta)
        ) {
            range.push(i);
        }
    }

    range.forEach((i) => {
        if (l !== undefined) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    });

    return rangeWithDots;
});
</script>
<template>
    <nav v-if="totalPages > 1" class="flex items-center gap-1 rounded-2xl border border-slate-200 bg-gray-50 p-1 shadow-sm">
        <!-- First -->
        <template v-if="showFirstLast">
            <Link v-if="firstUrl && currentPage !== 1" :href="firstUrl" preserve-scroll class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700" title="Primera página">
                <ChevronsLeft :size="14" :stroke-width="2.5" />
            </Link>
            <span v-else class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-xl text-slate-300">
                <ChevronsLeft :size="14" :stroke-width="2.5" />
            </span>
        </template>
        <!-- Previous -->
        <Link v-if="prevUrl" :href="prevUrl" preserve-scroll class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700" title="Anterior">
            <ChevronLeft :size="14" :stroke-width="2.5" />
        </Link>
        <span v-else class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-xl text-slate-300">
            <ChevronLeft :size="14" :stroke-width="2.5" />
        </span>
        <!-- Números de página -->
        <div class="flex items-center gap-1 px-1">
            <template v-for="(page, idx) in pageNumbers" :key="idx">
                <!-- Página clickeable -->
                <Link v-if="page !== '...' && urlByPage[page]" :href="urlByPage[page]" preserve-scroll :class="[
                    'flex h-8 min-w-[2rem] items-center justify-center rounded-xl px-2 text-[10px] font-black transition-all',
                    currentPage === page
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700',
                ]">
                    {{ page }}
                </Link>
                <!-- Página actual (sin URL, ya estás aquí) -->
                <span v-else-if="page !== '...' && currentPage === page" class="flex h-8 min-w-[2rem] items-center justify-center rounded-xl bg-blue-600 px-2 text-[10px] font-black text-white shadow-md shadow-blue-200">
                    {{ page }}
                </span>
                <!-- Puntos suspensivos -->
                <span v-else-if="page === '...'" class="flex h-8 min-w-[2rem] cursor-not-allowed items-center justify-center rounded-xl px-2 text-[10px] font-black text-slate-400">
                    ...
                </span>
            </template>
        </div>
        <!-- Next -->
        <Link v-if="nextUrl" :href="nextUrl" preserve-scroll class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700" title="Siguiente">
            <ChevronRight :size="14" :stroke-width="2.5" />
        </Link>
        <span v-else class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-xl text-slate-300">
            <ChevronRight :size="14" :stroke-width="2.5" />
        </span>
        <!-- Last -->
        <template v-if="showFirstLast">
            <Link v-if="lastUrl && currentPage !== totalPages" :href="lastUrl" preserve-scroll class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700" title="Última página">
                <ChevronsRight :size="14" :stroke-width="2.5" />
            </Link>
            <span v-else class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-xl text-slate-300">
                <ChevronsRight :size="14" :stroke-width="2.5" />
            </span>
        </template>
    </nav>
</template>