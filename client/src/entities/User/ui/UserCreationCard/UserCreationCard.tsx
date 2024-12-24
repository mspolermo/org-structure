import { memo, useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UserCreationCard.module.scss';
import { UserCreateData } from '../../model/types/user';


interface Props {
    className?: string;
    resetFlag: boolean
    setUserData: React.Dispatch<React.SetStateAction<UserCreateData | undefined>>
}

export const UserCreationCard = memo((props: Props) => {
    const { className, setUserData, resetFlag } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const resetToDefault = useCallback( () => {
        setEmail('')
        setPassword('')
    }, []);

    useEffect(() => {
        setUserData ({ email, password})
    }, [email, password, setUserData])

    useEffect(() => {
        resetToDefault()
    }, [resetFlag, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
            <VStack gap="16" max>
                <HStack gap="4" max>
                    <Text title="Email:" thin className={cls.text}/>
                    <Input
                        inputVariant="bordered"
                        placeholder="Почтовый адрес сотрудника"
                        value={email}
                        onChange={setEmail}
                    />
                </HStack>
                <HStack gap="4" max>
                    <Text title="Пароль:" thin withoutWrap className={cls.text}/>
                    <Input
                        inputVariant="bordered"
                        placeholder="Новый пароль пользователя"
                        value={password}
                        onChange={setPassword}
                    />
                </HStack>
            </VStack>
        </Card>
    )}
);
