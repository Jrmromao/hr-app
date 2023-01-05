import { StepFunctionsStartExecution } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { Button, Grid, Menu, SemanticWIDTHS } from "semantic-ui-react";
import { useStore } from "../stores/store";
import ManageLayout from "./ManageLayout";
interface IProps {
  children: any
}
const MainLayout: React.FC<IProps> = ({ children }) => {
  const [active, setActive] = useState("");
 
  const { layoutStore } = useStore();


  const location = useLocation();
  useEffect(() => {
    setActive("");
    return () => {
      setActive("");
    };
  }, [setActive, location]);

  return (
    <ManageLayout>

      <Grid style={{ backgroundColor: '#F4F4F5', height: 2000 }} className='item-active'>
        <Grid.Column width="3" >
          <div className="nav-logo">LOGO</div>
          <p><strong>You</strong></p>
          <Menu secondary vertical fluid>
            <Menu.Item active={active == '/dashboard'} content="Dashboard" as={NavLink} to="/dashboard" />
            <Menu.Item active={active == '/list'} content="Me" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="Time off" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="My documents" as={NavLink} to="/list" />
          </Menu>
          <br />
          <p><strong>Your Company</strong></p>
          <Menu secondary vertical fluid>
            <Menu.Item icon='users' active={active == '/register'} content="Employees" as={NavLink} to="/register" />

            <Menu.Item active={active == '/list'} content="Reports" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="Files" as={NavLink} to="/list" />

            <Menu.Item active={active == '/settings'} content="Company" as={NavLink} to="/settings" onClick={() => layoutStore.onCompanyDropdownClick()} />
            {layoutStore.dropdownOpened &&
                <Menu.Item >
                  <Menu.Item content="Reports" as={NavLink} to="/settings/reports" />
                  <Menu.Item content="Files" as={NavLink} to="/settings/files" />
                </Menu.Item>
            }
          </Menu>
        </Grid.Column>
        <Grid.Column width={13} style={{ backgroundColor: '#fff' }}>{children}</Grid.Column>
      </Grid>
    </ManageLayout>
  );
};

export default observer(MainLayout);
