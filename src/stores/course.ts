import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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

interface CourseProgress {
	courseId: string
	currentVideoId: string
	watchedVideos: Set<string>
	startTime: number
}

export const useCourseStore = defineStore('course', () => {
	const currentCourse = ref<Course | null>(null)
	const currentVideo = ref<Video | null>(null)
	const progress = ref<CourseProgress | null>(null)
	const canProceed = ref(false)
	const isCourseCompleted = ref(false)

	// Computed para verificar se o vídeo atual é o último do curso
	const isLastVideo = computed(() => {
		if (!currentCourse.value || !currentVideo.value) return false

		const lastModule = currentCourse.value.modules[currentCourse.value.modules.length - 1]
		const lastVideo = lastModule.videos[lastModule.videos.length - 1]
		return currentVideo.value.id === lastVideo.id
	})

	// Computed para obter o próximo vídeo
	const nextVideo = computed(() => {
		if (!currentCourse.value || !currentVideo.value) return null

		let foundCurrent = false
		for (const module of currentCourse.value.modules) {
			for (const video of module.videos) {
				if (foundCurrent) return video
				if (video.id === currentVideo.value.id) foundCurrent = true
			}
		}
		return null
	})

	// Função para iniciar um novo curso
	function startCourse(courseId: string) {
		const course = coursesData.courses.find(c => c.id === courseId)
		if (!course) return

		currentCourse.value = course
		const firstVideo = course.modules[0]?.videos[0]
		if (firstVideo) {
			setCurrentVideo(firstVideo)
		}
	}

	// Função para definir o vídeo atual
	function setCurrentVideo(video: Video) {
		currentVideo.value = video
		canProceed.value = false
		progress.value = {
			courseId: currentCourse.value?.id || '',
			currentVideoId: video.id,
			watchedVideos: new Set(),
			startTime: Date.now()
		}
		// Salvar progresso no localStorage
		saveProgress()
	}

	// Função para marcar vídeo como assistido
	function markVideoAsWatched(videoId: string) {
		if (progress.value) {
			progress.value.watchedVideos.add(videoId)
			saveProgress()
		}
	}

	// Função para verificar se pode prosseguir
	function checkCanProceed() {
		if (!progress.value) return false
		const elapsedTime = Date.now() - progress.value.startTime
		canProceed.value = elapsedTime >= 30000 // 30 segundos
		return canProceed.value
	}

	// Função para salvar progresso
	function saveProgress() {
		if (progress.value) {
			localStorage.setItem('courseProgress', JSON.stringify({
				...progress.value,
				watchedVideos: Array.from(progress.value.watchedVideos)
			}))
		}
	}

	// Função para carregar progresso
	function loadProgress() {
		const savedProgress = localStorage.getItem('courseProgress')
		if (savedProgress) {
			const parsed = JSON.parse(savedProgress)
			progress.value = {
				...parsed,
				watchedVideos: new Set(parsed.watchedVideos)
			}
			// Recuperar curso e vídeo atual
			const course = coursesData.courses.find(c => c.id === parsed.courseId)
			if (course) {
				currentCourse.value = course
				const video = findVideoInCourse(course, parsed.currentVideoId)
				if (video) {
					currentVideo.value = video
				}
			}
		}
	}

	// Função auxiliar para encontrar vídeo no curso
	function findVideoInCourse(course: Course, videoId: string): Video | null {
		for (const module of course.modules) {
			const video = module.videos.find(v => v.id === videoId)
			if (video) return video
		}
		return null
	}

	// Função para finalizar o curso
	function completeCourse() {
		isCourseCompleted.value = true
		localStorage.removeItem('courseProgress')
	}

	// Função para verificar se um vídeo já foi assistido
	function isVideoWatched(videoId: string): boolean {
		return progress.value?.watchedVideos.has(videoId) || false
	}

	return {
		currentCourse,
		currentVideo,
		progress,
		canProceed,
		isCourseCompleted,
		isLastVideo,
		nextVideo,
		startCourse,
		setCurrentVideo,
		markVideoAsWatched,
		checkCanProceed,
		loadProgress,
		completeCourse,
		findVideoInCourse,
		isVideoWatched
	}
}) 