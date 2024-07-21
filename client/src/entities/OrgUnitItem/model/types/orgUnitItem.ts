import { Person } from "@/entities/Person";

export interface OrgUnitItem {
    name: string,
    description: string | null,
    chief: Person | null, 
    managers: Person[],
    childOrgUnitItems: OrgUnitItem[],
    persons: Person[],
    orgUnitLevel: string,
    id: string,
    children: [], // непонятно что там может приходить? orgUnit[] или person[]
    canEdit: boolean,
    nestingLevel: number // новое
}
