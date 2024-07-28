import axios from "axios";

import { Person } from "@/entities/Person";

import personEditStore from "../store/personEditStore";

export async function fetchPersonEdit (id:string) {
    axios.defaults.withCredentials = true;

    personEditStore.clearPersonEditData();
    try {
        const response = axios.get<Person>(__API_PERSON__+ `${id}`);
        personEditStore.updatePersonEditData(Promise.resolve(response.then(n => n.data)));
        personEditStore.updatePersonEditData(Promise.resolve((await response).data));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        personEditStore.updatePersonEditData(Promise.reject());
    }
}