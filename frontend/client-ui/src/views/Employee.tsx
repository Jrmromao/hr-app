import { observer } from 'mobx-react-lite'
import React from 'react'
import BasicLayout from '../layout/BasicLayout'
import ManageEmployeeLayout from '../layout/ManageEmployeeLayout'

const Employee: React.FC = () => {
    return (
        <ManageEmployeeLayout>register-employee</ManageEmployeeLayout>
    )
}

export default observer(Employee)