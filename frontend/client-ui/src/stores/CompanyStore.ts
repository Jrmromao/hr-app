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
import {SignUpFormData} from "../models/company";

export default class CompanyStore {
    user: User | null = null;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    // get
    list = async () => {
        try {
            const result = await agent.company.list();
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };
    // create
    signUp = async (data: SignUpFormData) => {
        try {
            const result = await agent.company.create(data);
            console.log('CompanyStore::signUp() ',result)
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };
    // update
    update = async (id: string) => {
        try {
            const result = await agent.company.update();
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };
    // delete
    delete = async () => {
        try {
            const result = await agent.company.delete();
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };
}
