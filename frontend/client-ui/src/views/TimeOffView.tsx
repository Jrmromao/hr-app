import {observer} from 'mobx-react-lite'
import React from 'react'
import {Grid, Segment, Table} from 'semantic-ui-react'
import CompanyLayout from '../layout/CompanyLayout'
import EmployeeLayout from '../layout/EmployeeLayout'


const TimeOffView: React.FC = () => {
    return (
        <CompanyLayout>

            <Segment>
                Details on the employees upcoming FTO
            </Segment>


        </CompanyLayout>
    )
}

export default observer(TimeOffView)