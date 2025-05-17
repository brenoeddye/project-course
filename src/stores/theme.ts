import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: false
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
            if (this.isDark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
        },
        
        initializeTheme() {
            const savedTheme = localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            
            this.isDark = savedTheme ? savedTheme === 'dark' : prefersDark
            if (this.isDark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }
}) 