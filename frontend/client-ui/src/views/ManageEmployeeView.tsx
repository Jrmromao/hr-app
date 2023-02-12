import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {Grid, Search, Table, Button, Segment} from 'semantic-ui-react'
import NewEmployeeForm from '../components/common/forms/NewEmployeeForm'
import EmployeeLayout from '../layout/EmployeeLayout'
import {useStore} from '../stores/store'
import {Employee} from "../models/employee";

const ManageEmployeeView: React.FC = () => {
    const {modalStore, employeeStore} = useStore();
    const [empLoadingFlag, setEmpLoadingFlag] = useState(true)
    useEffect(() => {
        employeeStore.list('f8905237-1510-420e-bf6b-0ec6b288dd2b').then(r => setEmpLoadingFlag(false))
    }, [employeeStore]);
    return (<EmployeeLayout active='employee'>
        <Grid>
            <Grid.Row columns='3' color={'green'}>
                <Grid.Column width={6}>
                    <Segment color='green'>
                        <Search/>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Segment color='red'/>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Segment color='blue'>
                        <Button icon='plus' onClick={() => modalStore.openModal(<NewEmployeeForm/>)}/>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} color={'red'}>
                <Grid.Column>
                    <p>Filter List</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Filter List</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Filter List</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Segment loading={empLoadingFlag}>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Staff #</Table.HeaderCell>
                        <Table.HeaderCell>First name</Table.HeaderCell>
                        <Table.HeaderCell>Last name</Table.HeaderCell>
                        <Table.HeaderCell>Email address</Table.HeaderCell>
                        <Table.HeaderCell>Starting day</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell><strong>Action</strong></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employeeStore.employeeList.map((employee: Employee, index: number) =>
                        <Table.Row key={employee.first_name}>
                            <Table.Cell>{employee.staff_number}</Table.Cell>
                            <Table.Cell>{employee.first_name}</Table.Cell>
                            <Table.Cell>{employee.last_name}</Table.Cell>
                            <Table.Cell>{employee.email}</Table.Cell>
                            <Table.Cell>{employee.date_joined}</Table.Cell>
                            <Table.Cell>Active</Table.Cell>
                            <Table.Cell>edit/delete</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Segment>
    </EmployeeLayout>)
}

export default observer(ManageEmployeeView)