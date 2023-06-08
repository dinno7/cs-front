import { AsyncDataOptions, UseFetchOptions } from 'nuxt/app';
import { RequestQuery } from '~/utils/types';

export function useRequest<T>(
	key?: string,
	asyncDataOptions?: AsyncDataOptions<T>,
) {
	type fetchOption = (UseFetchOptions<T> & { query: RequestQuery }) | {};
	const userAuth = useCookie('token');
	const { public: envs } = useRuntimeConfig();

	const defaults: UseFetchOptions<T> = {
		headers: userAuth.value
			? { Authorization: `Bearer ${userAuth.value}` }
			: {},
	};
	function get(url: string, options: fetchOption = {}) {
		defaults.method = 'GET';

		const params: any = { ...defaults, ...options };
		url = normalizedUrl(url);
		return useAsyncData(
			key || 'Request-' + Math.floor(Math.random() * 1000),
			(): Promise<T> => $fetch(url, params),
			asyncDataOptions,
		);
	}

	function post(url: string, body: any, options: fetchOption = {}) {
		defaults.method = 'POST';
		defaults.body = body;

		const params: any = { ...defaults, ...options };
		url = normalizedUrl(url);

		return useAsyncData(
			key || 'Request-' + Math.floor(Math.random() * 1000),
			(): Promise<T> => $fetch(url, params),
			asyncDataOptions,
		);
	}

	return {
		get,
		post,
	};
}

function normalizedUrl(url: string): string {
	const { public: envs } = useRuntimeConfig();
	if (url.startsWith('!')) {
		return url.slice(1);
	}
	return envs.backAPI + url;
}

// >> Usage example:

// const {data, error,execute,pending,refresh} =await useRequest<Response type>('<AsyncData-key>',{<AsyncDataOptions>}).get('<URL>',{<FetchOptions>})
// const {data, error,execute,pending,refresh} =await useRequest<Response type>('<AsyncData-key>',{<AsyncDataOptions>}).post('<URL>',body,{<FetchOptions>})
