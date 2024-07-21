/**
 * Всплывающая подсказка по наведении
 * @param className? - Проброс класса сверху
 * @param side? - Горизонтальное расположение подсказки (bottom - по-умолчанию)
 * @param align? - Вертикальное расположение подсказки (center - по-умолчанию)
 * @param text - Текст подсказки
 * @param children - Объект, по наведению на который будет всплывать подсказка
 * @param maxWidth? - Флаг, позволяющий занять компоненту-обертке максимально доступную ширину
 * @param maxHeight? - Флаг, позволяющий занять компоненту-обертке максимально доступную высоту
*/

import { ReactNode, memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Tooltip.module.scss';
import { ChangeOpacityMotion } from '../anim/Animation';

type TooltipSide = 'top' | 'bottom';
type TooltipAlign = 'left' | 'center' | 'right';

const mapSideToClass: Record<TooltipSide, string> = {
    'top': 'side_top',
    'bottom': 'side_bottom'
};

const mapAlignToClass: Record<TooltipAlign, string> = {
    'left': 'align_left',
    'center': 'align_center',
    'right': 'align_right'
};

interface TooltipProps {
    className?: string;
    side?: TooltipSide,
    align?: TooltipAlign;
    maxWidth?: boolean;
    maxHeight?: boolean;
    text: string;
    children: ReactNode;
}

export const Tooltip = memo((props: TooltipProps) => {
    const {
        className,
        side = 'bottom',
        align = 'center',
        text,
        maxWidth,
        maxHeight,
        children
    } = props;

    const [visible, setVisible] = useState(false);

    const sideClass = mapSideToClass[side];
    const alignClass = mapAlignToClass[align];

    const [anim, setAnim] = useState(false);

    function mouseEnter() {
        setAnim(true)
        setVisible(true)   
    }

    function mouseLeave() {
        setAnim(false)
        setTimeout(function() {setVisible(false)}, 200)
    }
    
    return (
        <div
            className={classNames(
                cls.root, 
                {
                    [cls.maxWidth]: maxWidth,
                    [cls.maxHeight]: maxHeight
                }, 
                [className]
            )}
         
        >
            <div 
                className={cls.children}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}               
            >
                {children}    
            </div>            

            {visible && 
                <ChangeOpacityMotion
                    reanimate={anim.toString()}
                    ease={'lenear'}
                    initialOpacity={anim ? 0 : 1}
                    endOpacity={anim ? 1 : 0}
                >
                    <span 
                        className={classNames(
                            cls.tooltip, 
                            {}, 
                            [className, cls[sideClass], cls[alignClass]]
                        )}
                    >{text}</span>
                </ChangeOpacityMotion>
            }
        </div>
    )
})