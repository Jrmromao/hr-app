import {makeAutoObservable, runInAction, action} from "mobx";
import {useNavigate} from "react-router-dom";
import agent from "../api/agent";
import {User, UserFormValues} from "../models/user";
import {AuthService} from "../services/AuthService";
import {store} from "./store";
import {History} from "history";
import {Auth} from "aws-amplify";
import AWS from "aws-sdk";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {CognitoUser} from "@aws-amplify/auth";
import {EmployeeFormData} from "../models/employee";
import {RoleFormData} from "../models/role";

export default class SideDrawerStore {

    sidebarOpen: boolean = false

    constructor() {
        makeAutoObservable(this);
    }
    open = async () => {
        try {
            this.sidebarOpen = true
        } catch (error) {
            console.error(error);
        }

        return;
    };
    close = async () => {
        try {
            this.sidebarOpen = !this.sidebarOpen
        } catch (error) {
            console.error(error);
        }

        return;
    };
}
