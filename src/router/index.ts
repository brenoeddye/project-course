import { createRouter, createWebHistory } from 'vue-router'

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
			path: '/video/:id',
			name: 'video',
			component: () => import('../views/VideoView.vue'),
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

export default router
