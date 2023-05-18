export default defineNuxtPlugin(() => {
	return {
		provide: {
			testPlug: 'This is from plugins',
		},
	};
});
