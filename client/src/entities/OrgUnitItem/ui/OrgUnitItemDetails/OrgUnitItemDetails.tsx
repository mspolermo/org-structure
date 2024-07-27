import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Star2 } from '@/shared/assets/svg-icons/action';
import { Pencil } from '@/shared/assets/svg-icons/button';
import { getRouteEditOrgUnit, getRouteFavorites } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './OrgUnitItemDetails.module.scss';
import { OrgUnitItem } from '../../model/types/orgUnitItem';

interface OrgUnitItemDetailsProps {
	className?: string;
    orgUnitItem: OrgUnitItem;
}

export const OrgUnitItemDetails = memo(({ className, orgUnitItem }: OrgUnitItemDetailsProps) => {
    const navigate = useNavigate();

    const editBtnHandler = useCallback(()=> navigate(getRouteEditOrgUnit(orgUnitItem.id)), [orgUnitItem.id, navigate]);
    const favoriteBtnHandler = useCallback(()=> navigate(getRouteFavorites()), [navigate]);

    return (
        <VStack max gap='8' className={classNames(cls.OrgUnitItemDetails, {}, [className,])}>
            <HStack gap='32' className={cls.rows}>
                <HStack gap='4' justify='between'>
                    <Text text='Рабочий день:'/>
                    <Text text={orgUnitItem.workingHours}/>
                </HStack>
                <HStack gap='4' justify='between'>
                    <Text text='Обед:'/>
                    <Text text={orgUnitItem.lunchBreak}/>
                </HStack>
            </HStack>
            {Boolean(orgUnitItem.summary) && 
            <VStack gap='4' justify='between'>
                <Text text='Информация об отделе:'/>
                <Text text={orgUnitItem.summary}/>
            </VStack>}
            <HStack max gap='8' align='start'>
                <VStack max gap='8'>
                    <HStack max gap='8' justify='end'>
                        <Text text={orgUnitItem.id} align='right' className={cls.id}/>
                        <Tooltip text='Редактировать'>
                            <Icon
                                borderType='soft'
                                Svg={Pencil}
                                clickable
                                onClick={editBtnHandler}
                            />
                        </Tooltip>
                        <Tooltip text='В избранное'>
                            <Icon
                                Svg={Star2}
                                borderType='soft'
                                stroke={'var(--icon-color)'}
                                clickable
                                onClick={favoriteBtnHandler}
                            />
                        </Tooltip> 
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
});
