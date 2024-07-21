/**
 * Проверка на наличии авторизации в приложении (в случае отстутствия - редирект на главную страницу)
*/

import { Navigate, useLocation } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { getRouteMain } from '@/shared/const/router';


interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { rootStore }= useStoreProvider();

    const auth = rootStore.auth;
    const location = useLocation();

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    return children;
}
