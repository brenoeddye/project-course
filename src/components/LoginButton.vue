<template>
	<div class="flex items-center gap-4">
		<template v-if="!isAuthenticated">
			<Button color="primary" variant="solid" size="large" @click="handleLogin">
				Entrar
			</Button>
		</template>
		<template v-else>
			<div class="flex items-center gap-4">
				<span class="text-gray-700 dark:text-gray-300">{{ user?.name }}</span>
				<Button color="error" variant="solid" size="large" @click="handleLogout">
					Sair
				</Button>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import Button from './hero/Button.vue'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const handleLogin = () => {
	authStore.login()
}

const handleLogout = () => {
	authStore.logout()
}
</script>