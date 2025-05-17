<template>
    <main class="container mx-auto">
        <Card border-color="red">
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 mb-5">
                        <h2 class="text-2xl font-bold">Container 1</h2>

                        <Chip color="red">Desativado</Chip>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button color="primary" class="gap-2">
                            <PencilIcon color="text-white" size="w-4 h-4" />
                            Editar
                        </Button>
                    </div>
                </div>
            </template>

            <template #content>
                <div class="flex justify-between items-center mb-5">
                    <h2 class="text-sm">Container novo</h2>
                </div>
            </template>
        </Card>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card class="col-span-2">
                <template #header>
                    <h2 class="text-2xl font-bold mb-5">Container 1</h2>
                </template>

                <template #content>
                    <InfoList :items="items" />
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-2xl font-bold mb-5">Suporte</h2>
                </template>

                <template #content>
                    Algumas opções de suporte abaixo:
                </template>
            </Card>
        </div>

        <Card class="mt-8">
            <template #header>
                <div class="flex items-center gap-4 mb-5">
                    <h2 class="text-2xl font-bold">Domínios</h2>
                </div>
            </template>

            <template #content>
                <div class="flex justify-between items-center mb-5">
                    <h2 class="text-sm">Container novo</h2>
                </div>
            </template>
        </Card>
    </main>
</template>

<script setup lang="ts">
const items = [
    { label: 'Name:', value: '2021-01-01' },
    { label: 'Container config:', value: '2021-01-01' },
    { label: 'sGTM container ID:', value: '2021-01-01' },
]
</script>
