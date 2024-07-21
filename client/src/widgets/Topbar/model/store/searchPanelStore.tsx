/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';

class SearchPanelStore {
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @observable 
        searchLine: string | undefined = undefined;
    @action
        clearSearchLine() {
            this.searchLine = undefined;
        }
        updateSearchLine (newSearchLine: string) {
            this.searchLine = newSearchLine;
        }
}

const searchPanelStore = new SearchPanelStore();
export default searchPanelStore;