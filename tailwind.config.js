/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#db3935', // Nome personalizado para a cor laranja
            },
        },
    },
    plugins: [],
}
