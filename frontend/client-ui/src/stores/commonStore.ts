import { makeAutoObservable, reaction } from "mobx"; 
import { IServerError } from "../models/errorModels";
import {Auth} from 'aws-amplify'


export default class CommonStore {
    
    error: IServerError | null = null;
    appLoaded = false;

     constructor() {
        makeAutoObservable(this);
    }
    
    setServerError = (error: IServerError) => {
        this.error = error;
    }
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}