/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    important: '#root',
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {},
    },
    plugins: [],
};
