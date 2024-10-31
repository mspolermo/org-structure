import { Person } from "@/entities/Person";

import { searchPersons } from "../model/services/searchPersons";


export async function fetchSearchData(inputValue: string): Promise<Person[] | []> {
    const response = await searchPersons(inputValue);

    // Проверяем, существует ли ответ и его статус
    if (response && response.data) {
        return response.data; // Возвращаем данные, если статус 200
    } else {
        return []; // Возвращаем пустой массив в случае ошибки или отсутствия данных
    }
}
