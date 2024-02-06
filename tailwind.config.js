/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors:{
      'header':'#27272a',
      'nav':'#dc2626',
      'buscador':'#f9fafb',

    },
    extend: {
      spacing: {
        '15': '3.75rem', // Ejemplo de agregar un valor personalizado de 15 unidades
        '20': '5rem',   // Ejemplo de agregar un valor personalizado de 20 unidades
        '30': '15rem',
        '25': '10rem',
      },
    },
  },
  plugins: [],
}

