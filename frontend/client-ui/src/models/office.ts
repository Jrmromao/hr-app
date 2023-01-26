import {uuid} from "aws-sdk/clients/customerprofiles";

export interface OfficeFormData {
    officeId: uuid
    name: string
}