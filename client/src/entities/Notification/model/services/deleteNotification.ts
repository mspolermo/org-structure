import axios from "axios";

export async function deleteNotification(token: string, id: string) {
    axios.defaults.withCredentials = true;

    try {
        await axios.delete(__API_NOTIFICATIONS__ + `/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        },);
    } catch (e) {
        
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка удаления объявления', e);
    }
}
