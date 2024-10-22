/**
 * Карточка
 * @param className? - Проброс класса сверху
 * @param children - Содержимое карточки
 * @param variant? - Тема карточки. Отвечает за визуал (normal - по умолчанию)
 * @param max? - Флаг, делающий карту максимальной ширины
 * @param active? - Флаг, активная ли карточка? (выделение ховером при наведени, курсор - pointer, по клику выполняется функция)
 * @param padding? - Размер внутренних отступов (8 - по умолчанию)
 * @param border? - Округление углов (border-none - по умолчанию)
*/
import { HTMLAttributes, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined-bottom' | 'chosen';
type CardPagging = '0' | '8' | '16' | '24';
type CardBorder = 'border-none' | 'border-round' | 'border-slightly';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant
    max?: boolean;
    active?: boolean;
    padding?: CardPagging;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPagging, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24'
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        active,
        padding = '8',
        border = 'border-none',
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];

    return (
        <div
            className={classNames(
                cls.Card,
                { 
                    [cls.max]: max,
                    [cls.active]: active
                }, 
                [className, cls[variant], cls[paddingClass], cls[border]]
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
