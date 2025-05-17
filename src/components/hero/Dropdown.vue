<template>
	<div class="inline-block text-left">
		<transition name="fade">
			<div v-if="open"
				class="hero-dropdown-menu origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 focus:outline-none">
				<div class="p-2">
					<button
						v-for="(item, idx) in processedItems"
						:key="item.value"
						:class="[
							'w-full text-left text-sm transition-all duration-300',
							item.divider ? 'px-0 py-0' : 'px-4 py-2',
							idx === 0 ? 'rounded-t-md' : '',
							idx === processedItems.length - 1 ? (item.danger ? 'rounded-b-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 focus:bg-red-100 dark:focus:bg-red-900/30' : 'rounded-b-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700') : '',
							item.danger && idx !== processedItems.length - 1 ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 focus:bg-red-100 dark:focus:bg-red-900/30' : '',
							!item.danger && !item.divider ? (idx !== 0 && idx !== processedItems.length - 1 ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700' : '') : '',
							!item.danger && !item.divider && idx === 0 ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700' : '',
							item.divider ? 'cursor-default pointer-events-none' : ''
						]"
						@click="!item.divider && select(item.value)"
					>
						<div v-if="item.divider" class="border-t border-gray-200 dark:border-gray-700 h-[1px]"></div>
						<div v-else class="flex items-center justify-between gap-2">
							<div class="flex items-center gap-2">
								<component v-if="item.icon" :is="item.icon" class="w-4 h-4 text-gray-700 dark:text-white" />
								{{ item.label }}
							</div>
							<component v-if="item.custom" :is="item.component" v-bind="item.props" @click.stop />
						</div>
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, markRaw, computed } from 'vue'

interface DropdownItem {
	label: string
	value: string
	icon?: any
	danger?: boolean
	divider?: boolean
    custom?: boolean
    component?: any
    props?: any
}

const props = defineProps({
	open: {
		type: Boolean,
		default: false
	},
	items: {
		type: Array as () => DropdownItem[],
		default: () => []
	}
})

const emit = defineEmits(['select'])

const select = (value: string) => {
	emit('select', value)
}

// Marca os ícones como não reativos
const processedItems = computed(() => {
	return props.items.map(item => {
		if (item.icon) {
			return {
				...item,
				icon: markRaw(item.icon)
			}
		}
		return item
	})
})
</script>

<style scoped>
.hero-dropdown-menu {
	top: 100%;
	z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
	transform: scale(1);
}
</style>
