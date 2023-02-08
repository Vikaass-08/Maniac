import React, { useContext } from "react";
import { SiteContext } from "./SiteContext";
import "../assets/css/nav.css";
import logo from "../assets/images/logoC.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {auth, dp, setDp} = useContext(SiteContext);
  return (
    <nav className="navbar">
      <div id="brand">
        <Link className="link" to="/">
          <img id="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-elements">
        <li className="item">
          {!auth ? (
            <Link className="link" to="/register">
              Register
            </Link>
          ) : null}
        </li>

        <li className="item">
          {auth ? (
            <Link className="link" to="/logout">
              <div className="nav-img" style={{textAlign:"center"}}>
              <i class="fa fa-sign-out fa-lg" style={{marginTop:"14px"}} aria-hidden="true"></i>
              </div>
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </li>

        <li className="item">
          {auth && dp ? (
            <Link className="link" to="/profile">
              <div className="nav-img" 
                style = {{backgroundImage: `url(${dp.toString().replace("public/uploads/", "http://localhost:5000/")})`,
                  backgroundSize: '50px 50px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                 
                }}
              >
              </div>
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
