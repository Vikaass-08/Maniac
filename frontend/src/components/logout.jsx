import React, { useState, useEffect, useContext } from "react";
import { SiteContext } from "./SiteContext";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [auth, setAuth] = useContext(SiteContext);

  useEffect(() => {
    localStorage.clear();
    return setAuth(null);
  });

  return (
    <>
      <Redirect to="/"></Redirect>
    </>
  );
};

export default Logout;
