import { OrgUnitItem, OrgUnitStore } from "@/entities/OrgUnitItem";
import { Person } from "@/entities/Person";


// TODO fake fetchDATA переделать на настоящий....

function search (object: OrgUnitItem[], value: string, ) {
    
    if (!value || !object ) return []

    const allEmployees: Person[] = [];

    function personExtract (data: OrgUnitItem[]) {
        data.forEach(x => {
            if (x.chef) {allEmployees.push(x.chef)}
            if (x.managers) {x.managers.forEach(m => allEmployees.push(m))}
            if (x.persons) {x.persons.forEach(p => allEmployees.push(p))}
            if (x.childOrgUnitItems) {
                personExtract(x.childOrgUnitItems)
            }
        });
    }

    personExtract(object);

    let result = allEmployees.filter(x => x.name.toLowerCase().match(value.toLowerCase()))
    if (result.length > 5) {result = result.splice(0,5)}

    return result
}

export function fetchSearchData( inputValue: string, store: OrgUnitStore ) {
    const departmentsData = store.mainOrgUnit?.value;
    return search(departmentsData as OrgUnitItem[], inputValue);
}
