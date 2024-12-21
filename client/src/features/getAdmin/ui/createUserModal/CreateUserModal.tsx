import { memo, useCallback, useState, useEffect} from 'react';

import { createUser, UserCreateData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './CreateUserModal.module.scss';

interface Props {
	className?: string;
    updateUsersList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
}

const CreateUserModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, updateUsersList } = props
    const [closingStatus, setClosingStatus] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const resetToDefault = useCallback( () => {
        setEmail('')
        setPassword('')
    }, []);

    const createHandler = useCallback(async () => {
        const data: UserCreateData = {
            email,
            password,
        };
    
        setIsLoading(true);
    
        try {
            await createUser({...data});
            await updateUsersList();
            setError(null);
            setClosingStatus(true);
            resetToDefault();
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [email, password, resetToDefault, updateUsersList]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true);
        resetToDefault();
    }, [resetToDefault]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={classNames(cls.OpenPrintModal, {}, [className ])}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание пользователя' size="xl"/>

                <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
                    <VStack gap="16" max>
                        <HStack gap="4" max>
                            <Text title="Email:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Почтовый адрес сотрудника"
                                value={email}
                                onChange={setEmail}
                            />
                        </HStack>
                        <HStack gap="4" max>
                            <Text title="Пароль:" thin withoutWrap className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Новый пароль пользователя"
                                value={password}
                                onChange={setPassword}
                            />
                        </HStack>
                    </VStack>
                </Card>

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button
                        onClick={createHandler}
                        variant='outline-inverted'
                        className={cls.btn}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Создание...' : 'Создать'}
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default CreateUserModal;