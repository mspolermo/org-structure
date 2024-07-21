/**
 * Расширяемая по клику карточка
 * @param className? - Проброс класса сверху
 * @param shortView - Маленький вид карты (свернутый)
 * @param expandableView - Вид с открытым доп блоком (развернуто)
 * @param isOpen - Флаг, Открыта ли карточка?
 * @param setIsOpen - Функция для открытия\сворачивания крточки
 * @param withBorder? - Флаг, с постоянной границей?
 * @param withButtons? - Флаг, c иконками-кнопками в правом верхнем углу (true\false)?
 * @param icons - Массив кнопок-иконок с функциями по клику (для withButtons == true)
*/

import { memo, ReactElement } from 'react';

import { ArrowUp } from '@/shared/assets/svg-icons/control';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { clickableIconProps, Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

import cls from './ExpandableCard.module.scss';
import { ChangeHeightMotion } from '../anim/ChangeHeightMotion';

interface ExpandableCardBaseProps {
	className?: string;
    shortView: ReactElement;
    expandableView: ReactElement;
    isOpen: boolean;
    setIsOpen: (arg: boolean) => void;
    withBorder?: boolean;
}

interface ExpandableCardWithoutBtnProps extends ExpandableCardBaseProps {
    withButtons?: false;
}

interface ExpandableCardWithBtnProps extends ExpandableCardBaseProps {
    withButtons?: true;
    icons: clickableIconProps [];
}

type ExpandableCardProps = ExpandableCardWithoutBtnProps | ExpandableCardWithBtnProps;

export const ExpandableCard = memo((props: ExpandableCardProps) => {
    const {
        className,
        shortView,
        expandableView,
        isOpen,
        setIsOpen,
        withBorder,
        withButtons
    } = props;

    const closeHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const shortPart = (withButtons) 
        ? <HStack justify='between' gap='32' className={cls.withBtn}>
            {shortView}
            <HStack gap='8'>
                {props.icons.map( (e,i) => 
                    <Icon
                        key={i}
                        Svg={e.Svg}
                        width={e.width || 14}
                        height={e.height || 14}
                        color='inverted'
                        clickable
                        onClick={e.onClick}
                    />                
                )}
            </HStack>

        </HStack>
        : <>{shortView}</>
    ;

    return (
        <Card
            padding='0'
            onClick={(withButtons) ?() => {return} : () => setIsOpen(true) } 
            variant='outlined-bottom'
            active
            border='border-none'
            className={classNames(
                cls.ExpandableCard,
                {
                    [cls.open]: isOpen,
                    [cls.withBorder]: withBorder,
                },
                [className]
            )}
        >

            {shortPart}

            <ChangeHeightMotion duration={0.6} reanimate={isOpen.toString()}>
                {isOpen && expandableView}
                {isOpen && 
                    <HStack
                        justify='center'
                        align='center'
                        max
                        className={cls.close}
                        onClick={(e) => closeHandler(e)}
                    >
                        <Icon
                            Svg={ArrowUp}
                            width={10}
                            height={10}
                            color='inverted'
                            className={cls.svg}
                        />
                    </HStack>
                }
            </ChangeHeightMotion>

        </Card>

    );
});
