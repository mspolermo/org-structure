import { observer } from "mobx-react";

import { OrgUnitEditView, OrgUnitStore } from "@/entities/OrgUnitItem";
import { Skeleton } from "@/shared/ui/Skeleton";
import { VStack } from "@/shared/ui/Stack";

import { useOrgUnitData } from "../model/useOrgUnitData";

interface Props {
    id: string
    orgUnitStore: OrgUnitStore
}

export const GetOrgUnitEditView = observer((props: Props) => {
    const {id, orgUnitStore} = props;
    
    const { orgUnit } = useOrgUnitData(id, orgUnitStore);



    if (!orgUnit) {
        return (
            <VStack gap='24' max maxHeight align="start" justify="start">
                <Skeleton width={400} height={210} border={4}/>
                <Skeleton height={500} border={4}/>
            </VStack>
        )
    }

    return <OrgUnitEditView orgUnit={orgUnit} />
});