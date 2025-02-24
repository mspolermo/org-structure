/* eslint-disable max-len */
import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BugButton } from "@/app/providers/ErrorBoundary";
import { useStoreProvider } from "@/app/providers/StoreProvider";
import { UserNavType } from "@/entities/Navigation";
import { authLogin } from "@/entities/User";
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
    getRouteEditOrgUnit,
    getRouteAuth,
    getRouteAdmin
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
    const navigate = useNavigate();
    const [data, setData] = useState<UserNavType>()

    const getFromUserNav = useCallback(async () => {
        if (!rootStore.auth) return;

        try {
            const req = await rootStore.userNavData
            setData(req)
        } catch (e) {
            console.error("Ошибка при обновлении избранного:", e);
            navigate(getRouteAuth());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootStore.auth, rootStore.userNavData, navigate]);

    useEffect(() => {
        getFromUserNav()
    }, [getFromUserNav])

    const logOut = useCallback(()=> {
        rootStore.updateAuth(null) 
        navigate(getRouteAuth())
    }, [navigate, rootStore]);

    const logInAsAdmin = useCallback(async()=> {
        try {
            await authLogin({
                email: 'admin@gmail.com',
                password: 'admin',
            }, rootStore);
            navigate(getRouteMain());
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
        }
    }, [navigate, rootStore]);

    const itemsForDropDown = useMemo(() => [

        {
            content: rootStore.auth ? 'Выйти' : 'Войти как администратор',
            onClick: rootStore.auth ? logOut : logInAsAdmin,
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

                <AppLink to={getRouteAuth()} variant='blue' activeClassName={cls.active}>
                    Авторизация
                </AppLink>

                {rootStore.auth &&<AppLink to={getRouteMain()} variant='blue' activeClassName={cls.active}>
                    Главная
                </AppLink>
                }

                {rootStore.auth &&
                    <AppLink to={getRouteAdmin()} variant='blue' activeClassName={cls.active}>
                        Администрирование
                    </AppLink>
                }

                {rootStore.auth &&
                    <AppLink to={getRouteFavorites()} variant='blue' activeClassName={cls.active}>
                        Избранное
                    </AppLink>
                }

                {rootStore.auth &&
                    <AppLink
                        to={getRouteDepartment(data?.groups[0].name.id ?? '')}
                        variant='blue'
                        activeClassName={cls.active}
                    >
                        Отдел
                    </AppLink>
                }

                {rootStore.auth && 
                <AppLink to={getRouteEditOrgUnit(data?.groups[0].name.id ?? '')} variant='blue' activeClassName={cls.active}>
                    ОргЮнит(ред)
                </AppLink>
                }

                {rootStore.auth && 
                <AppLink to={getRouteEditPerson(data?.user?.id ?? '')} variant='blue' activeClassName={cls.active}>
                    Персона(ред) 
                </AppLink>
                }

                {rootStore.auth && 
                <AppLink to={getRouteSearch('ле')} variant='blue' activeClassName={cls.active}>
                    Поиск 
                </AppLink>
                }

                {rootStore.auth && <AppLink to={getRouteSettings()} variant='blue' activeClassName={cls.active}>
                    Настройки 
                </AppLink>
                }
                
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
