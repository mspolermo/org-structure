import { memo } from 'react';

import { UserRole } from '@/entities/User';
import { CrossInsideCircle, PlusInsideCircle } from '@/shared/assets/svg-icons/status';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UserRolesList.module.scss'


interface Props {
    userRoles: UserRole[] | undefined
    onCreate: () => void
    onDelete: (value: string) => void
}

const UserRolesList = memo((props: Props) => {

    const { userRoles, onCreate, onDelete } = props

    const isAvalableToRemove = (role: UserRole) => !(role.value === 'USER' || role.value === 'ADMIN')

    return (
        <VStack gap="4" className={cls.block}>

            <HStack gap="4">
                <Text title="Роли пользователя" size="xl"/>
                <Button onClick={() => onCreate()} className={cls.btn}>
                    <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                </Button>
            </HStack>
            <HStack gap="4">
                <Input inputVariant="clear" disabled className={cls.input} placeholder="Название:"/>
                <Input inputVariant="clear" disabled className={cls.input} placeholder="Описание:"/>
            </HStack>
            {userRoles && userRoles.map((role) => (
                <HStack gap="4" key={role.value}>
                    <Input inputVariant="clear" disabled className={cls.input} placeholder="Название:" value={role.value}/>
                    <Input inputVariant="clear" disabled className={cls.input} placeholder="Описание:" value={role.description}/>
                    { isAvalableToRemove(role) && <Button onClick={() => onDelete(role.value)} className={cls.btn}>
                        <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                    </Button>
                    }
                </HStack>
            ))}
        </VStack>
    );
});

export default UserRolesList;