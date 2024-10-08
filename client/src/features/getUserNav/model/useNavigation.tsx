import { ReactElement, useLayoutEffect } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { fetchUserNav, Navpanel } from '@/entities/Navigation';
import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

import { aboutList } from '../const/aboutList';

export function useAppNavpanel() {
    const {rootStore} = useStoreProvider();
    useLayoutEffect( ()=> {
        if (!rootStore.userNavData) fetchUserNav(rootStore);
    }, [rootStore])

    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.MAIN]: <Navpanel/>,
        [AppRoutes.ABOUT]: <Navpanel localData={aboutList} />,
        [AppRoutes.DEPARTMENT]: <Navpanel/>,
        [AppRoutes.EDIT_PERSON]: <Navpanel/>,
        [AppRoutes.EDIT_ORGUNIT]: <Navpanel/>,
        [AppRoutes.FAVORITES]: <Navpanel/>,
        [AppRoutes.SETTINGS]: <Navpanel/>,
        [AppRoutes.SEARCH]: <Navpanel/>,
        [AppRoutes.NOT_FOUND]: <Navpanel/>,
        [AppRoutes.FORBIDDEN]: <Navpanel/>,
    };

    return toolbarByAppRoute[appRoute];
}
