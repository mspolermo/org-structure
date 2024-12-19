import { memo, useCallback, useState, useEffect} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './CreateOrgUnitModal.module.scss';

interface Props {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
}

const CreateOrgUnitModal = memo(({ className, onCloseModal, isOpen }: Props) => {
    const [closingStatus, setClosingStatus] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const closingHandler = useCallback(() => setClosingStatus(true), []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={classNames(cls.OpenPrintModal, {}, [className ])}
            closeStatus={closingStatus}
        >
            <VStack gap='32' justify='between' className={cls.body}>
                <Text title='Создание ОргЮнита' className={cls.heading} />

                <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
            </VStack>
        </Modal>
    );
});

export default CreateOrgUnitModal;