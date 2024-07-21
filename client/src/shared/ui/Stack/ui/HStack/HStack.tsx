/**
 * Компонент-обертка для горизонтального позиционирования элементов
 * @param className? - Проброс класса сверху
 * @param children - Содержимое стека
 * @param justify? - Центрирование по горизонтали (start - по-умолчанию)
 * @param align? - Центрирование по вертикали (center - по-умолчанию)
 * @param gap? - Отступ (4/8/16/24/32) (не задано (т.е. 0) - по-умолчанию)
 * @param max? - Флаг, делающий стек максимальной ширины
 * @param maxHeight? - Флаг, делающий стек максимальной высоты
*/

import { FlexProps } from '../../types/stack';
import { Flex } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => {
    return <Flex direction="row" {...props} />;
};
