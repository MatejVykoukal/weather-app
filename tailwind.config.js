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
				'moon-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1643721977327-48601a3e9989?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
				'clouds-day-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')",
				'clouds-night-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1516007656130-a430110d6363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80')",
				'mist-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1525891618908-24765267dab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
				'snow-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1508&q=80')",
				'rain-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
				'drizzle-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1434118489318-42a0e62c6235?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')",
				'thunderstorm-overlay':
					"linear-gradient(to bottom, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')",
			},
		},
	},
	daisyui: {},
	plugins: [require('daisyui')],
};
