import axios from "axios";

import PersonViewStore from "../store/personViewStore";
import { personDetails } from "../types/person";

export async function fetchPersonDetails(id:string, store: PersonViewStore) {
    axios.defaults.withCredentials = true;

    try {
        const response = axios.get<personDetails>('/person.json');
        // const response = axios.post<personDetails>(
        //     __API_PERSON_DETAILS_FAST__, 
        //     {'personId': id}         
        // );
        store.updatePersonFast(Promise.resolve(response.then(n => n.data)));
        store.updatePersonFast(Promise.resolve((await response).data));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchPersonDetails) - ' + e);
        store.updatePersonFast(Promise.reject())
    }
}
