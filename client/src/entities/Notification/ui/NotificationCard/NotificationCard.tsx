import { memo } from 'react';

import { Cross, Pencil } from '@/shared/assets/svg-icons/button';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
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
}

export const NotificationCard = memo((props: Props) => {
    const { className, notification, onEdit, onDelete } = props
    const { title, text, updatedAt } = notification

    return (
        <Card padding={'24'} className={className} max>
            <HStack gap='16' justify='between' align='center'>
                <Text title={title} bold size='l'/>
                <Text align='right' text={formatDate(updatedAt.toString())} size='s'/>
            </HStack>

            <hr className={cls.divider}></hr>

            <Text text={text}/>

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
                        <Tooltip text='В избранное'>
                            <Icon
                                Svg={Cross}
                                borderType='soft'
                                stroke={'var(--icon-color)'}
                                clickable
                                onClick={() => onDelete(notification.id)}
                            />
                        </Tooltip> 
                    </HStack>
                </VStack>
            </HStack>

        </Card>
    )}
);
