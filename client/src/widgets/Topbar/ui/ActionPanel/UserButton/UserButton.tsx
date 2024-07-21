import { observer } from 'mobx-react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import {  User } from '@/shared/assets/svg-icons/action';
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
    const [userName, setUserName] = useState('NONE'); 
    const { rootStore } = useStoreProvider();
    const navigate = useNavigate();

    useEffect(() => {
        // ожидание окончания загрузки данных fetchUserNav
        const data = rootStore.user?.shortName;
        if ( data && data !== undefined) {
            setUserName(data)
        }
    }, [rootStore, rootStore.userNavData?.state])

    const clickHandler = useCallback(() => navigate(getRouteEditPerson('unexisted')), [navigate]);

    if (!rootStore.auth) return null;
    return (
        <HStack
            gap='16'
            className={classNames(cls.UserButton, {}, [className])}
            onClick={clickHandler}
        >
            
            <Icon
                Svg={User}
                className={cls.icon}
            />

            <Text title={userName} size='xs' bold className={cls.title}/>

        </HStack>
    );
});
