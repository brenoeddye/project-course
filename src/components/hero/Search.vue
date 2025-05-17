<template>
	<div
		class="flex items-center w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 shadow-sm">
		<searchIcon class="mr-3" size="w-5 h-5" color="text-gray-400" />
		<input v-model="search" type="text"
			class="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
			placeholder="Encontre cursos ministrados por especialistas para impulsionar sua carreira"
			@keydown.enter="onSearch" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import searchIcon from '@/components/icon/searchIcon.vue'

const search = ref('')

function onSearch() {
	// Aqui você pode emitir um evento ou fazer a navegação/search
	// Exemplo: emit('search', search.value)
}
</script>