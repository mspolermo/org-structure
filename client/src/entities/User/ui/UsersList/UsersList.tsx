import { memo } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { CrossInsideCircle, PlusInsideCircle } from '@/shared/assets/svg-icons/status';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UsersList.module.scss'


interface Props {
    users: User[] | undefined
    onCreate: () => void
    onDelete: (value: string) => void
}

const UsersList = memo((props: Props) => {
    const { users, onCreate, onDelete } = props
    const {rootStore} = useStoreProvider();

    const isAvalableToRemove = (currentUser: User) => !(currentUser.id === rootStore.user?.id)

    return (
        <VStack gap="4" className={cls.block}>
            <HStack gap="4">
                <Text title="Пользователи" size="xl"/>
                <Button onClick={() => onCreate()} className={cls.btn}>
                    <Icon Svg={PlusInsideCircle} className={cls.icon}/>
                </Button>
            </HStack>
            <HStack gap="4">
                <Input inputVariant="clear" className={cls.input} placeholder="UserId"/>
                <Input inputVariant="clear" className={cls.input} placeholder="Email"/>
                <Input inputVariant="clear" className={cls.input} placeholder="ФИО"/>
                <Input inputVariant="clear" className={cls.input} placeholder="Роли пользователя"/>
            </HStack>
            {users && users.map((user) => (
                <HStack gap="4" key={user.id}>
                    <Input inputVariant="clear" className={cls.input} placeholder="UserId" value={user.id}/>
                    <Input inputVariant="clear" className={cls.input} placeholder="Email" value={user.email}/>
                    <Input inputVariant="clear" className={cls.input} placeholder="ФИО" value={user.name}/>
                    <Input
                        inputVariant="clear"
                        className={cls.input}
                        placeholder="Роли пользователя"
                        value={user.roles.map((role) => role.value).join(', ')}
                    />
                    { isAvalableToRemove(user) && <Button onClick={() => onDelete(user.id)} className={cls.btn}>
                        <Icon Svg={CrossInsideCircle} className={cls.icon}/>
                    </Button>
                    }
                </HStack>
            ))}
        </VStack>
    );
});

export default UsersList;