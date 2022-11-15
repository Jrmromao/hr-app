import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import BasicLayout from "../layout/BasicLayout";
// import AboutYou from "../components/AboutYou";
// import DashboardStatus from "../components/DashboardStatus";
// import ManageMenu from "../components/ManageMenu";
// import BasicLayout from "../layouts/BasicLayout";
import { useStore } from "../stores/store";

export default observer(function Dashboard() {
    const { userStore } = useStore();
    const history = useNavigate();

    useEffect(() => {
        if (!userStore.isLoggedIn)
            history('/')

    }, [userStore.isLoggedIn, history])

    return (
        <>
            <BasicLayout>
                <Grid>
                    <Grid.Row columns="2">
                        <Grid.Column width="7">
                            {/* <AboutYou user={userStore.user!} /> */}
                        </Grid.Column>
                        <Grid.Row centered></Grid.Row>
                        <Grid.Column width="9">
                            {/* <DashboardStatus /> */}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <hr />
                {/* <ManageMenu /> */}
            </BasicLayout>
        </>
    );
});