import axios from 'axios';

import { User } from '../types/user';

export async function getAllUsers(): Promise<User[]> {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get<User[]>(__API_USERS__, {
            withCredentials: true,
        });

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (getAllUsers):', e);
        throw e;
    }
}
