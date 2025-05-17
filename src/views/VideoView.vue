<template>
  <div class="video-view bg-gray-100 min-h-screen">
    <div class="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
      <!-- Player e informações principais -->
      <div class="flex-1">
        <VideoPlayer :src="videoData.src" :title="videoData.title" />
        <div class="mt-6 bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold mb-2">{{ videoData.title }}</h1>
          <p class="text-gray-700 mb-4">{{ videoData.description }}</p>
          <CourseInfo :course="videoData.course" />
        </div>
      </div>
      <!-- Lista de capítulos/aulas -->
      <aside class="w-full lg:w-80">
        <VideoChapterList :chapters="videoData.chapters" :currentIndex="currentChapterIndex" @select="selectChapter" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import VideoPlayer from '@/components/hero/VideoPlayer.vue'
import VideoChapterList from '@/components/hero/VideoChapterList.vue'
import CourseInfo from '@/components/hero/CourseInfo.vue'

// Mock de dados do vídeo/curso
const videos = [
  {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Kit de Escritório',
    description: 'Organize seu espaço de trabalho com estilo e praticidade.',
    course: {
      name: 'Ruby on Rails 5.x - Do início ao fim!',
      rating: 4.7,
      students: 9400,
      hours: 48,
      published: 'junho de 2018',
      language: 'Português'
    },
    chapters: [
      { title: 'Ruby, IRB e Pry', duration: '12m' },
      { title: 'Variáveis e Versões do Ruby', duration: '8m' },
      { title: 'Saída e Entrada padrão, \n, Chomp e Coerção', duration: '11m' },
      { title: 'Estruturas Condicionais', duration: '12m' }
    ]
  },
  {
    src: 'https://www.w3schools.com/html/movie.mp4',
    title: 'Acessórios Modernos',
    description: 'Itens essenciais para o dia a dia no escritório.',
    course: {
      name: 'Ruby on Rails 5.x - Do início ao fim!',
      rating: 4.7,
      students: 9400,
      hours: 48,
      published: 'junho de 2018',
      language: 'Português'
    },
    chapters: [
      { title: 'Acessórios Modernos', duration: '8m' },
      { title: 'Organização e Praticidade', duration: '10m' }
    ]
  },
  // Adicione os outros vídeos conforme necessário
]

const route = useRoute()
const videoId = computed(() => Number(route.params.id) || 0)
const videoData = computed(() => videos[videoId.value] || videos[0])

const currentChapterIndex = ref(0)

function selectChapter(index: number) {
  currentChapterIndex.value = index
  // Aqui você pode trocar o vídeo, se cada capítulo tiver um src diferente
}
</script>

<style scoped>
.video-view {
  background: #f3f4f6;
}
</style> 