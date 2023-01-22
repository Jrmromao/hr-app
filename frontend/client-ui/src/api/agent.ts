import { uuid } from "aws-sdk/clients/customerprofiles";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DepartmentFormData } from "../models/department";
import { EmployeeFormData } from "../models/employee";
import { OfficeFormData } from "../models/office";
import { RoleFormData } from "../models/role";
import { store } from "../stores/store";

axios.defaults.baseURL =
  "https://hezcs2pkd2.execute-api.us-east-1.amazonaws.com/prod/";

axios.interceptors.request.use((config: any) => {
  const token = store.userStore.user?.token;
  // config.headers = {
  //   "Content-type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "*",
  // };
  if (token) config.headers.Authorization = `${token}`;

  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const employee = {
  list: () => requests.get<any>("/employee-api"),
  getById: (id: uuid) => requests.get<any>(`/employee-api/${id}`),
  create: (data: EmployeeFormData) => requests.post<any>("/employee-api", data),
  update: () => requests.put<any>("/employee-api", {}),
  delete: () => requests.del<any>("/employee-api"),
};

const role = {
  list: () => requests.get<any>("/role-api"),
  create: (data: RoleFormData) => requests.post<any>("/role-api", data),
  update: () => requests.put<any>("/role-api", {}),
  delete: () => requests.del<any>("/role-api"),
};

const office = {
  list: () => requests.get<any>("/office-api"),
  create: (data: OfficeFormData) => requests.post<any>("/office-api", data),
  update: () => requests.put<any>("/office-api", {}),
  delete: () => requests.del<any>("/office-api"),
};

const department = {
  list: () => requests.get<any>("/api"),
  create: (data: DepartmentFormData) =>
    requests.post<any>("/api", data),
  update: () => requests.put<any>("/api", {}),
  delete: () => requests.del<any>("/api"),
};
const agent = {
  employee,
  role,
  office,
  department,
};

export default agent;
