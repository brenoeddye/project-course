<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
		<div class="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
			<p class="mt-4 text-gray-600 dark:text-gray-400">Processando login...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { isAuthenticated, isLoading } = useAuth0()

onMounted(() => {
	if (!isLoading.value) {
		if (isAuthenticated.value) {
			router.push('/')
		} else {
			router.push('/login')
		}
	}
})
</script>