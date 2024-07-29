/* eslint-disable indent */
// Cоздатель стора с хранением значения статуса карточки одного оргЮнита и его списка персон (развернутые\свернутые)

import { observable, action, makeAutoObservable } from 'mobx';

class OrgUnitViewStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        cardOpeningStatus:boolean = false; //статус разворачивания карточки
        isPersonsCollapsed: boolean = false; //статус разворачивания списка персон
    @action
        updateCardOpeningStatus(newStatus: boolean) {
            this.cardOpeningStatus = newStatus
        }
        updateIsPersonsCollapsed(newStatus: boolean) {
            this.isPersonsCollapsed = newStatus
        }
}

export default OrgUnitViewStore;