import { memo  } from "react";
import { useParams } from "react-router-dom";

import { GetPersonEditView } from "@/features/getPersonEditView";
import { Page } from "@/widgets/Page";

const EditPersonPage = memo(() => {
    const {id} = useParams<{id: string}>();
    if (!id)  {throw new Error('Id сотрудника для отображения страницы отсутствует')}
    
    return (
        <Page header="Страница редактирования информации о пользователе">
            <GetPersonEditView id={id}/>
        </Page>
    );
});

export default EditPersonPage;
