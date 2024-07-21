import { memo } from "react";

import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";

const FavoritesPage = memo(() => {
    return (
        <Page header="Избранные контакты">
            <Text text="Cписок избранных контактов пуст"/>
        </Page>
    );
});

export default FavoritesPage;