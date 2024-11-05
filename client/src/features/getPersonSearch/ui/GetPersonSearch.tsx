import { memo, useEffect, useState } from "react";

import { PersonSearched, PersonStore, PersonViewCard, searchPersons } from "@/entities/Person";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

interface Props {
    searchValue: string | undefined;
}

const GetPersonSearch = memo((props: Props) => {
    const { searchValue } = props

    const [searchData, setSearchData] = useState<PersonSearched[]>([])

    useEffect(() => {
        if (searchValue) {
            searchPersons(searchValue).then((data) => {
                setSearchData(data);
            }).catch((e) => {
                throw new Error(e)
            });
        }
    }, [searchValue]);

    return (
        <VStack gap="16" max >
            {searchData.length > 0 ? (
                searchData.map((person) => (
                    <PersonViewCard person={person} key={person.id} store={new PersonStore()}/>
                ))
            ) : (
                <Text text="Ничего не найдено" />
            )}
        </VStack>
    );
    
});

export default GetPersonSearch;
