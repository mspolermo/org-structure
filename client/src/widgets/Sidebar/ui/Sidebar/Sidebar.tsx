/**
 * Сайдбар приложения (располагается слева)
 * @param className - Проброс класса сверху
*/
import { observer } from 'mobx-react';


import { useStoreProvider } from '@/app/providers/StoreProvider';
import { useAppNavpanel } from '@/features/getUserNav';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = observer(({ className }: SidebarProps) => {
    const navpanel = useAppNavpanel();

    const { rootStore } = useStoreProvider();
    const isDevPanelOpen = rootStore.devMode;

    return (
        <div
            className={classNames(
                cls.Sidebar, 
                {[cls.withDevpanel]: isDevPanelOpen},
                [className])}
        >
            {navpanel}
        </div>
    );
});
