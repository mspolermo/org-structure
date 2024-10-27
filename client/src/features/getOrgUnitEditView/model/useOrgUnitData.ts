import { useState, useEffect } from 'react';

import { fetchOrgUnitItem, OrgUnitItem, OrgUnitStore } from '@/entities/OrgUnitItem';

interface UseOrgUnitDataResult {
    orgUnit?: OrgUnitItem;
}

export const useOrgUnitData = (id: string, orgUnitDataStore: OrgUnitStore): UseOrgUnitDataResult => {
    const [orgUnit, setOrgUnit] = useState<OrgUnitItem>();

    useEffect( ()=> {
        fetchOrgUnitItem(id, orgUnitDataStore);
    }, [id, orgUnitDataStore])


    const orgUnitData = orgUnitDataStore.mainOrgUnit?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    useEffect( ()=> {
        if (orgUnitData) setOrgUnit(orgUnitData)
    }, [orgUnitData])

    return { orgUnit };
};