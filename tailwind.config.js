/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#23A6F0',
        success: '#2DC071',
        danger: '#E74040',
        dark: '#252B42',
        muted: '#737373',
        light: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
