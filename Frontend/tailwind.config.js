/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(ellipse at center, rgba(181, 8, 8, 0.38) 0%, rgba(0, 0, 0, 0.6) 100%)',
      },
    },
  },
  plugins: [
    daisyui,
  ],

}

