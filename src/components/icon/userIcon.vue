<template>
    <svg :class="[size, color]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="6" r="4" fill="currentColor"/>
        <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" fill="currentColor"/>
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