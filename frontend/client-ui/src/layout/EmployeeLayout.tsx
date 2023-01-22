

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import NewEmployeeForm from '../components/common/forms/NewEmployeeForm';
import NewJobForm from '../components/common/forms/NewJobForm';
import { useStore } from '../stores/store';
import MainLayout from './MainLayout';


interface IProps {
    children: any;
    active: string;
    itemLabel?: string
}


const EmployeeLayout: React.FC<IProps> = ({ children, active, itemLabel }) => {

    const { modalStore, layoutStore } = useStore();
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
                <Menu.Item name='Emplyees' active={active === 'employee'} as={NavLink} to="/manage-employees" />
                <Menu.Item name='Jobs' active={active === 'jobs'} as={NavLink} to="/manage-jobs" />
                {/* <Menu.Menu position='right'>
                    <Menu.Item name={layoutStore.employeeMenuItem?.label} onClick={(env) => modalStore.openModal(layoutStore.employeeMenuItem?.formModal || <NewEmployeeForm />)
                    } />
                </Menu.Menu> */}
            </Menu>
            <br />
            <Grid divided>
                <Grid.Row>
                    <Grid.Column>
                        {children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MainLayout>
    );
};

export default observer(EmployeeLayout);
