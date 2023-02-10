import React, { useState, useEffect, useContext } from "react";
import { SiteContext } from "../SiteContext";
import SweetAlertComponent from "../common/SweetAlertComponent";
import axios from "axios"
import "../../assets/css/profile.css";
import DP from "../../assets/images/dp.svg";

const Profile = () => {
  const {dp, setDp} = useContext(SiteContext);
  const [data, setData] = useState({
      username: "",
      email: "",
      phone: "",
      name: "",
      age: "",
      image: ""
  });

  const [alert, setAlert] = useState({
    type: "error",
    title: "Update",
    text: "",
    show: false,
  });

  const updateInputOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const changeProfileImage = (event) => {
    event.preventDefault();
    UpdateProfileHandler(event.target.files[0]);
  };

  const UpdateProfileHandler= async (pic) => {

    // Create object of form data
    const formData = new FormData();
    formData.append("image",pic);

    // Updata Profile Pic
    await axios.post("http://localhost:5000/users/profile/", formData,{
        headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("auth").replaceAll('"', '')
        }
    }).then(res=> {
        setData({
          ...data,
          image: JSON.stringify(res.data.image),
        });

        localStorage.setItem('dp', JSON.stringify(res.data.image));
        setDp(localStorage.getItem("dp"));

        setAlert({
            type: "success",
            title: "Profile",
            text: "Profile Pic Updated",
            show: true,
          });
    })
    .catch(err=>{console.log(err);
      setAlert({
        type: "error",
        title: "Profile",
        text: "Something went wrong, try again!!",
        show: true,
      });   
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalData = JSON.stringify({
      username: data.username,
      email: data.email,
      phone: data.phone,
      name: data.name,
      age: data.age,
    });

    await axios.post("http://localhost:5000/users/updateUser/", finalData, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth").replaceAll('"', '')
      },
    }).then((resp) => {
        if (resp.data.status == "success") {
          
          if(Object.keys(resp.data.results).length != 0){
            setData(resp.data.results);
          }

          setAlert({
            type: "success",
            title: "Profile",
            text: "User detail has been updated",
            show: true,
          });
        }
        else {
          setAlert({
            type: "error",
            title: "Profile",
            text: "Something went wrong, try again!!",
            show: true,
          });
        }
    })
    .catch(err => {
      setAlert({
        type: "error",
        title: "Profile",
        text: "Something went wrong, try again!!",
        show: true,
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
        { 
          type: "error", 
          title: "Register", 
          text: "", 
          show: false 
        },
        () => this.props.history.push("/Register")
      );
      return;
    }
  };

  const loadUserData = async () => {
    await axios.get("http://localhost:5000/users/updateUser/",{
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth").replaceAll('"', '')
      }
    }).then(res=>{
      setData(
        res.data.results,
      );
      if(res.data.result?.image) setDp(res.data.results.image);
    })
    .catch(err=>{
      console.log(err);
    });
    
  }

  //component did mount
  useEffect(() => {
    loadUserData();
  }, []);

  const btnSelect = () => {
    document.getElementsByClassName('change-img')[0].click()
  };

  return (
    <div className="main-box">
      <span className="item-dp">
          <div className="circle-one circle"></div>
          <div className="circle-two circle"></div>
          <img src={DP} alt="brand-logo" />
          <div className="circle-three circle"></div>
          <div className="circle circle-four"></div>
      </span>
      <div className="profile-container">
        <div className="profile-row">
            <form className="update-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="image-group" style = {{backgroundImage: `url(${dp.toString().replace("public/uploads/", "http://localhost:5000/")})`,backgroundSize: '130px 130px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    overflow: 'hidden'
                    }}
              >
                <button type="button" id="newbtn" className="edit-img" onClick={btnSelect}><i className="fas fa-edit i-edit"></i></button>
                <input
                  type="file"
                  name="image"
                  className="change-img"
                  accept=".jpg, .jpeg, .png"
                  onChange={changeProfileImage}
                  style={{display:"none"}}
                />
              </div>
              <input type="button" className="submit-img" style={{display:"none"}} onClick={UpdateProfileHandler}/>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  className="form-in"
                  autoComplete="off"
                  value={data.username.toString()}
                  onChange={updateInputOnChange}
                  spellCheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-user-circle fa-lg"></i>
                </span>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  className="form-in"
                  autoComplete="off"
                  value={data.email.toString()}
                  onChange={updateInputOnChange}
                  spellCheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-envelope fa-lg"></i>
                </span>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your age"
                  name="age"
                  autoComplete="off"
                  className="form-in"
                  value={data.age.toString()}
                  onChange={updateInputOnChange}
                  spellCheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-birthday-cake fa-lg"></i>
                </span>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter full name"
                  name="name"
                  autoComplete="off"
                  className="form-in"
                  value={data.name.toString()}
                  onChange={updateInputOnChange}
                  spellCheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-user fa-lg"></i>
                </span>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  autoComplete="off"
                  className="form-in"
                  value={data.phone.toString()}
                  onChange={updateInputOnChange}
                  spellCheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-phone fa-lg"></i>
                </span>
              </div>

              <div className="login-btn">
                <input
                  type="submit"
                  value="Submit"
                  className="submit-input"
                  style={{ marginTop: "-10px" }}
                />
              </div>
            </form>
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
    </div>
    </div>
  );
 
};

export default Profile;
