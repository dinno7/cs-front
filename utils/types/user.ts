import { NullishString } from '.';

export interface UserInfoRegistration {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface UserInfoLogin {
	identifier: string;
	password: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
}
