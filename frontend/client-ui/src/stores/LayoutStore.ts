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
import { EmployeeMenuItem } from "../models/employee";

export default class LayoutStore {
  empDropdownOpened: boolean = false;
  fileDropdownOpened: boolean = false;
  compDropdownOpened: boolean = false;
  employeeMenuItem: EmployeeMenuItem | null = null;
  hasTableFlag: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // hasTable = async (flag: boolean) => {
  //   console.log('FLAG<--------');
    
  //   try {
  //     if (flag) this.hasTableFlag = true;
  //   } catch (error) {
  //     throw new Error("hasTable");
  //   }
  // };

  onMenuItemChange = async (label: string, modal: JSX.Element) => {
    this.hasTableFlag = true;
    switch (label) {
      case "jobs":
        this.employeeMenuItem = {
          label: "New Job",
          formModal: modal,
        };
        break;
      case "employee":
        this.employeeMenuItem = {
          label: "New Employee",
          formModal: modal,
        };
        break;
      default:
        break;
    }
  };
  onFilesDropdownClick = async () => {
    try {
      this.fileDropdownOpened = !this.fileDropdownOpened;
    } catch (error) {
      console.log(error);
    }
    return;
  };
  onEmployeeDropdownClick = async () => {
    try {
      this.empDropdownOpened = !this.empDropdownOpened;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  onCompanyDropdownClick = async () => {
    try {
      this.compDropdownOpened = !this.compDropdownOpened;
    } catch (error) {
      console.log(error);
    }
    return;
  };
}
