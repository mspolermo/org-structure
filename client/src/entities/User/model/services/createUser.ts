import axios from "axios";

import { UserCreateData } from "../types/user";

export async function createUser(userData: UserCreateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_USERS__, {...userData});
    } catch (e) {
        
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка создания пользователя', e);
    }
    '34ef21fd-e5a6-457a-aecc-55ebf1a8a95c'
}
