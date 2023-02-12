import { uuid } from "aws-sdk/clients/customerprofiles";

export interface RoleFormData{
    roleId?: uuid;
    name: string
}