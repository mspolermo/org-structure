import axios from "axios";

import { PersonCreateData } from "../types/person";

export async function createPerson(personData: PersonCreateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_PERSON__, {...personData});
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка создания сотрудника', e);
    }
}
