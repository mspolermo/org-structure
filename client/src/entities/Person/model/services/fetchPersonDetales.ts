import axios from "axios";

import PersonStore from "../store/personViewStore";
import { PersonDetales } from "../types/person";

export async function fetchPersonDetales (id:string, personStore: PersonStore) {
    axios.defaults.withCredentials = true;

    personStore.clearPersonDetales();
    try {
        const response = axios.get<PersonDetales>(__API_PERSON_DETAILS__+ `${id}`);
        personStore.updatePersonDetales(Promise.resolve(response.then(n => n.data)));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        personStore.updatePersonDetales(Promise.reject());
    }
}