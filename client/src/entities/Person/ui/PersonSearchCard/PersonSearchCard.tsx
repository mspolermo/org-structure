import { memo } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './PersonSearchCard.module.scss';
import { Person } from '../../model/types/person';

interface PersonSearchCardProps {
    className?: string;
    person: Person;
    department: string;
    onClick: () => void;
}

export const PersonSearchCard = memo(({ className, person, department, onClick }: PersonSearchCardProps) => {
    
    const { rootStore } = useStoreProvider();

    const mods: Mods = {
        [cls.focused]: person.id == rootStore.focusedPersonId
    };

    return (
        <HStack
            className={classNames(cls.PersonSearchCard, mods, [className])}
            gap='8'
            onClick={onClick}
        >
            <VStack 
                align='center'
                justify='center'
                className={cls.ava}
                style={{'backgroundColor': getColor(person.id)}}
            >
                {getInitials(person.name)}
            </VStack>
            <VStack max className={cls.textWrapper}>
                <Text text={person.name} size='xs'  />
                <Text text={person.post} size='xxs'/>
                <Text text={department} size='xxs'/>
            </VStack>
        </HStack>
    )}
);
