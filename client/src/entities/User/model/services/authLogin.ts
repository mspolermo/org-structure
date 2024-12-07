import axios from "axios";

import { UserAuthData } from "../types/user";


export async function authLogin (authData: UserAuthData) {
    axios.defaults.withCredentials = true;

    try {
        const response = axios.post(__API_LOGIN__, authData);
        return Promise.resolve(response.then(n => n.data))
    } catch (e) {
        console.error(e);
    }
}