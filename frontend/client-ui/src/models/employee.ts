export interface EmployeeMenuItem {
  label: string;
  formModal: JSX.Element;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  grossSalary: number;
  email: string;
  dateOfBirth?: Date;
  department?: Department;
  team?: string;
  gender?: string;
  office?: string;
  role?: Role;
  employeeNumb: string;
  address?: Address
}

export interface Department {
  name: string;
  location: string;
  workingHours: number;
}

export interface Address{
    line1: string;
    line2: string
    city: string
    postcode: string
    country: string
}


export interface Role{
  name: string;
  level: string
}