/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'], theme: {
    extend: {
      colors: {
        "orange": {'from': '#CE4B43', 'to': '#F1BE44'}, "blackcard": "#14181E"
      }, gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
      }, backgroundImage: {
        fake: 'url(@/assets/background.png)',
      }
    },
  }, plugins: [import('flowbite/plugin')],
}

