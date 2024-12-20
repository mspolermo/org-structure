export type { User, UserRole } from './model/types/user';
export type { Favorites } from './model/types/favorites';

export { authLogin } from './model/services/authLogin'
export { fetchFavorites } from './model/services/fetchFavorites';
export { addToFavorites } from './model/services/addToFavorites';
export { deleteFavorite } from './model/services/deleteFavorite';
export { getAllUserRoles } from './model/services/getAllUserRoles'
