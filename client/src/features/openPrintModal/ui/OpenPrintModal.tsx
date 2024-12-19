import { memo, useCallback, useState, useEffect} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './OpenPrintModal.module.scss';

interface OpenPrintModalProps {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
}

const OpenPrintModal = memo(({ className, onCloseModal, isOpen }: OpenPrintModalProps) => {
    const [closingStatus, setClosingStatus] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    // TODO - изменить ссылки на реальные, если сделаю бек

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
                <Text title='Скачать версию для печати' className={cls.heading} />

                <VStack gap='8'>
                    <AppLink to={''} variant='blue'>Полная версия</AppLink>
                    <AppLink to={''} variant='blue'>Версия для внешних организаций</AppLink>
                    <AppLink to={''} variant='blue'>Сравнительный обзор телефонного справочника</AppLink>
                </VStack>

                <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
            </VStack>
        </Modal>
    );
});

export default OpenPrintModal;