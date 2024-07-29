import { observer } from 'mobx-react';

import { PersonViewCard, PersonStore } from '@/entities/Person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack} from '@/shared/ui/Stack';

import cls from './OrgUnitFullView.module.scss';
import { useOrgUnitCardStore } from '../../../model/lib/useOrgUnitCardStore';
import OrgUnitViewStore from '../../../model/store/orgUnitIViewStore';
import OrgUnitStore from '../../../model/store/orgUnitStore';
import { OrgUnitItem } from '../../../model/types/orgUnitItem';
import { OrgUnitItemView } from '../../OrgUnitViewCard/OrgUnitItemView/OrgUnitItemView';
import { CollapsingPersonListAnimation } from '../anim/CollapsingPersonListAnimation';


interface OrgUnitFullViewProps {
	className?: string;
    orgUnitItem: OrgUnitItem;
    cardStore: OrgUnitViewStore;
    orgUnitStore: OrgUnitStore
}

export const OrgUnitFullView = observer((props: OrgUnitFullViewProps) => {
    const { className, orgUnitItem: department, cardStore, orgUnitStore } = props
    
    if (cardStore === undefined) return null;

    const { isPersonsCollapsed } = cardStore;

    const orgUnitsCardArray = useOrgUnitCardStore({orgUnitItems: department.childOrgUnitItems, orgUnitStore });

    return (
        <VStack className={classNames(cls.OrgUnitFullView, {}, [className])} max>

            <OrgUnitItemView
                className={cls.OrgUnitItemView}
                orgUnitItem={department}
                cardStore={cardStore}
            />

            <CollapsingPersonListAnimation duration={0.4} isOpen={isPersonsCollapsed} >
                {<VStack className={classNames(cls.personsList, {}, [])} max>
                    {department.chef && <PersonViewCard person={department.chef} store={new PersonStore()}/>}
                    {department.managers && department.managers.map( (x, i) => 
                        <PersonViewCard person={x} key={i} store={new PersonStore()}/>
                    )}
                    {department.persons && department.persons.map( (x, i) => 
                        <PersonViewCard person={x} key={i} store={new PersonStore()}/>
                    )}
                </VStack>}
            </CollapsingPersonListAnimation>

            {department.childOrgUnitItems && department.childOrgUnitItems.map( (x, i) => {
                if (!orgUnitsCardArray) return null
                const index = orgUnitsCardArray.findIndex(card => card.id === x.id)
                return (
                    <OrgUnitFullView
                        orgUnitItem={x}
                        key={i}
                        cardStore={orgUnitsCardArray[index]?.store}
                        orgUnitStore={orgUnitStore}
                    />
                )
            })}

        </VStack>
    );
});
