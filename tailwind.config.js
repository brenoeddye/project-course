/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern: /bg-primary(-[0-9]+)?/,
        },
        {
            pattern: /text-primary(-[0-9]+)?/,
        },
        {
            pattern: /border-primary(-[0-9]+)?/,
        },
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'rgb(131, 160, 52)',
                    50: 'rgba(131, 160, 52, 0.1)',
                    100: 'rgba(131, 160, 52, 0.2)',
                    200: 'rgba(131, 160, 52, 0.3)',
                    300: 'rgba(131, 160, 52, 0.4)',
                    400: 'rgba(131, 160, 52, 0.5)',
                    500: 'rgba(131, 160, 52, 0.6)',
                    600: 'rgba(131, 160, 52, 0.7)',
                    700: 'rgba(131, 160, 52, 0.8)',
                    800: 'rgba(131, 160, 52, 0.9)',
                    900: 'rgba(131, 160, 52, 1)',
                }
            }
        },
    },
    darkMode: 'class',
    plugins: [],
} 