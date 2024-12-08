import axios from "axios";

import { rootStore } from "@/app/providers/StoreProvider";

import { UserAuthData } from "../types/user";


export async function authLogin (authData: UserAuthData, rootStore: rootStore) {
    axios.defaults.withCredentials = true;

    try {
        const response = axios.post(__API_LOGIN__, authData);
        Promise.resolve(response.then(n => rootStore.updateAuth(n.data.token)))
    } catch (e) {
        console.error(e);
        rootStore.updateAuth(null)
    }
}