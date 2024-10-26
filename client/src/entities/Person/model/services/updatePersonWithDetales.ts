import axios from "axios";

import { PersonFullUpdateData } from "../types/person";

export async function updatePersonWithDetales (id:string, personWithDetales: PersonFullUpdateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.patch(__API_PERSON_WITH_DETALES_UPDATE__+ `${id}`, {
            person: personWithDetales.person,
            personDetales: personWithDetales.personDetales,
        });
    } catch (e) {
        console.error('Ошибка обновления данных персоны с деталями', e);
    }
}