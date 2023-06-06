import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
export class useRequest<T> {
	private envs = useRuntimeConfig();
	private userAuth = useCookie('token');
	public defaults: UseFetchOptions<T> = {
		headers: this.userAuth.value
			? { Authorization: `Bearer ${this.userAuth.value}` }
			: {},
	};
	constructor(
		public key: string,
		public asyncDataOptions?: AsyncDataOptions<T>,
	) {}

	public get(url: string, options: UseFetchOptions<T> = {}) {
		this.defaults.method = 'GET';

		const params = { ...this.defaults, ...options };

		return useAsyncData(
			this.key,
			(): Promise<T> => $fetch(this.envs.public.backAPI + url, params),
			this.asyncDataOptions,
		);
	}

	public post(url: string, body: any, options: UseFetchOptions<T> = {}) {
		this.defaults.method = 'POST';
		this.defaults.body = body;

		const params = { ...this.defaults, ...options };

		return useAsyncData(
			this.key,
			(): Promise<T> => $fetch(this.envs.public.backAPI + url, params),
			this.asyncDataOptions,
		);
	}
}

// >> Usage example:

// const {data, error,execute,pending,refresh} =await new useRequest('<AsyncData-key>',{<AsyncDataOptions>}).get('<URL>',{<FetchOptions>})
