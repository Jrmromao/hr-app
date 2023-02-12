import {observer} from 'mobx-react-lite'
import React from 'react'
import {Grid, Segment, Table} from 'semantic-ui-react'
import CompanyLayout from '../layout/CompanyLayout'


interface IProps{
    employeeId?: string
}

const EmployeeProfileView: React.FC<IProps> = ({employeeId}) => {
    return (
        <CompanyLayout>

            <Segment>
                EmployeeProfileView
            </Segment>


        </CompanyLayout>
    )
}

export default observer(EmployeeProfileView)