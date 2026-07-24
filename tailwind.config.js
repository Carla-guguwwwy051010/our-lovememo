/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFEF0',
        peach: '#FFD1DC',
        baby: '#A7C7E7',
        mint: '#B5EAD7',
        softBlack: '#4A4A4A',
      },
      boxShadow: {
        sticker: '0 4px 12px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        handwriting: ['"Segoe Print"', '"Comic Sans MS"', 'cursive'],
        body: ['"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        drizzle: 'drizzle 7s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        wobble: 'wobble 5s ease-in-out infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drizzle: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '100%': { transform: 'translateY(250px)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
