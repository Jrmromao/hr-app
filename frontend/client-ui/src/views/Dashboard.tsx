import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Grid, Image, Segment} from "semantic-ui-react";
import BasicLayout from "../layout/BasicLayout";
import MainLayout from "../layout/MainLayout";
// import AboutYou from "../components/AboutYou";
// import DashboardStatus from "../components/DashboardStatus";
// import ManageMenu from "../components/ManageMenu";
import {useStore} from "../stores/store";

export default observer(function Dashboard() {
    const {userStore, employeeStore, departmentStore, companyStore} = useStore();

    const history = useNavigate();
    const [list, setList] = useState([])
    const [create, setCreate] = useState('')
    const [update, setUpdate] = useState('')
    const [del, setDel] = useState('')



    return (
        <MainLayout>
            <Grid columns={5}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment color='teal'> Calling the list api endpoint:{list}</Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color='red'> Calling the create api endpoint: {create}</Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color='green'>Calling the create api endpoint: {update}</Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color='blue'> Calling the list api endpoint:{list}</Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color='yellow'>Calling the del api endpoint: {del}</Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>


            <h1>Dashboard</h1>
        </MainLayout>
    )
});