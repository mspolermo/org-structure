import { OrgUnitViewStore } from '@/entities/OrgUnitItem';

import departmentStore from '../model/store/departmentStore';

export function getOrgUnitCardStore(id: string):OrgUnitViewStore {
    const existStore = departmentStore?.getStore(id);
    if (existStore) return existStore;

    return createOrgUnitCardStore(id);
}

export function createOrgUnitCardStore(id: string):OrgUnitViewStore {
    const orgUnitCard = new OrgUnitViewStore();
    departmentStore.addOrgUnitCard({id: id, store: orgUnitCard });

    return orgUnitCard
}