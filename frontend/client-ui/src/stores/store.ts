import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DepartmentStore from "./DepartmentStore";
import EmployeeStore from "./EmployeeStore";
import LayoutStore from "./LayoutStore";
import ModalStore from "./modalStore";
import OfficeStore from "./OfficeStore";
import RoleStore from "./RoleStore";
import UserStore from "./UserStore";


interface Store {
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    employeeStore: EmployeeStore;
    layoutStore: LayoutStore;
    roleStore: RoleStore;
    departmentStore: DepartmentStore;
    officeStore: OfficeStore
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    employeeStore: new EmployeeStore(),
    layoutStore: new LayoutStore(),
    roleStore: new RoleStore(),
    departmentStore: new DepartmentStore(),
    officeStore: new OfficeStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
