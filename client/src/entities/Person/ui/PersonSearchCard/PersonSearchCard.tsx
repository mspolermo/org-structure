import { memo } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { getColor } from '@/shared/lib/getColors/getColors';
import { getInitials } from '@/shared/lib/getInitials/getInitials';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './PersonSearchCard.module.scss';
import { PersonSearched } from '../../model/types/person';

interface PersonSearchCardProps {
    className?: string;
    personSearched: PersonSearched;
    onClick: () => void;
}

export const PersonSearchCard = memo(({ className, personSearched, onClick }: PersonSearchCardProps) => {
    
    const { rootStore } = useStoreProvider();

    const mods: Mods = {
        [cls.focused]: personSearched.id == rootStore.focusedPersonId
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
                style={{'backgroundColor': getColor(personSearched.id)}}
            >
                {getInitials(personSearched.name)}
            </VStack>
            <VStack max className={cls.textWrapper}>
                <Text text={personSearched.name} size='xs'  />
                <Text text={personSearched.post} size='xxs'/>
                <Text text={personSearched.orgUnit.name} size='xxs'/>
            </VStack>
        </HStack>
    )}
);
