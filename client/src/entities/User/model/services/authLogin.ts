import axios from "axios";

import { rootStore } from "@/app/providers/StoreProvider";

import { UserAuthData } from "../types/user";

export async function authLogin(authData: UserAuthData, rootStore: rootStore) {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.post(__API_LOGIN__, authData);
        rootStore.updateAuth(response.data.token);
    } catch (e) {
        console.error('Ошибка при авторизации:', e);
        rootStore.updateAuth(null);
        throw new Error('Неправильный email или пароль');
    }
}
