import {observer} from 'mobx-react-lite'
import '../styles/employeeView.css'
import React, {useEffect, useState} from 'react'
import {Grid, Search, Table, Button, Segment, Icon} from 'semantic-ui-react'
import EmployeeLayout from '../layout/EmployeeLayout'
import {useStore} from '../stores/store'
import {Employee} from "../models/employee";
import TableAction from "../components/common/TableAction";
import LoginForm from "../components/common/forms/LoginForm";


const ManageEmployeeView: React.FC = () => {
    const {employeeStore, sideDrawerStore} = useStore();
    const [empLoadingFlag, setEmpLoadingFlag] = useState(true)

    useEffect(() => {
        if (employeeStore.employeeList.length === 0)
            employeeStore.list('f8905237-1510-420e-bf6b-0ec6b288dd2b').then(r => setEmpLoadingFlag(false))
        else
            setEmpLoadingFlag(false)
    }, [employeeStore]);
    return (<EmployeeLayout active='employee'>




                <Icon name='user plus' size={'large'} link onClick={() => sideDrawerStore.open()}/>
        {/*      <Grid>*/}
        {/*    <Grid.Row columns={3}>*/}
        {/*        <Grid.Column>*/}
        {/*            <p>Filter List</p>*/}
        {/*        </Grid.Column>*/}
        {/*        <Grid.Column>*/}
        {/*            <p>Filter List</p>*/}
        {/*        </Grid.Column>*/}
        {/*        <Grid.Column>*/}
        {/*            <p>Filter List</p>*/}
        {/*        </Grid.Column>*/}
        {/*    </Grid.Row>*/}
        {/*</Grid>*/}
        <Segment loading={empLoadingFlag} className={'table-container'}>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Staff #</Table.HeaderCell>
                        <Table.HeaderCell>First name</Table.HeaderCell>
                        <Table.HeaderCell>Last name</Table.HeaderCell>
                        <Table.HeaderCell>Email address</Table.HeaderCell>
                        <Table.HeaderCell>Hire date</Table.HeaderCell>
                        <Table.HeaderCell>Company role</Table.HeaderCell>
                        <Table.HeaderCell>Team</Table.HeaderCell>
                        <Table.HeaderCell>System Role</Table.HeaderCell>
                        <Table.HeaderCell>Contract type</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employeeStore.employeeList.map((employee: Employee, index: number) =>
                        <Table.Row key={employee.first_name + index}>
                            <Table.Cell>{employee.staff_number}</Table.Cell>
                            <Table.Cell>{employee.first_name}</Table.Cell>
                            <Table.Cell>{employee.last_name}</Table.Cell>
                            <Table.Cell>{employee.email}</Table.Cell>
                            <Table.Cell>{employee.date_joined}</Table.Cell>
                            <Table.Cell>{employee.job_title}</Table.Cell>
                            <Table.Cell>{employee.team}</Table.Cell>
                            <Table.Cell>Admin</Table.Cell>
                            <Table.Cell>{employee.contract_type}</Table.Cell>
                            <Table.Cell><TableAction

                                itemId={employee.employee_id || ''}
                                viewPath={`/manage-employees/employee-profile/${employee.employee_id}`}
                                modalContent={<LoginForm/>}/></Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Segment>
    </EmployeeLayout>)
}

export default observer(ManageEmployeeView)