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

export default class LayoutStore {
 
  dropdownOpened: boolean = false



  constructor() {
    makeAutoObservable(this);
  }
  onCompanyDropdownClick = async () => {
    try {

      this.dropdownOpened = !this.dropdownOpened
      
    } catch (error) {
      console.log(error);
    }

    return;
  };
}
