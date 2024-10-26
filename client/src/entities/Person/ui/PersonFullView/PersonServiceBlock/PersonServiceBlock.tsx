import { observer } from 'mobx-react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import cls from './PersonServiceBlock.module.scss';
import { Person } from '../../../model/types/person';

interface PersonServiceBlockProps {
	className?: string;
    person: Person;
}

export const PersonServiceBlock = observer(({ className, person }: PersonServiceBlockProps) => {

    const { id, table, employmentDate} = person

    return (
        <VStack gap="8" max className={classNames(cls.PersonServiceBlock, {}, [className])}>
            <Text title="Служебная информация" size="xl"/>
            <HStack gap="8">
                <Text text={'GUID:'} thin/>
                <Text text={id} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Табельный номер сотрудника:'} thin/>
                <Text text={table} thin/>
            </HStack>
            <HStack gap="8">
                <Text text={'Дата устройства на работу:'} thin/>
                <Text text={formatDate(employmentDate.toString())} thin/>
            </HStack>
        </VStack>
    );
});
