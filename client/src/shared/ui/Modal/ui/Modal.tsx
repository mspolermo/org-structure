/**
 * Компонент-обертка для добавления модального окна
 * @param className? - Проброс класса сверху
 * @param children - Содержимое модального окна
 * @param isOpen - Флаг, открыто-ли модальное окно?
 * @param onClose - Функция для закрытия модального окна
 * @param lazy? - Флаг отвечающий за ленивую загрузку
 * @param closeStatus? - Статус закрытия для внешней кнопки (например кнопка "Закрыть" используемая в children)
*/

import { ReactNode } from 'react';

import { Cross } from '@/shared/assets/svg-icons/control';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '@/shared/ui/Overlay';
import { Portal } from '@/shared/ui/Portal';

import cls from './Modal.module.scss';
import { Icon } from '../../Icon';
import { ChangeScaleMotion } from '../anim/Animation';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	lazy?: boolean;
    closeStatus?: boolean;
}

const ANIMATION_DELAY = 250;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, closeStatus, lazy } = props;

    const { close, isClosing, isMounted, isAnim } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
        closeStatus
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (  
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, [className])}>
                
                <Overlay onClick={close} animationFlag={isAnim}/>
                
                <ChangeScaleMotion
                    reanimate={isAnim.toString()} 
                    initialScale={isAnim ? 0.5 : 1}
                    endScale={isAnim ? 1 : 0.5}
                >
                    <div>
                        <Icon
                            className={cls.btn}
                            Svg={Cross} 
                            clickable
                            onClick={close}
                            width={14}
                            height={14}
                        />
                        {children}
                    </div>
                </ChangeScaleMotion>

            </div>
        </Portal>
    );
};
