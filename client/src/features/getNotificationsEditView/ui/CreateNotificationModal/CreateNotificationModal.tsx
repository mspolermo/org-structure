import { memo, useCallback, useState, useEffect} from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { createNotification, NotificationCreateData } from '@/entities/Notification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './CreateNotificationModal.module.scss';

interface Props {
	className?: string;
    updateNotificationsList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
}

const CreateNotificationModal = memo((props: Props) => {
    const { rootStore } = useStoreProvider();
    const { className, onCloseModal, isOpen, updateNotificationsList } = props
    const [closingStatus, setClosingStatus] = useState(false);

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const resetToDefault = useCallback( () => {
        setTitle('')
        setText('')
    }, []);

    const createHandler = useCallback(async () => {
        if (!rootStore.auth) return

        const data: NotificationCreateData = {title, text };
    
        setIsLoading(true);
    
        try {
            await createNotification(rootStore.auth, {...data} );

            setError(null);
            setClosingStatus(true);
            resetToDefault();
            await updateNotificationsList();
            onCloseModal();
        } catch (e) {
            console.error('Ошибка при создании объявления:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [rootStore.auth, title, text, resetToDefault, updateNotificationsList, onCloseModal]);

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
            className={classNames(cls.CreateNotificationModal, {}, [className ])}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание объявления на главной странице' size="xl"/>

                <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
                    <VStack gap="16" max>
                        <HStack gap="4" max>
                            <Text title="Заголовок:" thin className={cls.text}/>
                            <Input
                                inputVariant="bordered"
                                placeholder="Заголовок объявления"
                                value={title}
                                onChange={setTitle}
                            />
                        </HStack>
                        <HStack gap="4" max align='start'>
                            <Text title="Тело объявления:" thin className={classNames(cls.text, {}, [cls.additionalInfo])}/>
                            <Input
                                isTextArea
                                textareaVaraint="big"
                                className={cls.textarea}
                                placeholder="Тело объявления"
                                value={text}
                                onChange={setText}
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

export default CreateNotificationModal;