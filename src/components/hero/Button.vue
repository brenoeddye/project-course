<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow'
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'solid',
    color: 'default',
    size: 'medium',
    disabled: false
})

const emit = defineEmits(['click'])

const ripple = ref<{ x: number; y: number; size: number } | null>(null)

const isLink = computed(() => !!props.href)
const isRouterLink = computed(() => !!props.to)

const handleClick = (event: MouseEvent) => {
    if (props.disabled) return

    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()

    ripple.value = {
        x: event.offsetX,
        y: event.offsetY,
        size: Math.max(rect.width, rect.height)
    }

    setTimeout(() => {
        ripple.value = null
    }, 600)

    emit('click', event)
}

const buttonClasses = computed(() => [
    'custom-button',
    `variant-${props.variant}`,
    `size-${props.size}`,
    { 'disabled': props.disabled }
])
</script>

<template>
    <component :is="isRouterLink ? 'router-link' : isLink ? 'a' : 'button'" :to="isRouterLink ? to : undefined"
        :href="isLink ? href : undefined" :type="!isLink && !isRouterLink ? type : undefined" :class="buttonClasses"
        :disabled="disabled" @click="handleClick">
        <slot />
        <span v-if="ripple" class="ripple" :style="{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`
        }" />
    </component>
</template>

<style scoped lang="scss">
/* Base button styles */
.custom-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    border: none;
    text-decoration: none;
    min-width: 100px;
    height: 40px;
    font-size: 0.875rem;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Variants */
    &.variant-solid {
        background-color: v-bind('color === "default" ? "#d4d4d8" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');
        color: white;

        &:hover:not(:disabled) {
            background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.8)" : color === "primary" ? "rgba(131, 160, 52, 0.8)" : color === "secondary" ? "rgba(120, 40, 200, 0.8)" : color === "success" ? "rgba(25, 201, 100, 0.8)" : color === "warning" ? "rgba(245, 165, 36, 0.8)" : "rgba(243, 18, 96, 0.8)"');
        }
    }

    &.variant-bordered {
        background-color: transparent;
        border: 1.5px solid v-bind('color === "default" ? "#d4d4d8" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');
        color: v-bind('color === "default" ? "#71717a" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');

        &:hover:not(:disabled) {
            background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.1)" : color === "primary" ? "rgba(131, 160, 52, 0.1)" : color === "secondary" ? "rgba(120, 40, 200, 0.1)" : color === "success" ? "rgba(25, 201, 100, 0.1)" : color === "warning" ? "rgba(245, 165, 36, 0.1)" : "rgba(243, 18, 96, 0.1)"');
        }
    }

    &.variant-light {
        background-color: transparent;
        color: v-bind('color === "default" ? "#71717a" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');

        &:hover:not(:disabled) {
            background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.1)" : color === "primary" ? "rgba(131, 160, 52, 0.1)" : color === "secondary" ? "rgba(120, 40, 200, 0.1)" : color === "success" ? "rgba(25, 201, 100, 0.1)" : color === "warning" ? "rgba(245, 165, 36, 0.1)" : "rgba(243, 18, 96, 0.1)"');
        }
    }

    &.variant-flat {
        background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.1)" : color === "primary" ? "rgba(131, 160, 52, 0.1)" : color === "secondary" ? "rgba(120, 40, 200, 0.1)" : color === "success" ? "rgba(25, 201, 100, 0.1)" : color === "warning" ? "rgba(245, 165, 36, 0.1)" : "rgba(243, 18, 96, 0.1)"');
        color: v-bind('color === "default" ? "#71717a" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');

        &:hover:not(:disabled) {
            background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.2)" : color === "primary" ? "rgba(131, 160, 52, 0.2)" : color === "secondary" ? "rgba(120, 40, 200, 0.2)" : color === "success" ? "rgba(25, 201, 100, 0.2)" : color === "warning" ? "rgba(245, 165, 36, 0.2)" : "rgba(243, 18, 96, 0.2)"');
        }
    }

    &.variant-faded {
        background-color: transparent;
        color: v-bind('color === "default" ? "#71717a" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');
        opacity: 0.8;

        &:hover:not(:disabled) {
            opacity: 1;
            background-color: v-bind('color === "default" ? "rgba(212, 212, 216, 0.1)" : color === "primary" ? "rgba(131, 160, 52, 0.1)" : color === "secondary" ? "rgba(120, 40, 200, 0.1)" : color === "success" ? "rgba(25, 201, 100, 0.1)" : color === "warning" ? "rgba(245, 165, 36, 0.1)" : "rgba(243, 18, 96, 0.1)"');
        }
    }

    &.variant-shadow {
        background-color: v-bind('color === "default" ? "#d4d4d8" : color === "primary" ? "#83a034" : color === "secondary" ? "#7828c8" : color === "success" ? "#19c964" : color === "warning" ? "#f5a524" : "#f31260"');
        color: white;
        box-shadow: 0 4px 12px v-bind('color === "default" ? "rgba(212, 212, 216, 0.4)" : color === "primary" ? "rgba(131, 160, 52, 0.4)" : color === "secondary" ? "rgba(120, 40, 200, 0.4)" : color === "success" ? "rgba(25, 201, 100, 0.4)" : color === "warning" ? "rgba(245, 165, 36, 0.4)" : "rgba(243, 18, 96, 0.4)"');

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px v-bind('color === "default" ? "rgba(212, 212, 216, 0.6)" : color === "primary" ? "rgba(131, 160, 52, 0.6)" : color === "secondary" ? "rgba(120, 40, 200, 0.6)" : color === "success" ? "rgba(25, 201, 100, 0.6)" : color === "warning" ? "rgba(245, 165, 36, 0.6)" : "rgba(243, 18, 96, 0.6)"');
        }
    }

    /* Sizes */
    &.size-small {
        padding: 0.25rem 0.75rem;
        height: 32px;
        min-width: 80px;
        font-size: 0.75rem;
    }

    &.size-medium {
        padding: 0.5rem 1rem;
        height: 40px;
        min-width: 100px;
        font-size: 0.875rem;
    }

    &.size-large {
        padding: 0.75rem 1.25rem;
        height: 48px;
        min-width: 120px;
        font-size: 1rem;
    }

    /* Ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        transform-origin: center;
        left: 0;
        top: 0;
        translate: -50% -50%;
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
</style>
