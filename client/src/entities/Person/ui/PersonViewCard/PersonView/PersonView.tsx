import { observer } from 'mobx-react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';

import PersonViewStore from '../../../model/store/personViewStore';
import { Person } from '../../../model/types/person';
import { PersonDetails } from '../PersonDetails/PersonDetails';
import { PersonShort } from '../PersonShort/PersonShort';

interface PersonViewProps {
	className?: string;
    person: Person;
    store: PersonViewStore;
}

export const PersonView = observer((props: PersonViewProps) => {
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
                <PersonShort 
                    person={person}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }
            expandableView={<PersonDetails person={person} store={store}/>}
        />
    );
});
