import { memo, useCallback, useEffect, useState } from 'react';

import { deleteNotification, fetchNotifications, NotificationCard, NotificationType } from '@/entities/Notification';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Loader } from '@/shared/ui/Loader';
import { modalNotificationActionType, modalNotificationType } from '../model/types/types';
import { Button } from '@/shared/ui/Button';
import CreateNotificationModal from './CreateNotificationModal/CreateNotificationModal';
import EditNotificationModal from './EditNotificationModal/EditNotificationModal';

const GetNotificationsEditView = memo(() => {
    const { rootStore } = useStoreProvider();
    const [notifications, setNotifications] = useState<NotificationType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const [isCreateNotificationModal, setIsCreateNotificationModal] = useState(false);
    const [isEditNotificationModal, setIsEditNotificationModal] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<NotificationType>();

    const onModalAction = useCallback((type: modalNotificationType, action: modalNotificationActionType) => {
        const flag = action == 'open' ? true : false;

        switch (type) {
        case 'createNotification':
            setIsCreateNotificationModal(flag)
            break
        case 'editNotification':
            setIsEditNotificationModal(flag);
            break
        }
    }, []);

    const fetchNotificattionsList = useCallback(async () => {

        if (rootStore.userNavData && rootStore.auth) {
            try {
                setIsLoading(true)
                const response = await fetchNotifications(rootStore.auth)
                setNotifications(response)
            } catch (e) {
                console.error("Ошибка при загрузке объявлений:", e);
                setError("Не удалось загрузить объявление");
            } finally {
                setIsLoading(false)
            }
        }
    }, [])

    const editHandler = useCallback((current: NotificationType)=>{
        setCurrentNotification(current)
        setIsEditNotificationModal(true)
    }, [])

    const deleteHandler = useCallback(async(id: string)=>{
        if (rootStore.userNavData && rootStore.auth) {
            try {
                setIsLoading(true)
                await deleteNotification(rootStore.auth, id)
                await fetchNotificattionsList()
            } catch (e) {
                console.error("Ошибка при загрузке объявлений:", e);
                setError("Не удалось удалить объявление");
            } finally {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        fetchNotificattionsList();
    }, [fetchNotificattionsList]);

    if (isLoading) return (
        <VStack gap='16' max maxHeight align="center" justify="center">
            <Loader />
        </VStack>
    )

    if (error) return <Text text={error} />

    return (
        <VStack gap='32' max>

            <Button onClick={() => onModalAction('createNotification', 'open')} >
                Создать объявление
            </Button>

            {notifications.length === 0 && <Text text="Объявления отстутствуют" />}

            {notifications.length > 0 && notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} onEdit={editHandler} onDelete={deleteHandler}/>
            ))}

            <CreateNotificationModal
                isOpen={isCreateNotificationModal}
                onCloseModal={() => onModalAction('createNotification', 'close')}
                updateNotificationsList={fetchNotificattionsList}
            />

            <EditNotificationModal
                notification={currentNotification}
                isOpen={isEditNotificationModal}
                onCloseModal={() => onModalAction('editNotification', 'close')}
                updateNotificationsList={fetchNotificattionsList}
            />

        </VStack>
    );
});

export default GetNotificationsEditView;