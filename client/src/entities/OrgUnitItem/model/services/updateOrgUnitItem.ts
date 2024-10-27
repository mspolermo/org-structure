import axios from "axios";

import { OrgUnitUpdateData } from "../types/orgUnitItem";


export async function updateOrgUnitItem (id:string, orgUnitUpdateData: OrgUnitUpdateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.patch(__API_ORGUNIT_UPDATE__+ `${id}`, {...orgUnitUpdateData});
    } catch (e) {
        console.log('Ошибка обновления данных оргюнита', e);
    }
}