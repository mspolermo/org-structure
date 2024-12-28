import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

import { OrgUnitEditView, OrgUnitStore } from "@/entities/OrgUnitItem";
import { getRouteForbidden } from "@/shared/const/router";
import useCheckRoles from "@/shared/lib/hooks/useCheckRoles/useCheckRoles";
import { Skeleton } from "@/shared/ui/Skeleton";
import { VStack } from "@/shared/ui/Stack";

import { useOrgUnitData } from "../model/useOrgUnitData";

interface Props {
    id: string
    orgUnitStore: OrgUnitStore
}

export const GetOrgUnitEditView = observer((props: Props) => {
    const {id, orgUnitStore} = props;
    const navigate = useNavigate();
    const isAdmin = useCheckRoles('ADMIN')
    
    const { orgUnit } = useOrgUnitData(id, orgUnitStore);

    if (!isAdmin) {
        navigate(getRouteForbidden())
        return null
    }

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