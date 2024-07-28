import axios from "axios";

import { OrgUnitItem } from "@/entities/OrgUnitItem";

import departmentStore from "../store/departmentStore";

export async function fetchDepartment (id:string) {
    axios.defaults.withCredentials = true;

    departmentStore.clearDepartmentsData();
    try {
        //const response = axios.get<OrgUnitItem[]>('/deps.json');
        const response = axios.get<OrgUnitItem>(
            __API_ORGUNIT__ + `${id}`);
        departmentStore.updateDepartmentsData(Promise.resolve(response.then(n => n.data)));
        //departmentStore.updateDepartmentsData(Promise.resolve((await response).data));
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDepartment)');
        departmentStore.updateDepartmentsData(Promise.reject());
    }
}
