import { observer } from "mobx-react";

import { PersonFullView, PersonStore } from "@/entities/Person"
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { usePersonData } from "../model/usePersonData";

interface GetPersonEditViewProps {
    id: string
    personStore: PersonStore
}

export const GetPersonEditView = observer((props: GetPersonEditViewProps) => {
    const {id, personStore} = props;
    
    const { person, personDetales } = usePersonData(id, personStore);

    if (!person  || !personDetales) {
        return (
            <VStack gap='16' max maxHeight align="center" justify="center">
                <Loader />
            </VStack>
        )
    }

    return <PersonFullView person={person} personDetales={personDetales}/>

});