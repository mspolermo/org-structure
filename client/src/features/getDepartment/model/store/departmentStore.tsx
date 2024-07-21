/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { OrgUnitItem } from '@/entities/OrgUnitItem';

import { orgUnitsCardType } from '../types/types';


class DepartmentStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        departmentsData?: IPromiseBasedObservable<OrgUnitItem>; // стейт для подгруженных данных об отделах

        orgUnitsCards:orgUnitsCardType[] = []; // статусы карточек Оргюнитов
        collapseAllOrgUnitCards: boolean = false; //общий статус сворачивания\разворачивания всех списков персон на странице

    @action
        updateDepartmentsData(newData: PromiseLike<OrgUnitItem> ) {
            this.departmentsData = fromPromise(newData, this.departmentsData)
        }

        clearDepartmentsData() {
            this.departmentsData = undefined;
            this.collapseAllOrgUnitCards = false;
            this.orgUnitsCards = [];
        }

        getStore (id:string) {
            const index = this.orgUnitsCards.findIndex(card => card.id === id)
            if (index !== -1) return this.orgUnitsCards[index].store
            return null
        }


        addOrgUnitCard(newOrgUnit: orgUnitsCardType) {
            this.orgUnitsCards.push(newOrgUnit)
        }

        updateCollapseAllOrgUnitCards(newStatus: boolean) {
            this.collapseAllOrgUnitCards = newStatus;
            this.orgUnitsCards.forEach(card => card.store.updateIsPersonsCollapsed(newStatus));
        }
}

const departmentStore = new DepartmentStore();
export default departmentStore;