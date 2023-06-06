// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		vue: {
			script: {
				propsDestructure: true,
			},
		},
	},
	css: ['~/assets/css/fonts.css'],
	devServer: {
		port: 4000,
	},

	app: {
		head: {
			title: 'Personal blog',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: {
				dir: 'rtl',
				class: 'dark',
			},
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxtjs/strapi',
		[
			'nuxt-headlessui',
			// >> Headless-ui options
			{
				prefix: 'Headless',
			},
		],
		[
			'nuxt-icon',
			// >> NuxtIcon options
			{
				size: '100px', // default <Icon> size applied
				class: 'project-icon', // default <Icon> class applied
				aliases: {},
			},
		],
	],
	strapi: {
		// Options
		url: process.env.BACK_END_URL || 'http://localhost:1337',
		cookieName: 'token',
	},
	runtimeConfig: {
		// environment: process.env.NODE_ENV,
		public: {
			backAPI: process.env.BACK_END_API,
			backUrl: process.env.BACK_END_URL,
		},
	},
});
