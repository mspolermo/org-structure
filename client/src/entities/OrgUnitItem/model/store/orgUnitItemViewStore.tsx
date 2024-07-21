/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';

class OrgUnitViewStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        cardOpeningStatus:boolean = false;
        isPersonsCollapsed: boolean = false;
    @action
        updateCardOpeningStatus(newStatus: boolean) {
            this.cardOpeningStatus = newStatus
        }
        updateIsPersonsCollapsed(newStatus: boolean) {
            this.isPersonsCollapsed = newStatus
        }
}

export default OrgUnitViewStore;