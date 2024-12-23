import { UserNavType } from "@/entities/Navigation";
import { ListBoxItem } from "@/shared/ui/Popups";

const missedItem: ListBoxItem<string> = {
    disabled: false,
    content: <div>Отсутствует</div>,
    value: '',
}

/**
 * Преобразование всех групп ОргЮнитов из навигации в формат опций для селекта ListBox
 * @param userNav - навигация приложения
 * @param withMissing - вывести результат с опцией "Отсутствует"
 * @returns массив опций для селекта ListBox
 */
export const gerOrgUnitsOptions = (userNav: UserNavType | undefined, withMissing: boolean = false) => {
    const orgUnitsDataList: ListBoxItem<string>[] = userNav ? userNav.groups.flatMap(group => {

        const groupItem: ListBoxItem<string> = {
            disabled: false,
            content: (<div>{group.name.name}</div>),
            value: group.name.id,
        };

        const nestedItems: ListBoxItem<string>[] = group.items.map(item => ({
            disabled: false,
            content: <div>{item.name}</div>,
            value: item.id,
        }));

        return [groupItem, ...nestedItems];
    }) : [];

    const orgUnitsList: ListBoxItem<string>[] = [missedItem, ...orgUnitsDataList]

    return withMissing ? orgUnitsList : orgUnitsDataList
}