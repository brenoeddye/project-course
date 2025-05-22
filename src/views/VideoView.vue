<template>
	<div class="video-view bg-gray-100 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
			<!-- Player e informações principais -->
			<div class="flex-1">
				<div class="relative pb-[56.25%] sm:pb-[45%] md:pb-[35%] lg:pb-[56%]">
					<iframe :src="youtubeEmbedUrl" class="absolute inset-0 w-full h-full rounded-lg shadow-lg" frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
				</div>

				<VideoDetails />

				<div class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
					<h1 class="text-2xl font-bold mb-2">{{ videoData.title }}</h1>
					<p class="text-gray-700 dark:text-gray-300 mb-4">{{ videoData.description }}</p>
					<div class="flex flex-wrap gap-2">
						<span v-for="keyword in videoData.keywords" :key="keyword"
							class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
							{{ keyword }}
						</span>
					</div>
				</div>
			</div>
			<!-- Sidebar com vídeos relacionados -->
			<Sidebar :current-video-id="videoId" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import content from '@/content.json'

const route = useRoute()
const videoId = computed(() => Number(route.params.id) || 0)
const videoData = computed(() => content.videos[videoId.value] || content.videos[0])

// Função para converter URL do YouTube em URL de embed
const youtubeEmbedUrl = computed(() => {
	const videoUrl = videoData.value.youtubeUrl
	const videoId = videoUrl.split('v=')[1]
	return `https://www.youtube.com/embed/${videoId}`
})
</script>