<template>
  <div class="chapter-list bg-white rounded-lg shadow p-4">
    <h2 class="text-lg font-semibold mb-4">Conteúdo do Curso</h2>
    <ul>
      <li
        v-for="(chapter, idx) in chapters"
        :key="idx"
        :class="[ 'flex items-center justify-between px-3 py-2 rounded cursor-pointer mb-1', idx === currentIndex ? 'bg-indigo-100 font-bold' : 'hover:bg-gray-100' ]"
        @click="$emit('select', idx)"
      >
        <span>{{ chapter.title }}</span>
        <span class="text-xs text-gray-500">{{ chapter.duration }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Chapter {
  title: string
  duration: string
}

const props = defineProps<{
  chapters: Chapter[],
  currentIndex: number
}>()
const emit = defineEmits(['select'])
</script> 