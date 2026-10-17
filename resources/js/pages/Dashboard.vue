<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import ViewContainer from '@/components/layouts/viewContainer/ViewContainer.vue';
import { ref } from 'vue';
import FormInput from '@/components/forms/FormInput.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import FormMultiselect from '@/components/forms/FormMultiselect.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
        ],
    },
});

const nombre = ref('');
const grado = ref(null);
const materias = ref([]);

const grados = [
    { value: 1, label: 'Primer grado' },
    { value: 2, label: 'Segundo grado' },
];
const materiasOpts = [
    { value: 'mat', label: 'Matemáticas' },
    { value: 'len', label: 'Lengua' },
    { value: 'cie', label: 'Ciencias' },
];

</script>

<template>
    <Head title="Dashboard" />

    <ViewContainer
        title="Dashboard"
        subtitle="Resumen ejecutivo y control de asistencia"
        icon="LayoutGrid"
    >
        <template #actions>
            <button class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-colors hover:bg-blue-700">
                Exportar
            </button>
        </template>

        <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Matrícula Inicial</p>
                <p class="mt-2 text-3xl font-black text-blue-800">508</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Activos</p>
                <p class="mt-2 text-3xl font-black text-green-600">576</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Retiros</p>
                <p class="mt-2 text-3xl font-black text-red-600">10</p>
            </div>
        </div>

         <div class="mx-auto max-w-md space-y-4 p-8">
        <FormInput v-model="nombre" autofocus label="Nombre" placeholder="Juan Pérez" required />
        <FormSelect v-model="grado" label="Grado" :options="grados" />
        <FormMultiselect v-model="materias" label="Materias" :options="materiasOpts" />
<FormInput v-model="nombre" label="Nombre" transform="title" />



<!-- Teléfono con máscara -->
<FormInput v-model="nombre" label="Teléfono" mask="0000-0000000" maxlength="12" />

<!-- Cédula venezolana con máscara -->
<FormInput v-model="nombre" label="Cédula" mask="00000000" maxlength="8" />

    </div>
    </ViewContainer>
</template>