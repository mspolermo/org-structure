import axios from 'axios';

import { Favorites } from '../types/favorites';

export async function fetchFavorites(token: string): Promise<Favorites> {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get<Favorites>(__API_FAVORITES__, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchFavorites):', e);
        throw e;
    }
}
