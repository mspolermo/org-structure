/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { Person, PersonDetales } from '@/entities/Person';

class PersonEditStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        person?: IPromiseBasedObservable<Person>; // стейт для подгруженных данных о сотруднике
        personDetales?: IPromiseBasedObservable<PersonDetales> // стейт для подгруженных данных о деталях сотрудника

    @action
        updatePerson(newPerson: PromiseLike<Person> ) {
            this.person = fromPromise(newPerson, this.person)
        }

        clearPerson() {
            this.person = undefined;
        }

        updatePersonDetales(newDetales: PromiseLike<PersonDetales> ) {
            this.personDetales = fromPromise(newDetales, this.personDetales)
        }

        clearPersonDetales() {
            this.personDetales = undefined;
        }
}

const personEditStore = new PersonEditStore();
export default personEditStore;