import { useAuth0 } from '@auth0/auth0-vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = async (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	const { isAuthenticated, isLoading } = useAuth0()

	if (isLoading.value) {
		return
	}

	if (to.meta.requiresAuth && !isAuthenticated.value) {
		next({ name: 'login' })
	} else {
		next()
	}
} 