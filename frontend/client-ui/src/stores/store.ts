import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EmployeeStore from "./EmployeeStore";
import ModalStore from "./modalStore";
import UserStore from "./UserStore";


interface Store {
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    employeeStore: EmployeeStore;
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    employeeStore: new EmployeeStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}