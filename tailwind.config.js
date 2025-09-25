// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'paws-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M26.5 20.45c-.79.32-1.73-.18-2.1-1.09-.37-.91-.04-1.9.75-2.21.79-.31 1.73.18 2.1 1.09.36.91.03 1.9-.75 2.21zm-5-3c-.62.42-1.57.19-2.12-.53-.54-.72-.48-1.71.14-2.13.62-.42 1.57-.19 2.12.53.54.72.47 1.71-.14 2.13zm-3-7c-.55.5-1.54.46-2.21-.09-.67-.55-.77-1.53-.22-2.04.56-.5 1.54-.46 2.21.09.67.55.77 1.53.22 2.04zM33 16.45c-.94-.08-1.63-.83-1.56-1.68.07-.85.88-1.47 1.82-1.4.94.08 1.63.83 1.56 1.68-.07.85-.88 1.47-1.82 1.4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }
    },
    
    colors: {
  teal: {
    DEFAULT: '#008080',
    dark: '#006666',
  },
  orange: {
    DEFAULT: '#ff6b35',
    dark: '#e65c1f',
  },
}
  },
  plugins: []
}
