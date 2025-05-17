<template>
	<div>
		<button v-if="!asDropdownItem" @click="handleClick"
			class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 overflow-hidden"
			aria-label="Alternar tema">
			<div class="w-6 h-6 flex items-center justify-center relative z-10">
				<div class="w-4 h-4 rounded-full bg-gray-700 dark:bg-yellow-400 transition-colors duration-300" />
			</div>
		</button>

		<div v-else class="flex items-center justify-end w-full" @click="handleDropdownClick">
			<Switch :modelValue="isDark" color="primary" size="small" @update:modelValue="handleThemeChange" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import Switch from './hero/Switch.vue'

interface Props {
	asDropdownItem?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	asDropdownItem: false
})

const emit = defineEmits<{
	(e: 'themeChanged'): void
}>()

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore

const lastClickPosition = ref({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

onMounted(() => {
	document.documentElement.classList.add('no-transition')
	
	if (isDark.value) {
		document.documentElement.classList.add('dark')
		document.documentElement.classList.add('bg-gray-900')
	} else {
		document.documentElement.classList.remove('dark')
		document.documentElement.classList.add('bg-gray-100')
	}
	
	void document.documentElement.offsetWidth
	
	document.documentElement.classList.remove('no-transition')
})

const createRipple = (x: number, y: number) => {
	const size = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) * 2
	const ripple = document.createElement('div')
	ripple.className = 'theme-ripple'
	
	ripple.style.left = `${x - size/2}px`
	ripple.style.top = `${y - size/2}px`
	ripple.style.width = `${size}px`
	ripple.style.height = `${size}px`
	ripple.style.backgroundColor = isDark.value ? '#f6f6f6' : '#111827'

	document.body.appendChild(ripple)
	return ripple
}

const toggleThemeWithAnimation = (ripple: HTMLDivElement) => {
	if (isDark.value) {
		ripple.style.transform = 'scale(1)'
		ripple.style.transformOrigin = 'center'
		requestAnimationFrame(() => {
			ripple.style.transform = 'scale(0)'
			ripple.style.opacity = '0'
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.remove('bg-gray-900')
			document.documentElement.classList.add('bg-gray-100')
			toggleTheme()
			emit('themeChanged')
		})
	} else {
		ripple.style.transform = 'scale(0)'
		ripple.style.transformOrigin = 'center'
		requestAnimationFrame(() => {
			ripple.style.transform = 'scale(1)'
			ripple.style.opacity = '0'
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('bg-gray-100')
			document.documentElement.classList.add('bg-gray-900')
			toggleTheme()
			emit('themeChanged')
		})
	}

	setTimeout(() => {
		ripple.remove()
	}, 1000)
}

const handleClick = (event: MouseEvent) => {
	const ripple = createRipple(event.clientX, event.clientY)
	toggleThemeWithAnimation(ripple)
}

const handleDropdownClick = (event: MouseEvent) => {
	lastClickPosition.value = { x: event.clientX, y: event.clientY }
}

const handleThemeChange = () => {
	const ripple = createRipple(lastClickPosition.value.x, lastClickPosition.value.y)
	toggleThemeWithAnimation(ripple)
}
</script>

<style>
.theme-ripple {
	position: fixed;
	border-radius: 50%;
	opacity: 1;
	transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
	pointer-events: none;
	z-index: 0;
}

html {
	transition: background-color 1s cubic-bezier(0.4, 0, 0.2, 1);
}

html.no-transition {
	transition: none !important;
}

html.dark {
	background-color: rgb(17, 24, 39);
}

html:not(.dark) {
	background-color: #f6f6f6;
}
</style>