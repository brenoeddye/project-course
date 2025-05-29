<template>
	<div class="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6 justify-start items-start md:justify-between md:items-center gap-6 md:gap-0">
		<!-- Informações do Autor -->
		<div class="flex items-center gap-4">
			<img :src="author.avatar" :alt="author.name" class="w-12 h-12 rounded-full">
			<div>
				<h3 class="font-semibold text-lg dark:text-white">{{ author.name }}</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">{{ author.role }}</p>
			</div>
		</div>

		<!-- Botão de Compartilhamento -->
		<div class="flex flex-row items-center gap-2">
			<!-- Redes Sociais -->
			<a v-for="social in author.socials" :key="social.platform" :href="social.url" target="_blank"
				class="flex items-center lg:gap-2 px-4 py-2 text-[0px] lg:text-base rounded-lg transition-colors"
				:class="{
					'bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400': social.platform === 'youtube',
					'bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 hover:from-purple-100 hover:via-pink-100 hover:to-orange-100 text-purple-600 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 dark:hover:from-purple-900/30 dark:hover:via-pink-900/30 dark:hover:to-orange-900/30 dark:text-purple-400': social.platform === 'instagram'
				}">
				<YoutubeIcon v-if="social.icon === 'youtube'" :color="social.platform === 'youtube' ? 'text-red-600 dark:text-red-400' : ''" />
				<InstagramIcon v-if="social.icon === 'instagram'" :color="social.platform === 'instagram' ? 'text-purple-600 dark:text-purple-400' : ''"/>
				<span v-if="social.platform === 'youtube'">Inscrever-se</span>
				<span v-if="social.platform === 'instagram'">Seguir</span>
			</a>

			<Button 
				@click="shareVideo" 
				class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
				variant="flat"
				color="primary"
				>
				<ShareIcon color="white" />

				Compartilhar
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Social {
	platform: string
	url: string
	icon: string
}

interface Author {
	name: string
	role: string
	avatar: string
	socials: Social[]
}

const author = ref<Author>({
	name: 'Universidade Shoppub',
	role: 'Tutor',
	avatar: '/favicon.jpg',
	socials: [
		{
			platform: 'youtube',
			url: 'https://www.youtube.com/@ShoppubOficial',
			icon: 'youtube'
		},
		{
			platform: 'instagram',
			url: 'https://www.instagram.com/shoppub_ecommerce',
			icon: 'instagram'
		}
	]
})

const shareVideo = async () => {
	if (navigator.share) {
		try {
			await navigator.share({
				title: 'Compartilhar Vídeo',
				url: window.location.href
			})
		} catch (error) {
			console.error('Erro ao compartilhar:', error)
		}
	} else {
		// Fallback para copiar URL
		navigator.clipboard.writeText(window.location.href)
		alert('Link copiado para a área de transferência!')
	}
}
</script>