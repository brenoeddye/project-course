<template>
	<div class="relative w-full">
		<label :class="[
			'absolute left-4 transition-all duration-200 pointer-events-none text-sm',
			labelFloating ? 'top-1 text-xs text-gray-400' : 'top-1/2 -translate-y-1/2 text-base text-gray-400',
			hasPlaceholder ? 'top-1 text-xs text-gray-400' : ''
		]">
			{{ label }}
		</label>
		<input v-bind="$attrs" :placeholder="placeholder" :value="modelValue" @input="onInput" @focus="onFocus"
			@blur="onBlur"
			class="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-4 pt-6 pb-2 h-14 outline-none border-none focus:ring-2 focus:ring-primary-500 transition-all" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
	label: string;
	modelValue: string;
	placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);
const hasValue = computed(() => !!props.modelValue);
const hasPlaceholder = computed(() => !!props.placeholder);

const labelFloating = computed(() => {
	return isFocused.value || hasValue.value || hasPlaceholder.value;
});

function onFocus() {
	isFocused.value = true;
}
function onBlur() {
	isFocused.value = false;
}

function onInput(event: Event) {
	const target = event.target as HTMLInputElement | null;
	if (target) {
		emit('update:modelValue', target.value);
	}
}
</script>