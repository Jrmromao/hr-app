import {uuid} from "aws-sdk/clients/customerprofiles";

export interface EmployeeMenuItem {
    label: string;
    formModal: JSX.Element;
}



export interface Employee{
    employee_id?: uuid;
    company_id?: uuid;
    date_joined: string
    social_security: string
    staff_number: string
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth?: Date;

}


export interface EmployeeFormData {
    employee_id?: uuid;
    company_id?: uuid;
    first_name: string;
    last_name: string;
    gross_salary?: number;
    email_address: string;
    date_of_birth?: Date;
    department?: Department;
    team?: string;
    gender?: string;
    office?: string;
    role?: Role;
    staff_number: string;
    address?: Address
}

export interface Department {
    name: string;
    location: string;
    workingHours: number;
}

export interface Address {
    line1: string;
    line2: string
    city: string
    postcode: string
    country: string
}


export interface Role {
    name: string;
    level: string
}