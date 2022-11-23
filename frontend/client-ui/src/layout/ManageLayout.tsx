import React, {  } from "react";
import BasicLayout from "./BasicLayout";

const ManageTLayout: React.FC<{children: any}> = ({ children }) => {
  return <BasicLayout >{children}</BasicLayout>;
};

export default ManageTLayout;
