<template>
	<div class="container mx-auto px-4 py-8">
		<div v-if="course" class="max-w-4xl mx-auto">
			<!-- Cabeçalho do Curso -->
			<div class="mb-8">
				<div class="relative h-64 rounded-lg overflow-hidden mb-6">
					<img :src="course.thumbnail" :alt="course.title" class="w-full h-full object-cover">
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
					<div class="absolute bottom-0 left-0 p-6">
						<h1 class="text-3xl font-bold text-white mb-2">{{ course.title }}</h1>
						<p class="text-white/90">{{ course.description }}</p>
					</div>
				</div>

				<div class="flex items-center gap-6 text-gray-600">
					<div class="flex items-center">
						<span class="mr-2">👨‍🏫</span>
						{{ course.instructor }}
					</div>
					<div class="flex items-center">
						<span class="mr-2">⏱️</span>
						{{ course.duration }}
					</div>
					<div class="flex items-center">
						<span class="mr-2">📊</span>
						{{ course.level }}
					</div>
				</div>
			</div>

			<!-- Botão de Início do Curso -->
			<div class="mb-8 flex justify-center">
				<Button v-if="course.modules.length > 0 && course.modules[0].videos.length > 0"
					:to="getVideoLink(course.id, course.modules[0].videos[0])" variant="solid"
					color="primary" size="large"
					class="flex items-center gap-2">
					<playIcon class="w-3 h-3" color="text-white" />
					Iniciar Curso
				</Button>
			</div>

			<!-- Lista de Módulos -->
			<div class="space-y-6">
				<h2 class="text-2xl font-bold mb-4">Conteúdo do Curso</h2>

				<div v-for="module in course.modules" :key="module.id"
					class="bg-white rounded-lg shadow-md overflow-hidden">
					<div class="p-4 bg-gray-50 border-b">
						<h3 class="text-lg font-semibold">{{ module.title }}</h3>
					</div>

					<div class="divide-y">
						<div v-for="video in module.videos" :key="video.id"
							class="p-4 hover:bg-gray-50 transition-colors duration-200">
							<router-link :to="getVideoLink(course.id, video)"
								class="flex items-center justify-between">
								<div class="flex items-center space-x-4">
									<div class="w-16 h-12 relative rounded overflow-hidden">
										<img :src="video.thumbnail" :alt="video.title"
											class="w-full h-full object-cover">
										<div class="absolute inset-0 flex items-center justify-center">
											<span class="text-white text-sm">▶️</span>
										</div>
									</div>
									<div>
										<h4 class="font-medium">{{ video.title }}</h4>
										<p class="text-sm text-gray-600">{{ video.duration }}</p>
									</div>
								</div>
								<span class="text-gray-400">→</span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import coursesData from '../courses.json'
import Button from '../components/hero/Button.vue'
import { generateSlug } from '../utils/slug'

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
const course = ref<Course | null>(null)

onMounted(() => {
	const courseId = route.params.id as string
	course.value = coursesData.courses.find(c => c.id === courseId) || null
})

// Função para gerar o link do vídeo
const getVideoLink = (courseId: string, video: Video) => {
	return `/courses/${courseId}/video/${video.id}`
}
</script>