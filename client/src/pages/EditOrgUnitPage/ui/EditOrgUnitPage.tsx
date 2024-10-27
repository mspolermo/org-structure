import { memo } from "react";
import { useParams } from "react-router-dom";

import { OrgUnitStore } from "@/entities/OrgUnitItem";
import { GetOrgUnitEditView } from "@/features/getOrgUnitEditView";
import { Page } from "@/widgets/Page";

const EditOrgUnitPage = memo(() => {
    const {id} = useParams<{id: string}>();
    if (!id)  {throw new Error('Id ОргЮнита для отображения страницы отсутствует')}
    const orgUnitStore = new OrgUnitStore();

    return (
        <Page header="Страница редактирования информации о подразделении">
            <GetOrgUnitEditView id={id}  orgUnitStore={orgUnitStore} />
        </Page>
    );
});

export default EditOrgUnitPage;
