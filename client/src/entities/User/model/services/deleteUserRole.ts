import axios from 'axios';

export async function deleteUserRole(value: string) {
    axios.defaults.withCredentials = true;

    try {
        await axios.delete(__API_ROLES__ + value, {
            withCredentials: true,
        });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка удаления роли пользователя', e);
    }
}