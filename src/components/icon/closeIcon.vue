<template>
    <svg :class="[size, color]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script setup>
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