import { departmentStore } from "@/features/getDepartment";
import { searchPanelStore } from "@/widgets/Topbar";

import rootStore from "../rootStore/rootStore";

// тут хранятся все однократно вызванные сторы (не служебного назначения)

class StoreProvider {
    rootStore = rootStore;
    departmentStore = departmentStore;
    searchPanelStore = searchPanelStore;
}

export default StoreProvider;
