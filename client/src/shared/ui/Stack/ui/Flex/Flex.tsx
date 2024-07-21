import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Flex.module.scss';
import { justifyClasses, alignClasses, directionClasses, gapClasses } from '../../const/classes';
import { FlexProps } from '../../types/stack';

// файл-база для комонентов HStack и VStack, не экспортируется наружу

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        maxHeight,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [cls.max]: max,
        [cls.maxHeight]: maxHeight
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};

