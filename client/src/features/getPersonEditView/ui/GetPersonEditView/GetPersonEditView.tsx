import { observer } from "mobx-react";
import { useEffect } from 'react';

import { PersonFullView } from "@/entities/Person";
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { fetchPersonEdit } from "../../model/services/fetchPersonEdit";
import personEditStore from "../../model/store/personEditStore";

interface GetPersonEditViewProps {
    id: string
}

export const GetPersonEditView = observer((props: GetPersonEditViewProps) => {
    const {id} = props;

    useEffect( ()=> {
        fetchPersonEdit(id);
    }, [id])

    const data = personEditStore.personEditData?.case({
        pending: () => {
            return (
                <VStack gap='16' max maxHeight align="center" justify="center">
                    <Loader />
                </VStack>
            )
        },
        rejected: () => {throw new Error()},
        fulfilled: (value) => {
            return (
                <PersonFullView person={value} />
            );
        }
    })
    return data;
});