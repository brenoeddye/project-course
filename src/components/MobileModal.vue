<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300 ease-in-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="modelValue && isMobile" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" @click="closeModal"></div>
        </Transition>

        <Transition
            enter-active-class="transition-transform duration-300 ease-in-out"
            enter-from-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition-transform duration-300 ease-in-out"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-full"
        >
            <div 
                v-if="modelValue && isMobile"
                class="fixed bottom-0 left-0 right-0 w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-t-[20px] shadow-lg transform z-50"
                :class="{ 'transition-transform duration-300 ease-in-out': !isDragging }"
                :style="{ transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : '' }"
                @touchstart="handleTouchStart" 
                @touchmove="handleTouchMove" 
                @touchend="handleTouchEnd"
            >
                <div class="p-4 flex justify-center items-center cursor-grab" ref="headerRef">
                    <div class="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div class="px-4 pb-4 overflow-y-auto">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const isMobile = ref(window.innerWidth < 768)
const dragOffset = ref(0)
const startY = ref(0)
const headerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const CLOSE_THRESHOLD = 50
const DRAG_RESISTANCE = 0.5
const SCREEN_HEIGHT = window.innerHeight

const handleResize = () => {
    isMobile.value = window.innerWidth < 768
}

const handleTouchStart = (e: TouchEvent) => {
    startY.value = e.touches[0].clientY
    isDragging.value = true
}

const handleTouchMove = (e: TouchEvent) => {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.value

    if (diff > 0) {
        dragOffset.value = diff * DRAG_RESISTANCE
    }
}

const handleTouchEnd = () => {
    isDragging.value = false
    
    if (dragOffset.value > CLOSE_THRESHOLD) {
        dragOffset.value = SCREEN_HEIGHT
        
        setTimeout(() => {
            closeModal()
        }, 300)
    } else {
        dragOffset.value = 0
    }
}

const closeModal = () => {
    emit('update:modelValue', false)
    dragOffset.value = 0
}

const handleBodyScroll = () => {
    const appContent = document.getElementById('app-content')
    if (props.modelValue && isMobile.value) {
        if (appContent) {
            appContent.style.transform = 'scale(0.99)'
            appContent.style.transformOrigin = 'center bottom'
            appContent.style.transition = 'transform 0.3s ease-in-out'
        }
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '15px'
    } else {
        if (appContent) {
            appContent.style.transform = ''
            appContent.style.transformOrigin = ''
            appContent.style.transition = ''
        }
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
}

watch(() => props.modelValue, handleBodyScroll)

onMounted(() => {
    if (props.modelValue) {
        handleBodyScroll()
    }
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    const appContent = document.getElementById('app-content')
    if (appContent) {
        appContent.style.transform = ''
        appContent.style.transformOrigin = ''
        appContent.style.transition = ''
    }
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    window.removeEventListener('resize', handleResize)
})
</script>