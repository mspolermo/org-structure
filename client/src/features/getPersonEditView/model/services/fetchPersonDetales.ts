import axios from "axios";

import { PersonDetales } from "@/entities/Person";

import personEditStore from "../store/personEditStore";

export async function fetchPersonDetales (id:string) {
    axios.defaults.withCredentials = true;

    personEditStore.clearPersonDetales();
    try {
        const response = axios.get<PersonDetales>(__API_PERSON_DETAILS__+ `${id}`);
        personEditStore.updatePersonDetales(Promise.resolve(response.then(n => n.data)));
        //personEditStore.updatePerson(Promise.resolve((await response).data));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        personEditStore.updatePersonDetales(Promise.reject());
    }
}