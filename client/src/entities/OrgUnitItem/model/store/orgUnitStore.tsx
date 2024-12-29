/* eslint-disable indent */
// Cоздатель стора оргЮнита (т.к. у него может быть множество вложенных оргюнитов, тут логика по управлению статусами сворачивания и разворачивания вложенных оргюнитов)
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { OrgUnitItem, OrgUnitsCardType } from '../types/orgUnitItem';

class OrgUnitStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        mainOrgUnit?: IPromiseBasedObservable<OrgUnitItem>; // стейт для подгруженных данных об отделах

        orgUnitsCards:OrgUnitsCardType[] = []; // статусы карточек Оргюнитов
        collapseAllOrgUnitCards: boolean = false; //общий статус сворачивания\разворачивания всех списков персон на странице

    @action
        updateMainOrgUnit(newData: PromiseLike<OrgUnitItem> ) {
            this.mainOrgUnit = fromPromise(newData, this.mainOrgUnit)
        }

        clearMainOrgUnit() {
            this.mainOrgUnit = undefined;
            this.collapseAllOrgUnitCards = false;
            this.orgUnitsCards = [];
        }

        getStore (id:string) {
            const index = this.orgUnitsCards.findIndex(card => card.id === id)
            if (index !== -1) return this.orgUnitsCards[index].store
            return null
        }


        addOrgUnitCard(newOrgUnit: OrgUnitsCardType) {
            this.orgUnitsCards.push(newOrgUnit)
        }

        updateCollapseAllOrgUnitCards(newStatus: boolean) {
            this.collapseAllOrgUnitCards = newStatus;
            this.orgUnitsCards.forEach(card => {
                card.store.updateIsPersonsCollapsed(newStatus)
                if (newStatus) card.store.updateCardOpeningStatus(false)
        });
        }
}

export default OrgUnitStore;
