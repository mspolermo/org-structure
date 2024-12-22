import axios from 'axios';

import { NotificationType } from '../types/notification';

export async function fetchNotifications(token: string): Promise<NotificationType[]> {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get<NotificationType[]>(__API_NOTIFICATIONS__, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchNotifications):', e);
        throw e;
    }
}