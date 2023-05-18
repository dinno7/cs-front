import { generateRandUnique } from '~/utils';

interface Notification {
	id: string;
	title?: string;
	msg: string;
}

export const useNotification = () => {
	const notifications = useState<Notification[]>('notifications', () => []);
	function addNotification(msg: string, title: string, timeout: number = 1000) {
		const id = generateRandUnique(10);
		const newNotification: Notification = { msg, id, title };
		notifications.value.push(newNotification);

		setTimeout(() => {
			removeNotification(id);
		}, timeout);
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
