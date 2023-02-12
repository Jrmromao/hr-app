import {StepFunctionsStartExecution} from "aws-cdk-lib/aws-stepfunctions-tasks";
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";
import {Button, Grid, Icon, Menu, SemanticWIDTHS} from "semantic-ui-react";
import IconMenyItem from "../components/common/IconMenyItem";
import {useStore} from "../stores/store";
import ManageLayout from "./ManageLayout";
import SignUpForm from "../components/common/forms/SignUpForm";

interface IProps {
    children: any
}

const MainLayout: React.FC<IProps> = ({children}) => {
    const [active, setActive] = useState("");

    const {layoutStore, modalStore} = useStore();


    const location = useLocation();


    useEffect(() => {


    }, []);

    return (
        <>
            <Grid>
                <Grid.Column width={2} className={'main-menu-sidebar'}>
                    <Menu.Item content="Add new Company" as={Button} onClick={()=> modalStore.openModal(<SignUpForm/>)}/>
                    <div className="divider_sidebar"/>
                    <Menu secondary vertical fluid>
                        <div className="divider_sidebar"/>
                        <Menu.Item active={active == '/dashboard'} content="Dashboard" as={NavLink} to="/dashboard"/>
                        <Menu.Item active={active == '/profile'} content="My Profile" as={NavLink} to="/profile"/>
                        {/* <Menu.Item active={active == '/list'} content="Time off" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="My documents" as={NavLink} to="/list" /> */}
                    </Menu>
                    <div className="divider_sidebar"/>

                    <Menu secondary vertical fluid>
                        <Menu.Item active={active == '/manage-employees' || active == '/manage-jobs'}
                                   content="Employees" as={NavLink} to="/manage-employees"
                                   onClick={() => layoutStore.onEmployeeDropdownClick()}/>
                        {layoutStore.empDropdownOpened &&
                            <Menu.Item>

                                <Menu.Item content="Files" as={NavLink} to="/files"/>
                            </Menu.Item>
                        }
                        <Menu.Item active={active == '/reports'} content="Reports" as={NavLink} to="/"/>
                        <Menu.Item active={active == '/files'} content="Files" as={NavLink} to="/settings"
                                   onClick={() => layoutStore.onFilesDropdownClick()}/> {/* will set path to settings just as a placeholder */}
                        {layoutStore.fileDropdownOpened &&
                            <Menu.Item>
                                <Menu.Item content="Company"/> {/* */}
                                <Menu.Item content="Employee"/>
                            </Menu.Item>
                        }
                        <Menu.Item active={active == '/manage-company'} content="Company" as={NavLink}
                                   to="/manage-company" onClick={() => layoutStore.onCompanyDropdownClick()}/>
                        {layoutStore.compDropdownOpened &&
                            <Menu.Item>
                                <Menu.Item content="Details" as={NavLink} to="/manage-company/"/>
                                <Menu.Item content="Time off" as={NavLink} to="/manage-company/time-off"/>
                                <Menu.Item content="Work schedule" as={NavLink} to="/manage-company/work-schedule"/>
                                <Menu.Item content="Workplaces" as={NavLink} to="/manage-company/workplaces"/>
                                <Menu.Item content="Documents" as={NavLink} to="/manage-company/documents"/>
                                <Menu.Item content="Active log" as={NavLink} to="/manage-company/active-log"/>
                                <Menu.Item content="Workflows" as={NavLink} to="/manage-company/workflows"/>
                            </Menu.Item>
                        }
                        <div className="divider_sidebar"/>
                    </Menu>

                    <Menu secondary vertical fluid className="sidebar-footer-options">
                        <Menu.Item content="Settings" as={NavLink} to="/manage-company/active-log"/>
                        <Menu.Item content="Help" as={NavLink} to="/manage-company/workflows"/>
                    </Menu>
                </Grid.Column>
                <Grid.Column width={14} style={{backgroundColor: '#fff'}}>{children}</Grid.Column>
            </Grid>
        </>
    );
};

export default observer(MainLayout);
