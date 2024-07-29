import { OrgUnitStore } from "@/entities/OrgUnitItem";
import { searchPanelStore } from "@/widgets/Topbar";

import RootStore from "../rootStore/rootStore";


// тут хранятся все однократно вызванные сторы (не служебного назначения)

class StoreProvider {
    rootStore = new RootStore();
    orgUnitStore = new OrgUnitStore();
    searchPanelStore = searchPanelStore;
}

export default StoreProvider;
