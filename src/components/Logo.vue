<template>
    <div class="logo flex items-center">
        <img 
            :src="isDark ? trackgoBlack : trackgoWhite" 
            alt="Logo" 
            class="w-[48px] h-[48px]"
        >
        <h1 class="text-2xl font-bold">Universidade Shoppub</h1>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import trackgoWhite from '@/assets/logo.jpg'
import trackgoBlack from '@/assets/logo.jpg'

const isDark = ref(false)

const checkDarkMode = () => {
    isDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
    checkDarkMode()
    // Observa mudanças no tema
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })
})
</script>

<style lang="scss" scoped>
.logo {
    img {
        border-radius: 100%;
    }

    h1 {
        font-size: 0;
    }
}
</style>
