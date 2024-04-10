/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},

        screens: {
            'tablet': '420px',
            'laptop': '780px',
            'desktop': '1280px'
        }
    },
    plugins: [],
};
