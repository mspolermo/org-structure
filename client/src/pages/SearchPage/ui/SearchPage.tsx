import { memo } from "react";
import { useParams } from "react-router-dom";

import { GetPersonSearch } from "@/features/getPersonSearch";
import { Page } from "@/widgets/Page";


const SearchPage = memo(() => {
    const { searchValue } = useParams<{searchValue: string}>();

    return (
        <Page
            header={`Результаты поиска по запросу: ${searchValue}`}
        >
            <GetPersonSearch searchValue={searchValue} />
        </Page>
    );
    
});

export default SearchPage;
