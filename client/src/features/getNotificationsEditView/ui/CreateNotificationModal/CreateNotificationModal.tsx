import { memo, useCallback, useState, useEffect} from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { createNotification, NotificationCreateCard, NotificationCreateData } from '@/entities/Notification';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

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
    const [notificationData, setNotificationData] = useState<NotificationCreateData>()
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const createHandler = useCallback(async () => {
        if (!rootStore.auth || !notificationData) return

        setIsLoading(true);
    
        try {
            await createNotification(rootStore.auth, {...notificationData} );

            setError(null);
            setClosingStatus(true);
            setResetFlag((prev) => !prev);
            await updateNotificationsList();
            onCloseModal();
        } catch (e) {
            console.error('Ошибка при создании объявления:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [rootStore.auth, notificationData, updateNotificationsList, onCloseModal]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true);
        setResetFlag((prev) => !prev);
    }, []);

    useEffect(() => {
        if (notificationData?.title === '' || notificationData?.text === '') {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[notificationData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание объявления на главной странице' size="xl"/>

                <NotificationCreateCard resetFlag={resetFlag} setNotificationData={setNotificationData}/>

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

export default CreateNotificationModal;