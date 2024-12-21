import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Button } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";

import { OrgUnitInfoBlock } from './OrgUnitInfoBlock/OrgUnitInfoBlock';
import { OrgUnitServiceBlock } from './OrgUnitServiceBlock/OrgUnitServiceBlock';
import { updateOrgUnitItem } from '../../model/services/updateOrgUnitItem';
import { OrgUnitItem, OrgUnitUpdateData } from '../../model/types/orgUnitItem';


interface Props {
	className?: string;
    orgUnit: OrgUnitItem;
}

export const OrgUnitEditView = observer(({ className, orgUnit }: Props) => {
    const navigate = useNavigate();
    const {rootStore} = useStoreProvider();
    
    const [isEdit, setIsEdit] = useState(false)
    const [updatedOrgUnit, setUpdatedOrgUnit] = useState<OrgUnitUpdateData | null>(null)
    const [isCancelled, setIsCanceld] = useState(false)

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const onEditToggle = useCallback(() => setIsEdit(true), []);

    const onSaveHandler = useCallback(async () => {
        if (!updatedOrgUnit) return

        await updateOrgUnitItem(orgUnit.id, {...updatedOrgUnit})
        rootStore.updateNavChanged(!rootStore.isNavChange)
        setIsEdit(false)
    }, [orgUnit.id, rootStore, updatedOrgUnit]);

    const onCancelHandler = useCallback(() => {
        setUpdatedOrgUnit(orgUnit);
        setIsEdit(false)
        setIsCanceld(prev => !prev)
    }, [orgUnit]);

    return (
        <VStack gap="16" max className={className}>

            <OrgUnitServiceBlock orgUnit={orgUnit}/>

            <OrgUnitInfoBlock orgUnit={orgUnit} isEdit={isEdit} isCancelled={isCancelled} setUpdatedOrgUnit={setUpdatedOrgUnit}/>

            <HStack justify="end" align="center" gap="16" max>
                {isEdit && <Button onClick={onSaveHandler}>Сохранить</Button>}
                {isEdit && <Button onClick={onCancelHandler}>
                    Отмена
                </Button>}
                {!isEdit && <Button onClick={onEditToggle}>
                    Редактировать
                </Button>}
                <Button onClick={onReturnHandler}>
                    Назад
                </Button>
            </HStack>
            
        </VStack>
    );
});