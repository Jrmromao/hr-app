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
import {Employee, EmployeeFormData} from "../models/employee";

export default class EmployeeStore {
    user: User | null = null;
    refreshTokenTimeout: any;
    employeeList: Employee[] = []

    formSubmitted: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    // get
    list = async (companyId: string) => {
        await agent.employee.list(companyId)
            .then(result => this.employeeList = result as Employee[])
            .catch(error => console.error(error))
    };
    // create
    create = async (data: EmployeeFormData) => {
        try {


            console.log(data)
            data.address = {
                address_line_1: data.address_line_1,
                address_line_2: data.address_line_2,
                city: data.city,
                postcode: data.postcode,
                country: data.country
            }
            const result = await agent.employee.create(data);
            if (result) {
                 await this.list(data.company_id as string)
                await store.sideDrawerStore.close();

            }
            return result


        } catch (error) {
            console.log(error);
        }
    };
    // update
    update = async () => {
        try {
            const result = await agent.employee.update();
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };
    // delete
    delete = async () => {
        try {
            const result = await agent.employee.delete();
            return result;
        } catch (error) {
            console.log(error);
        }

        return;
    };



}
