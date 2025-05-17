<template>
	<div class="gallery-card bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col items-center overflow-hidden pb-6" @click="$emit('select')">
		<img :src="image" :alt="title" class="w-full h-40 object-cover mb-4" />

		<div class="flex flex-col items-start w-full px-5">
			<h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
			<p class="text-gray-600 text-sm text-center">{{ description }}</p>
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
	}
})

const { image, title, description } = props
</script>

<style scoped>
.gallery {
	margin-top: 2rem;
}

.gallery-card {
	transition: box-shadow 0.2s;
	cursor: pointer;
}

.gallery-card:hover {
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
</style>