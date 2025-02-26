import axios from "axios";

import { rootStore } from "@/app/providers/StoreProvider";

import { UserNavType } from "../types/navigation";

export async function fetchUserNav(rootStore: rootStore, token: string) {
    try {
        const response = axios.get<UserNavType>(__API_NAV__ , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        rootStore.updateUserNav(Promise.resolve(response.then(n => n.data)));
    } catch (e) {
        rootStore.updateAuth(null)
        rootStore.updateUserNav(Promise.reject())
        console.error('Ошибка загрузки данных (fetchUserNav)');
    }
}