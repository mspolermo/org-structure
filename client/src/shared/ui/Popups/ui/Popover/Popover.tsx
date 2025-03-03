/**
 * Выпадающий список без действий из триггера (например иконки)
 * @param className - Проброс класса сверху
 * @param trigger - Родительский компонент, по нажатию на который будет выпадать список
 * @param direction? - Местоположение выпадающего списка (bottom right - по умолчанию)
 * @param children - Массив элементов выпадающего списка
*/
import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const { className, trigger, children, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menu];

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
