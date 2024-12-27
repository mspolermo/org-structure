import { useEffect, useState } from "react";

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { UserRole } from "@/entities/User";

/**
 * Хук для проверки наличия роли у пользователя
 * @param roleValue - value роли для поиска
 * @returns boolean
*/
const useCheckRoles = (roleValue: string) => {
    const { rootStore } = useStoreProvider();
    const [userRoles, setUserRoles] = useState<UserRole[]>(rootStore.user?.roles ?? [])

    useEffect(() => {
        setUserRoles(rootStore.user?.roles ?? [])
    }, [rootStore.user?.roles])

    return userRoles.some((role) => role.value === roleValue);
}

export default useCheckRoles
