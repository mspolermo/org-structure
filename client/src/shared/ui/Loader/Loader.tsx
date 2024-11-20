/**
 * Анимированный лоадер
 * @param className - Проброс класса сверху
*/

import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import './Loader.scss';

export interface LoaderProps {
    className?: string;
}

export const Loader = memo(({ className }: LoaderProps) => {
    return (
        <div className={classNames('lds-ellipsis', {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
});
