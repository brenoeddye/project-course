<template>
	<div class="info-list flex flex-col gap-3 my-4">
		<div v-for="(item, idx) in items" :key="idx" class="info-list__row flex items-start gap-4">
			<span class="info-list__label font-semibold min-w-[180px] text-gray-900 dark:text-gray-100">{{ item.label }}</span>
			<span class="info-list__value text-gray-700 dark:text-gray-300 break-all">{{ item.value }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	items: { label: string; value: string }[]
}>()
</script>