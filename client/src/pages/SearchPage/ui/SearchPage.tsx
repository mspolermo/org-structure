import { memo } from "react";
import { useParams } from "react-router-dom";

import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";


const SearchPage = memo(() => {
    const { searchValue } = useParams<{searchValue: string}>();

    return (
        <Page
            header={`Результаты поиска по запросу: ${searchValue}`}
        >
            <Text text="TODO - Прикрутить серверный фетчинг данных"/>
        </Page>
    );
    
});

export default SearchPage;
