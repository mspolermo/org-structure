import { useStoreProvider } from "@/app/providers/StoreProvider";
import { HStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { TextProps } from "@/shared/ui/Text/Text";


/**
 * Хук для установки значения (по клику на текст-ссылку) в виджет "строка поиска".
 * Все пропсы наследуются от компонента Text, но переопределяется isLink на true
*/

export const UseSearch = ( props: TextProps ) => {
    const { text, title } = props;
    const { searchPanelStore } = useStoreProvider();

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (title) {
            searchPanelStore.updateSearchLine(title)
        }
        if (text) {
            searchPanelStore.updateSearchLine(text)
        }
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
