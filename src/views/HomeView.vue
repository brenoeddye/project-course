<template>
    <main class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 !bg-transparent">
        <Gallery
          v-for="(item, idx) in galleryItems"
          :key="idx"
          :image="item.thumbnail"
          :title="item.title"
          :description="item.subtitle"
          @select="goToVideo(idx)"
        />
    </main>
</template>

<script setup lang="ts">
import Gallery from '@/components/hero/Gallery.vue'
import { useRouter } from 'vue-router'
import content from '@/content.json'

const router = useRouter()

const galleryItems = content.videos

function goToVideo(idx: number) {
  router.push({ name: 'video', params: { id: idx } })
}
</script>

<style scoped>
main {
  @apply bg-white dark:bg-gray-900;
}
</style>
