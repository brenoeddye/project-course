<template>
  <div class="video-player bg-black rounded-lg overflow-hidden shadow">
    <video :src="src" controls class="w-full h-72 bg-black">
      Seu navegador não suporta o elemento <code>video</code>.
    </video>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: '' }
})
</script>

<style scoped>
.video-player {
  min-height: 18rem;
}
</style> 