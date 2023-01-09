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



  }, []);

  return (
    <ManageLayout>
      <Grid className={'main-menu-sidebar'}>
        <Grid.Column width={3} >
          <div className="nav-logo">LOGO</div>
          <p><strong>You</strong></p>
          <Menu secondary vertical fluid>
            <Menu.Item active={active == '/dashboard'} content="Dashboard" as={NavLink} to="/dashboard" />
            {/* <Menu.Item active={active == '/list'} content="Me" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="Time off" as={NavLink} to="/list" />
            <Menu.Item active={active == '/list'} content="My documents" as={NavLink} to="/list" /> */}
          </Menu>
          <br />
          <p><strong>Your Company</strong></p>
          <Menu secondary vertical fluid>
            <Menu.Item active={active == '/manage-employees' || active == '/manage-jobs'} content="Employees" as={NavLink} to="/manage-employees"  onClick={() => layoutStore.onEmployeeDropdownClick()} />
            {layoutStore.empDropdownOpened &&
              <Menu.Item >
                
                <Menu.Item content="Files" as={NavLink} to="/files" />
              </Menu.Item>
            }
            <Menu.Item active={active == '/reports'} content="Reports" as={NavLink} to="/" />
            <Menu.Item active={active == '/files'} content="Files" as={NavLink} to="/settings" onClick={() => layoutStore.onFilesDropdownClick()} /> {/* will set path to settings just as a placeholder */}
            {layoutStore.fileDropdownOpened &&
              <Menu.Item >
                <Menu.Item content="Company"  /> {/* */}
                <Menu.Item content="Employee"  />
              </Menu.Item>
            }
            <Menu.Item active={active == '/manage-company'} content="Company" as={NavLink} to="/manage-company" onClick={() => layoutStore.onCompanyDropdownClick()} />
            {layoutStore.compDropdownOpened &&
              <Menu.Item >
                <Menu.Item content="Details" as={NavLink} to="/" />
                <Menu.Item content="Time off" as={NavLink} to="/" />
                <Menu.Item content="Work schedule" as={NavLink} to="/" />
                <Menu.Item content="Workplaces" as={NavLink} to="/" />
                <Menu.Item content="Documents" as={NavLink} to="/" />
                <Menu.Item content="Active log" as={NavLink} to="/" />
                <Menu.Item content="Workflows" as={NavLink} to="/" />
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
