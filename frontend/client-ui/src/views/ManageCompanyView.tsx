import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'
import CompanyLayout from '../layout/CompanyLayout'
import EmployeeLayout from '../layout/EmployeeLayout'


const ManageCompanyView: React.FC = () => {
    return (
        <CompanyLayout active='jobs' itemLabel='New job'>

    


        </CompanyLayout>
    )
}

export default observer(ManageCompanyView)