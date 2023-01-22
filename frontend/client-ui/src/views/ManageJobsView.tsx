import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Grid, Search, Segment, Table } from 'semantic-ui-react'
import EmployeeLayout from '../layout/EmployeeLayout'


const ManageJobsView: React.FC = () => {
    return (
        <EmployeeLayout active='jobs' itemLabel='New job'>

            <h2>Job</h2>
            <Grid>


                <Grid.Row columns='2'>
                    <Grid.Column width={6}><Search style={{ width: '100% !important' }} /></Grid.Column>
                    <Grid.Column width={10}>
                    </Grid.Column>
                </Grid.Row>

                <Button />



                <Grid.Row columns='1'>
                    <Grid.Column width={16}>

                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Registration Date</Table.HeaderCell>
                                    <Table.HeaderCell>E-mail address</Table.HeaderCell>
                                    <Table.HeaderCell>Premium Plan</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>John Lilki</Table.Cell>
                                    <Table.Cell>September 14, 2013</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell>No</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Jamie Harington</Table.Cell>
                                    <Table.Cell>January 11, 2014</Table.Cell>
                                    <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                                    <Table.Cell>Yes</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Jill Lewis</Table.Cell>
                                    <Table.Cell>May 11, 2014</Table.Cell>
                                    <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                                    <Table.Cell>Yes</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </EmployeeLayout>
    )
}

export default observer(ManageJobsView)