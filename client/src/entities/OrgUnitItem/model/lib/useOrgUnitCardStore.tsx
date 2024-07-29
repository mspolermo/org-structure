/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';


import { getOrgUnitCardStore } from './getOrgUnitCardStore';
import OrgUnitStore from '../../model/store/orgUnitStore';
import {OrgUnitItem, orgUnitsCardType } from '../../model/types/orgUnitItem';

interface useOrgUnitCardStoreProps {
    orgUnitItems: OrgUnitItem[]
    orgUnitStore: OrgUnitStore
}

export const useOrgUnitCardStore = ({orgUnitItems, orgUnitStore}: useOrgUnitCardStoreProps) => {

    const [orgUnitsCardArray, setOrgUnitsCardArray] = useState<orgUnitsCardType[]>()

    useEffect( () => {
        const tempArray:orgUnitsCardType[] = [];
        orgUnitItems?.forEach(el => tempArray.push(
            {id: el.id, store: getOrgUnitCardStore(el.id, orgUnitStore) }
        ));
        
        setOrgUnitsCardArray(tempArray);

    }, [orgUnitItems]);

    return orgUnitsCardArray;
}
