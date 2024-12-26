import axios from 'axios';

export async function assignUserRole (id: string, roleValue: string) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_ROLES__ + 'assign/' + id, {roleValue}, {
            withCredentials: true,
        });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка изменения роли пользователя', e);
    }
}