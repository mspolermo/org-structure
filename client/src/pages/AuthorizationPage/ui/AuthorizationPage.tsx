import { memo } from "react";

import { GetAuth } from "@/features/getAuth";
import { Page } from "@/widgets/Page";

const AuthorizationPage = memo(() => {
    return (
        <Page header="Страница авторизации">
            <GetAuth />
        </Page>
    );
});

export default AuthorizationPage;
