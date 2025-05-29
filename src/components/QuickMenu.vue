<template>
    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div class="flex items-center justify-around px-4 py-2">
            <!-- Início -->
            <router-link to="/" class="flex flex-col items-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary-800 dark:hover:text-primary-400 transition-colors">
                <dashboardIcon :color="route.path === '/' ? 'text-primary-100 dark:text-primary-100' : 'text-gray-600 dark:text-gray-300'" size="w-6 h-6" />
                <span class="text-xs mt-1">Descubra</span>
            </router-link>

            <!-- Notificações -->
            <div class="flex flex-col items-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer" @click="toggleNotifications">
                <div class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span v-if="hasNotifications" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <span class="text-xs mt-1">Notificações</span>
            </div>

            <!-- Configurações -->
            <div class="flex flex-col items-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer" @click="toggleSettings">
                <settingsIcon :color="isSettingsOpen ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'" size="w-6 h-6" />
                <span class="text-xs mt-1">Configurações</span>
            </div>
        </div>

        <!-- Dropdown de Configurações -->
        <div v-if="isSettingsOpen" class="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Escuro</span>
                <ThemeToggle />
            </div>
        </div>

        <!-- Drawer de Notificações -->
        <div v-if="isNotificationsOpen" class="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg max-h-[60vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Notificações</span>
                <button @click="toggleNotifications" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class="space-y-4">
                <div v-if="notifications.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-4">
                    Nenhuma notificação
                </div>
                <div v-for="notification in notifications" :key="notification.id" class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ notification.message }}</p>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import dashboardIcon from './icon/dashboardIcon.vue'
import settingsIcon from './icon/settingsIcon.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const isSettingsOpen = ref(false)
const isNotificationsOpen = ref(false)
const hasNotifications = ref(false)

// Simulação de notificações (substitua por dados reais)
const notifications = ref([
    {
        id: 1,
        message: 'Nova atualização disponível',
        time: '5 minutos atrás'
    },
    {
        id: 2,
        message: 'Seu curso foi atualizado',
        time: '1 hora atrás'
    }
])

const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value
    if (isSettingsOpen.value) {
        isNotificationsOpen.value = false
    }
}

const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
    if (isNotificationsOpen.value) {
        isSettingsOpen.value = false
    }
}

// Atualiza o estado das notificações
hasNotifications.value = notifications.value.length > 0
</script>

<style scoped>
.router-link-active {
    @apply text-primary-600 dark:text-primary-400;
}
</style>