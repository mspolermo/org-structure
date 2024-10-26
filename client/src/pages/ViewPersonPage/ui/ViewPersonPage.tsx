import { memo  } from "react";
import { useParams } from "react-router-dom";

import { PersonStore } from "@/entities/Person";
import { GetPersonFullView } from "@/features/getPersonFullView";
import { Page } from "@/widgets/Page";

const ViewPersonPage = memo(() => {
    const {id} = useParams<{id: string}>();
    if (!id)  {throw new Error('Id сотрудника для отображения страницы отсутствует')}
    const personStore = new PersonStore();

    return (
        <Page header="Страница просмотра информации о пользователе">
            <GetPersonFullView id={id}  personStore={personStore} type='view' />
        </Page>
    );
});

export default ViewPersonPage;
