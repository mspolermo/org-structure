import { departmentStore } from "@/features/getDepartment";
import { personEditStore } from "@/features/getPersonEditView";
import { searchPanelStore } from "@/widgets/Topbar";

import rootStore from "../rootStore/rootStore";

// тут хранятся все однократно вызванные сторы (не служебного назначения)

class StoreProvider {
    rootStore = rootStore;
    departmentStore = departmentStore;
    personEditStore = personEditStore
    searchPanelStore = searchPanelStore;
}

export default StoreProvider;
