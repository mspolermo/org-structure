/**
 * Компонент для вставки текста
 * @param className? - Проброс класса сверху
 * @param title? - Заголовок 
 * @param text? - Тело текста
 * @param variant? - Тема текста. Отвечает за визуал (primary - по-умолчанию)
 * @param align? - Выравнивание по горизонтали (left - по-умолчанию)
 * @param size? - Размер текста в соответствии с дизайн системой (m - по-умолчанию)
 * @param id? - Для передачи id (например чтобы сделать якорный переход)
 * @param bold? - Флаг, жирный текст и заголовок (true\false)
 * @param thin? - Флаг, тонкий текст и заголовок (true\false)
 * @param onClick? - функция, выполняющаяся по клику на компонент
 * @param isLink? - Флаг, делающая текст и заголовок ссылкой (влияет на визуал)
*/

import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent' | 'inverted';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    id?: string;
    bold? :boolean;
    thin? :boolean;
    onClick? : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isLink?: boolean;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapSizeToClass: Record<TextSize, string> = {
    xxs: cls.size_xxs,
    xs: cls.size_xs,
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
    xl: cls.size_xl
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    xxs: 'h6',
    xs: 'h5',
    s: 'h4',
    m: 'h3',
    l: 'h2',
    xl: 'h1'
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        id,
        bold,
        thin,
        onClick,
        isLink
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass];
    return (
        <div
            onClick={onClick}
            className={classNames(
                cls.Text, 
                {
                    [cls.bold]: bold,
                    [cls.thin]: thin,
                    [cls.link]: isLink
                }, 
                additionalClasses)}
            id={id}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.textBlock}>
                    {text}
                </p>
            )}
        </div>
    );
});
