import type { NOTIFICATION_TYPES, Notification } from '~/utils/types';
import { generateRandUnique } from '~/utils';

export const useNotification = () => {
	const notifications = useState<Notification[]>('notifications', () => []);

	function addNotification(
		msg: string,
		type: NOTIFICATION_TYPES,
		title: string = '',
		timeout: number | false = false,
	) {
		const id = generateRandUnique(10);
		const newNotification: Notification = { msg, type, id, title };
		notifications.value.push(newNotification);

		if (timeout) {
			setTimeout(() => {
				removeNotification(id);
			}, timeout);
		}
	}
	function removeNotification(id: string) {
		const notificationIndex = notifications.value.findIndex((n) => n.id === id);
		if (notificationIndex !== -1)
			notifications.value.splice(notificationIndex, 1);
	}
	return {
		notifications,
		addNotification,
		removeNotification,
	};
};
