import { memo, useCallback, useEffect, useState } from "react";

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { PersonStore, PersonViewCard } from "@/entities/Person";
import { Favorites, fetchFavorites } from "@/entities/User";
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";

const FavoritesPage = memo(() => {
    const { rootStore } = useStoreProvider();
    const [favoritesList, setFavoritesList] = useState<Favorites>();
    const [error, setError] = useState<string | null>(null);

    const getFavorites = useCallback(async () => {
        if (rootStore.userNavData && rootStore.auth) {
            try {
                const response = await fetchFavorites(rootStore.auth);
                setFavoritesList(response);
            } catch (e) {
                console.error("Ошибка при загрузке избранных контактов:", e);
                setError("Не удалось загрузить избранные контакты");
            }
        }
    }, [rootStore.auth, rootStore.userNavData]);

    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    console.log(favoritesList);

    return (
        <Page header="Избранные контакты">
            {error && <Text text={error} />}
            {favoritesList && favoritesList.length > 0 ? (
                <>
                    {favoritesList.map((favorite) => (
                        <PersonViewCard person={favorite.person} key={favorite.person.id} store={new PersonStore()}/>
                    ))}
                </>
            ) : (
                <Text text="Список избранных контактов пуст" />
            )}
        </Page>
    );
});

export default FavoritesPage;
