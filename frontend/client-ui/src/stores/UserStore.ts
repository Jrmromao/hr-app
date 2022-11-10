import { makeAutoObservable, runInAction } from "mobx";
import { useNavigate } from "react-router-dom";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { AuthService } from "../services/AuthService";
import { store } from "./store";
import { History } from "history";


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

  login = async (creds: UserFormValues) => {
    const authService = new AuthService();
    const user = await authService.login(creds.username, creds.password);

    if (user) {
      store.modalStore.closeModal();
 
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
  };

  getUser = async () => {
    try {
      // const user = await agent.Account.current();
      // store.commonStore.setToken(user.token);
      // runInAction(() => this.user = user);
      // this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
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
