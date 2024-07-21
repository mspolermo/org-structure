import { memo } from "react";
import { useParams } from "react-router-dom";

import { GetDepartment } from "@/features/getDepartment";
import { Page } from "@/widgets/Page";

const DepartmentPage = memo(() => {
    const {id} = useParams<{id: string}>();

    if (!id)  {throw new Error('Id отдела для отображения страницы отсутствует')}

    return (
        <Page>
            <GetDepartment id={id}/>
        </Page>
    );
});

export default DepartmentPage;
