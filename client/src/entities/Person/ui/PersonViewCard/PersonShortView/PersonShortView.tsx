import { memo, useCallback } from 'react';

import { Person } from '@/entities/Person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { UseSearch } from '@/shared/lib/hooks/useSearch/useSearch';
import { Text } from '@/shared/ui/Text';

import cls from './PersonShortView.module.scss';

interface PersonShortViewProps {
	className?: string;
    person: Person;
    isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
}

export const PersonShortView = memo(({ className, person, isOpen, setIsOpen }: PersonShortViewProps) => {
    const indent = cls[`indent_0`]; //TODO: временный фикс, так тут был _person.nestingLevel, но его нет в новом беке
    
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

            {(isOpen && person.phone)
                ? <UseSearch text={person.phone} size='s' searchData={`phone:${person.phone}`} />
                : <Text text={person.phone|| '-'} size='s'/>
            }

            {(isOpen && person.location)
                ? <UseSearch text={person.location} searchData={`location:${person.location}`} size='s'/>
                : <Text text={person.location || '-'} size='s'/>
            }

            <Text text={person.post || '-'} size='s'/>
        </div>
    );
});
