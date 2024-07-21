import { useEffect, useState } from 'react';

import { OrgUnitItem } from '@/entities/OrgUnitItem';

import { getOrgUnitCardStore } from './getOrgUnitCardStore';
import { orgUnitsCardType } from '../model/types/types';

interface useOrgUnitCardStoreProps {
    orgUnitItems: OrgUnitItem[]
}

export const useOrgUnitCardStore = ({orgUnitItems}: useOrgUnitCardStoreProps) => {

    const [orgUnitsCardArray, setOrgUnitsCardArray] = useState<orgUnitsCardType[]>()

    useEffect( () => {
        const tempArray:orgUnitsCardType[] = [];

        orgUnitItems.forEach(el => tempArray.push(
            {id: el.id, store: getOrgUnitCardStore(el.id) }
        ));
        
        setOrgUnitsCardArray(tempArray);

    }, [orgUnitItems]);

    return orgUnitsCardArray;
}
