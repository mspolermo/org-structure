import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import {  CalendarToday } from '@/shared/assets/svg-icons/action';
import { getRouteAdmin } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './ToAdminPageButton.module.scss';

interface ToMainPageButtonProps {
	className?: string;
}

export const ToAdminPageButton = observer(({ className }: ToMainPageButtonProps) => {
    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();

    const clickHandler = useCallback(() => navigate(getRouteAdmin()), [navigate]);

    if (!rootStore.auth) return null;

    return (
        <HStack
            gap='16'
            className={classNames(cls.ToMainPageButton, {}, [className])}
            onClick={clickHandler}
        >
            
            <Icon
                Svg={CalendarToday}
                className={cls.icon}
            />

            <Text title={'Администрирование'} size='xs' bold className={cls.title}/>

        </HStack>
    );
});
