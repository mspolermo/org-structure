/**
 * Компонент для добавления иконок/ иконок как кнопок с действием
 * @param className? - Проброс класса сверху
 * @param Svg - Ипортированная иконка
 * @param borderType? - Тип рамки-обводки. Отвечает за визуал (clear - по умолчанию)
 * @param color? - Цвет. Отвечает за визуал (normal - по умолчанию)
 * @param clickable? - Флаг, иконка-кнопка?
 * @param onClick - Выполняемая функция для иконки-кнопки (для clickable == true)
*/

import React, { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;
type colorType = 'clear' | 'normal' | 'inverted';
type borderType = 'clear' | 'soft';

const colorClasses: Record<colorType, string> = {
    clear: cls.colorClear,
    normal: cls.colorNormal,
    inverted: cls.colorInverted
};

const borderClasses: Record<borderType, string> = {
    clear: cls.borderClear,
    soft: cls.borderSoft,
};

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    borderType?: borderType;
    color?: colorType;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
    onClick?: never;
}

export interface ClickableIconProps extends IconBaseProps {
    clickable?: true;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        borderType='clear',
        color='normal',
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(
                cls.Icon, 
                {}, 
                [
                    className,
                    colorClasses[color],
                    borderClasses[borderType]
                ]
            )}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type='button'
                className={classNames(cls.button, {}, [])}
                onClick={props.onClick}
                style={{height, width}}
            >
                {icon}
            </button>
        )
    }

    return icon;
});
