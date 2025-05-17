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
			path: '/container',
			name: 'container',
			component: () => import('../views/ContainerView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/container/create',
			name: 'create-container',
			component: () => import('../views/CreateContainerView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/account',
			name: 'account',
			component: () => import('../views/AccountView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
			meta: {
				transition: 'slide'
			}
		},
		{
			path: '/callback',
			name: 'callback',
			component: () => import('../views/CallbackView.vue')
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
