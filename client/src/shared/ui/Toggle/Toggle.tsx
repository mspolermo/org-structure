/**
 * Компонент-переключатель
 * @param className? - Проброс класса сверху
 * @param label - Подпись
 * @param value - Текущее значение
 * @param onChange - Функция-переключатель (что делаем при переключении)
 * @param readonly? - Флаг, отвечающий за работу переключателя
*/

import { useState, useEffect, memo } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Toggle.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

interface ToggleProps {
    className?: string;
	label: string;
    value: boolean;   
    onChange: (value: boolean) => void;
    readonly?: boolean;
}

export const Toggle = memo((props: ToggleProps) => {
    const { className, label, value, onChange, readonly } = props;
    const [isToggled, setIsToggled] = useState(value);

    useEffect(() => {
        setIsToggled(value);
    }, [value]);

    useEffect(() => {
        if(!readonly) onChange(isToggled)
    }, [isToggled, onChange, readonly])

    const clickHandler = () => {
        setIsToggled(!isToggled)  
    }

    const mods: Mods = {
        [cls.toggledYes]: isToggled,
        [cls.toggledNo]: !isToggled,
        [cls.readonly]: readonly,
    };

    return (
        <HStack
            align="center"
            className={classNames(cls.Toggle, mods, [className])}
            onClick={clickHandler}
            max
            justify='between'
        >
            <Text className={cls.label} text={label} thin />
            <HStack className={cls.toggle}>
                <div className={cls.rail}></div>
                <div className={cls.button}>{isToggled ? 'Да' : 'Нет'}</div>
            </HStack>            
        </HStack>
    );
});
