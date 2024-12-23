import { memo, useCallback, useState, useEffect} from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { NotificationEditCard, NotificationType, NotificationUpdateData } from '@/entities/Notification';
import { editNotification } from '@/entities/Notification/model/services/editNotification';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

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
    const [notificationData, setNotificationData] = useState<NotificationUpdateData>()
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    useEffect(() => {
        if (notification) {
            setNotificationData({
                title: notification.title || '',
                text: notification.text || '',
                id: notification.id || '',
            });
        }
    }, [notification]);

    const editHandler = useCallback(async () => {
        if (!rootStore.auth || !notificationData) return
    
        setIsLoading(true);
    
        try {
            await editNotification(rootStore.auth, {...notificationData} );

            setError(null);
            setClosingStatus(true);
            await updateNotificationsList();
            onCloseModal();
        } catch (e) {
            console.error('Ошибка при редактировании объявления:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [rootStore.auth, notificationData, updateNotificationsList, onCloseModal]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true);
    }, []);

    const resetHandler = useCallback(() => {
        if (notification) {
            setNotificationData({
                title: notification.title || '',
                text: notification.text || '',
                id: notification.id || '',
            });
            setResetFlag((prev) => !prev)
        }
    }, [notification]);

    useEffect(() => {
        if (notificationData?.title === notification?.title && notificationData?.text === notification?.text) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[notification?.text, notification?.title, notificationData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Редактирования объявления' size="xl"/>

                <NotificationEditCard
                    resetFlag={resetFlag}
                    notification={notification}
                    setNotificationData={setNotificationData}
                />

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button
                        onClick={editHandler}
                        variant='outline-inverted'
                        disabled={isLoading || isButtonDisabled}
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button
                        onClick={resetHandler}
                        variant='outline-inverted'
                        disabled={isLoading || isButtonDisabled}
                    >
                        Отменить изменения
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted'>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default EditNotificationModal;