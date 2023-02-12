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
    job_title: string
    contract_type: string
    address: Address
    team: string
}


export interface EmployeeFormData {
    employee_id?: string;
    company_id?: string;
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
    social_security: string
    contract_type: string
    job_title: string
    address?: Address
    address_line_1: string;
    address_line_2: string
    city: string
    postcode: string
    country: string
    phone_number: string
    nationality: string

}

export interface Department {
    name: string;
    location: string;
    workingHours: number;
}

export interface Address {
    address_line_1: string;
    address_line_2: string
    city: string
    postcode: string
    country: string
}

export const team = [
    {text: 'Dream team', value: 'dreat-team'},
    {text: 'Benfica', value: 'benfica'},
]

export const jobTitle = [
    {text: 'Developer', value: 'developer'},
    {text: 'HR analyst', value: 'hr-analyst'},
]

export const contract = [
    {text: 'Full-time', value: 'full-tine'},
    {text: 'Part-time', value: 'part-time'},
    {text: 'Fixed-term', value: 'fixed-term'},
    {text: 'Hourly', value: 'hourly'},
]




export interface Role {
    name: string;
    level: string
}