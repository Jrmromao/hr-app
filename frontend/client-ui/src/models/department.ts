import { uuid } from "aws-sdk/clients/customerprofiles";

export interface DepartmentFormData{
    departmentId?: uuid;
    name: string;
}