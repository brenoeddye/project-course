<template>
    <div class="overflow-x-auto w-full">
        <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300">
            <thead class="bg-gray-100 dark:bg-gray-700 transition-all duration-300">
                <tr>
                    <th v-for="header in headers" :key="header.key"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-all duration-300 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-all duration-300">
                <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300">
                    <td v-for="header in headers" :key="header.key" class="text-sm px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 transition-all duration-300">
                        <slot :name="header.key" :item="item">
                            {{ item[header.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
interface TableHeader {
    key: string;
    label: string;
}

interface Props {
    headers: TableHeader[];
    items: any[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.table-custom {
    @apply w-full transition-all duration-300;

    th {
        @apply transition-all duration-300;

        &:hover {
            @apply bg-gray-100 dark:bg-gray-700;
        }
    }

    td {
        @apply text-sm text-gray-900 dark:text-gray-100 transition-all duration-300;
    }
}
</style>
