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
export default class UserStore {
  user: User | null = null;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
    // const navigate = useNavigate();
    // navigate('login')
  }

  get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (creds: UserFormValues) => {
    const authService = new AuthService();
    await authService.login(creds.username, creds.password).then((user) => {
      // store.commonStore.setToken(user.token);
      this.user = user;
      store.modalStore.closeModal();
    });

    if (this.user)
      await authService.getAWSTemporaryCreds(this.user.cognitoUser);
  };

  logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      throw error;
    }
  };

  getUser = async () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.user = {
          cognitoUser: user as CognitoUser,
          userName: user.getUsername(),
          token: user.getSignInUserSession()!.getIdToken().getJwtToken(),
        };
      })
      .catch((error) => console.log(error));
  };

  register = async (creds: UserFormValues) => {
    try {
      // await agent.Account.register(creds);
      //   history.push(`/account/registerSuccess?email=${creds.email}`);
      // store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
