<template>
    <main class="max-w-md mx-auto">
        <Card>
            <template #header>
                <h2 class="text-2xl font-bold mb-5">Novo Container</h2>
            </template>

            <template #content>
                <form>
                    <div class="flex flex-col gap-8">
                        <div class="flex flex-col gap-2">
                            <Input label="Meu container" v-model="name" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <Input label="Configuração do container" v-model="description" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <Input label="Localização do servidor" v-model="location" />
                        </div>
                    </div>
                </form>
            </template>

            <template #footer>
                <div class="flex justify-end gap-2 mt-8">
                    <Button isRouterLink to="/" variant="light" color="primary">Cancelar</Button>
                    <Button variant="solid" color="primary">Criar</Button>
                </div>
            </template>
        </Card>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const description = ref('');
const location = ref('');
</script>