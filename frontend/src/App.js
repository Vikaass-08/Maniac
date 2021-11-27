import React from "react";
import { SiteProvider } from "./components/SiteContext";
import Navbar from "./components/nav";
import Login from "./components/login";
import Logout from "./components/logout";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/register";
import LoginCheck from "./components/LoginCheck";
import Profile from "./components/profile/profile";

function App() {
  return (
    <SiteProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact>
              <LoginCheck cmp={Home} />
            </Route>
            <Route path="/profile" exact>
              <LoginCheck cmp={Profile} />
            </Route>
          </Switch>
        </div>
      </Router>
    </SiteProvider>
  );
}

export default App;
