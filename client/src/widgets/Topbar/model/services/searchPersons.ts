import axios from "axios";

export async function searchPersons(name?: string, phone?: string, location?: string) {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.post(__API_PERSON_SEARCH__, {
            name,
            phone,
            location
        });

        return response; // Возвращаем полный ответ
    } catch (e) {
        console.error('Ошибка поиска персон', e);
        return null; // Возвращаем null в случае ошибки
    }
}