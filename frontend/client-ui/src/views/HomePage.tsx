import { createBrowserHistory } from "history";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
    Container,
    Header,
    Segment,
    Image,
    Button,
} from "semantic-ui-react";
import LoginForm from "../common/forms/LoginForm";
import { useStore } from "../stores/store";


interface IProps {

}

const HomePage: React.FC<IProps> = () => {
    const { modalStore, userStore } = useStore();
    const history = useNavigate();


    useEffect(() => {
        if (userStore.isLoggedIn)
            history('dashboard')

    }, [userStore.isLoggedIn])




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

                {userStore.isLoggedIn ? <Button
                    name='logoutBtn'
                    onClick={() => userStore.logout()}
                    size="huge"
                    inverted
                    content={`Logout, ${userStore.user?.userName}`}
                /> :
                    <Button
                        name='loginBtn'
                        onClick={() => modalStore.openModal(<LoginForm />)}
                        size="huge"
                        inverted
                        content='Login'
                    />
                }
            </Container>
        </Segment>
    );
}


export default observer(HomePage) 