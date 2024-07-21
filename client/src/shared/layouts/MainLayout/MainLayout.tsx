/**
 * Главная верстка приложения
 * @param className - Проброс класса сверху
 * @param topbar - Шапка (хэдер)
 * @param content - Основная часть
 * @param sidebar - Левая панель
 * @param toolbar - Правая панель у скролла
 * @param devpanel - Верхняя панель разработчика
*/

import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    topbar: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
    devpanel?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {
        className,
        content,
        topbar,
        sidebar,
        toolbar,
        devpanel
    } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.devpanel}>{devpanel}</div>
            <div className={cls.topbar}>{topbar}</div>
            <div className={cls.flow}>
                <aside className={cls.sidebar}>{sidebar}</aside>
                <div className={cls.content}>{content}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});
