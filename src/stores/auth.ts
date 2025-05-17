import { defineStore } from 'pinia'
import type { User } from '@auth0/auth0-vue'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: true,
		user: {
			name: 'Usuário de Desenvolvimento',
			email: 'dev@example.com',
			picture: '',
			sub: 'dev-user'
		} as User,
		loading: false,
	}),

	getters: {
		getUser: (state) => state.user,
		getIsAuthenticated: (state) => state.isAuthenticated,
		getLoading: (state) => state.loading,
	},

	actions: {
		async login() {
			// Simula login bem-sucedido
			this.isAuthenticated = true
		},

		async logout() {
			// Simula logout
			this.isAuthenticated = false
			this.user = {
				name: '',
				email: '',
				picture: '',
				sub: ''
			}
		},

		async handleAuthentication() {
			// Mantém o estado atual
			this.loading = false
		},
	},
}) 