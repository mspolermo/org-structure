import { observer } from 'mobx-react';
import { useCallback, useState  } from "react";
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { fetchUserNav } from '@/entities/Navigation';
import { getRouteMain } from '@/shared/const/router';
import { Button } from "@/shared/ui/Button";
import RemoveModal from '@/shared/ui/RemoveModal/RemoveModal';
import { HStack, VStack } from "@/shared/ui/Stack";

import { OrgUnitInfoBlock } from './OrgUnitInfoBlock/OrgUnitInfoBlock';
import { OrgUnitServiceBlock } from './OrgUnitServiceBlock/OrgUnitServiceBlock';
import { deleteOrgUnit } from '../../model/services/deleteOrgUnit';
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const onEditToggle = useCallback(() => setIsEdit(true), []);

    const deleteHandler = useCallback(async()=>{
        if (rootStore.userNavData && rootStore.auth) {
            try {
                await deleteOrgUnit(orgUnit.id)
                await fetchUserNav(rootStore, rootStore.auth);
                navigate(getRouteMain())
            } catch (e) {
                console.error("Ошибка при удалении оргЮнита:", e);

                if (e instanceof Error) {
                    throw new Error(e.message)
                } else {
                    throw new Error("Неизвестная ошибка")
                }
            } 
        }
    }, [navigate, orgUnit.id, rootStore])

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
                <Button onClick={() => setIsDeleteModalOpen(true)}>
                    Удалить
                </Button>
                <Button onClick={onReturnHandler}>
                    Назад
                </Button>
            </HStack>

            <RemoveModal
                onDelete={deleteHandler}
                isOpen={isDeleteModalOpen}
                onCloseModal={() => setIsDeleteModalOpen(false)}
            />
            
        </VStack>
    );
});