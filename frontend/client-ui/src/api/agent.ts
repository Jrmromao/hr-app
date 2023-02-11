import {uuid} from "aws-sdk/clients/customerprofiles";
import axios, {AxiosError, AxiosResponse} from "axios";
import {DepartmentFormData} from "../models/department";
import {Employee, EmployeeFormData} from "../models/employee";
import {OfficeFormData} from "../models/office";
import {RoleFormData} from "../models/role";
import {store} from "../stores/store";
import {SignUpFormData} from "../models/company";

axios.defaults.baseURL =
    "https://hezcs2pkd2.execute-api.us-east-1.amazonaws.com/prod";

axios.interceptors.request.use((config: any) => {
    const token = store.userStore.user?.token;

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
    list: (companyId: string) => requests.get<Employee[]>(`/employee-api/?companyId=${companyId}`),
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
    list: () => requests.get<any>("/department-api"),
    create: (data: DepartmentFormData) =>
        requests.post<any>("/department-api", data),
    update: () => requests.put<any>("/department-api", {}),
    delete: () => requests.del<any>("/department-api"),
};

const company = {
    list: () => requests.get<any>("/company-api"),
    create: (data: SignUpFormData) =>
        requests.post<any>("/company-api", data),
    update: (id: string) => requests.put<any>(`/company-api/${id}`, {}),
    delete: () => requests.del<any>("/company-api"),
};

const agent = {
    employee,
    role,
    office,
    department,
    company
};

export default agent;
