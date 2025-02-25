import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { getRouteAuth } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';
import { VStack } from "@/shared/ui/Stack";
import { Toggle } from "@/shared/ui/Toggle";
import { Page } from "@/widgets/Page";

const SettingsPage = observer(() => {
    const { rootStore } = useStoreProvider();
    const navigate = useNavigate();
    const [isUserDev, setIsUserDev] = useState(false);

    useEffect(() => {
        // ожидание звершения загрузки через fetchUserNav (чтоб консоль не спамила)
        if (rootStore.user == undefined || rootStore.user.allowDeveloperTools == undefined) return 
        setIsUserDev(rootStore.user?.allowDeveloperTools)
    }, [rootStore, rootStore.userNavData?.state])

    const devModeHandler = useCallback((e: boolean) => (rootStore.updateDevMode(e)), [rootStore]);

    const logOut = useCallback(()=> {
        rootStore.updateAuth(null) 
        navigate(getRouteAuth())
    }, [navigate, rootStore]);

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
                <Button variant='outline-inverted' onClick={logOut}>Выйти из профиля</Button>
            </VStack>
        </Page>
    );
});

export default SettingsPage;
