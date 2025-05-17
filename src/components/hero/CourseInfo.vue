<template>
  <div class="course-info flex flex-col gap-2 text-sm text-gray-600">
    <div><span class="font-semibold">Curso:</span> {{ course.name }}</div>
    <div><span class="font-semibold">Avaliação:</span> {{ course.rating }} ★</div>
    <div><span class="font-semibold">Alunos:</span> {{ course.students }}</div>
    <div><span class="font-semibold">Carga horária:</span> {{ course.hours }} horas</div>
    <div><span class="font-semibold">Publicado:</span> {{ course.published }}</div>
    <div><span class="font-semibold">Idioma:</span> {{ course.language }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Course {
  name: string
  rating: number
  students: number
  hours: number
  published: string
  language: string
}

const props = defineProps<{ course: Course }>()
</script> 