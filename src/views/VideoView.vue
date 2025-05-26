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
					<h1 class="text-2xl font-bold mb-2">{{ video.title }}</h1>
					<p class="text-gray-700 dark:text-gray-300 mb-4">{{ video.description }}</p>
					<div class="flex flex-wrap gap-2">
						<span v-for="keyword in video.keywords" :key="keyword"
							class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
							{{ keyword }}
						</span>
					</div>
				</div>
			</div>
			<!-- Sidebar com vídeos relacionados -->
			<Sidebar :current-video-id="video.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import content from '@/content.json'

const props = defineProps<{
	video: typeof content.videos[0]
}>()

const youtubeEmbedUrl = computed(() => {
	const videoUrl = props.video.youtubeUrl
	const videoIdMatch = videoUrl.split('v=')[1]?.split('&')[0] || ''
	return `https://www.youtube.com/embed/${videoIdMatch}`
})
</script>