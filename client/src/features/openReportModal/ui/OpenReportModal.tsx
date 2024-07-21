import { memo, useCallback, useState, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './OpenReportModal.module.scss';

interface OpenReportModalProps {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
}

const OpenReportModal = memo(({ className, onCloseModal, isOpen }: OpenReportModalProps) => {
    const [closingStatus, setClosingStatus] = useState(false);

    useEffect(() => {
        setClosingStatus(false);
    }, [closingStatus]);

    useEffect(() => {
        setReportText('');
    }, [isOpen]);

    // TODO добавить логику отправки репорта разработчикам
    const [reportText, setReportText] = useState('');
    const closingHandler = useCallback(() => setClosingStatus(true), []);
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={classNames(cls.ReportModal, {}, [className])}
            closeStatus={closingStatus}
        >
            <VStack gap='32' justify='between' className={cls.body}>
                <Text title='Написать разработчикам' className={cls.heading} />

                <Input
                    placeholder='Ваше сообщение'
                    isTextArea
                    className={cls.textArea}
                    value={reportText}
                    onChange={setReportText}
                />

                <HStack justify='end' gap='8' max>
                    <Button variant='outline-inverted' disabled={Boolean(!reportText)}>
                        Отправить
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted'>
                        Закрыть
                    </Button>
                </HStack>
                
            </VStack>
        </Modal>
    );
});

export default OpenReportModal;
