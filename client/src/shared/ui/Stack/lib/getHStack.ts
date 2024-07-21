import { Mods, classNames } from "@/shared/lib/classNames/classNames";

import { justifyClasses, alignClasses, directionClasses, gapClasses } from '../const/classes';
import { FlexProps } from '../types/stack';
import cls from "../ui/Flex/Flex.module.scss";

/**
 * getHStack - функция-хелпер для создания горизонтального стэка без лишней ноды. Возвращает класс.
 * @param justify? - Центрирование по горизонтали (start - по-умолчанию)
 * @param align? - Центрирование по вертикали (center - по-умолчанию)
 * @param gap? - Отступ (4/8/16/24/32) (не задано (т.е. 0) - по-умолчанию)
 * @param max? - Флаг, делающий стек максимальной ширины
 * @param maxHeight? - Флаг, делающий стек максимальной высоты
*/

type getHStackProps = Pick<FlexProps, 
	'justify' |  'align' | 'gap' | 'max' | 'maxHeight'
>

export function getHStack(props: getHStackProps) {
    const {
        justify = 'start', align = 'center', gap, max, maxHeight
    } = props;

    const classes = [
        justifyClasses[justify],
        alignClasses[align],
        directionClasses["row"],
        gap && gapClasses[gap],
    ];
    const mods: Mods = {
        [cls.max]: max,
        [cls.maxHeight]: maxHeight
    };
    return classNames(cls.Flex, mods, classes);
}
