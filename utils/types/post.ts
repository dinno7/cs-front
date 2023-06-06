import { Image } from './global';
import { User } from './user';

export interface Post {
	uuid: string;
	id: number;
	title: string;
	content: string;
	brief: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	author: User;
	category: PostCategory;
	comments: PostComment[];
	image: Image;
}

export interface PostComment {
	id: number;
	uuid: string;
	message: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	fullName: string;
	author: User;
	post: Post;
}

export interface PostCategory {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
