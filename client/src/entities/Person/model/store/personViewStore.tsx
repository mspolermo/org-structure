/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';

class PersonViewStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        cardOpeningStatus:boolean = false;
    @action
        updateCardOpeningStatus(newStatus: boolean) {
            this.cardOpeningStatus = newStatus
        }
}

export default PersonViewStore;