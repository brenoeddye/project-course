<template>
    <div 
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300"
        :class="{
            'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-200': color === 'blue',
            'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-200': color === 'green',
            'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200': color === 'red',
            'bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200': color === 'yellow',
            'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-200': color === 'purple',
            'bg-pink-50 dark:bg-pink-900 text-pink-600 dark:text-pink-200': color === 'pink',
            'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200': color === 'indigo'
        }"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    color: {
        type: String,
        default: 'blue',
        validator: (value: string) => {
            return ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo'].includes(value)
        }
    }
})
</script>