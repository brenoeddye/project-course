<template>
	<div class="w-screen max-h-[90.5vh] flex bg-gray-100">
		<!-- Sidebar -->
		<div class="w-80 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
			<div class="p-4 border-b dark:border-gray-700 flex-shrink-0">
				<h2 class="text-lg font-semibold">{{ course?.title }}</h2>
			</div>

			<div class="overflow-y-scroll custom-scrollbar">
				<div>
					<div v-for="module in course?.modules" :key="module.id">
						<div class="p-4 bg-gray-50 dark:bg-gray-900">
							<h3 class="font-medium">{{ module.title }}</h3>
						</div>

						<div class="border-b border-gray-200 dark:border-gray-600">
							<div v-for="video in module.videos" :key="video.id" :class="[
								'p-4 cursor-pointer transition-colors duration-200 border-b border-gray-200 dark:border-gray-600',
								currentVideo?.id === video.id ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
								progress?.watchedVideos.has(video.id) ? 'bg-primary-50 dark:bg-primary-900/20' : ''
							]" @click="handleVideoClick(video)" :style="{
								opacity: isVideoAccessible(video.id) ? '1' : '0.5',
								cursor: isVideoAccessible(video.id) ? 'pointer' : 'not-allowed'
							}">
								<div class="flex items-center space-x-3 w-full">
									<div class="w-12 h-8 relative rounded overflow-hidden">
										<img :src="video.thumbnail" :alt="video.title" class="w-full h-full object-cover">
										<div class="absolute inset-0 flex items-center justify-center">
											<span class="text-white text-xs">▶️</span>
										</div>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="text-sm font-medium truncate">{{ video.title }}</h4>
										<p class="text-xs text-gray-500">{{ video.duration }}</p>
									</div>
									<div class="flex items-center gap-2">
										<div v-if="video.required" class="text-xs text-gray-400">
											<LockIcon color="text-gray-400" size="w-3 h-3" />
										</div>
										<div v-if="progress?.watchedVideos.has(video.id)" class="text-primary-600 dark:text-primary-400">
											✓
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Conteúdo Principal -->
		<div class="flex-1 flex flex-col">
			<!-- Player de Vídeo -->
			<div class="flex bg-black w-full h-full">
				<div v-if="currentVideo" class="w-full h-full flex items-center justify-center">
					<div class="w-full h-full">
						<iframe
							:src="getYoutubeEmbedUrl(currentVideo.url)"
							class="w-full h-full"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
							@load="onVideoLoad"
							@play="onVideoPlay"
							title="Player de vídeo"
						></iframe>
					</div>
				</div>
			</div>

			<!-- Informações do Vídeo -->
			<div v-if="currentVideo" class="bg-white dark:bg-gray-800 p-4 shadow-lg flex-shrink-0">
				<div class="flex justify-between items-center">
					<div class="flex-1 min-w-0">
						<h1 class="text-xl font-bold mb-1 truncate">{{ currentVideo.title }}</h1>
						<p class="text-sm text-gray-600 truncate">{{ currentVideo.description }}</p>
					</div>
					<div v-if="!isLastVideo" class="flex items-center gap-4 ml-4 flex-shrink-0">
						<button
							@click.stop="proceedToNextVideo"
							:disabled="!canProceed"
							class="px-4 py-1.5 rounded-lg transition-colors text-sm"
							:class="canProceed ? 'bg-primary-800 text-white hover:bg-primary-900' : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
							aria-label="Próximo vídeo"
						>
							Avançar
						</button>
					</div>
					<div v-else class="flex items-center gap-4 ml-4 flex-shrink-0">
						<button
							@click="completeCourse"
							:disabled="!canProceed"
							class="px-4 py-1.5 rounded-lg transition-colors text-sm"
							:class="canProceed ? 'bg-primary-800 text-white hover:bg-primary-900' : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
							aria-label="Finalizar curso"
						>
							Finalizar Curso
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'

interface Video {
	id: string
	title: string
	description: string
	url: string
	duration: string
	thumbnail: string
	required: boolean
}

interface Module {
	id: string
	title: string
	videos: Video[]
}

interface Course {
	id: string
	title: string
	description: string
	thumbnail: string
	instructor: string
	duration: string
	level: string
	modules: Module[]
}

const props = defineProps<{
	video: Video | null
	course: Course | null
}>()

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const timeRemaining = ref(30)
let timer: number | null = null

function getYoutubeEmbedUrl(url: string): string {
	const videoId = url.split('v=')[1]?.split('&')[0] || ''
	return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`
}

function handleVideoClick(video: Video) {
	// Se o vídeo atual não foi assistido, não permite trocar
	const currentVideoId = currentVideo.value?.id
	
	// Permite trocar se:
	// 1. É o mesmo vídeo
	// 2. O vídeo atual já foi assistido
	// 3. O vídeo clicado já foi assistido
	if (currentVideoId !== video.id && 
		!progress.value?.watchedVideos.has(currentVideoId || '') && 
		!progress.value?.watchedVideos.has(video.id)) {
		return
	}
	playVideo(video)
}

function onVideoLoad() {
	// Não inicia o timer automaticamente
}

function onVideoPlay() {
	// Inicia o timer quando o vídeo começa a ser reproduzido
	startTimer()
}

function startTimer() {
	timeRemaining.value = 30
	if (timer) clearInterval(timer)
	
	timer = setInterval(() => {
		timeRemaining.value--
		if (timeRemaining.value <= 0) {
			clearInterval(timer!)
			courseStore.checkCanProceed()
		}
	}, 1000)
}

function proceedToNextVideo() {
	if (!courseStore.canProceed || !courseStore.nextVideo || !courseStore.currentVideo) return
	
	// Marca o vídeo atual como assistido
	courseStore.markVideoAsWatched(courseStore.currentVideo.id)
	
	// Pega o próximo vídeo antes de atualizar o estado
	const nextVideo = courseStore.nextVideo
	
	// Atualiza o vídeo atual
	courseStore.setCurrentVideo(nextVideo)
	
	// Navega para o próximo vídeo
	router.push(`/courses/${courseStore.currentCourse?.id}/video/${nextVideo.id}`)
}

function completeCourse() {
	if (!courseStore.canProceed || !courseStore.currentVideo) return
	
	courseStore.markVideoAsWatched(courseStore.currentVideo.id)
	courseStore.completeCourse()
	router.push('/courses')
}

function playVideo(video: Video) {
	courseStore.setCurrentVideo(video)
	router.push(`/courses/${courseStore.currentCourse?.id}/video/${video.id}`)
}

// Função para verificar se um vídeo já foi assistido ou está antes do vídeo atual
function isVideoAccessible(videoId: string): boolean {
	if (!progress.value || !currentVideo.value) return false
	
	// Se o vídeo já foi assistido, permite acesso
	if (progress.value.watchedVideos.has(videoId)) return true
	
	// Se o vídeo é o atual, permite acesso
	if (videoId === currentVideo.value.id) return true
	
	// Verifica se o vídeo está antes do atual no curso
	let foundCurrent = false
	for (const module of course.value?.modules || []) {
		for (const video of module.videos) {
			if (video.id === currentVideo.value.id) {
				foundCurrent = true
				continue
			}
			if (foundCurrent && video.id === videoId) {
				return false // Vídeo está depois do atual
			}
		}
	}
	
	return true // Vídeo está antes do atual
}

onMounted(() => {
	if (props.course && props.video) {
		courseStore.currentCourse = props.course
		courseStore.currentVideo = props.video
		courseStore.loadProgress()
		startTimer()
	}
})

onUnmounted(() => {
	if (timer) clearInterval(timer)
})

// Computed properties
const currentVideo = computed(() => courseStore.currentVideo)
const course = computed(() => courseStore.currentCourse)
const canProceed = computed(() => courseStore.canProceed)
const isLastVideo = computed(() => courseStore.isLastVideo)
const progress = computed(() => courseStore.progress)

// Observa mudanças na rota para atualizar o vídeo atual
watch(() => props.video, (newVideo) => {
	if (newVideo) {
		courseStore.currentVideo = newVideo
		startTimer()
	}
})
</script>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.primary.500') theme('colors.gray.200');
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: theme('colors.gray.200');
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: theme('colors.primary.500');
    border-radius: 3px;
}

.dark .custom-scrollbar {
    scrollbar-color: theme('colors.primary.900') theme('colors.gray.700');
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
    background: theme('colors.gray.700');
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: theme('colors.primary.900');
}
</style>