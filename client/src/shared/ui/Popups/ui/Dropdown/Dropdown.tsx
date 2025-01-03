/**
 * Выпадающий список с действиями из триггера (например иконки)
 * @param className? - Проброс класса сверху
 * @param items - Массив элементов выпадающего списка
 * @param trigger - Родительский компонент, по нажатию на который будет выпадать список
 * @param direction - Местоположение выпадающего списка (bottom right - по умолчанию)
*/

import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import cls from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menu];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
            
        >
            <Menu.Button className={popupCls.trigger} >{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)} >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(
                                cls.item,
                                { [popupCls.active]: active },
                                [],
                            )}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={Link}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
