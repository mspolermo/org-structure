import { memo } from "react";

import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";

const ForbiddenPage = memo(() => {
    return (
        <Page>
            <VStack max maxHeight align="center" justify="center">
                <Text title="У вас нет доступа к данной странице" />
            </VStack>
        </Page>
    );
});

export default ForbiddenPage;
