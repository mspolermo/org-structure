import { observer } from "mobx-react";
import { useMemo } from 'react';

import { BugButton } from "@/app/providers/ErrorBoundary";
import { useStoreProvider } from "@/app/providers/StoreProvider";
import { Person } from "@/shared/assets/svg-icons/action";
import {
    getRouteAbout,
    getRouteDepartment,
    getRouteEditPerson,
    getRouteFavorites,
    getRouteForbidden,
    getRouteMain,
    getRouteNotFound,
    getRouteSettings,
    getRouteSearch,
    getRouteEditOrgUnit
} from "@/shared/const/router";
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from "@/shared/ui/AppLink";
import { Icon } from '@/shared/ui/Icon';
import { Dropdown } from "@/shared/ui/Popups";
import { HStack } from "@/shared/ui/Stack";

import cls from './DevPanel.module.scss';

export const DevPanel = observer(() => {
    const { rootStore } = useStoreProvider();
    const isOpen = rootStore.devMode;

    const itemsForDropDown = useMemo(() => [

        {
            content: rootStore.auth ? 'Выйти' : 'Войти',
            onClick: () => rootStore.updateAuth(!rootStore.auth),
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [rootStore.auth]);

    return (
        <HStack gap="32" className={classNames(cls.DevPanel, {[cls.open]: isOpen}, [])} justify="between">

            <Dropdown
                direction='bottom right'
                items={itemsForDropDown}
                trigger={
                    <Icon
                        Svg={Person}
                        height={36}
                        width={36}
                        color="clear"
                        fill={rootStore.auth ? 'green' : 'red'}
                        stroke={rootStore.auth ? 'green' : 'red'}
                    />
                }
            />

            <HStack gap="16">

                <AppLink to={getRouteMain()} variant='blue' activeClassName={cls.active}>
                    Главная
                </AppLink>

                {rootStore.auth &&
                    <AppLink to={getRouteFavorites()} variant='blue' activeClassName={cls.active}>
                        Избранное
                    </AppLink>
                }

                {rootStore.auth &&
                    <AppLink
                        to={getRouteDepartment('d1bb72db-d00c-49ee-a4f3-a105ac81ca94')}
                        variant='blue'
                        activeClassName={cls.active}
                    >
                        Отдел 16
                    </AppLink>
                }

                {rootStore.auth && 
                <AppLink to={getRouteEditOrgUnit('unexisted')} variant='blue' activeClassName={cls.active}>
                    ОргЮнит(ред)
                </AppLink>
                }

                {rootStore.auth && 
                <AppLink to={getRouteEditPerson('unexisted')} variant='blue' activeClassName={cls.active}>
                    Пользователь(ред) 
                </AppLink>
                }
               
                {rootStore.auth && 
                <AppLink to={getRouteSearch('мед')} variant='blue' activeClassName={cls.active}>
                    Поиск 
                </AppLink>
                }

                <AppLink to={getRouteSettings()} variant='blue' activeClassName={cls.active}>
                    Настройки 
                </AppLink>
                
                <AppLink to={getRouteNotFound()} variant='blue' activeClassName={cls.active}>
                    Не найдено
                </AppLink>

                <AppLink to={getRouteForbidden()} variant='blue'activeClassName={cls.active}>
                    Запрещенная
                </AppLink>

                <AppLink to={getRouteAbout()} variant='blue' activeClassName={cls.active}>
                    Справка
                </AppLink>

            </HStack>
            <BugButton/>
        </HStack>
    );
});
