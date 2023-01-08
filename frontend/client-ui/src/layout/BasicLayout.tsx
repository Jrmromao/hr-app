import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Divider } from "semantic-ui-react";
import { useStore } from "../stores/store";
import NavBar from "./NavBar";

interface IProps {
  children: any,
}

const BasicLayout: React.FC<IProps> = ({ children }) => {
  const { layoutStore } = useStore();
  const [cssFlag, setCssFlag] = useState(false);

  useEffect(() => {
    if (layoutStore.hasTableFlag)
      setCssFlag(true)
      return () => {
        setCssFlag(false)
      };
  }, [])

  return (<Container className={cssFlag ? 'full-window-main-content-container ' : 'default-main-content-container'}>{children}</Container>
  );
};

export default observer(BasicLayout);
