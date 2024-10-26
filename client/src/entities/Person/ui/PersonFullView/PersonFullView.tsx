import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";

import cls from './PersonFullView.module.scss';
import { Person, PersonDetales, PersonDetalesUpdateData, PersonUpdateData } from '../../model/types/person';
import { updatePersonWithDetales } from '../../model/services/updatePersonWithDetales';
import { PersonServiceBlock } from './PersonServiceBlock/PersonServiceBlock';
import { PersonDetalesBlock } from './PersonDetalesBlock/PersonDetalesBlock';
import { PersonInfoBlock } from './PersonInfoBlock/PersonInfoBlock';

interface PersonFullViewProps {
	className?: string;
    person: Person;
    personDetales: PersonDetales
}

export const PersonFullView = observer(({ className, person, personDetales }: PersonFullViewProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const [updatedPerson, setUpdatedPerson] = useState<PersonUpdateData | null>(null)
    const [updatedPersonDetales, setUpdatedPersonDetales] = useState<PersonDetalesUpdateData | null>(null)
    const [isCancelled, setIsCanceld] = useState(false)

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
        <VStack gap="16" max className={classNames(cls.PersonFullView, {}, [className])}>

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
                {isEdit && <Button onClick={onSaveHandler}>Сохранить</Button>}
                {isEdit && <Button onClick={onCancelHandler}>
                    Отмена
                </Button>}
                {!isEdit && <Button onClick={onEditToggle}>
                    Редактировать
                </Button>}
            </HStack>
        </VStack>
    );
});
