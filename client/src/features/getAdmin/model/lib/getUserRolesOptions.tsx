import { UserRole } from "@/entities/User";
import { ListBoxItem } from "@/shared/ui/Popups";

/**
 * Преобразование всех ролей пользователей ив формат опций для селекта ListBox
 * @param userRoles - доступные роли пользователя
 * @param currentUserRole - текущая роль пользователя
 * @returns массив опций для селекта ListBox
 */
export const gerUserRolesOptions = (
    userRoles: UserRole[] | undefined,
    currentUserRole: UserRole | undefined
): ListBoxItem<string>[] => {
    if (userRoles === undefined || currentUserRole === undefined) return []
    const rolesDataList: ListBoxItem<string>[] = userRoles.map((role) => {

        const item: ListBoxItem<string> = {
            disabled: role.value === currentUserRole.value,
            content: (<div>{role.value}</div>),
            value: role.value,
        };

        return item
    });

    return rolesDataList
}