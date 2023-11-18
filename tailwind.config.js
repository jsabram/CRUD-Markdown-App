/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px',
		},
		fontFamily: {
			regular: ['IBM Plex Sans', 'sans-serif'],
			preview: ['IBM Plex Serif', 'serif'],
			editor: ['IBM Plex Mono', 'monospace'],
		},
		extend: {
			colors: {
				primary: '#7F39FB',
				primaryHover: '#985EFF',
				primaryAccent: '#DBB2FF',
				darkGray100: '#35393F',
				darkGray200: '#2B2D31',
				darkGray300: '#1D1F22',
				darkGray500: '#151619',
				lightGray: '#F5F5F5',
				lightGray100: '#5A6069',
				textGray100: '#C1C4CB',
				textGray200: '#7C8187',
				white: '#FFFF',
				modalBackdropLight: '#00000083',
				modalBackdropDark: '#FFFFFF80',
			},
		},
	},
	plugins: [],
};
