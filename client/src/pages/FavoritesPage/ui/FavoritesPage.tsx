import { memo } from "react";

import { GetFavorites } from "@/features/getFavorites";
import { Page } from "@/widgets/Page";

const FavoritesPage = memo(() => {

    return (
        <Page header="Избранные контакты">
            <GetFavorites />
        </Page>
    );
});

export default FavoritesPage;
