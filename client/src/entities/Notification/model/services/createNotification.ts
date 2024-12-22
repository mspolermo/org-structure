import axios from "axios";

import { NotificationCreateData } from "../types/notification";

export async function createNotification(token: string, data: NotificationCreateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_NOTIFICATIONS__, {...data}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        },);
    } catch (e) {
        
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка создания объявления', e);
    }
}
