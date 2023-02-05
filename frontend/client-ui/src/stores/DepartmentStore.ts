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
import { DepartmentFormData } from "../models/department";
import { v4 as uuidv4 } from 'uuid';

export default class DepartmentStore {
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
      const result = await agent.department.list();
      return result;
    } catch (error) {
      console.log(error);
    }

    return;
  };
  // create
  create = async (data: DepartmentFormData) => {
    try {
      data.departmentId = uuidv4();
      data.name = 'IT'
      const result = await agent.department.create(data);
 
      return result;

    } catch (error) {
      console.log(error);
    }

    return;
  };
  // update
  update = async () => {
    try {
      const result = await agent.department.update();
      return result;
    } catch (error) {
      console.log(error);
    }

    return;
  };
  // delete
  delete = async (id: string) => {
    try {
      const result = await agent.department.delete();
      return result;
    } catch (error) {
      console.log(error);
    }

    return;
  };
}


