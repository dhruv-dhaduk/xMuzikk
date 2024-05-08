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

            height: {
                'header-m': '48px',
                'header': '56px',
                'navbar-m': '48px',
                'footer-m': '64px',
                'footer': '72px',
            },
            width: {
                'navbar': '144px',
            },

            inset: {
                'footer-b-m': '56px'
            },

            margin: {
                'main-t-m': '48px',
                'main-b-m': '128px',
                'main-t': '56px',
                'main-b': '72px',
                'main-l': '144px'
            },

            zIndex: {
                'playerpage': '100',
                'header': '50',
                'footer': '40',
                'navbar': '30'
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
                'primary-dark': '#1400FF',
                'primary-light-35': 'rgba(0, 240, 255, 0.35)',
                'primary-dark-35': 'rgba(20, 0, 255, 0.35)'
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
