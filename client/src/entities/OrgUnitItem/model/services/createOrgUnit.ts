import axios from "axios";

import { OrgUnitCreateData } from "../types/orgUnitItem";


export async function createOrgUnitItem (orgUnitData: OrgUnitCreateData) {
    axios.defaults.withCredentials = true;

    try {
        await axios.post(__API_ORGUNIT_CREATE__, {...orgUnitData});
    } catch (e) {
        console.log('Ошибка создания оргюнита', e);
    }
}