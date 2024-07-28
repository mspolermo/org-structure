import { observer } from 'mobx-react';

import { OrgUnitItemView, OrgUnitItem, OrgUnitViewStore } from '@/entities/OrgUnitItem';
import { PersonViewCard, PersonStore } from '@/entities/Person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack} from '@/shared/ui/Stack';

import cls from './Department.module.scss';
import { CollapsingPersonListAnimation } from '../../anim/CollapsingPersonListAnimation';
import { useOrgUnitCardStore } from '../../lib/useOrgUnitCardStore';

interface DepartmentProps {
	className?: string;
    department: OrgUnitItem;
    store: OrgUnitViewStore;
}

export const Department = observer(({ className, department, store }: DepartmentProps) => {
    if (store== undefined) return null;
    const { isPersonsCollapsed } = store;

    const orgUnitsCardArray = useOrgUnitCardStore({orgUnitItems: department.childOrgUnitItems});

    return (
        <VStack className={classNames(cls.Department, {}, [className])} max>

            <OrgUnitItemView
                className={cls.OrgUnitItemView}
                orgUnitItem={department}
                store={store}
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
                    <Department
                        department={x}
                        key={i}
                        store={orgUnitsCardArray[index]?.store}
                    />
                )
            })}

        </VStack>
    );
});
