import { makeAutoObservable, runInAction, action } from "mobx";
import { useNavigate } from "react-router-dom";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { AuthService } from "../services/AuthService";
import { store } from "./store";
import { History } from "history";
import { Auth } from "aws-amplify";
import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoUser } from "@aws-amplify/auth";
import { EmployeeFormData } from "../models/employee";

export default class OfficeStore {
  user: User | null = null;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
    // const navigate = useNavigate();
    // navigate('login')
  }

  // get
  list = async () => {
    try {
      const result = await agent.employee.list('');
      return result;
    } catch (error) {
      console.log(error);
    }

    return;
  };
  // create
  create = async (data: EmployeeFormData) => {
    try {
      const result = await agent.employee.create(data);


      console.log(result);
      
      return result;



    } catch (error) {
      console.log(error);
    }

    return;
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
