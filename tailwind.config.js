module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				appGradientLight: '#27285C',
				appGradientDark: '#10103B',
			},
			backgroundImage: {
				'sun-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
				hero: "linear-gradient(to right bottom, rgba(43, 108, 176, 0.9), rgba(43, 108, 176, 0.9)), url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.eAFxNBriFW8k0jCNOTCe6gHaHs%26pid%3DApi&f=1')",
			},
		},
	},
	daisyui: {},
	plugins: [require('daisyui')],
};
