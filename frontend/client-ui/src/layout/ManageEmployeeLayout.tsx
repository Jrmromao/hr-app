import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import ManageLayout from "./ManageLayout";
interface IProps {
  children: any
}
const ManageEmployeeLayout: React.FC<IProps> = ({children}) => {
  const [active, setActive] = useState("");

  const location = useLocation();
  useEffect(() => {
    setActive(location.pathname);
    return () => {
      setActive("");
    };
  }, [setActive, location]);

  return (
    <ManageLayout>
      <Grid>  
        <Grid.Column width="3">
          <Menu pointing secondary vertical>
            <Menu.Item active={active == '/register-employee'} content="Register" as={NavLink} to="/register-employee" />
            <Menu.Item active={active == '/list-employee'} content="List" as={NavLink} to="/list-employee" />
          </Menu>
        </Grid.Column>
        <Grid.Column width="13">{children}</Grid.Column>
      </Grid>
    </ManageLayout>
  );
};

export default observer(ManageEmployeeLayout);
