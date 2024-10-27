import { observer } from 'mobx-react';

import { OrgUnitItem } from '@/entities/OrgUnitItem/model/types/orgUnitItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import cls from './OrgUnitServiceBlock.module.scss';

interface Props {
	className?: string;
    orgUnit: OrgUnitItem;
}

export const OrgUnitServiceBlock = observer(({ className, orgUnit }: Props) => {

    const { id, persons, chef, managers} = orgUnit

    return (
        <VStack gap="8" max className={classNames(cls.OrgUnitServiceBlock, {}, [className])}>

            <Text title="Служебная информация" size="xl"/>

            <VStack gap="4" className={cls.innerBlock}>

                <HStack gap="8">
                    <Text text={'GUID:'} thin/>
                    <Text text={id} thin/>
                </HStack>

                <HStack gap="4" max>
                    <Text text="Руководитель:" thin className={cls.text}/>
                    <Text text={chef?.name ?? 'Не назначен'} thin className={cls.text}/>
                </HStack>

                <HStack gap="8">
                    <Text text={'Количество линейных сотрудников:'} thin/>
                    <Text text={persons.length.toString()} thin/>
                </HStack>

                <HStack gap="4" max align='start'>
                    <Text text="Менеджеры подразделения:" thin className={cls.text}/>
                    <VStack gap='8'>
                        {managers.length === 0 &&<Text text="Не назначены" thin/>}
                        {managers?.map(manager => <Text text={manager.name} thin/>)}
                    </VStack>
                </HStack>

            </VStack>

        </VStack>
    );
});
