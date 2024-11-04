import { useStoreProvider } from "@/app/providers/StoreProvider";
import { HStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { TextProps } from "@/shared/ui/Text/Text";

interface UseSearchProps extends TextProps {
    searchData: string;
}

/**
 * Хук для установки значения (по клику на текст-ссылку) в виджет "строка поиска".
 * Все пропсы наследуются от компонента Text, но переопределяется isLink на true
 * @param searchData - данные вставляемые в поисковую строку
*/

export const UseSearch = ( { searchData, ...props }: UseSearchProps ) => {
    const { searchPanelStore } = useStoreProvider();

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        searchPanelStore.updateSearchLine(searchData)
    }

    return (
        <HStack>
            <Text
                {...props}
                isLink
                onClick={clickHandler}
            />
        </HStack>
    )
};
