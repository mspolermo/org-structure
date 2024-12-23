import { memo, useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './NotificationCreateCard.module.scss';
import { NotificationCreateData } from '../../model/types/notification';


interface Props {
    className?: string;
    resetFlag: boolean
    setNotificationData: React.Dispatch<React.SetStateAction<NotificationCreateData | undefined>>
}

export const NotificationCreateCard = memo((props: Props) => {
    const { className, setNotificationData, resetFlag } = props

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const resetToDefault = useCallback( () => {
        setTitle('')
        setText('')
    }, []);

    useEffect(() => {
        setNotificationData ({ title, text})
    }, [setNotificationData, text, title])

    useEffect(() => {
        resetToDefault()
    }, [resetFlag, resetToDefault])

    return (
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
    )}
);
