import { Person } from "@/entities/Person";

export interface OrgUnitItem {
    id: string,
    name: string,
    description: string | null,
    chef: Person | null, 
    managers: Person[],
    childOrgUnitItems: OrgUnitItem[],
    persons: Person[],
    nestingLevel: number
}
