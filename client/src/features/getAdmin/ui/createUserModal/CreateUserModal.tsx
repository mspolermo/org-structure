import { memo, useCallback, useState, useEffect} from 'react';

import { createUser, UserCreateData, UserCreationCard } from '@/entities/User';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
	className?: string;
    updateUsersList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
}

const CreateUserModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, updateUsersList } = props
    const [userData, setUserData] = useState<UserCreateData>()
    const [closingStatus, setClosingStatus] = useState(false);
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const createHandler = useCallback(async () => {
        if(!userData) return
        setIsLoading(true);
    
        try {
            await createUser({...userData});
            await updateUsersList();
            setError(null);
            setClosingStatus(true);
            setResetFlag((prev) => !prev)
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [updateUsersList, userData]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
        setResetFlag((prev) => !prev)
    }, []);

    useEffect(() => {
        if (userData?.email === '' || userData?.password === '') {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[userData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание пользователя' size="xl"/>

                <UserCreationCard resetFlag={resetFlag} setUserData={setUserData}/>

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

export default CreateUserModal;