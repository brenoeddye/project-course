import { createRouter, createWebHistory } from 'vue-router'
import content from '../content.json'
import courses from '../courses.json'
import { findVideoBySlug, generateSlug } from '../utils/slug'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
			meta: {
				transition: 'slide-back'
			}
		},
		{
			path: '/video/:slug',
			name: 'video',
			component: () => import('../views/VideoView.vue'),
			props: (route) => {
				const video = findVideoBySlug(route.params.slug as string, content.videos)
				if (!video) {
					router.push('/')
					return { video: null }
				}
				return { video }
			},
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/courses',
			name: 'courses',
			component: () => import('../views/CoursesView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/courses/:id',
			name: 'course-detail',
			component: () => import('../views/CourseDetailView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/courses/:id/video/:videoId',
			name: 'course-video',
			component: () => import('../views/CourseVideoView.vue'),
			props: (route) => {
				const course = courses.courses.find(c => c.id === route.params.id)
				if (!course) {
					router.push('/')
					return { video: null, course: null }
				}

				// Procura o vídeo em todos os módulos do curso
				let video = null
				for (const module of course.modules) {
					video = module.videos.find(v => v.id === route.params.videoId)
					if (video) break
				}

				if (!video) {
					router.push('/')
					return { video: null, course: null }
				}

				return { video, course }
			},
			meta: {
				transition: 'slide'
			}
		},
	]
})

router.beforeEach((to, from, next) => {
	if (to.name === 'home' && from.name !== 'home') {
		to.meta.transition = 'slide-back'
	} else if (to.name !== 'home' && from.name === 'home') {
		to.meta.transition = 'slide'
	}
	
	next()
})

// Adiciona comportamento de rolar para o topo após cada navegação
router.afterEach(() => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
})

export default router
