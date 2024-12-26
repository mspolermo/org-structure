import { memo, useCallback, useState, useEffect} from 'react';

import { createUserRole, UserRole, UserRoleCreationCard } from '@/entities/User';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
	className?: string;
    updateRolesList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
}

const CreateRoleModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, updateRolesList } = props
    const [userRoleData, setUserRoleData] = useState<UserRole>()
    const [closingStatus, setClosingStatus] = useState(false);
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const createHandler = useCallback(async () => {
        if(!userRoleData) return
        setIsLoading(true);
    
        try {
            await createUserRole({...userRoleData});
            await updateRolesList();
            setError(null);
            setClosingStatus(true);
            setResetFlag((prev) => !prev)
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [updateRolesList, userRoleData]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
        setResetFlag((prev) => !prev)
    }, []);

    useEffect(() => {
        if (userRoleData?.value === '' || userRoleData?.description === '') {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[userRoleData])

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

                <UserRoleCreationCard resetFlag={resetFlag} setRoleData={setUserRoleData}/>

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

export default CreateRoleModal;