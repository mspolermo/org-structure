import axios from 'axios';

import { UserRole } from '../types/user';

export async function deleteUserRole(roleData: UserRole) {
    axios.defaults.withCredentials = true;

    try {
        await axios.delete(`${__API_ROLES__}/${roleData.value}`, {
            withCredentials: true,
        });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка создания роли пользователя', e);
    }
}