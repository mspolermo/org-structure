import axios from "axios";

import { PersonCreateData } from "../types/person";

export async function createPerson(personData: PersonCreateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_PERSON__, {...personData});
    } catch (e) {
        console.log('Ошибка создания сотрудника', e);
    }
}
