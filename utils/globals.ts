export function generateRandUnique(len: number = 7): string {
	return Math.random()
		.toString(36)
		.substring(2, len + 2);
}

export function normalizedStrapiImgSrcs(content: string) {
	if (!content) return '';

	const { public: envs } = useRuntimeConfig();
	const pattern = new RegExp('(/uploads/.+?).(jpeg|svg|jpg|png)', 'gi');
	content = content.replace(pattern, (match) => `${envs.backUrl}${match}`);
	return content;
}

export function userAvatar(url: string): string {
	const avatarUrl = url;
	if (avatarUrl) return normalizedStrapiImgSrcs(avatarUrl);
	return '/images/user-photo.png';
}
