import { memo, useCallback, useState, useEffect} from 'react';

import { assignUserRole, User, UserRole } from '@/entities/User'
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { ListBox } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { gerUserRolesOptions } from '../../model/lib/getUserRolesOptions';

interface Props {
	className?: string;
    updateUsersList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
    userId: string
    usersList: User[] | undefined
    availableRoles: UserRole[] | undefined
}

const ChangeUserRoleModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, updateUsersList, userId, usersList, availableRoles } = props

    const currentUser = usersList?.find((user) => user.id === userId)
    const listBoxRoles = gerUserRolesOptions(availableRoles, currentUser?.roles[0] )

    const [closingStatus, setClosingStatus] = useState(false);
    const [chosenRoleValue, setChosenRoleValue] = useState<string>(currentUser?.roles[0].value ?? '')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        if (currentUser) {
            setChosenRoleValue(currentUser.roles[0].value)
        }
    }, [currentUser])

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const changeUserRoleHandler = useCallback(async () => {
        if(!chosenRoleValue) return
        setIsLoading(true);
    
        try {
            await assignUserRole(userId, chosenRoleValue)
            await updateUsersList()
            setError(null);
            setClosingStatus(true);
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [chosenRoleValue, updateUsersList, userId]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
    }, []);

    useEffect(() => {
        if (chosenRoleValue === currentUser?.roles[0].value) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[chosenRoleValue, currentUser?.roles])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Редактирование роли пользователя' size="xl"/>

                <HStack gap="4">
                    <Text title="Выберите новую роль:" thin />

                    <ListBox
                        items={listBoxRoles}
                        value={chosenRoleValue}
                        defaultValue={currentUser?.roles[0].value ?? ''}
                        onChange={setChosenRoleValue}
                    />

                </HStack>

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={changeUserRoleHandler} variant='outline-inverted' disabled={isLoading || isButtonDisabled}>
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted'>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default ChangeUserRoleModal;