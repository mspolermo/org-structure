/**
 * Конфигурация роутинга приложения (какую страницу отображать, по камому маршруту, есть ли требования по авторизации и пр.)
*/

import { AboutPage } from '@/pages/AboutPage';
import { AuthorizationPage } from '@/pages/AuthorizationPage';
import { DepartmentPage } from '@/pages/DepartmentPage';
import EditOrgUnitPage from '@/pages/EditOrgUnitPage/ui/EditOrgUnitPage';
import { EditPersonPage } from '@/pages/EditPersonPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SearchPage } from '@/pages/SearchPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ViewPersonPage } from '@/pages/ViewPersonPage';
import {
    AppRoutes,
    getRouteMain,
    getRouteAbout,
    getRouteEditPerson,
    getRouteForbidden,
    getRouteFavorites,
    getRouteDepartment,
    getRouteSettings,
    getRouteSearch,
    getRouteEditOrgUnit,
    getRouteViewPerson,
    getRouteAuth,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const RouteConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.DEPARTMENT]: {
        path: getRouteDepartment(':id'),
        element: <DepartmentPage />,
        authOnly: true
    },
    [AppRoutes.EDIT_PERSON]: {
        path: getRouteEditPerson(':id'),
        element: <EditPersonPage />,
        authOnly: true
    },
    [AppRoutes.VIEW_PERSON]: {
        path: getRouteViewPerson(':id'),
        element: <ViewPersonPage />,
        authOnly: true
    },
    [AppRoutes.EDIT_ORGUNIT]: {
        path: getRouteEditOrgUnit(':id'),
        element: <EditOrgUnitPage />,
        authOnly: true
    },
    [AppRoutes.FAVORITES]: {
        path: getRouteFavorites(),
        element: <FavoritesPage />,
        authOnly: true
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />
    },
    [AppRoutes.SEARCH]: {
        path: getRouteSearch(':searchValue'),
        element: <SearchPage />,
        authOnly: true
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: getRouteAuth(),
        element: <AuthorizationPage />
    },
};
