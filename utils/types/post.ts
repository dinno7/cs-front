export interface Post {
	uuid: string;
	id: number;
	title: string;
	content: string;
	brief: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	category: PostCategory;
	comments: PostComment[];
	image: PostImage;
}

export interface PostImage extends PostImageFormat {
	id: number;
	alternativeText: null | string;
	caption: null | string;
	previewUrl?: null | string;
	provider: string;
	provider_metadata: null | string;
	createdAt: string;
	updatedAt: string;
	formats: {
		thumbnail: PostImageFormat;
		small: PostImageFormat;
		medium: PostImageFormat;
		large: PostImageFormat;
	};
}

export interface PostImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path?: null | string;
	width: number;
	height: number;
	size: number;
	url: string;
}

export interface PostComment {
	id: number;
	uuid: string;
	message: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface PostCategory {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
