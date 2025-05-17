declare module '@auth0/auth0-vue' {
	export interface User {
		name?: string
		email?: string
		picture?: string
		sub?: string
		[key: string]: any
	}

	export interface Auth0Plugin {
		isAuthenticated: Ref<boolean>
		isLoading: Ref<boolean>
		user: Ref<User | undefined>
		loginWithRedirect: (options?: any) => Promise<void>
		logout: (options?: any) => Promise<void>
		getAccessTokenSilently: (options?: any) => Promise<string>
	}

	export function createAuth0(config: any): Auth0Plugin
	export function useAuth0(): Auth0Plugin
} 