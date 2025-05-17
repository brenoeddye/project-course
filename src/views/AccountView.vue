<template>
    <main class="container max-w-[91%] mx-auto py-8">
        <Card>
            <template #header>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div class="hidden md:flex items-start md:items-center gap-4">
                        <div
                            class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <UserIcon color="text-gray-400 dark:text-gray-500" size="w-16 h-16" />
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="text-lg font-semibold text-gray-900 dark:text-gray-100">breno@shoppub.com.br</span>
                            </div>
                            <InfoList :items="infoList" />
                        </div>
                    </div>

                    <div class="flex md:hidden flex-col items-start md:items-center gap-4">
                        <div class="flex items-center gap-6">
                            <div
                                class="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <UserIcon color="text-gray-400 dark:text-gray-500" size="w-10 h-10" />
                            </div>

                            <span
                                class="text-md font-semibold text-gray-900 dark:text-gray-100">breno@shoppub.com.br</span>
                        </div>

                        <div>
                            <InfoList class="text-sm" :items="infoList" />
                        </div>
                    </div>
                </div>
                <div class="border-b border-gray-100 dark:border-gray-700 mt-2" />
                <div class="flex gap-8 mt-4">
                    <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[
                        'pb-2 px-2 text-sm font-medium transition-colors',
                        selectedTab === tab
                            ? 'text-primary-700 border-b-2 border-primary-600 dark:text-primary dark:border-primary'
                            : 'text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 border-b-2 border-transparent'
                    ]">
                        {{ tab }}
                    </button>
                </div>
            </template>
        </Card>

        <div v-if="selectedTab === 'Profile'" class="mt-8">
            <Card class="w-full mx-auto mb-8">
                <template #header>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">Alterar e-mail</h3>
                </template>
                <template #content>
                    <form class="space-y-6" @submit.prevent="onSubmit">
                        <Input label="Novo e-mail" v-model="form.email" type="email"
                            required />
                        <Input label="Senha atual" v-model="form.password"
                            type="password" required />
                        <div class="flex justify-end">
                            <Button color="primary" type="submit">Atualizar</Button>
                        </div>
                    </form>
                </template>
            </Card>
        </div>

        <div v-if="selectedTab !== 'Profile'" class="mt-8">
            <Card class="w-full mx-auto mb-8">
                <template #header>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">Em breve</h3>
                </template>
            </Card>
        </div>
    </main>
</template>

<script setup lang="ts">
import Card from '@/components/hero/Card.vue'
import InfoList from '@/components/hero/InfoList.vue'
import Input from '@/components/hero/Input.vue'
import Button from '@/components/hero/Button.vue'
import UserIcon from '@/components/icon/userIcon.vue'
import { ref } from 'vue'

const tabs = ['Perfil', 'Segurança', 'Compartilhar']
const selectedTab = ref('Perfil')

const infoList = [
    { label: 'Criação da conta', value: 'Apr 25, 2025' },
    { label: 'Conta compartilhada', value: 'none.' },
    { label: 'Chave da API da conta', value: 'show api key value' },
]

const form = ref({
    email: '',
    password: ''
})

function onSubmit() {
    // Aqui você pode adicionar a lógica de atualização de e-mail
    alert('E-mail atualizado!')
}
</script>
