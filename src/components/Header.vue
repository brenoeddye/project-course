<template>
    <header class="h-20 md:h-24">
        <div class="fixed w-full flex justify-between items-center bg-white dark:bg-gray-800 py-2 px-4 transition-all duration-300 z-40">
            <div class="lg:max-w-[1900px] mx-auto w-full flex justify-between items-center">
                <div class="w-full md:w-auto flex items-center justify-between lg:justify-start gap-4">
                    <div class="md:hidden order-2">
                        <button @click="isMobileMenuOpen = true">
                            <MenuIcon color="text-black dark:text-white" size="w-7 h-7" style="transform: scaleX(-1);" />
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
                            <router-link to="/courses" class="flex items-center gap-2 p-2 px-4 rounded-lg transition-colors duration-300 hover:bg-primary-300" :class="{'bg-primary-100': $route.name === 'courses'}">
                                <courseIcon color="text-black dark:text-white" size="w-6 h-6" :class="{'text-primary dark:text-primary-900': $route.name === 'courses'}" />
                                <span class="text-black dark:text-white" :class="{'text-primary': $route.name === 'courses'}">Cursos</span>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="hidden md:flex w-1/2 items-center gap-2">
                    <div class="hidden md:block w-full">
                        <Search />
                    </div>
                </div>

                <div class="hidden md:flex items-center gap-2">
                    <NotificationDrawer />

                    <div ref="userDropdownRef" class="relative flex items-center h-10">
                        <div class="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 cursor-pointer" @click="toggleDropdown">
                            <settingsIcon color="text-black dark:text-white" size="w-6 h-6" />
                        </div>
                        <Dropdown v-if="!isMobile" :open="open" :items="items" @select="handleSelect" />
                    </div>
                </div>
            </div>
        </div>
        
        <MenuMobile :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

        <MobileModal v-model="open">
            <div class="flex flex-col gap-2">
                <template v-for="(item, index) in items" :key="index">
                    <template v-if="item.custom">
                        <component :is="item.component" v-bind="item.props" />
                    </template>
                    <template v-else>
                        <button 
                            @click="handleSelect(item.value)"
                            class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                            :class="[
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