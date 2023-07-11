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
				"secondary": "#fb923c",
				"accent": "#eeaf3a",
				"neutral": "#291334",
				"base-100": "#faf7f5",
				"info": "#3abff8",
				"success": "#36d399",
				"warning": "#fbbd23",
				"error": "#f87272",
			},
			mythemeDark: {
				"primary": "#ff5200",
				"secondary": "#fb923c",
				"accent": "#eeaf3a",
				"neutral": "#faf7f5",
				"base-100": "#291334",
				"info": "#3abff8",
				"success": "#36d399",
				"warning": "#fbbd23",
				"error": "#f87272",
			},
		}],
		darkTheme: "mythemeDark", // name of one of the included themes for dark mode
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	  }
}
