import { memo} from 'react';
import { NavLink } from 'react-router-dom';

import { Demands, Star2 } from '@/shared/assets/svg-icons/action';
import { getRouteFavorites, getRouteMain } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './FixedBtn.module.scss';
import gen from '../styles/general.module.scss';

interface FixedBtnProps{
	className?: string;
    type: 'Избранное' | 'Главная'
}

export const FixedBtn = memo(({ className, type }: FixedBtnProps) => {
    return (
        <NavLink
            to={(type === 'Избранное') ? getRouteFavorites() : getRouteMain()}
            className={({ isActive }) =>
                classNames(
                    cls.FixedBtn, 
                    { 
                        [gen.active]: isActive,
                        [cls.active]: isActive 
                    }, 
                    [gen.item, className]
                )
            }
        >
            <HStack gap='8' align='center'>
                <Icon
                    Svg={ (type === 'Избранное') ? Star2 : Demands}
                    className={cls.svg}
                />
                <Text
                    text={(type === 'Избранное') ? 'Избранное' : 'На главную'} 
                    variant='inverted'
                    size='s'
                />
            </HStack>
        </NavLink>
    );
});
