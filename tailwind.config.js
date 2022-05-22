module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				suisei: "url('/img/bg1.png')",
			}),
			colors: {
				blurple: '#5865F2',
			},
		},
	},
	variants: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: '#3b66ed',
					'primary-content': '#E3F5FC',
					secondary: '#3BBCFF',
					'secondary-content': '#06232E',
					accent: '#091540',
					neutral: '#191D24',
					'base-100': '#E3F5FC',
					'base-content': '#000',
					info: '#00A0F2',
					success: '#9EF48A',
					warning: '#F9F871',
					error: '#FF626C',
				},
			},
			{
				dark: {
					primary: '#3b66ed',
					'primary-content': '#E3F5FC',
					secondary: '#3D518C',
					'secondary-content': '#E3F5FC',
					accent: '#091540',
					neutral: '#191D24',
					'base-100': '#2A303C',
					info: '#00A0F2',
					success: '#9EF48A',
					warning: '#F9F871',
					error: '#FF626C',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
