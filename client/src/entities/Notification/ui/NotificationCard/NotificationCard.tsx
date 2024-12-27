import { memo, useCallback, useState } from 'react';

import { Cross, Pencil } from '@/shared/assets/svg-icons/button';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import RemoveModal from '@/shared/ui/RemoveModal/RemoveModal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './NotificationCard.module.scss';
import { NotificationType } from '../../model/types/notification';


interface Props {
    className?: string;
    notification: NotificationType;
    onEdit: (current: NotificationType) => void
    onDelete: (id: string) => Promise<void>
    isEditable: boolean
}

export const NotificationCard = memo((props: Props) => {
    const { className, notification, onEdit, onDelete, isEditable } = props
    const { title, text, updatedAt } = notification

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const deleteHandler = useCallback(async()=>{
        try {
            await onDelete(notification.id)
        } catch (e) {
            console.error("Ошибка при удалении объявления:", e);
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                throw new Error("Неизвестная ошибка")
            }
        } 
    }, [notification.id, onDelete])

    return (
        <Card padding={'24'} className={className} max>
            <HStack gap='16' justify='between' align='center'>
                <Text title={title} bold size='l'/>
                <Text align='right' text={formatDate(updatedAt.toString())} size='s'/>
            </HStack>

            <hr className={cls.divider}></hr>

            <Text text={text}/>

            {isEditable && (
                <HStack max gap='8' align='start'>
                    <VStack max gap='8'>
                        <HStack max gap='8' justify='end'>
                            <Tooltip text='Редактировать'>
                                <Icon
                                    borderType='soft'
                                    Svg={Pencil}
                                    clickable
                                    onClick={()=>onEdit(notification)}
                                />
                            </Tooltip>
                            <Tooltip text='Удалить'>
                                <Icon
                                    Svg={Cross}
                                    borderType='soft'
                                    stroke={'var(--icon-color)'}
                                    clickable
                                    onClick={() => setIsDeleteModalOpen(true)}
                                />
                            </Tooltip> 
                        </HStack>
                    </VStack>
                </HStack>
            )}

            {isEditable && (
                <RemoveModal
                    onDelete={deleteHandler}
                    isOpen={isDeleteModalOpen}
                    onCloseModal={() => setIsDeleteModalOpen(false)}
                />
            )}

        </Card>
    )}
);
