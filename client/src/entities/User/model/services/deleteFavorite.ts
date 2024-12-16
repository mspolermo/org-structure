import axios from 'axios';

import { Favorites } from '../types/favorites';

export async function deleteFavorite(personID: string, token: string) {
    axios.defaults.withCredentials = true;
    console.log(token)

    try {
        await axios.delete<Favorites>(`${__API_FAVORITES__}/${personID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

    } catch (e) {
        console.error('Ошибка отправки данных (deleteFavorite):', e);
        throw e;
    }
}