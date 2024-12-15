import PersonStore from './model/store/personStore';

export { PersonStore };
export type { Person, PersonDetales, PersonSearched } from './model/types/person';

export { fetchPerson } from './model/services/fetchPerson';
export { fetchPersonDetales } from './model/services/fetchPersonDetales';

export { PersonViewCard } from './ui/PersonViewCard/PersonViewCard/PersonViewCard';
export { PersonSearchCard } from './ui/PersonSearchCard/PersonSearchCard';
export { PersonFullView } from './ui/PersonFullView/PersonFullView';
export { searchPersons } from './model/services/searchPersons';
