import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pencil } from '@/shared/assets/svg-icons/button';
import { getRouteEditOrgUnit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import cls from './OrgUnitItemDetails.module.scss';
import { OrgUnitItem } from '../../../model/types/orgUnitItem';

interface Props {
	className?: string;
    orgUnitItem: OrgUnitItem;
    isEditable: boolean;
}

export const OrgUnitItemDetails = memo((props: Props) => {
    const navigate = useNavigate();
    const { className, orgUnitItem, isEditable } = props;

    const editBtnHandler = useCallback(()=> navigate(getRouteEditOrgUnit(orgUnitItem.id)), [orgUnitItem.id, navigate]);

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
            {isEditable && <HStack max gap='8' align='start'>
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
                    </HStack>
                </VStack>
            </HStack>}
        </VStack>
    );
});
