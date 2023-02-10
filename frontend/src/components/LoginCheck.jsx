import React, { useContext } from "react";
import { SiteContext } from "./SiteContext";
import { Redirect } from "react-router-dom";

const LoginCheck = (props) => {
  const {auth, dp} = useContext(SiteContext);
  const Cmp = props.cmp;

  return <>{auth && dp ? <Cmp /> : <Redirect to="/login"></Redirect>}</>;
};

export default LoginCheck;
