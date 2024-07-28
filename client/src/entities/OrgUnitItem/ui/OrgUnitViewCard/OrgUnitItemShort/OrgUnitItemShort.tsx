/* eslint-disable indent */
import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

import cls from './OrgUnitItemShort.module.scss';
import { OrgUnitItem } from '../../../model/types/orgUnitItem';


interface OrgUnitItemShortProps {
	className?: string;
    orgUnitItem: OrgUnitItem;
	isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
}

export const OrgUnitItemShort = memo(( props : OrgUnitItemShortProps) => {
	
    const {
        className,
        orgUnitItem,
        isOpen,
        setIsOpen
    } = props;

    const openingHandler = useCallback( (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }, [isOpen, setIsOpen]);

    let fontSize: TextSize = 's';
    const indent = cls[`indent_${orgUnitItem.nestingLevel}`];
    switch (orgUnitItem.nestingLevel) {
        case (0):
            fontSize = 'l';
            break;
        case(1):
            fontSize = 'm';
            break;
    }

    return (
        <HStack
            align='center'
            justify='center'
            gap='8'
            className={classNames(cls.OrgUnitItemShort, {}, [className, indent])}
            onClick={openingHandler}
        >
            {orgUnitItem.name && <Text title={orgUnitItem.name} size={fontSize}/>}
            {orgUnitItem.description && <Text text={orgUnitItem.description} size={fontSize}/>}
        </HStack>
    );
});
