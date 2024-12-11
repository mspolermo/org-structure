import { observer } from 'mobx-react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import {  User as UserSvg} from '@/shared/assets/svg-icons/action';
import { getRouteEditPerson } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './UserButton.module.scss';

interface UserButtonProps {
	className?: string;
}

export const UserButton = observer(({ className }: UserButtonProps) => {
    const [userData, setUserData] = useState<User>(); 
    const { rootStore } = useStoreProvider();
    const navigate = useNavigate();

    useEffect(() => {
        // ожидание окончания загрузки данных fetchUserNav
        const data = rootStore.user;
        if ( data && data !== undefined) {
            setUserData(data)
        }
    }, [rootStore, rootStore.userNavData?.state])

    const clickHandler = useCallback(() => {
        if (userData?.id) navigate(getRouteEditPerson(userData?.id)
        )}, [navigate, userData?.id]);

    if (!rootStore.auth) return null;
    return (
        <HStack
            gap='16'
            className={classNames(cls.UserButton, {}, [className])}
            onClick={clickHandler}
        >
            
            <Icon
                Svg={UserSvg}
                className={cls.icon}
            />

            <Text title={userData?.name} size='xs' bold className={cls.title}/>

        </HStack>
    );
});
