<template>
	<div class="relative w-full max-w-2xl">
		<div
			class="flex items-center w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 shadow-sm">
			<searchIcon class="mr-3" size="w-5 h-5" color="text-gray-400" />
			<input v-model="search" type="text"
				class="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
				placeholder="Encontre cursos ministrados por especialistas para impulsionar sua carreira"
				@keydown.enter="onSearch"
				@input="updateSuggestions" />
		</div>

		<!-- Sugestões de pesquisa -->
		<div v-if="showSuggestions && suggestions.length > 0"
			class="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
			<div v-for="suggestion in suggestions" :key="suggestion.id"
				class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3"
				@click="navigateToVideo(suggestion.id)">
				<img :src="suggestion.thumbnail" :alt="suggestion.title"
					class="w-16 h-12 object-cover rounded-md flex-shrink-0" />
				<div class="flex-1 min-w-0">
					<h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ suggestion.title }}</h4>
					<p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ suggestion.subtitle }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import searchIcon from '@/components/icon/searchIcon.vue'
import content from '@/content.json'

const router = useRouter()
const search = ref('')
const emit = defineEmits(['search-results'])
const showSuggestions = ref(false)

// Computed property para obter todas as sugestões possíveis
const allSuggestions = computed(() => {
	return content.videos.map(video => ({
		id: video.id,
		title: video.title,
		subtitle: video.subtitle,
		category: video.category,
		thumbnail: video.thumbnail
	}))
})

// Lista de sugestões filtradas
const suggestions = ref<Array<{ 
	id: number
	title: string
	subtitle: string
	category: string
	thumbnail: string
}>>([])

function updateSuggestions() {
	if (!search.value.trim()) {
		suggestions.value = []
		showSuggestions.value = false
		return
	}

	const searchTerm = search.value.toLowerCase().trim()
	suggestions.value = allSuggestions.value.filter(item => {
		const video = content.videos.find(v => v.id === item.id)
		if (!video) return false

		const searchableFields = [
			item.title,
			item.subtitle,
			item.category,
			...video.keywords
		]

		return searchableFields.some(field => 
			field.toLowerCase().includes(searchTerm)
		)
	}).slice(0, 3) // Limita a 3 sugestões

	showSuggestions.value = true
}

function navigateToVideo(id: number) {
	showSuggestions.value = false
	router.push({ name: 'video', params: { id } })
}

function onSearch() {
	if (!search.value.trim()) return

	const searchTerm = search.value.toLowerCase().trim()
	const results = content.videos.filter(video => {
		const searchableFields = [
			video.title,
			video.subtitle,
			video.description,
			video.category,
			...video.keywords
		]

		return searchableFields.some(field => 
			field.toLowerCase().includes(searchTerm)
		)
	})

	emit('search-results', results)
	showSuggestions.value = false
}
</script>