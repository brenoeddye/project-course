<template>
  <aside class="w-full lg:w-80 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Vídeos Relacionados</h2>
    <div class="space-y-4">
      <div v-for="video in relatedVideos" :key="video.id" 
           class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
           @click="navigateToVideo(video.id - 1)">
        <div class="flex gap-3">
          <img :src="video.thumbnail" 
               :alt="video.title"
               class="w-32 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <h3 class="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">{{ video.title }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ video.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import content from '@/content.json'
import { generateSlug } from '@/utils/slug'

const props = defineProps<{
  currentVideoId: number
}>()

const router = useRouter()

// Função para encontrar vídeos relacionados baseado nas keywords
const relatedVideos = computed(() => {
  const currentVideo = content.videos[props.currentVideoId]
  
  // Verifica se o vídeo atual existe
  if (!currentVideo) {
    return []
  }

  const currentKeywords = currentVideo.keywords

  // Encontra vídeos que compartilham keywords com o vídeo atual
  const related = content.videos
    .filter((video, index) => {
      if (index === props.currentVideoId) return false
      return video.keywords.some(keyword => currentKeywords.includes(keyword))
    })
    .slice(0, 3) // Limita a 3 vídeos relacionados

  // Se não houver vídeos relacionados suficientes, adiciona vídeos aleatórios
  if (related.length < 3) {
    const randomVideos = content.videos
      .filter((video, index) => {
        if (index === props.currentVideoId) return false
        return !related.some(r => r.id === video.id)
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - related.length)

    return [...related, ...randomVideos]
  }

  return related
})

function navigateToVideo(index: number) {
  const video = content.videos[index]
  if (video) {
    router.push({ name: 'video', params: { slug: generateSlug(video.title) } })
  }
}
</script> 