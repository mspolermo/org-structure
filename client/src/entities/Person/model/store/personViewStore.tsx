/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { personDetails } from '../types/person';


class PersonViewStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        cardOpeningStatus:boolean = false;
        personFast?: IPromiseBasedObservable<personDetails>;
    @action
        updateCardOpeningStatus(newStatus: boolean) {
            this.cardOpeningStatus = newStatus
        }
        updatePersonFast(newPerson: PromiseLike<personDetails>) {
            this.personFast = fromPromise(newPerson, this.personFast)
        }
}

export default PersonViewStore;