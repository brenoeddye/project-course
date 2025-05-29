<template>
    <div class="relative logo flex flex-col items-center transition-all duration-300">
        <img 
            :src="isDark ? shoppubBlack : shoppubWhite" 
            alt="Logo" 
            class="w-[100px] md:w-[128px] h-[36px] md:h-[48px] animate-slide-in dark:brightness-[999%]"
        >
        <h1 class="text-[0px]">Universidade Shoppub</h1>
        <span 
            class="hidden md:block absolute bottom-[2px] right-0 text-primary-800 font-semibold text-[10px] opacity-0 animate-fade-in"
        >Universidade</span>
        <HatIcon 
            class="absolute top-[-4px] md:top-[-1px] left-[28%] md:left-[29%] w-[16px] h-[16px] text-primary-800 opacity-0 animate-fade-in"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import shoppubWhite from '@/assets/logo.svg'
import shoppubBlack from '@/assets/logo.svg'
import HatIcon from '@/components/icon/hatIcon.vue'

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

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-in {
    animation: slideIn 0.8s ease-out forwards;
}
</style>
