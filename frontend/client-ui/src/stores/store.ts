import { createContext, useContext } from "react";
import UserStore from "./UserStore";


interface Store {
    userStore: UserStore;
}

export const store: Store = {
    userStore: new UserStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}