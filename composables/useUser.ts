import { User } from '~/utils/types';

export const useUser = async () => {
	const user = useState('CurrentUser', () => null);

	const token = useCookie('token');
	const setToken = (value: any) => {
		token.value = value;
	};

	const fetchUser = async () => {
		if (token.value) {
			try {
				const { data: fetchedUser, error } = await useRequest<User>().get(
					'/users/me',
					{
						query: { populate: ['avatar'] },
					},
				);
				if (error.value || !fetchedUser) {
					throw new Error();
				}
				user.value = fetchedUser;
			} catch (e) {
				user.value = null;
				setToken(null);
			}
		}
		return user;
	};

	await fetchUser();
	return {
		user,
		fetchUser,
	};
};
