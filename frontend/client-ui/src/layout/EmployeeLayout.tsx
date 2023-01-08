

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import RegisterEmployeeForm from '../components/common/forms/RegisterEmployeeForm';
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
    const [formModal, setFormModal] = useState<JSX.Element>(<RegisterEmployeeForm />)
    const location = useLocation();

    const { pathname } = location;
    useEffect(() => {

        if (pathname.includes('employee'))
            layoutStore.onMenuItemChange('employee', <RegisterEmployeeForm />)
        else
            layoutStore.onMenuItemChange('jobs', <RegisterEmployeeForm />)
    }, [layoutStore, pathname, RegisterEmployeeForm])



    return (
        <div style={{ width: '100%'}}>
        <MainLayout>
            <Menu pointing secondary>
                <Menu.Item name='Emplyees' active={active === 'employee'} as={NavLink} to="/manage-employees" />
                <Menu.Item name='Jobs' active={active === 'jobs'} as={NavLink} to="/manage-jobs" />
                <Menu.Menu position='right'>
                    <Menu.Item name={layoutStore.employeeMenuItem?.label} onClick={(env) => modalStore.openModal(layoutStore.employeeMenuItem?.formModal || <RegisterEmployeeForm />)
                    } />
                </Menu.Menu>
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
        </div>
    );
};

export default observer(EmployeeLayout);
