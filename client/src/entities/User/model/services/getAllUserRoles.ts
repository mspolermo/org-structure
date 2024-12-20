import axios from 'axios';

import { UserRole } from '../types/user';

export async function getAllUserRoles(): Promise<UserRole[]> {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get<UserRole[]>(__API_ROLES__, {
            withCredentials: true,
        });

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (getAllUserRoles):', e);
        throw e;
    }
}
