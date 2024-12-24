import { memo, useCallback, useState, useEffect } from 'react';

import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './RemoveModal.module.scss';

interface Props {
    className?: string;
    onDelete: () => Promise<void>;
    isOpen: boolean;
    onCloseModal: () => void;
}

const RemoveModal = memo((props: Props) => {
    const { className, onCloseModal, isOpen, onDelete } = props;

    const [closingStatus, setClosingStatus] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setError(null);
        setClosingStatus(false);
    }, [isOpen]);

    const deleteHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await onDelete();
            alert('Удаление успешно');
            setClosingStatus(true);
        } catch (e) {
            if (e instanceof Error) {
                setError(`Ошибка: ${e.message}`);
            } else {
                setError("Неизвестная ошибка");
            }
            setClosingStatus(false);
        } finally {
            setIsLoading(false);
        }
    }, [onDelete]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true);
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap="24" justify="between">
                <Text title="Подтверждение удаления" size="xl" className={cls.text} />

                {error && <Text title={error} variant="error" />}

                <HStack justify="end" align="center" gap="16" max>
                    <Button onClick={deleteHandler} variant="outline-inverted" disabled={isLoading}>
                        {isLoading ? 'Удаление...' : 'Удалить'}
                    </Button>
                    <Button onClick={closingHandler} variant="outline-inverted">
                        Закрыть
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default RemoveModal;
