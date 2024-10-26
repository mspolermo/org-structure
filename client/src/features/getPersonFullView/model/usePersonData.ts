import { useState, useEffect } from 'react';

import {
    Person,
    PersonDetales,
    PersonStore,
    fetchPerson,
    fetchPersonDetales
} from '@/entities/Person'

interface UsePersonDataResult {
    person?: Person;
    personDetales?: PersonDetales;
}

export const usePersonData = (id: string, personStore: PersonStore): UsePersonDataResult => {
    const [person, setPerson] = useState<Person>();
    const [personDetales, setPersonDetales] = useState<PersonDetales>();

    useEffect( ()=> {
        fetchPerson(id, personStore);
        fetchPersonDetales(id, personStore);
    }, [id, personStore])

    const personDetalesData = personStore.personDetales?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    const personData = personStore.person?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    useEffect( ()=> {
        if (personData) setPerson(personData)
        if (personDetalesData) setPersonDetales(personDetalesData)
    }, [personData, personDetalesData])

    return { person, personDetales };
};
