import PersonStore from './model/store/personStore';

export { PersonStore };
export type { Person, PersonDetales, PersonSearched, PersonCreateData } from './model/types/person';

export { fetchPerson } from './model/services/fetchPerson';
export { fetchPersonDetales } from './model/services/fetchPersonDetales';
export { searchPersons } from './model/services/searchPersons';
export { createPerson } from './model/services/createPerson';

export { PersonViewCard } from './ui/PersonViewCard/PersonViewCard/PersonViewCard';
export { PersonSearchCard } from './ui/PersonSearchCard/PersonSearchCard';
export { PersonFullView } from './ui/PersonFullView/PersonFullView';
export { PersonCreationCard } from './ui/PersonCreationCard/PersonCreationCard';
