import { memo } from 'react';

import { UserRole } from '@/entities/User';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UserRolesList.module.scss'


interface Props {
    userRoles: UserRole[] | undefined
}

const UserRolesList = memo((props: Props) => {

    const { userRoles } = props

    return (
        <VStack gap="4" className={cls.block}>
            <Text title="Роли пользователя" size="xl"/>
            <HStack gap="4">
                <Input inputVariant="clear" disabled className={cls.input} placeholder="Название:"/>
                <Input inputVariant="clear" disabled className={cls.input} placeholder="Описание:"/>
            </HStack>
            {userRoles && userRoles.map((role) => (
                <HStack gap="4" key={role.value}>
                    <Input inputVariant="clear" disabled className={cls.input} placeholder="Название:" value={role.value}/>
                    <Input inputVariant="clear" disabled className={cls.input} placeholder="Описание:" value={role.description}/>
                </HStack>
            ))}
        </VStack>
    );
});

export default UserRolesList;