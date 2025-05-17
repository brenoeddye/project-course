<template>
  <div class="relative">
    <!-- Botão do sino -->
    <button
      @click="isOpen = !isOpen"
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Notificações"
    >
      <div class="relative">
        <bellIcon class="text-black dark:text-white"/>
        <!-- Indicador de notificações não lidas -->
        <span
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
        >
          {{ unreadCount }}
        </span>
      </div>
    </button>

    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="isOpen = false"
      ></div>
    </Transition>

    <!-- Drawer de notificações -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-in-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in-out"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-50"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Notificações
            </h2>
            <button
              @click="isOpen = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Lista de notificações -->
        <div class="overflow-y-auto h-[calc(100vh-4rem)]">
          <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
            Nenhuma notificação
          </div>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="p-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          >
            <div class="flex items-start">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-white">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ notification.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const unreadCount = ref(0)
const notifications = ref([
  {
    id: 1,
    title: 'Nova mensagem',
    message: 'Você recebeu uma nova mensagem',
    time: '2 minutos atrás',
  },
  {
    id: 2,
    title: 'Atualização do sistema',
    message: 'O sistema foi atualizado com sucesso',
    time: '1 hora atrás',
  },
])
</script>

<style scoped>
/* Adicione estilos personalizados aqui se necessário */
</style> 