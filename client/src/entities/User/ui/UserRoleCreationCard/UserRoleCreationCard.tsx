

import { memo, useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UserRoleCreationCard.module.scss';
import { UserRole } from '../../model/types/user';


interface Props {
    className?: string;
    resetFlag: boolean
    setRoleData: React.Dispatch<React.SetStateAction<UserRole | undefined>>
}

export const UserRoleCreationCard = memo((props: Props) => {
    const { className, setRoleData, resetFlag } = props

    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    const resetToDefault = useCallback( () => {
        setValue('')
        setDescription('')
    }, []);

    useEffect(() => {
        setRoleData ({ value, description})
    }, [value, description, setRoleData])

    useEffect(() => {
        resetToDefault()
    }, [resetFlag, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
            <VStack gap="16" max>
                <HStack gap="4" max>
                    <Text title="Роль пользователя:" thin className={cls.text}/>
                    <Input
                        inputVariant="bordered"
                        placeholder="Уникальное значение роли пользователя"
                        value={value}
                        onChange={setValue}
                    />
                </HStack>
                <HStack gap="4" max>
                    <Text title="Описание:" thin withoutWrap className={cls.text}/>
                    <Input
                        inputVariant="bordered"
                        placeholder="Описание роли"
                        value={description}
                        onChange={setDescription}
                    />
                </HStack>
            </VStack>
        </Card>
    )}
);