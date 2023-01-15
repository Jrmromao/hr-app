import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'
import CompanyLayout from '../layout/CompanyLayout'
import EmployeeLayout from '../layout/EmployeeLayout'


const TimeOffView: React.FC = () => {
    return (
        <CompanyLayout>
            <h1>Time Off</h1>
        </CompanyLayout>
    )
}

export default observer(TimeOffView)