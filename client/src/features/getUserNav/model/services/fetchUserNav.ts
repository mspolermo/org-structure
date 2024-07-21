import axios from "axios";

import { rootStore } from "@/app/providers/StoreProvider";

import { UserNavType } from "../types/userNav";

export async function fetchUserNav() {
    
    try {
        const response = axios.get<UserNavType>('/nav.json')
        //const response = axios.get<UserNavType>(__API_NAV__ , {withCredentials: true});
        rootStore.updateUserNav(Promise.resolve(response.then(n => n.data)));
        rootStore.updateUserNav(Promise.resolve((await response).data));
    } catch (e) {
        rootStore.updateUserNav(Promise.reject())
        console.error('Ошибка загрузки данных (fetchUserNav)');
    }
}
