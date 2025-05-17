<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    modelValue: boolean
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'default',
    disabled: false,
    size: 'medium'
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
    if (props.disabled) return
    emit('update:modelValue', !props.modelValue)
}

const switchClasses = computed(() => [
    'custom-switch',
    `size-${props.size}`,
    { 'disabled': props.disabled }
])

const getColor = computed(() => {
    return props.color === 'default' ? '#d4d4d8' :
           props.color === 'primary' ? '#83a034' :
           props.color === 'secondary' ? '#7828c8' :
           props.color === 'success' ? '#19c964' :
           props.color === 'warning' ? '#f5a524' : '#f31260'
})
</script>

<template>
    <div :class="switchClasses" @click="toggle">
        <div class="switch-track" :style="{ backgroundColor: modelValue ? getColor : '#e4e4e7' }">
            <div class="switch-thumb" :class="{ 'active': modelValue }" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.custom-switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .switch-track {
        position: relative;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        transition: background-color 0.3s ease;
        background-color: #e4e4e7;
    }

    .switch-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &.active {
            transform: translateX(20px);
        }
    }

    &.size-small {
        .switch-track {
            width: 36px;
            height: 20px;
        }

        .switch-thumb {
            width: 16px;
            height: 16px;
            top: 2px;
            left: 2px;

            &.active {
                transform: translateX(16px);
            }
        }
    }

    &.size-large {
        .switch-track {
            width: 52px;
            height: 28px;
        }

        .switch-thumb {
            width: 24px;
            height: 24px;
            top: 2px;
            left: 2px;

            &.active {
                transform: translateX(24px);
            }
        }
    }
}
</style> 