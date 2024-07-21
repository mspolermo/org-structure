import { memo } from "react";

import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";

const NotFoundPage = memo(() => {
    return (
        <Page>
            <VStack max maxHeight align="center" justify="center">
                <Text title="Страница не найдена"/>
            </VStack>
        </Page>
    );
});

export default NotFoundPage;