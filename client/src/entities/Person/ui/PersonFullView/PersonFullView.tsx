import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";

import { Button } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";

import { Person, PersonDetales, PersonDetalesUpdateData, PersonUpdateData } from '../../model/types/person';
import { updatePersonWithDetales } from '../../model/services/updatePersonWithDetales';
import { PersonServiceBlock } from './PersonServiceBlock/PersonServiceBlock';
import { PersonDetalesBlock } from './PersonDetalesBlock/PersonDetalesBlock';
import { PersonInfoBlock } from './PersonInfoBlock/PersonInfoBlock';
import { useNavigate } from 'react-router-dom';

interface Props {
	className?: string;
    person: Person;
    personDetales: PersonDetales
    type: 'edit' | 'view'
}

export const PersonFullView = observer(({ className, person, personDetales, type }: Props) => {
    const navigate = useNavigate();
    const isEditableView = type === 'edit'
    
    const [isEdit, setIsEdit] = useState(false)
    const [updatedPerson, setUpdatedPerson] = useState<PersonUpdateData | null>(null)
    const [updatedPersonDetales, setUpdatedPersonDetales] = useState<PersonDetalesUpdateData | null>(null)
    const [isCancelled, setIsCanceld] = useState(false)

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const onEditToggle = useCallback(() => setIsEdit(true), []);

    const onSaveHandler = useCallback(async () => {
        if (!updatedPerson || !updatedPersonDetales) return

        await updatePersonWithDetales(person.id, {
            person: updatedPerson,
            personDetales: updatedPersonDetales,
        })

        setIsEdit(false)
    }, [updatedPerson, updatedPersonDetales]);

    const onCancelHandler = useCallback(() => {
        setUpdatedPerson(person);
        setUpdatedPersonDetales(personDetales);
        setIsEdit(false)
        setIsCanceld(prev => !prev)
    }, []);

    return (
        <VStack gap="16" max className={className}>

            <PersonServiceBlock person={person}/>

            <PersonInfoBlock
                person={person}
                isCancelled={isCancelled}
                setUpdatedPerson={setUpdatedPerson}
                isEdit={isEdit}
            />

            <PersonDetalesBlock
                personDetales={personDetales}
                isCancelled={isCancelled}
                setUpdatedPersonDetales={setUpdatedPersonDetales}
                isEdit={isEdit}
            />

            <HStack justify="end" align="center" gap="16" max>
                {isEditableView && isEdit && <Button onClick={onSaveHandler}>Сохранить</Button>}
                {isEditableView && isEdit && <Button onClick={onCancelHandler}>
                    Отмена
                </Button>}
                {isEditableView && !isEdit && <Button onClick={onEditToggle}>
                    Редактировать
                </Button>}
                <Button onClick={onReturnHandler}>
                    Назад
                </Button>
            </HStack>
        </VStack>
    );
});
