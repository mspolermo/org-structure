/**
 * Компонент для отображения лоадера во время загрузки
 * @param className - Проброс класса сверху
*/

import { memo } from "react";

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader/Loader';

import cls from './PageLoader.module.scss';


interface PageLoaderProps {
    className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => {
    const { rootStore } = useStoreProvider();
    const isDevPanelOpen = rootStore.devMode;
    return (
        <div className={classNames(cls.PageLoader, {[cls.withDevpanel]: isDevPanelOpen}, [className, ])}>
            <Loader className={cls.loader}/>
        </div>
    )}
);
