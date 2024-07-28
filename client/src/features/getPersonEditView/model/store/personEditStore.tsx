/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { Person } from '@/entities/Person';

class PersonEditStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        personEditData?: IPromiseBasedObservable<Person>; // стейт для подгруженных данных о сотруднике

    @action
        updatePersonEditData(newData: PromiseLike<Person> ) {
            this.personEditData = fromPromise(newData, this.personEditData)
        }

        clearPersonEditData() {
            this.personEditData = undefined;
        }

}

const personEditStore = new PersonEditStore();
export default personEditStore;