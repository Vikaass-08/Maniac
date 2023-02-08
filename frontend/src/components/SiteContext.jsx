import React, { useState, createContext } from "react";

// Creating context
export const SiteContext = createContext();

export const SiteProvider = (props) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth")? localStorage.getItem("auth") : null);
  const [dp, setDp] = useState(localStorage.getItem("dp")? localStorage.getItem("dp") : null);
  return (
    <SiteContext.Provider value={{auth, setAuth,dp, setDp}}>
      {props.children}
    </SiteContext.Provider>
  );
};
