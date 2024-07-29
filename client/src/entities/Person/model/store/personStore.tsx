/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { Person, PersonDetales } from '../types/person';

class PersonStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        cardOpeningStatus:boolean = false; // стейт для статуса сворачивания\разворачивания карточки
        person?: IPromiseBasedObservable<Person>; // стейт для подгруженных данных о сотруднике
        personDetales?: IPromiseBasedObservable<PersonDetales> // стейт для подгруженных данных о деталях сотрудника
    @action
        updateCardOpeningStatus(newStatus: boolean) {
            this.cardOpeningStatus = newStatus
        }

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

export default PersonStore;