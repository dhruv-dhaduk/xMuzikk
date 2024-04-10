/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},

        screens: {
            'tablet': '540px',
            'laptop': '780px',
            'desktop': '1280px'
        }
    },
    plugins: [],
};
