module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
          fontFamily: {
            alfa: ['Alfa Slab One', 'cursive'],
            encode: ['Encode Sans', 'sans-serif'],
            fredoka: ['Fredoka One', 'cursive'],
            titan: ['Titan One', 'cursive']
          },
          keyframes: {
            fadeupdown: {

              '0%, 100%': {transform: 'translateY(0px)'},
              '50%': {transform: 'translateY(-50px)'}
        
            }
            },

          animation:{
            'fadeupdown': 'fadeupdown 3s ease-in-out infinite'

          }
         
          
      },
    },
    plugins: [
      require('tailwind-scrollbar-hide')
    ],
  }