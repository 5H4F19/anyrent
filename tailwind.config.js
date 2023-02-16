// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32C7FF',
        gray:"#F4F4F4",
        placeholder:'#999999'
      },
    },
  },
  plugins: [],
};
