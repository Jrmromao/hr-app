import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import { useStore } from "../stores/store";
import NavBar from "./NavBar";

interface IProps {
  children: any,
}

const BasicLayout: React.FC<IProps> = ({ children }) => {
  const { layoutStore } = useStore();
  const [cssFlag, setCssFlag] = useState(false);
  const location = useLocation();

  const { pathname } = location;


  useEffect(() => {
    if (layoutStore.hasTableFlag)
      setCssFlag(true)
      return () => {
        setCssFlag(false)
      };
  }, [])

  return (<Container  className={'main-content-container'}>{children}</Container>
  );
};

export default observer(BasicLayout);
