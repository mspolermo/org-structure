import { memo, useCallback, useState, useEffect} from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { NotificationType, NotificationUpdateData } from '@/entities/Notification';
import { editNotification } from '@/entities/Notification/model/services/editNotification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './EditNotificationModal.module.scss';

interface Props {
	className?: string;
    notification: NotificationType | undefined;
    updateNotificationsList: () => Promise<void>
    isOpen: boolean;
    onCloseModal: () => void;
}

const EditNotificationModal = memo((props: Props) => {
    const { rootStore } = useStoreProvider();
    const { className, onCloseModal, isOpen, updateNotificationsList, notification } = props

    const [closingStatus, setClosingStatus] = useState(false);

    const [title, setTitle] = useState(notification?.title || '')
    const [text, setText] = useState(notification?.text || '')

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    useEffect(() => {
        setTitle(notification?.title || '')
        setText(notification?.text || '')
    }, [notification]);


    const resetToDefault = useCallback( () => {
        setTitle('')
        setText('')
    }, []);

    const EditHandler = useCallback(async () => {
        if (!rootStore.auth) return

        const data: NotificationUpdateData = {title, text, id: notification?.id || '' };
    
        setIsLoading(true);
    
        try {
            await editNotification(rootStore.auth, {...data} );

            setError(null);
            setClosingStatus(true);
            resetToDefault();
            await updateNotificationsList();
            onCloseModal();
        } catch (e) {
            console.error('Ошибка при редактировании объявления:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [rootStore.auth, title, text, notification?.id, resetToDefault, updateNotificationsList, onCloseModal]);

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

                <Text title='Редактирования объявления' size="xl"/>

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
                        onClick={EditHandler}
                        variant='outline-inverted'
                        className={cls.btn}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default EditNotificationModal;