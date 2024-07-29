import axios from "axios";

import OrgUnitStore from "../store/orgUnitStore";
import { OrgUnitItem } from "../types/orgUnitItem";

export async function fetchOrgUnitItem (id:string, orgUnitStore: OrgUnitStore) {
    axios.defaults.withCredentials = true;

    orgUnitStore.clearMainOrgUnit();
    try {
        const response = axios.get<OrgUnitItem>(
            __API_ORGUNIT__ + `${id}`);
        orgUnitStore.updateMainOrgUnit(Promise.resolve(response.then(n => n.data)));

    } catch (e) {
        console.error('Ошибка загрузки данных (fetchOrgUnitItem)');
        orgUnitStore.updateMainOrgUnit(Promise.reject());
    }
}
