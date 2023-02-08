import React, { useState, useContext } from "react";
import { SiteContext } from "./SiteContext";
import { Redirect } from "react-router-dom";
import Slider from "./common/slider";
import "../assets/css/login.css";
import SweetAlertComponent from "./common/SweetAlertComponent";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });

  const [alert, setAlert] = useState({
    type: "error",
    title: "Register",
    text: "",
    show: false,
  });
  const [auth, setAuth] = useContext(SiteContext);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    if (!localStorage.getItem("auth")) {
      event.preventDefault();
    }
    fetch("http://localhost:5000/users/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.user) {
          setAlert({
            type: "success",
            title: "Register",
            text: "Your account has been registered",
            show: true,
          });
          setData({
            username: "",
            email: "",
            password: "",
            c_password: "",
          });
        } else if(resp.msg)  {
            setAlert({
              type: "error",
              title: "Register",
              text: resp.msg,
              show: true,
            });         
        }
        else{
          setAlert({
            type: "error",
            title: "Register",
            text: "Something went wrong",
            show: true,
          });
        }
      });
    });
  };

  const sweetAlertClose = () => {
    if (alert.type === "error") {
      setAlert({
        type: "error",
        title: "Register",
        text: "",
        show: false,
      });
      return;
    } else {
      setAlert(
        { type: "error", title: "Register", text: "", show: false },
        () => this.props.history.push("/Register")
      );
      return;
    }
  };

  return (
    <div className="container">
      {auth ? (
        <Redirect to="/"></Redirect>
      ) : (
      <div className="panel">
        <>
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
            <form onSubmit={handleSubmit} className="register-form">
              <div className="reg-titles">
                <h6>What are you waiting for?</h6>
                <h3>Register Now</h3>
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
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="form-input"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                />
                <div className="input-icon">
                  <i className="fas fa-envelope"></i>
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
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="c_password"
                  className="form-input"
                  value={data.c_password}
                  onChange={handleInput}
                />
                <div className="input-icon">
                  <i className="fas fa-key"></i>
                </div>
              </div>

              <div className="login-btn-c regist-sub">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-register"
                  style={{ marginTop: "-10px" }}
                />
              </div>
            </form>
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
      </div>
      )}
    </div>
  );
};

export default Register;
