<template>
	<div class="video-view bg-gray-100 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
			<!-- Player e informações principais -->
			<div class="flex-1">
				<div class="relative pb-[56.25%] sm:pb-[45%] md:pb-[35%] lg:pb-[56%]">
					<iframe :src="youtubeEmbedUrl" class="absolute inset-0 w-full h-full rounded-lg shadow-lg" frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen @load="onIframeLoad" ref="youtubeIframe"></iframe>
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
import { computed, ref, onMounted } from 'vue'
import content from '@/content.json'

// Declarações de tipo para o YouTube Player API
declare global {
	interface Window {
		YT: {
			Player: new (element: HTMLElement, options: any) => any
		}
		onYouTubeIframeAPIReady: () => void
		dataLayer?: any[]
	}
}

const props = defineProps<{
	video: typeof content.videos[0]
}>()

const youtubeIframe = ref<HTMLIFrameElement | null>(null)
let player: any = null

const youtubeEmbedUrl = computed(() => {
	const videoUrl = props.video.youtubeUrl
	const videoIdMatch = videoUrl.split('v=')[1]?.split('&')[0] || ''
	return `https://www.youtube.com/embed/${videoIdMatch}?enablejsapi=1&origin=${window.location.origin}`
})

function onIframeLoad() {
	if (window.YT && window.YT.Player) {
		initializePlayer()
	} else {
		// Carrega a API do YouTube se ainda não estiver carregada
		const tag = document.createElement('script')
		tag.src = 'https://www.youtube.com/iframe_api'
		const firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

		window.onYouTubeIframeAPIReady = initializePlayer
	}
}

function initializePlayer() {
	if (!youtubeIframe.value) return

	player = new window.YT.Player(youtubeIframe.value, {
		events: {
			onStateChange: onPlayerStateChange
		}
	})
}

function onPlayerStateChange(event: { data: number; target: { getCurrentTime: () => number; getDuration: () => number } }) {
	const events: Record<number, string> = {
		[-1]: 'unstarted',
		[0]: 'ended',
		[1]: 'playing',
		[2]: 'paused',
		[3]: 'buffering',
		[5]: 'video cued'
	}

	const eventName = events[event.data] || 'unknown'
	const videoId = props.video.youtubeUrl.split('v=')[1]?.split('&')[0] || ''
	const videoTitle = props.video.title

	function calcularPercentual(event: { target: { getCurrentTime: () => number; getDuration: () => number } }) {
		try {
			const current = event.target.getCurrentTime()
			const total = event.target.getDuration()
			if (!total) return 0
			return Math.round((current / total) * 100)
		} catch {
			return 0
		}
	}

	window.dataLayer?.push({
		event: 'youtube_video_event',
		video_event: eventName,
		video_id: videoId,
		video_title: videoTitle,
		video_percent: calcularPercentual(event)
	})
}

onMounted(() => {
	// Inicialização do player
})
</script>