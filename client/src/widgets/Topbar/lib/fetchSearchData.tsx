import { OrgUnitItem, OrgUnitStore } from "@/entities/OrgUnitItem";
import { Person } from "@/entities/Person";

import { searchPersons } from "../model/services/searchPersons";


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

export async function getSearchData(inputValue: string) {
    const response = await searchPersons(inputValue);

    // Проверяем, существует ли ответ и его статус
    if (response && response.data) {
        return response.data; // Возвращаем данные, если статус 200
    } else {
        return []; // Возвращаем пустой массив в случае ошибки или отсутствия данных
    }
}
