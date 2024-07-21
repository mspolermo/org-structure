import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from "@/shared/ui/Stack";
import { Toggle } from "@/shared/ui/Toggle";
import { Page } from "@/widgets/Page";

const SettingsPage = observer(() => {
    const { rootStore } = useStoreProvider();
    const [isUserDev, setIsUserDev] = useState(false);

    useEffect(() => {
        // ожидание звершения загрузки через fetchUserNav (чтоб консоль не спамила)
        if (rootStore.user == undefined || rootStore.user.allowDeveloperTools == undefined) return 
        setIsUserDev(rootStore.user?.allowDeveloperTools)
    }, [rootStore, rootStore.userNavData?.state])

    const devModeHandler = useCallback((e: boolean) => (rootStore.updateDevMode(e)), [rootStore]);

    return (
        <Page header='Настройки'>
            
            <VStack gap="16" style={{maxWidth: '300px'}}>
                {isUserDev && 
                    <Toggle
                        label="Режим разработчика"
                        value={rootStore.devMode}
                        onChange={devModeHandler}
                    />
                }
                <ThemeSwitcher />
            </VStack>
        </Page>
    );
});

export default SettingsPage;
