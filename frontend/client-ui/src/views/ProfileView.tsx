import {observer} from 'mobx-react-lite'
import React from 'react'
import {Grid, Segment, Table} from 'semantic-ui-react'
import MainLayout from "../layout/MainLayout";


const ProfileView: React.FC = () => {
    return (
        <MainLayout>

            <Segment>
                This component will hold have the functionality for the user profile
            </Segment>
            <Segment>
                This component will hold have the functionality for the user profile
            </Segment>

        </MainLayout>
    )
}

export default observer(ProfileView)