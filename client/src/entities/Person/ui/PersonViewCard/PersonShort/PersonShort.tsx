import { memo, useCallback } from 'react';

import { Person } from '@/entities/Person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { UseSearch } from '@/shared/lib/hooks/useSearch/useSearch';
import { Text } from '@/shared/ui/Text';

import cls from './PersonShort.module.scss';

interface PersonShortProps {
	className?: string;
    person: Person;
    isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
}

export const PersonShort = memo(({ className, person, isOpen, setIsOpen }: PersonShortProps) => {
    const indent = cls[`indent_${person.nestingLevel}`];
    
    const openingHandler = useCallback( (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }, [isOpen, setIsOpen]);

    return (
        <div
            className={classNames(cls.PersonShort, {}, [className])}
            onClick={openingHandler}
        >
            <Text text={person.name} size='s' className={indent}/>

            {(isOpen && person.mainContact.phone.number)
                ? <UseSearch text={person.mainContact.phone.number} size='s'/>
                : <Text text={person.mainContact.phone.number || '-'} size='s'/>
            }

            {(isOpen && person.mainContact.location)
                ? <UseSearch text={person.mainContact.location} size='s'/>
                : <Text text={person.mainContact.location || '-'} size='s'/>
            }

            <Text text={person.post || '-'} size='s'/>
        </div>
    );
});
