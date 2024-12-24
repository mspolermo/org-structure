import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { getRouteMain } from '@/shared/const/router';
import { Button } from "@/shared/ui/Button";
import RemoveModal from '@/shared/ui/RemoveModal/RemoveModal';
import { HStack, VStack } from "@/shared/ui/Stack";

import { PersonDetalesBlock } from './PersonDetalesBlock/PersonDetalesBlock';
import { PersonInfoBlock } from './PersonInfoBlock/PersonInfoBlock';
import { PersonServiceBlock } from './PersonServiceBlock/PersonServiceBlock';
import { deletePerson } from '../../model/services/deletePerson';
import { updatePersonWithDetales } from '../../model/services/updatePersonWithDetales';
import { Person, PersonDetales, PersonDetalesUpdateData, PersonUpdateData } from '../../model/types/person';


interface Props {
	className?: string;
    person: Person;
    personDetales: PersonDetales
    type: 'edit' | 'view'
}

export const PersonFullView = observer(({ className, person, personDetales, type }: Props) => {
    const navigate = useNavigate();
    const {rootStore} = useStoreProvider();
    const isEditableView = type === 'edit'
    
    const [isEdit, setIsEdit] = useState(false)
    const [updatedPerson, setUpdatedPerson] = useState<PersonUpdateData | null>(null)
    const [updatedPersonDetales, setUpdatedPersonDetales] = useState<PersonDetalesUpdateData | null>(null)
    const [isCancelled, setIsCanceld] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const onEditToggle = useCallback(() => setIsEdit(true), []);

    const onSaveHandler = useCallback(async () => {
        if (!updatedPerson || !updatedPersonDetales) return

        await updatePersonWithDetales(person.id, {
            person: updatedPerson,
            personDetales: updatedPersonDetales,
        })

        setIsEdit(false)
    }, [person.id, updatedPerson, updatedPersonDetales]);

    const onCancelHandler = useCallback(() => {
        setUpdatedPerson(person);
        setUpdatedPersonDetales(personDetales);
        setIsEdit(false)
        setIsCanceld(prev => !prev)
    }, [person, personDetales]);

    const deleteHandler = useCallback(async()=>{
        if (rootStore.userNavData && rootStore.auth) {
            try {
                await deletePerson(person.id)
                navigate(getRouteMain())
            } catch (e) {
                console.error("Ошибка при удалении сотрудника:", e);
                if (e instanceof Error) {
                    throw new Error(e.message)
                } else {
                    throw new Error("Неизвестная ошибка")
                }
            } 
        }
    }, [navigate, person.id, rootStore.auth, rootStore.userNavData])

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
                {isEditableView &&<Button onClick={() => setIsDeleteModalOpen(true)}>
                    Удалить
                </Button>}
                <Button onClick={onReturnHandler}>
                    Назад
                </Button>
            </HStack>

            <RemoveModal
                onDelete={deleteHandler}
                isOpen={isDeleteModalOpen}
                onCloseModal={() => setIsDeleteModalOpen(false)}
            />
        </VStack>
    );
});
