import { Person } from "@/entities/Person";

import OrgUnitViewStore from "../store/orgUnitIViewStore";

export interface OrgUnitItem {
    id: string,
    name: string,
    description: string | null,
    chef: Person | null, 
    managers: Person[],
    childOrgUnitItems: OrgUnitItem[],
    persons: Person[],
    nestingLevel: number
    workingHours: string
    lunchBreak: string
    summary?: string
}

export interface orgUnitsCardType {
    id: string;
    store: OrgUnitViewStore
}
