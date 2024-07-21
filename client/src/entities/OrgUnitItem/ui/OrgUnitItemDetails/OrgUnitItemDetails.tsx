import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Star2 } from '@/shared/assets/svg-icons/action';
import { Pencil } from '@/shared/assets/svg-icons/button';
import { getRouteEditOrgUnit, getRouteFavorites } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './OrgUnitItemDetails.module.scss';

interface OrgUnitItemDetailsProps {
	className?: string;
    id: string;
}

export const OrgUnitItemDetails = memo(({ className, id }: OrgUnitItemDetailsProps) => {
    const navigate = useNavigate();

    const editBtnHandler = useCallback(()=> navigate(getRouteEditOrgUnit(id)), [id, navigate]);
    const favoriteBtnHandler = useCallback(()=> navigate(getRouteFavorites()), [navigate]);

    return (
        <VStack max gap='8' className={classNames(cls.OrgUnitItemDetails, {}, [className,])}>
            <HStack gap='4' justify='between'>
                <Text text='Рабочий день:'/>
                <Skeleton width={100} height={15}></Skeleton>
            </HStack>
            <HStack gap='4' justify='between'>
                <Text text='Обед:'/>
                <Skeleton width={100} height={15}></Skeleton>
            </HStack>
            <HStack gap='4' justify='between' align='start'>
                <Text text='Редакторы:'/>
                <VStack gap='4' className={cls.rows}>
                    <Skeleton width={200} height={15}></Skeleton>
                    <Skeleton width={200} height={15}></Skeleton>
                </VStack>
            </HStack>
            <HStack gap='4' justify='between' align='start'>
                <Text text='Роли:'/>
                <VStack gap='4' className={cls.rows}>
                    <Skeleton width={600} height={15}></Skeleton>
                    <Skeleton width={600} height={15}></Skeleton>
                </VStack>
            </HStack>
            <HStack gap='4' justify='between' align='start'>
                <Text text='Подчинения:'/>
                <VStack gap='4' className={cls.rows}>
                    <Skeleton width={600} height={15}></Skeleton>
                    <Skeleton width={600} height={15}></Skeleton>
                </VStack>
            </HStack>
            <HStack max gap='8' align='start'>
                <VStack max gap='8'>
                    <HStack max gap='8' justify='end'>
                        <Text text={id} align='right' className={cls.id}/>
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
