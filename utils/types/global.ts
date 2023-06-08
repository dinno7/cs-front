export type NullishString = string | null;

export interface Image extends ImageFormat {
	id: number;
	alternativeText: null | string;
	caption: null | string;
	previewUrl?: null | string;
	provider: string;
	provider_metadata: null | string;
	createdAt: string;
	updatedAt: string;
	formats: {
		thumbnail: ImageFormat;
		small: ImageFormat;
		medium: ImageFormat;
		large: ImageFormat;
	};
}

export interface ImageFormat {
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

export interface RequestQuery {
	populate: string | string[];
	filter: string | string[];
	sort: string | string[];
	fields: string | string[];
}
