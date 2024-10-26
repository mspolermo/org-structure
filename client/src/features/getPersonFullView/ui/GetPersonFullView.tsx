import { observer } from "mobx-react";

import { PersonFullView, PersonStore } from "@/entities/Person"
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { usePersonData } from "../model/usePersonData";

interface Props {
    id: string
    personStore: PersonStore
    type: 'edit' | 'view'
}

export const GetPersonFullView = observer((props: Props) => {
    const {id, personStore, type} = props;
    
    const { person, personDetales } = usePersonData(id, personStore);

    if (!person  || !personDetales) {
        return (
            <VStack gap='16' max maxHeight align="center" justify="center">
                <Loader />
            </VStack>
        )
    }

    return <PersonFullView person={person} personDetales={personDetales} type={type} />

});