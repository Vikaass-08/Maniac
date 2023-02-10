import React, { useState, useContext } from "react";
import { SiteContext } from "./SiteContext";
import { Redirect } from "react-router-dom";
import Slider from "./common/slider";
import "../assets/css/login.css";
import SweetAlertComponent from "./common/SweetAlertComponent";
import axios from "axios"

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: "error",
    title: "Login",
    text: "",
    show: false,
  });


  const {auth, setAuth, dp, setDp} = useContext(SiteContext);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let strigifyData = JSON.stringify({
      username: data.username,
      password: data.password,
    });
    await axios.post("http://localhost:5000/users/login/", strigifyData, {
          headers: {
            "Content-Type": "application/json",
          }
      }).then(resp =>{
        if (resp.data.token) {
          localStorage.setItem("auth", JSON.stringify(resp.data.token));
          localStorage.setItem("dp", JSON.stringify(resp.data.image));
          setAuth(JSON.stringify(resp.data.token));
          setDp(JSON.stringify(resp.data.image));
        } else if(resp.data.msg) {
          setAlert({
            type: "error",
            title: "Login",
            text: resp.data.msg,
            show: true,
          });
        }
        else{
          setAlert({
            type: "error",
            title: "Login",
            text: "Something went wrong!!",
            show: true,
          });
        }
      }).catch(err=>{
        setAlert({
          type: "error",
          title: "Login",
          text: "Something went wrong!!",
          show: true,
        });
        console.log("Login Error", err);
      });
  };

  const sweetAlertClose = () => {
    if (alert.type === "error") {
      setAlert({
        type: "error",
        title: "Login",
        text: "",
        show: false,
      });
      return;
    } else {
      setAlert(
        { type: "error", title: "Login", text: "", show: false },
        () => this.props.history.push("/login")
      );
      return;
    }
  };


  return (
    <div className="container">
      {auth && dp ? (
        <Redirect to="/"></Redirect>
      ) : (
        <>
        <div className="panel">
          <div className="row">
            <div className="liquid">
              <div className="slider">
                <Slider />
              </div>
              <div className="follow">
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  target="_blank"
                  href="https://www.facebook.com/vikas.pathak.3597789"
                >
                  <i className="fab fa-facebook-f fa-2x"></i>
                </a>
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  target="_blank"
                  href="https://twitter.com/vikaspa143"
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  target="_blank"
                  href="https://www.instagram.com/vikaass_08/"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  target="_blank"
                  href="https://www.linkedin.com/in/vikas-pathak-a4a22a196/"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              </div>
            </div>
            <div className="login">
              <form onSubmit={handleSubmit} className="login-form">
                <div className="titles">
                  <h6>We keep everything</h6>
                  <h3>Ready to Login</h3>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="form-input"
                    autoComplete="off"
                    value={data.username}
                    onChange={handleInput}
                  />
                  <div className="input-icon">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-input"
                    value={data.password}
                    onChange={handleInput}
                  />
                  <div className="input-icon">
                    <i className="fas fa-key"></i>
                  </div>
                </div>
                <div className="login-btn-c">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {alert.show && (
          <SweetAlertComponent
            show={alert.show}
            type={alert.type}
            title={alert.title}
            text={alert.text}
            sweetAlertClose={sweetAlertClose.bind(this)}
          ></SweetAlertComponent>
        )}

       </>
      )}
    </div>
  );
};

export default Login;
