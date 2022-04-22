module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
          fontFamily: {
            alfa: ['Comfortaa', 'cursive'],
            encode: ['Comfortaa', 'cursive'],
            fredoka: ['Fredoka One', 'cursive'],
            titan: ['Comfortaa', 'cursive'],
            description : ['Plus Jakarta Sans', 'sans-serif']
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