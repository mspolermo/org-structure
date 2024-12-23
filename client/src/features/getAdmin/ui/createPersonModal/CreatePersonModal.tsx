import { memo, useCallback, useState, useEffect} from 'react';

import { createPerson, PersonCreateData } from '@/entities/Person';
import { PersonCreationCard } from '@/entities/Person';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';


interface Props {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
    orgUnitsList: ListBoxItem<string>[]
}

const CreatePersonModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, orgUnitsList } = props

    const [personData, setPersonData] = useState<PersonCreateData>()
    const [closingStatus, setClosingStatus] = useState(false);
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const createHandler = useCallback(async () => {
        if (!personData) return

        try {
            await createPerson({...personData})
            setClosingStatus(true)
            setResetFlag((prev) => !prev)
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [personData]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
        setResetFlag((prev) => !prev)
    }, []);

    useEffect(() => {
        const isDisabled = personData?.name === ''
            || personData?.email === '' 
            || personData?.location === '' 
            || personData?.birthday === null 
            || personData?.employmentDate === null 
            || personData?.orgUnitId === ''

        if (isDisabled) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[personData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание сотрудника' size="xl"/>

                <PersonCreationCard orgUnitsList={orgUnitsList} resetFlag={resetFlag} setPersonData={setPersonData}/>

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={createHandler} variant='outline-inverted' disabled={isLoading || isButtonDisabled}>
                        {isLoading ? 'Создание...' : 'Создать'}
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted'>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default CreatePersonModal;