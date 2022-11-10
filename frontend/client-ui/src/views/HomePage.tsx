

// import React, { useEffect } from 'react'
// import { redirect } from 'react-router-dom';
// import LoginForm from '../forms/LoginForm';
// import { useStore } from '../stores/store';



// const HomePage: React.FC<IProps> = ({ }) => {
//     const {userStore} = useStore();
//     useEffect(()=>{
//     console.log('HomePage...');

//     },[])


//     return (

//         <h1>Welcome</h1>

//      )
// }

// export default HomePage

import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Header,
    Segment,
    Image,
    Button,
    Divider,
} from "semantic-ui-react";
import LoginForm from "../common/forms/LoginForm";
import { useStore } from "../stores/store";
// import RegisterForm from '../users/RegisterForm';


interface IProps {

}

const HomePage: React.FC<IProps> = () => {

    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image
                        size="massive"
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginBottom: 12 }}
                    />
                    HR App
                </Header>
                <Button
                    name='loginBtn'
                    onClick={() => modalStore.openModal(<LoginForm />)}
                    size="huge"
                    inverted
                >
                    Login
                </Button>
            </Container>
        </Segment>
    );
}


export default observer(HomePage) 