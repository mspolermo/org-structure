import { memo } from "react";

import { GetAuth } from "@/features/authUser";
import { Page } from "@/widgets/Page";

const AuthorizationPage = memo(() => {
    return (
        <Page header="Страница авторизации">
            <GetAuth />
        </Page>
    );
});

export default AuthorizationPage;
