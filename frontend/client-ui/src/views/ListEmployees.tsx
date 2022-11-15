import { observer } from 'mobx-react-lite'
import React from 'react'
import RegisterEmployeeForm from '../common/forms/RegisterEmployeeForm'
import ManageEmployeeLayout from '../layout/ManageEmployeeLayout'

const RegisterEmployee: React.FC = () => {
    return (
        <ManageEmployeeLayout>List Employees</ManageEmployeeLayout>
    )
}

export default observer(RegisterEmployee)