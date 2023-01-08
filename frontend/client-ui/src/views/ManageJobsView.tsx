import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'
import EmployeeLayout from '../layout/EmployeeLayout'


const Jobs: React.FC = () => {
    return (
        <EmployeeLayout active='jobs' itemLabel='New job'>

            <Grid>
                <Grid.Row columns='2'>
                    <Grid.Column width={6}>The jobs are specific activities that contribute to the company’s goals, like a software engineer or a sales executive.</Grid.Column>
                    <Grid.Column width={10}>
                        <Segment color='red' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns='1'>
                    <Grid.Column width={16}>

                        <Table singleLine>
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

export default observer(Jobs)