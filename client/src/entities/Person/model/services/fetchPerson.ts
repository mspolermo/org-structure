import axios from "axios";

import PersonStore from "../store/personViewStore";
import { Person } from "../types/person";

export async function fetchPerson (id:string, personStore: PersonStore) {
    axios.defaults.withCredentials = true;

    personStore.clearPerson();
    try {
        const response = axios.get<Person>(__API_PERSON__+ `${id}`);
        personStore.updatePerson(Promise.resolve(response.then(n => n.data)));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        personStore.updatePerson(Promise.reject());
    }
}