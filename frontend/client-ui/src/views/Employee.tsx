import { observer } from 'mobx-react-lite'
import React from 'react'
import BasicLayout from '../layout/BasicLayout'
import MainLayout from '../layout/MainLayout'

const Employee: React.FC = () => {
    return (
        <MainLayout>register-employee</MainLayout>
    )
}

export default observer(Employee)