import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom';
import {Button, Grid, Header, Icon, Menu, Segment, Sidebar as Drawer} from 'semantic-ui-react';
import NewEmployeeForm from '../components/common/forms/NewEmployeeForm';
import '../styles/sideDrawer.css'
import {useStore} from '../stores/store';
import MainLayout from './MainLayout';


interface IProps {
    children: any;
    active: string;
    itemLabel?: string
}


const EmployeeLayout: React.FC<IProps> = ({children, active, itemLabel}) => {

    const {modalStore, layoutStore, sideDrawerStore} = useStore();
    const [menuItemLabel, setMenuItemLabel] = useState('')
    const [formModal, setFormModal] = useState<JSX.Element>(<NewEmployeeForm/>)
    const location = useLocation();

    // const { pathname } = location;
    // useEffect(() => {

    //     if (pathname.includes('employee'))
    //         layoutStore.onMenuItemChange('employee', <NewEmployeeForm />)
    //     else
    //         layoutStore.onMenuItemChange('jobs', <NewJobForm />)
    // }, [layoutStore, pathname, NewEmployeeForm, NewJobForm])

    return (
        <MainLayout>
            <Menu pointing secondary>
                <Menu.Item name='Employees' active={active === 'employee'} as={NavLink} to="/manage-employees"/>
                <Menu.Item name='Jobs' active={active === 'jobs'} as={NavLink} to="/manage-jobs"/>
            </Menu>
            <br/>
            <Drawer.Pushable as={Segment} style={{overflow: 'hidden'}}>

                <Drawer
                    className={'sideDrawer-children'}
                    style={{overflow: 'hidden', backgroundColor: '#fff'}}
                    animation='overlay'
                    direction='right'
                    icon='labeled'
                    inverted
                    vertical
                    visible={sideDrawerStore.sidebarOpen}
                    width='very wide'
                >

                    <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end'}}>
                        <Icon name='close' size={'large'}  link onClick={()=> sideDrawerStore.close()}/>
                    </div>
                    <NewEmployeeForm/>
                </Drawer>
                <Drawer.Pusher>
                    {children}
                </Drawer.Pusher>
            </Drawer.Pushable>
        </MainLayout>
    );
};

export default observer(EmployeeLayout);
