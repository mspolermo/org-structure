import axios from "axios";

import { PersonSearched, PersonSearhRequest } from "../types/person";

export async function searchPersons(request: string): Promise<PersonSearched[] | []> {
    axios.defaults.withCredentials = true;

    const searchData: PersonSearhRequest = {}

    // Определяем, какой тип поиска используется, и извлекаем значение после префикса
    if (request.startsWith("phone:")) {
        searchData.phone = request.replace("phone:", "").trim();
    } else if (request.startsWith("location:")) {
        searchData.location = request.replace("location:", "").trim();
    } else {
        searchData.name = request.trim();
    }


    try {
        const response = await axios.post(__API_PERSON_SEARCH__, searchData);
        if (response && response.data) {
            return response.data; // Возвращаем данные, если статус 200
        } else {
            return []; // Возвращаем пустой массив в случае ошибки или отсутствия данных
        }
    } catch (e) {
        console.error('Ошибка поиска персон', e);
        return []; 
    }
}