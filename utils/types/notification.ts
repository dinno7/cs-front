export enum NOTIFICATION_TYPES {
	success,
	error,
	info,
}
export interface Notification {
	id: string;
	title?: string;
	type: NOTIFICATION_TYPES;
	msg: string;
}
