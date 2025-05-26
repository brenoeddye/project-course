import { createRouter, createWebHistory } from 'vue-router'
import content from '../content.json'
import { findVideoBySlug } from '../utils/slug'

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
		}
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
