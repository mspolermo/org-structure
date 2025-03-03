/**
 * Навигационная панель приложения (располагается слева, в сайдбаре) 
 * @param className - проброс класса сверху
*/
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getVStack } from '@/shared/ui/Stack';

import cls from './NavPanel.module.scss';
import { aboutItem, NavGroupType } from '../../model/types/navigation';
import { AnchorItem } from '../NavItems/AnchorItem/AnchorItem';
import { FixedBtn } from '../NavItems/FixedBtn/FixedBtn';
import { NavItem } from '../NavItems/NavItem/NavItem';


interface NavpanelProps {
	className?: string;
    localData?: aboutItem[];
}

export const Navpanel = observer(({ className, localData }: NavpanelProps) => {
    const { rootStore } = useStoreProvider();

    useEffect(() => {
        // ожидание окончания загрузки данных fetchUserNav
        //rootStore.updateAuth()
    }, [rootStore, rootStore.userNavData?.state])


    if (localData) {
        return (
            <nav className={classNames(cls.Navpanel, {}, [className, getVStack({'justify': 'between'})])}>
                <ul className={classNames(cls.AnchorParentItem, {}, [getVStack({align: 'start'})])}>
                    {localData.map((x, i) =>
                        <AnchorItem data={x} key={i} />
                    )}
                </ul>
                <FixedBtn type='Главная' />
            </nav>
        )
    }

    return rootStore.userNavData?.case({
        pending: () => null,
        rejected: () => {throw new Error()},
        fulfilled: (value) => {
            runInAction(() => {
                rootStore.updateUser(value.user);
                rootStore.updateFavorites(value.favorites);
            });
            
            if (!rootStore.auth) return null
            return (
                <nav
                    className={classNames(
                        cls.Navpanel, 
                        {}, 
                        [className, getVStack({'justify': 'between'})])
                    }
                >
                    <ul>
                        {value.groups.map((x: NavGroupType, i: number) =>
                            <NavItem data={x} key={i}/>
                        )}
                    </ul>
                    <FixedBtn type='Избранное' />
                </nav>
            );
        }
    })
});
