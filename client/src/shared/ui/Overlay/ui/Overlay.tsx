/**
 * Компонент-подложка-задний фон для модального окна
 * @param className? - Проброс класса сверху
 * @param onClick - Функция для закрытия модального окна и подложки
 * @param animationFlag - флаг, по изменению которого активируется анимация появления\исчезания бэкграундного блюра
*/

import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';
import { ChangeOpacityMotion } from '../anim/Animation';

interface OverlayProps {
  className?: string;
  onClick: () => void;
  animationFlag: boolean;
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick, animationFlag } = props;

    return (
        <ChangeOpacityMotion 
            reanimate={animationFlag.toString()} 
            initial={animationFlag ? 0 : 1} 
            end={animationFlag ? 1 : 0}
        >
            <div
                onClick={onClick}
                className={classNames(cls.Overlay, {}, [className])}
            />
        </ChangeOpacityMotion>
    );
});
