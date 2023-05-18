// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
			},
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
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

	runtimeConfig: {
		// environment: process.env.NODE_ENV,
		public: {},
	},
});
