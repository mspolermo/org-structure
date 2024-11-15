/**
 * Компонент для создания ссылки в приложении
 * @param className? - Проброс класса сверху
 * @param variant? - Тема ссылки. Отвечает за визуал (primary - по умолчанию)
 * @param to - Путь ссылки. Куда ведет
 * @param children? - Тело ссылки
 * @param activeClassName? - Класс для выбранной ссылки (текущий роут, где сейчас находимся)
*/

import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'blue';

export interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassName]: isActive }, [
                    className,
                    cls[variant],
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
