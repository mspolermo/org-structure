import axios from 'axios';

import { Favorites } from '../types/favorites';

export async function addToFavorites(personID: string, token: string) {
    axios.defaults.withCredentials = true;
    console.log(token)

    try {
        await axios.post<Favorites>(`${__API_FAVORITES__}/${personID}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

    } catch (e) {
        console.error('Ошибка отправки данных (addTpFavorites):', e);
        throw e;
    }
}