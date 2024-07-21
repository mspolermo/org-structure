/**
    * Роуты приложения
*/

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    DEPARTMENT = 'department',
    EDIT_PERSON = 'edit_person',
    EDIT_ORGUNIT = 'edit_orgunit',
    FAVORITES = 'favorites',
    SETTINGS = 'settings',
    SEARCH = 'search',
    NOT_FOUND = 'not_found',
    FORBIDDEN = 'forbidden'
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteDepartment = (id:string) => `/department/${id}`;
export const getRouteEditPerson = (id:string) => `/edit/person/${id}`;
export const getRouteEditOrgUnit = (id:string) => `/edit/orgunit/${id}`;
export const getRouteFavorites = () => '/favorites';
export const getRouteSettings = () => '/settings';
export const getRouteSearch = ( searchValue:string ) => `/search/${searchValue}`;
export const getRouteNotFound = () => '/not_found';
export const getRouteForbidden = () => '/forebidden';


export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteDepartment(':id')]: AppRoutes.DEPARTMENT,
    [getRouteEditPerson(':id')]: AppRoutes.EDIT_PERSON,
    [getRouteEditOrgUnit(':id')]: AppRoutes.EDIT_ORGUNIT,
    [getRouteFavorites()]: AppRoutes.FAVORITES,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteSearch(':searchValue')]: AppRoutes.SEARCH,
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
