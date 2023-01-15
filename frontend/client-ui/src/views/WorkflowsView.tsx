import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'
import CompanyLayout from '../layout/CompanyLayout'
import EmployeeLayout from '../layout/EmployeeLayout'


const WorkflowsView: React.FC = () => {
    return (
        <CompanyLayout>
            <h1>WorkflowsView</h1>
        </CompanyLayout>
    )
}

export default observer(WorkflowsView)