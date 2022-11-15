import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useLocation } from "react-router-dom";

export default observer(function NavBar() {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();

  // const [active, setActive] = useState("");

  // const location = useLocation();
  // useEffect(() => {
  //   setActive(location.pathname);
  //   return () => {
  //     setActive("");
  //   };
  // }, [setActive, location]);

  return (
    <div className="header-nav">
      <div className="nav-logo ui.container">LOGO</div>
      <Menu>
        <Container>
          <Menu.Item name="dashboard">
            <Button as={NavLink} icon="home" size='massive' style={{backgroundColor: '#fff', textDecoration: 'none'}}  to="/dashboard" />
          </Menu.Item>
          <Menu.Item name="employees">
            <Button as={NavLink}  icon={'user circle outline'} style={{backgroundColor: '#fff', textDecoration: 'none'}} content='Employee' to="/employees" />
          </Menu.Item>
 
          {isLoggedIn && (
            <>
              <Menu.Item position="right">
                <Dropdown pointing="top left" text={user?.userName}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/profiles/${user?.userName}`}
                      text="My Profile"
                      icon="user"
                    />
                    <Dropdown.Item
                      onClick={() => logout()}
                      text="Logout"
                      icon="power"
                 
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </>
          )}
        </Container>
      </Menu>
    </div>
  );
});
