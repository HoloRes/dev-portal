module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
			extend: {
					backgroundImage: (theme) => ({
							suisei: "url('/img/bg1.png')"
					}),
					colors: {
							blurple: '#5865F2'
					}
			}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
