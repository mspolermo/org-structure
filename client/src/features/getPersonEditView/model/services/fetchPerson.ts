import axios from "axios";

import { Person } from "@/entities/Person";

import personEditStore from "../store/personEditStore";

export async function fetchPerson (id:string) {
    axios.defaults.withCredentials = true;

    personEditStore.clearPerson();
    try {
        const response = axios.get<Person>(__API_PERSON__+ `${id}`);
        personEditStore.updatePerson(Promise.resolve(response.then(n => n.data)));
        //personEditStore.updatePerson(Promise.resolve((await response).data));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        personEditStore.updatePerson(Promise.reject());
    }
}