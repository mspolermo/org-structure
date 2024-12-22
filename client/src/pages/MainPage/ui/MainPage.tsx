import { memo } from 'react';

import { GetNotificationsEditView } from '@/features/getNotificationsEditView';
import { Page } from "@/widgets/Page";


const MainPage = memo(() => {
    return (
        <Page header='Главная страница'>

            <GetNotificationsEditView />

        </Page>
    );
});

export default MainPage;
