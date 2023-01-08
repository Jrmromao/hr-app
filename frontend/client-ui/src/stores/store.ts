import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EmployeeStore from "./EmployeeStore";
import LayoutStore from "./LayoutStore";
import ModalStore from "./modalStore";
import UserStore from "./UserStore";


interface Store {
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    employeeStore: EmployeeStore;
    layoutStore: LayoutStore;
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    employeeStore: new EmployeeStore(),
    layoutStore: new LayoutStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
