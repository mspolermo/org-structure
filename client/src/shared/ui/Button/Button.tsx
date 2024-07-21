/**
 * Кнопка
 * @param className? - Проброс класса сверху
 * @param variant? - Тема кнопки. Отвечает за визуал (normal - по умолчанию)
 * @param square? - Флаг, делающий кнопку квадратной
 * @param size? - Размер кнопки в соответствии с дизайн системой (m - по умолчанию)
 * @param disabled? - Флаг, отвечающий за работу кнопки
 * @param children - Содержимое кнопки (тело)
 * @param fullWidth? - Флаг увеличения кнопки на всю свободную ширину
*/
import { memo, type ButtonHTMLAttributes, ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'normal' | 'outline' | 'outline-inverted';

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children: ReactNode;
    fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'normal',
        square,
        disabled,
        fullWidth,
        size = 'm',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
