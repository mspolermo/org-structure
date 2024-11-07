import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import {  Demands } from '@/shared/assets/svg-icons/action';
import { getRouteMain } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './ToMainPageButton.module.scss';

interface ToMainPageButtonProps {
	className?: string;
}

export const ToMainPageButton = observer(({ className }: ToMainPageButtonProps) => {
    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();

    const clickHandler = useCallback(() => navigate(getRouteMain()), [navigate]);

    if (!rootStore.auth) return null;

    return (
        <HStack
            gap='16'
            className={classNames(cls.ToMainPageButton, {}, [className])}
            onClick={clickHandler}
        >
            
            <Icon
                Svg={Demands}
                className={cls.icon}
            />

            <Text title={'Главная страница'} size='xs' bold className={cls.title}/>

        </HStack>
    );
});
