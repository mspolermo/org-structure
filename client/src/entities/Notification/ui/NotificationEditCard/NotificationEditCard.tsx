import { memo, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './NotificationEditCard.module.scss';
import { NotificationType, NotificationUpdateData } from '../../model/types/notification';


interface Props {
    className?: string;
    notification: NotificationType | undefined;
    resetFlag: boolean
    setNotificationData: React.Dispatch<React.SetStateAction<NotificationUpdateData | undefined>>
}

export const NotificationEditCard = memo((props: Props) => {
    const { className, setNotificationData, notification, resetFlag } = props

    const [title, setTitle] = useState(notification?.title || '')
    const [text, setText] = useState(notification?.text || '')

    useEffect(() => {
        setNotificationData ({ id: notification?.id ?? '',title, text})
    }, [notification?.id, setNotificationData, text, title])

    useEffect(() => {
        setTitle(notification?.title || '')
        setText(notification?.text || '')
    }, [notification?.text, notification?.title, resetFlag])

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
