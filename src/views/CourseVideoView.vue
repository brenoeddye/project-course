<template>
	<div class="flex h-screen bg-gray-100">
		<!-- Sidebar -->
		<div class="w-80 bg-white shadow-lg overflow-y-auto">
			<div class="p-4 border-b">
				<h2 class="text-lg font-semibold">{{ course?.title }}</h2>
			</div>

			<div class="divide-y">
				<div v-for="module in course?.modules" :key="module.id">
					<div class="p-4 bg-gray-50">
						<h3 class="font-medium">{{ module.title }}</h3>
					</div>

					<div class="divide-y">
						<div v-for="video in module.videos" :key="video.id" :class="[
							'p-4 cursor-pointer transition-colors duration-200',
							currentVideo?.id === video.id ? 'bg-blue-50' : 'hover:bg-gray-50'
						]" @click="playVideo(video)">
							<div class="flex items-center space-x-3">
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
								<div v-if="video.required" class="text-xs text-gray-400">
									🔒
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
			<div class="flex-1 bg-black">
				<div v-if="currentVideo" class="h-full flex items-center justify-center">
					<div class="w-full aspect-video">
						<iframe
							:src="getYoutubeEmbedUrl(currentVideo.url)"
							class="w-full h-full"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>
			</div>

			<!-- Informações do Vídeo -->
			<div v-if="currentVideo" class="bg-white p-6 shadow-lg">
				<h1 class="text-2xl font-bold mb-2">{{ currentVideo.title }}</h1>
				<p class="text-gray-600">{{ currentVideo.description }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import coursesData from '../courses.json'

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

const route = useRoute()
const router = useRouter()
const course = ref<Course | null>(null)
const currentVideo = ref<Video | null>(null)
const watchedVideos = ref<Set<string>>(new Set())

function getYoutubeEmbedUrl(url: string): string {
	const videoId = url.split('v=')[1]?.split('&')[0] || ''
	return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`
}

onMounted(() => {
	const courseId = route.params.id as string
	const videoId = route.params.videoId as string

	course.value = coursesData.courses.find(c => c.id === courseId) || null

	if (course.value) {
		const video = findVideoInCourse(course.value, videoId)
		if (video) {
			currentVideo.value = video
		} else {
			// Se o vídeo não for encontrado, redireciona para o primeiro vídeo
			const firstVideo = course.value.modules[0]?.videos[0]
			if (firstVideo) {
				router.replace(`/courses/${courseId}/video/${firstVideo.id}`)
			}
		}
	}
})

function findVideoInCourse(course: Course, videoId: string): Video | null {
	for (const module of course.modules) {
		const video = module.videos.find(v => v.id === videoId)
		if (video) return video
	}
	return null
}

function playVideo(video: Video) {
	currentVideo.value = video
	router.push(`/courses/${course.value?.id}/video/${video.id}`)
}

// Observa mudanças na rota para atualizar o vídeo atual
watch(() => route.params.videoId, (newVideoId) => {
	if (course.value && newVideoId) {
		const video = findVideoInCourse(course.value, newVideoId as string)
		if (video) {
			currentVideo.value = video
		}
	}
})
</script>