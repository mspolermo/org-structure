import { Person } from "@/entities/Person";

import OrgUnitViewStore from "../store/orgUnitIViewStore";

export interface OrgUnitItem {
    id: string,
    name: string,
    description: string,
    chef: Person | null, 
    managers: Person[],
    childOrgUnitItems: OrgUnitItem[],
    persons: Person[],
    nestingLevel: number
    workingHours: string
    lunchBreak: string
    summary?: string
}

export interface OrgUnitsCardType {
    id: string;
    store: OrgUnitViewStore
}

export interface OrgUnitUpdateData extends Pick<
OrgUnitItem,
    'name' |
    'description' |
    'workingHours' |
    'lunchBreak' |
    'summary'
> {}

export interface OrgUnitCreateData extends OrgUnitUpdateData {
    parentOrgUnitId: string | null
}
