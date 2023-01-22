import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Menu, Search, Table, Image, Button, Segment } from 'semantic-ui-react'
import NewEmployeeForm from '../components/common/forms/NewEmployeeForm'
import BasicLayout from '../layout/BasicLayout'
import EmployeeLayout from '../layout/EmployeeLayout'
import MainLayout from '../layout/MainLayout'
import { useStore } from '../stores/store'
import userIcon from '/assets/icons/person-plus-fill.png'


const ManageEmployeeView: React.FC = () => {
  const { modalStore } = useStore();

  return (<EmployeeLayout active='employee'>

    <h2>Employee</h2>
    <Grid>
      <Grid.Row columns='3'>
        <Grid.Column width={6}>
          <Segment color='green' >
            <Search />
          </Segment>

        </Grid.Column>
        <Grid.Column width={7}>
          <Segment color='red' />
        </Grid.Column>
        <Grid.Column width={3}>
          <Segment color='blue'>

            <Button icon='plus' onClick={() => modalStore.openModal(<NewEmployeeForm/>)} />
          </Segment>
        </Grid.Column>
      </Grid.Row>


      <Grid.Row columns={3}>
        <Grid.Column>
          <p>Filter List</p>
        </Grid.Column>
        <Grid.Column>
          <p>Filter List</p>
        </Grid.Column>
      </Grid.Row>

    </Grid>


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
  </EmployeeLayout>)
}

export default observer(ManageEmployeeView)