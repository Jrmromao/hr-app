import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";

axios.defaults.baseURL = 'https://1y0sb2otl7.execute-api.us-east-1.amazonaws.com/prod';


axios.interceptors.request.use((config: any) => {
    const token = store.userStore.user?.token
    if (token) config.headers.Authorization = `${token}`;
    return config;
  });

  const responseBody = <T>(response: AxiosResponse<T>) => response.data;

  const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };


  const employee = {
    list: () => requests.get<any>("/api"),
    create: () => requests.post<any>("/api", {}),
    update: () => requests.put<any>("/api", {}),
    delete: () => requests.del<any>("/api"),
  };
const agent = {
 employee
}

export default agent;