import axios from "axios";

import { NotificationUpdateData } from "../types/notification";

export async function editNotification(token: string, data: NotificationUpdateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.put(__API_NOTIFICATIONS__ + `/${data.id}`, {...data}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        },);
    } catch (e) {
        
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка редактирования объявления', e);
    }
}
