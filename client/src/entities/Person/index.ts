import PersonStore from './model/store/personStore';

export { PersonStore };
export type { Person, PersonDetales, PersonSearched } from './model/types/person';
export type { Favorites } from './model/types/favorites';
export { fetchPerson } from './model/services/fetchPerson';
export { fetchPersonDetales } from './model/services/fetchPersonDetales';
export { fetchFavorites } from './model/services/fetchFavorites';

export { PersonViewCard } from './ui/PersonViewCard/PersonViewCard/PersonViewCard';
export { PersonSearchCard } from './ui/PersonSearchCard/PersonSearchCard';
export { PersonFullView } from './ui/PersonFullView/PersonFullView';
export { searchPersons } from './model/services/searchPersons';
