/**
 * Хук, отображающий элемент ScrollToTopButton для определенных роутов (вкладывается в тулбар приложения)
*/

import { ReactElement } from 'react';

import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { Toolbar } from '@/widgets/Toolbar';

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.DEPARTMENT]: <Toolbar collapseAllOrgUnitsBtn/>,
        [AppRoutes.ABOUT]: <Toolbar />,
        [AppRoutes.EDIT_PERSON]: <Toolbar scrollToTopBtn={false} toPreviousPageBtn/>,
        [AppRoutes.EDIT_ORGUNIT]: <Toolbar scrollToTopBtn={false} toPreviousPageBtn/>
    };

    return toolbarByAppRoute[appRoute];
}
