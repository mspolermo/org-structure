import { memo  } from "react";
import { useParams } from "react-router-dom";

import { PersonStore } from "@/entities/Person";
import { GetPersonEditView } from "@/features/getPersonEditView";
import { Page } from "@/widgets/Page";

const EditPersonPage = memo(() => {
    const {id} = useParams<{id: string}>();
    if (!id)  {throw new Error('Id сотрудника для отображения страницы отсутствует')}
    const personStore = new PersonStore();

    return (
        <Page header="Страница редактирования информации о пользователе">
            <GetPersonEditView id={id}  personStore={personStore}/>
        </Page>
    );
});

export default EditPersonPage;
