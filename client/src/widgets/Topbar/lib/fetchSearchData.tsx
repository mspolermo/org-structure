import { OrgUnitItem } from "@/entities/OrgUnitItem";
import { Person } from "@/entities/Person";
import { departmentStore } from "@/features/getDepartment";


// TODO fake fetchDATA переделать на настоящий....

function search (object: OrgUnitItem[], value: string, ) {
    if (!value || !object ) return []

    const allEmployees: Person[] = [];

    function personExtract (data: OrgUnitItem[]) {
        data.forEach(x => {
            if (x.chief) {allEmployees.push(x.chief)}
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

export function fetchSearchData( inputValue: string ) {
    const departmentsData = departmentStore.departmentsData?.value;
    return search(departmentsData as OrgUnitItem[], inputValue);
}
