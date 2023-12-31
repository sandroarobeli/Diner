/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'Georgia'],
        body: ['"Open Sans"']
      },
      colors: {
        main: {
          DEFAULT: '#F5F5DC',
          hover: '#E5E5A6',
          active: '#D6D66F'
        }
      },
      boxShadow: {
        light:
          '0.3px 0.5px 0.7px rgba(168, 168, 122, 0.36), 0.8px 1.6px 2px -0.8px rgba(168, 168, 122, 0.36), 2.1px 4.1px 5.2px -1.7px rgba(168, 168, 122, 0.36), 5px 10px 12.6px -2.5px rgba(168, 168, 122, 0.36)',
        dark: '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.36), 0.8px 1.6px 2px -0.8px rgba(0, 0, 0, 0.36), 2.1px 4.1px 5.2px -1.7px rgba(0, 0, 0, 0.36), 5px 10px 12.6px -2.5px rgba(0, 0, 0, 0.36)'
      },
      // animation class
      animation: {
        // splash: 'fadeOut 2s ease-out',
        // main: 'fadeIn 3s ease-in'
      },
      // actual animation
      keyframes: () => ({
        // fadeOut: {
        //   '0%': { opacity: 1 },
        //   '100%': { opacity: 0 }
        // },
        // fadeIn: {
        //   '0%': { opacity: 0 },
        //   '60%': { opacity: 0 },
        //   '100%': { opacity: 1 }
        // }
      })
    }
  },
  plugins: []
}
