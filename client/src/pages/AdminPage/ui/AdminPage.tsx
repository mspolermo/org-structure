import { memo } from 'react';

import { GetAdmin } from '@/features/getAdmin';
import { Page } from "@/widgets/Page";

const AdminPage = memo(() => {

    return (
        <Page header='Страница администрирования'>   
            <GetAdmin />
        </Page>
    );
});

export default AdminPage;
