import axios from "axios";

export async function deletePerson(id:string) {
    axios.defaults.withCredentials = true;

    try {
        await axios.delete(__API_PERSON__+ `${id}`);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка удаления сотрудника: ', e);
    }
}