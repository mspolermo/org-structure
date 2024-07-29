import { observer } from 'mobx-react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';

import PersonStore from '../../../model/store/personStore';
import { Person } from '../../../model/types/person';
import { PersonDetalesView } from '../PersonDetalesView/PersonDetalesView';
import { PersonShortView } from '../PersonShortView/PersonShortView';

interface PersonViewCardProps {
	className?: string;
    person: Person;
    store: PersonStore;
}

export const PersonViewCard = observer((props: PersonViewCardProps) => {
    const { className, person, store } = props;

    const {
        cardOpeningStatus: isOpen,
        updateCardOpeningStatus: setIsOpen
    } = store;
    
    return (
        <ExpandableCard
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            shortView={
                <PersonShortView 
                    person={person}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }
            expandableView={<PersonDetalesView person={person}/>}
        />
    );
});
