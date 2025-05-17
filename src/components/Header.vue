<template>
    <header class="h-24">
        <div class="fixed w-full flex justify-between items-center bg-white dark:bg-gray-800 py-2 px-4 transition-all duration-300 z-40">
            <div class="flex items-center">
                <div class="md:hidden">
                    <button @click="isMobileMenuOpen = true">
                        <MenuIcon color="text-black dark:text-white" size="w-7 h-7" />
                    </button>
                </div>

                <router-link to="/" class="flex items-center gap-2 p-2 px-4">
                    <Logo />
                </router-link>

                <ul class="hidden md:flex items-center gap-5">
                    <li>
                        <router-link to="/" class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300" :class="{'bg-primary-100': $route.name === 'home'}">
                            <dashboardIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'home'}" />
                            <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'home'}">Descubra</span>
                        </router-link>
                    </li>

                    <li>
                        <div ref="sgtmDropdownRef" class="relative h-10">
                            <button @click="sgtmOpen = !sgtmOpen" class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300" :class="{'bg-primary-100': $route.name === 'container'}">
                                <databaseIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'container'}" />
                                <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'container'}">Meus cursos</span>
                            </button>
                            <Dropdown :open="sgtmOpen" :items="sgtmItems" @select="handleSgtmSelect" />
                        </div>
                    </li>
                </ul>
            </div>

            <div class="flex w-1/2 items-center gap-2">
                <div class="hidden md:block w-full max-w-2xl">
                    <Search />
                </div>
            </div>

            <div class="flex items-center gap-2">
                <NotificationDrawer />

                <div ref="userDropdownRef" class="relative flex items-center h-10">
                    <div class="bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer" @click="toggleDropdown">
                        <UserIcon color="text-black dark:text-white" size="w-6 h-6" />
                    </div>
                    <Dropdown v-if="!isMobile" :open="open" :items="items" @select="handleSelect" />
                </div>
            </div>
        </div>
        
        <MenuMobile :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

        <MobileModal v-model="open">
            <div class="flex flex-col gap-2">
                <template v-for="(item, index) in items" :key="index">
                    <template v-if="item.divider">
                        <div class="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                    </template>
                    <template v-else-if="item.custom">
                        <component :is="item.component" v-bind="item.props" />
                    </template>
                    <template v-else>
                        <button 
                            @click="handleSelect(item.value)"
                            class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                            :class="[
                                item.danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 
                                'text-black dark:text-white hover:bg-primary-300'
                            ]"
                        >
                            {{ item.label }}
                        </button>
                    </template>
                </template>
            </div>
        </MobileModal>
    </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, markRaw, computed } from 'vue';
import plusIcon from './icon/plusIcon.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import ThemeToggle from './ThemeToggle.vue';
import NotificationDrawer from './NotificationDrawer.vue';
import MenuMobile from './MenuMobile.vue';
import MobileModal from './MobileModal.vue';
import Search from './hero/Search.vue'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore

const open = ref(false)
const sgtmOpen = ref(false)
const isMobileMenuOpen = ref(false)
const userDropdownRef = ref<HTMLElement | null>(null)
const sgtmDropdownRef = ref<HTMLElement | null>(null)

const items = computed(() => [
    { label: 'Minha Conta', value: 'account' },
    { 
        label: 'Modo Escuro', 
        value: 'dark-mode',
        custom: true,
        component: markRaw(ThemeToggle),
        props: {
            asDropdownItem: true
        },
        onThemeChanged: () => {
            open.value = false
        }
    },
    { divider: true },
    { label: 'Sair', value: 'logout', danger: true },
])

const sgtmItems = ref([
    { label: 'Container 1', value: 'container1' },
    { label: 'Container 2', value: 'container2' },
    { label: 'Container 3', value: 'container3' },
    { divider: true },
    { label: 'Adicionar Container', value: 'add-container', icon: markRaw(plusIcon) },
])

const isMobile = ref(false)

function checkMobile() {
    isMobile.value = window.innerWidth < 768
}

function handleSelect(action: any) {
    open.value = false
    if (action === 'dark-mode') {
        toggleTheme()
    } else if (action === 'account') {
        router.push('/account')
    }
}

function handleSgtmSelect(value: string) {
    sgtmOpen.value = false
    if (value === 'add-container') {
        router.push('/container/create')
    }
}

function toggleDropdown() {
    open.value = !open.value
}

function handleClickOutside(event: MouseEvent) {
    if (userDropdownRef.value && !userDropdownRef.value.contains(event.target as Node)) {
        open.value = false
    }
    if (sgtmDropdownRef.value && !sgtmDropdownRef.value.contains(event.target as Node)) {
        sgtmOpen.value = false
    }
}

function handleMouseEnter() {
    sgtmOpen.value = true
}

function handleMouseLeave() {
    sgtmOpen.value = false
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    document.addEventListener('mousedown', handleClickOutside)
    if (sgtmDropdownRef.value) {
        sgtmDropdownRef.value.addEventListener('mouseenter', handleMouseEnter)
        sgtmDropdownRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
    document.removeEventListener('mousedown', handleClickOutside)
    if (sgtmDropdownRef.value) {
        sgtmDropdownRef.value.removeEventListener('mouseenter', handleMouseEnter)
        sgtmDropdownRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
})
</script>