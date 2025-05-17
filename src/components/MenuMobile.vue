<template>
    <div>
        <!-- Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-300 ease-in-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" @click="$emit('close')"></div>
        </Transition>

        <!-- Menu -->
        <Transition
            enter-active-class="transition-transform duration-300 ease-in-out"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-300 ease-in-out"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
        >
            <div v-if="isOpen" class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden" @click.stop>
                <div class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <Logo />
                    <button @click="$emit('close')" class="p-2">
                        <closeIcon color="text-black dark:text-white" size="w-6 h-6" />
                    </button>
                </div>
                
                <nav class="p-4">
                    <ul class="space-y-2">
                        <li>
                            <router-link 
                                to="/" 
                                class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300"
                                :class="{'bg-primary-100': $route.name === 'home'}"
                                @click="$emit('close')"
                            >
                                <dashboardIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'home'}" />
                                <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'home'}">Dashboard</span>
                            </router-link>
                        </li>
                        
                        <li>
                            <router-link 
                                to="/container" 
                                class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300"
                                :class="{'bg-primary-100': $route.name === 'container'}"
                                @click="$emit('close')"
                            >
                                <databaseIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'container'}" />
                                <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'container'}">sGTM</span>
                            </router-link>
                        </li>

                        <li>
                            <a
                                href="/" 
                                class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300"
                                :class="{'bg-primary-100': $route.name === 'finantial'}"
                                @click="$emit('close')"
                            >
                                <walletIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'finantial'}" />
                                <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'finantial'}">Financeiro</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Logo from './Logo.vue';
import dashboardIcon from './icon/dashboardIcon.vue';
import databaseIcon from './icon/databaseIcon.vue';
import closeIcon from './icon/closeIcon.vue';

defineProps<{
    isOpen: boolean
}>();

defineEmits<{
    (e: 'close'): void
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style>
