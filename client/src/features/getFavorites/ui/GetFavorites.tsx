import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from 'react';

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { PersonStore, PersonViewCard } from "@/entities/Person";
import { fetchFavorites } from "@/entities/User";
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";


export const GetFavorites = observer(() => {
    const { rootStore } = useStoreProvider();
    const favoritesList = rootStore.favorites
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const getFavorites = useCallback(async () => {
        if (rootStore.userNavData && rootStore.auth) {
            try {
                setIsLoading(true)
                const response = await fetchFavorites(rootStore.auth);
                rootStore.updateFavorites(response)
            } catch (e) {
                console.error("Ошибка при загрузке избранных контактов:", e);
                setError("Не удалось загрузить избранные контакты");
            } finally {
                setIsLoading(false)
            }
        }
    }, [rootStore]);

    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    if (isLoading) return (
        <VStack gap='16' max maxHeight align="center" justify="center">
            <Loader />
        </VStack>
    )

    if (error) return <Text text={error} />

    if (favoritesList.length === 0) {
        return <Text text="Список избранных контактов пуст" />;
    }

    return (
        <>
            {favoritesList.map((person) => (
                <PersonViewCard person={person} key={person.id} store={new PersonStore()} />
            ))}
        </>
    );
});
