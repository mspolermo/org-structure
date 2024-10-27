import { observer } from "mobx-react";

import { OrgUnitEditView, OrgUnitStore } from "@/entities/OrgUnitItem";
import { Loader } from "@/shared/ui/Loader";
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
            <VStack gap='16' max maxHeight align="center" justify="center">
                <Loader />
            </VStack>
        )
    }

    return <OrgUnitEditView orgUnit={orgUnit} />
});