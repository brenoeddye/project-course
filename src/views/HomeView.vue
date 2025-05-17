<template>
    <main class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Gallery
          v-for="(item, idx) in galleryItems"
          :key="idx"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          @select="goToVideo(idx)"
        />
    </main>
</template>

<script setup lang="ts">
import Gallery from '@/components/hero/Gallery.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'Kit de Escritório',
    description: 'Organize seu espaço de trabalho com estilo e praticidade.'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Acessórios Modernos',
    description: 'Itens essenciais para o dia a dia no escritório.'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Decoração Minimalista',
    description: 'Deixe seu ambiente mais leve e sofisticado.'
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'Canecas de Porcelana',
    description: 'Perfeitas para o seu café ou chá durante o trabalho.'
  },
  {
    image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80',
    title: 'Bloco de Notas',
    description: 'Anote suas ideias e tarefas com praticidade.'
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    title: 'Organizadores de Mesa',
    description: 'Mantenha tudo no lugar e aumente sua produtividade.'
  },
  {
    image: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=400&q=80',
    title: 'Luminária Design',
    description: 'Iluminação moderna para seu ambiente de trabalho.'
  }
]

function goToVideo(idx: number) {
  router.push({ name: 'video', params: { id: idx } })
}
</script>
