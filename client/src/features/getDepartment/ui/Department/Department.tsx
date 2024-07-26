import { observer } from 'mobx-react';

import { OrgUnitItemView, OrgUnitItem, OrgUnitViewStore } from '@/entities/OrgUnitItem';
import { PersonView, PersonViewStore } from '@/entities/Person';
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
    console.log(department)
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
                    {department.chef && <PersonView person={department.chef} store={new PersonViewStore()}/>}
                    {department.managers && department.managers.map( (x, i) => 
                        <PersonView person={x} key={i} store={new PersonViewStore()}/>
                    )}
                    {department.persons && department.persons.map( (x, i) => 
                        <PersonView person={x} key={i} store={new PersonViewStore()}/>
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
