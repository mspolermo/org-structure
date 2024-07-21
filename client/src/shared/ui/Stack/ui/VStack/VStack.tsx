/**
 * Компонент-обертка для вертикального позиционирования элементов
 * @param className? - Проброс класса сверху
 * @param children - Содержимое стека
 * @param justify? - Центрирование по вертикали (start - по-умолчанию)
 * @param align? - Центрирование по горизовтали (center - по-умолчанию)
 * @param gap? - Отступ (4/8/16/24/32) (не задано (т.е. 0) - по-умолчанию)
 * @param max? - Флаг, делающий стек максимальной ширины
 * @param maxHeight? - Флаг, делающий стек максимальной высоты
*/

import { FlexProps } from '../../types/stack';
import { Flex } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;
    return <Flex direction="column" align={align} {...props} />;
};
