import { makeAutoObservable, reaction } from "mobx"; 
import { IServerError } from "../models/errorModels";
import {Auth} from 'aws-amplify'
import { store } from "./store";

export default class CommonStore {
    
    error: IServerError | null = null;
    appLoaded = false;
 
     constructor() {
        makeAutoObservable(this);

        // reaction(
        //     () => store.userStore.user,
        //     async user => {
        //         if (!user) {
        //              await store.userStore.getUser()
        //         } else {
        //             console.log('User logged in: ', user);
                    
        //         }
        //     }
        // )
    }
    
    setServerError = (error: IServerError) => {
        this.error = error;
    }
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}