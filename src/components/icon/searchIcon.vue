<template>
  <svg :class="[size, color]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
    <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
    color: {
        type: String,
        default: 'text-black'
    },
    size: {
        type: String,
        default: 'w-6 h-6'
    }
})
</script> 