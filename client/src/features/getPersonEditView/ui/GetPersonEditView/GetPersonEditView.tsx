/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';

import {
    fetchPerson,
    fetchPersonDetales,
    Person,
    PersonDetales,
    PersonFullView,
    PersonStore
} from "@/entities/Person"
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

interface GetPersonEditViewProps {
    id: string
    personStore: PersonStore
}

export const GetPersonEditView = observer((props: GetPersonEditViewProps) => {
    const {id, personStore: personEditStore} = props;
    
    const [person, setPerson] = useState<Person>();
    const [personDetales, setPersonDetales] = useState<PersonDetales>();

    useEffect( ()=> {
        fetchPerson(id, personEditStore);
        fetchPersonDetales(id, personEditStore);
    }, [id, personEditStore])

    const personDetalesData = personEditStore.personDetales?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    const personData = personEditStore.person?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    useEffect( ()=> {
        if (personData) setPerson(personData)
        if (personDetalesData) setPersonDetales(personDetalesData)
    }, [personData, personDetalesData])

    if (person  && personDetales) {
        return <PersonFullView person={person} personDetales={personDetales}/>
    } else {
        return (
            <VStack gap='16' max maxHeight align="center" justify="center">
                <Loader />
            </VStack>
        )
    }
});