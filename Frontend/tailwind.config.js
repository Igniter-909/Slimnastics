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
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
        'radial-at-b': 'radial-gradient(at bottom, var(--tw-gradient-stops))',
        'custom-radial': 'radial-gradient(ellipse at center, rgba(181, 8, 8, 0.38) 0%, rgba(0, 0, 0, 0.6) 100%)',
      },
    },
    fontFamily:{
      vazirmatn : ['Vazirmatn'],
      aclonica: ["Aclonica"],
      rubik: ["Rubik Vinyl"]
    },
    boxShadow: {
      'custom-shadow': '0px 4px 10px rgba(0, 0, 0, 0.25), 0px 10px 30px rgba(0, 0, 0, 0.1)',
    }
  },
  plugins: [
    daisyui,
  ],

}

