import type { UseFetchOptions } from 'nuxt/app';
import { defu } from 'defu';

export function useCustomFetch<T>(
	url: string,
	options: UseFetchOptions<T> = {},
) {
	const userAuth = useCookie('toekn');
	const { public: config } = useRuntimeConfig();

	const defaults: UseFetchOptions<T> = {
		backAPI: config.backAPI,
		// cache request
		key: url,

		// set user token if connected
		headers: userAuth.value
			? { Authorization: `Bearer ${userAuth.value}` }
			: {},

		onResponse(_ctx) {
			// _ctx.response._data = new myBusinessResponse(_ctx.response._data)
		},

		onResponseError(_ctx) {
			// throw new myBusinessError()
		},
	};

	// for nice deep defaults, please use unjs/defu
	const params = { ...defaults, ...options };
	// const params = defu(options, combined);

	return useFetch(url, params);
}
