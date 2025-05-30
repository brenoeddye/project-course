<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-8">Nossos Cursos</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div v-for="course in courses" :key="course.id"
				class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
				<router-link :to="'/courses/' + course.id">
					<div class="relative">
						<img :src="course.thumbnail" :alt="course.title" class="w-full h-48 object-cover">
						<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
							<span class="text-white text-sm font-semibold">{{ course.level }}</span>
						</div>
					</div>

					<div class="p-6">
						<h2 class="text-xl font-bold mb-2">{{ course.title }}</h2>
						<p class="text-gray-600 mb-4">{{ course.description }}</p>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<span class="text-gray-500 text-sm">{{ course.duration }}</span>
							</div>
							<div class="text-sm text-gray-500">
								{{ course.instructor }}
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import coursesData from '../courses.json'

const courses = ref(coursesData.courses)

onMounted(() => {
	// Aqui você pode adicionar lógica adicional para carregar os cursos
	// por exemplo, de uma API
})
</script>