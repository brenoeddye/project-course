<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:transform relative custom-shadow" :style="{ '--border-color': borderColor }" :class="{ 'pl-7': borderColor }">
        <slot name="header">
            <div class="flex items-start space-x-4" v-if="title || description">
                <div class="flex-1">
                    <h3 v-if="title" class="text-xl font-semibold text-gray-900">{{ title }}</h3>
                    <p v-if="description" class="text-gray-600">{{ description }}</p>
                </div>
            </div>
        </slot>

        <slot name="content"></slot>

        <slot name="footer">
            <div v-if="linkText && linkUrl" class="mt-4">
                <a :href="linkUrl" target="_blank" rel="noopener noreferrer" class="link-primary inline-block">
                    {{ linkText }} →
                </a>
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
    linkText?: string
    linkUrl?: string
    borderColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo'
}>()
</script>

<style lang="scss" scoped>
.link-primary {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.custom-shadow {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
}

div {
    &::before {
        content: '';
        position: absolute;
        left: .6rem;
        top: 1rem;
        bottom: 1rem;
        width: 4px;
        border-radius: 2px;
    }

    &[style*="--border-color: blue"]::before {
        background-color: var(--primary-color);
    }

    &[style*="--border-color: green"]::before {
        @apply bg-green-500 dark:bg-green-400;
    }

    &[style*="--border-color: red"]::before {
        @apply bg-red-500 dark:bg-red-400;
    }

    &[style*="--border-color: yellow"]::before {
        @apply bg-yellow-500 dark:bg-yellow-400;
    }

    &[style*="--border-color: purple"]::before {
        @apply bg-purple-500 dark:bg-purple-400;
    }

    &[style*="--border-color: pink"]::before {
        @apply bg-pink-500 dark:bg-pink-400;
    }

    &[style*="--border-color: indigo"]::before {
        @apply bg-indigo-500 dark:bg-indigo-400;
    }
}
</style>
