/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            spacing: {
                'out': '120vh'
            },

            keyframes: {
                show: {
                    '0%': { top: "120vh" },
                    '100%': { top: '0' }
                },
                hide: {
                    '0%': { top: '0' },
                    '100%': { top: "120vh" }
                }
            },

            animation: {
                'show': 'show 500ms',
                'hide': 'hide 500ms'
            },

            colors: {
                'primary-light': '#00F0FF',
                'primary-dark': '#1400FF'
            },

            gridTemplateColumns: {
                'feed': 'repeat(auto-fit, minmax(20rem, 1fr))'
            }
        },

        screens: {
            'tablet': '540px',
            'laptop': '780px',
            'desktop': '1280px'
        }
    },
    plugins: [],
};
