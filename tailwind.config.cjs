/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#ff5200",
        "primary-focus": "#ff5200",
        "secondary": "#d75050",
        "accent": "#d59b6c",
        "neutral": "#836b5d",
        "base-100": "#faf7f5",
        "info": "#42aebd",
        "success": "#489380",
        "warning": "#eb8014",
        "error": "#e01a2e",
        "--animation-btn": "0"
      },
      mythemeDark: {
        "primary": "#ff5200",
        "secondary": "#d75050",
        "accent": "#d59b6c",
        "neutral": "#836b5d",
        "base-100": "#291334",
        "info": "#42aebd",
        "success": "#489380",
        "warning": "#eb8014",
        "error": "#e01a2e",
        "--animation-btn": "0"
      },
    }],
    darkTheme: "mythemeDark", // name of one of the included themes for dark mode
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    }
}
