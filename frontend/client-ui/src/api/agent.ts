import axios, { AxiosError, AxiosResponse } from "axios";
import { EmployeeFormData } from "../models/employee";
import { store } from "../stores/store";

axios.defaults.baseURL = 'https://hezcs2pkd2.execute-api.us-east-1.amazonaws.com/prod/';


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
    create: (employeeFormData: EmployeeFormData) => requests.post<any>("/api", employeeFormData),
    update: () => requests.put<any>("/api", {}),
    delete: () => requests.del<any>("/api"),
  };
const agent = {
 employee
}

export default agent;