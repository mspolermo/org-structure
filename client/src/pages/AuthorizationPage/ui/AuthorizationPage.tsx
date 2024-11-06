import { memo } from "react";

import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";

const AuthorizationPage = memo(() => {
    return (
        <Page>
            <VStack max maxHeight align="center" justify="center">
                <Text title="Страница авторизации" />
            </VStack>
        </Page>
    );
});

export default AuthorizationPage;
