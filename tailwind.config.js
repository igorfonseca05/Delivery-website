/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',     // se usar app dir
        './pages/**/*.{js,ts,jsx,tsx}',   // se usar pages dir
        './components/**/*.{js,ts,jsx,tsx}', // componentes
    ],
    theme: {
        extend: {
            colors: {
                tema: {
                    fundo: '#FF5722', // laranja
                    texto: '#ffffff', // branco
                },
            },
        },
    },
    plugins: [],
};
