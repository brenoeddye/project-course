export interface CategoryColor {
	bg: string
	text: string
	darkBg: string
	darkText: string
}

export const categoryColors: Record<string, CategoryColor> = {
	'Campanhas': {
		bg: 'bg-yellow-100',
		text: 'text-yellow-800',
		darkBg: 'dark:bg-yellow-900',
		darkText: 'dark:text-yellow-300'
	},
	'Parceiros': {
		bg: 'bg-purple-100',
		text: 'text-purple-800',
		darkBg: 'dark:bg-purple-900',
		darkText: 'dark:text-purple-300'
	},
	'Produtos': {
		bg: 'bg-green-100',
		text: 'text-green-800',
		darkBg: 'dark:bg-green-900',
		darkText: 'dark:text-green-300'
	},
	'Configurações': {
		bg: 'bg-gray-100',
		text: 'text-gray-800',
		darkBg: 'dark:bg-gray-900',
		darkText: 'dark:text-gray-300'
	},
	'Outros': {
		bg: 'bg-blue-100',
		text: 'text-blue-800',
		darkBg: 'dark:bg-blue-900',
		darkText: 'dark:text-blue-300'
	}
}

export function getCategoryColor(category: string): CategoryColor {
	return categoryColors[category] || categoryColors['Outros']
} 