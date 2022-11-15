import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

interface IProps {
  children: any
}

const BasicLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <div>
        <Container className="main-content-container">{children}</Container>
      </div>
    </Fragment>
  );
};

export default observer(BasicLayout);
