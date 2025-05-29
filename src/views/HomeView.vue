<template>
	<div class="lg:max-w-[1900px] mx-auto flex justify-center pb-8">
		<div class="w-full flex items-start gap-8 px-8">
			<!-- Sidebar -->
			<aside
				class="w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10">
				<h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categorias</h2>
				<div class="space-y-2">
					<button v-for="category in categories" :key="category" @click="selectedCategory = category"
						class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200" :class="[
							selectedCategory === category
								? 'bg-primary-100 dark:bg-primary-200 text-primary-800 dark:text-white'
								: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
						]">
						{{ category }}
					</button>
				</div>
			</aside>

			<!-- Main Content -->
			<main class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !bg-transparent">
				<Gallery v-for="item in filteredGalleryItems" :key="item.id" :image="item.thumbnail" :title="item.title"
					:description="item.subtitle" :chip="item.category" :chip-color="getCategoryColor(item.category)"
					@select="goToVideo(item.id)" />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import Gallery from '@/components/hero/Gallery.vue'
import { useRouter } from 'vue-router'
import content from '@/content.json'
import { getCategoryColor } from '@/config/categoryColors'
import { ref, computed } from 'vue'
import { generateSlug } from '@/utils/slug'

const router = useRouter()
const galleryItems = content.videos
const selectedCategory = ref<string>('Todos')

// Extrair categorias únicas dos vídeos
const categories = computed(() => {
	const uniqueCategories = new Set(galleryItems.map(item => item.category))
	return ['Todos', ...Array.from(uniqueCategories)]
})

// Filtrar vídeos com base na categoria selecionada
const filteredGalleryItems = computed(() => {
	if (!selectedCategory.value || selectedCategory.value === 'Todos') {
		return galleryItems
	}
	return galleryItems.filter(item => item.category === selectedCategory.value)
})

function goToVideo(id: number) {
	const video = galleryItems.find(item => item.id === id)
	if (video) {
		router.push({ name: 'video', params: { slug: generateSlug(video.title) } })
	}
}
</script>

<style scoped>
main {
	@apply bg-white dark:bg-gray-900;
}

@media (max-width: 768px) {
	.w-full {
		flex-direction: column;
	}

	aside {
		width: 100%;
		margin-bottom: 1rem;
	}
}
</style>
