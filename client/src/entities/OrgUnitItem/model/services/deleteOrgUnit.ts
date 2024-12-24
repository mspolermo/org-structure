import axios from "axios";

export async function deleteOrgUnit (id:string) {
    axios.defaults.withCredentials = true;

    try {
        await axios.delete(__API_ORGUNIT__+ `${id}`);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
        }
        console.log('Ошибка удаления оргЮнита: ', e);
    }
}