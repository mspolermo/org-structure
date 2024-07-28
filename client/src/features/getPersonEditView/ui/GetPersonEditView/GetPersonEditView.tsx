import { observer } from "mobx-react";
import { useEffect, useState } from 'react';

import { Person, PersonDetales, PersonFullView } from "@/entities/Person";
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { fetchPerson } from "../../model/services/fetchPerson";
import { fetchPersonDetales } from "../../model/services/fetchPersonDetales";
import personEditStore from "../../model/store/personEditStore";

interface GetPersonEditViewProps {
    id: string
}

export const GetPersonEditView = observer((props: GetPersonEditViewProps) => {
    const {id} = props;

    const [person, setPerson] = useState<Person>();
    const [personDetales, setPersonDetales] = useState<PersonDetales>();

    useEffect( ()=> {
        fetchPerson(id);
        fetchPersonDetales(id);
    }, [id])

    const personDetalesData = personEditStore.personDetales?.case({
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    const personData = personEditStore.person?.case({
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    useEffect( ()=> {
        if (personData) setPerson(personData)
        if (personDetalesData) setPersonDetales(personDetalesData)
    }, [personData, personDetalesData])

    if (person  && personDetales) {
        return <PersonFullView person={person} />
    } else {
        return (
            <VStack gap='16' max maxHeight align="center" justify="center">
                <Loader />
            </VStack>
        )
    }
});