<template>
	<div id="app-content" class="min-h-screen text-gray-900 dark:text-white">
		<template v-if="!isAuthPage">
			<Header />
		</template>
		
		<RouterView v-slot="{ Component, route }">
			<Transition :name="(route.meta.transition as string) || 'slide'" mode="out-in">
				<component :is="Component" />
			</Transition>
		</RouterView>

		<QuickMenu />
	</div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

interface RouteMeta {
	transition?: string
}

const route = useRoute()
const isAuthPage = computed(() => {
	return ['login', 'callback'].includes(route.name as string)
})
</script>

<style>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
}

.slide-enter-from {
	transform: translateX(20%);
	opacity: 0;
}

.slide-leave-to {
	transform: translateX(-20%);
	opacity: 0;
}

.slide-back-enter-active,
.slide-back-leave-active {
	transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
}

.slide-back-enter-from {
	transform: translateX(-20%);
	opacity: 0;
}

.slide-back-leave-to {
	transform: translateX(20%);
	opacity: 0;
}

/* Container para manter o layout durante a transição */
.router-view-container {
	position: relative;
	min-height: calc(100vh - 6rem); /* Ajuste conforme a altura do seu header */
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
}
</style>
