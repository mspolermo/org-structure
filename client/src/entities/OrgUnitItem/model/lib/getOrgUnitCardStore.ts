import { OrgUnitStore, OrgUnitViewStore } from '@/entities/OrgUnitItem';

/** 
* Функция проверки существует ли mobX стор со связкой id оргЮнита и статусов. 
Если да - возвращает его, если нет - создаёт новый.
* @param {string} id - Уникальный ID дочернего стора
* @param {OrgUnitStore} store - Глобальный стор
* @returns {OrgUnitViewStore} - Возвращает стор или создаёт новый
*/
export function getOrgUnitCardStore(id: string, store: OrgUnitStore):OrgUnitViewStore {
    const existStore = store?.getStore(id);
    if (existStore) return existStore;

    return createOrgUnitCardStore(id, store);
}

/** 
* Функция создания объекта с id и mobXSote со статусами открытия карточки\списка персон. 
* @param {string} id - Уникальный ID дочернего стора
* @param {OrgUnitStore} store - Глобальный стор
* @returns {OrgUnitViewStore} - Возвращает стор или создаёт новый
*/
export function createOrgUnitCardStore(id: string, store: OrgUnitStore):OrgUnitViewStore {
    const orgUnitCard = new OrgUnitViewStore();
    store.addOrgUnitCard({id: id, store: orgUnitCard });

    return orgUnitCard
}