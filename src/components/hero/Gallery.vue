<template>
	<div class="gallery-card bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col items-center overflow-hidden pb-6 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all relative" @click="$emit('select')">
		<img :src="image" :alt="title" class="w-full h-60 object-cover mb-4" />
		<span v-if="chip" :class="[
			'absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full',
			chipColor.bg,
			chipColor.text,
			chipColor.darkBg,
			chipColor.darkText
		]">{{ chip }}</span>

		<div class="flex flex-col items-start w-full px-5">
			<h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ title }}</h3>
			<p class="text-gray-600 dark:text-gray-400 text-sm text-left">{{ description }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
	image: {
		type: String,
		default: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
	},
	title: {
		type: String,
		default: 'Kit de Escritório'
	},
	description: {
		type: String,
		default: 'Organize seu espaço de trabalho com estilo e praticidade.'
	},
	chip: {
		type: String,
		default: ''
	},
	chipColor: {
		type: Object,
		default: () => ({
			bg: 'bg-blue-100',
			text: 'text-blue-800',
			darkBg: 'dark:bg-blue-900',
			darkText: 'dark:text-blue-300'
		})
	}
})

const { image, title, description, chip, chipColor } = props
</script>

<style scoped>
.gallery {
	margin-top: 2rem;
}

.gallery-card {
	transition: all 0.2s ease-in-out;
	cursor: pointer;
}

.gallery-card:hover {
	transform: translateY(-2px);
}
</style>