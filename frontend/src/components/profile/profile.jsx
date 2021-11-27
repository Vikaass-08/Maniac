import React, { useState, useEffect, useContext } from "react";
import { SiteContext } from "../SiteContext";
import SweetAlertComponent from "../common/SweetAlertComponent";
import axios from "axios"
import "../../assets/css/profile.css";
import DP from "../../assets/images/dp.svg";

const Profile = () => {
  const [dp, setDp] = useContext(SiteContext);
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
        name: "",
        age: "",
        image: ""
    });
    const [imageurl, setImageUrl] = useState('');

    const [alert, setAlert] = useState({
      type: "error",
      title: "Update",
      text: "",
      show: false,
    });

    const handleInput = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };

    const changeProfileImage=(event)=>{
      UpdateProfileHandler(event.target.files[0]);
    };

    const UpdateProfileHandler=(pic)=>{
      // e.preventDefault();
      //create object of form data
      const formData=new FormData();
      formData.append("image",pic);

      //update-profile
      axios.post("http://localhost:5000/users/profile/",formData,{
          headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem("auth").replaceAll('"', '')
          }
      }).then(res=>{
          setData({
            ...data,
            image: res.data.image,
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
      const finalData = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        name: data.name,
        age: data.age,
      };

      let dataAfter = {};
      
      await fetch("http://localhost:5000/users/updateUser/", {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth").replaceAll('"', '')
        },
        body: JSON.stringify(finalData),
      }).then((result) => {
        result.json().then((resp) => {
          if (resp.status == "success") {
            dataAfter = resp.results;
            // setData(
            //   resp.results,
            // );
            setAlert({
              type: "success",
              title: "Profile",
              text: "User detail has been updated",
              show: true,
            });
         
          } else if(resp.status == "failed")  {
              setAlert({
                type: "error",
                title: "Profile",
                text: "Something went wrong, try again!!",
                show: true,
              });         
          }
          else{
            setAlert({
              type: "error",
              title: "Profile",
              text: "Something went wrong, try again!!",
              show: true,
            });
          }
        });
      });

      if(Object.keys(dataAfter).length != 0){
        setData(
          dataAfter,
        );
      }

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

    const loadProfileData = async () => {
      await axios.get("http://localhost:5000/users/profile/",{
          headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem("auth").replaceAll('"', '')
          }
      }).then(res=>{
          setData(res.data.results);
          
          // console.log(res.data.image);
      })
      .catch(err=>{console.log(err)});
    }

    const loadUserData = async () => {
      await axios.get("http://localhost:5000/users/updateUser/",{
          headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem("auth").replaceAll('"', '')
          }
      }).then(res=>{
        // console.log(res.data.results)
          setData(
            res.data.results,
          );
          
      })
      .catch(err=>{console.log(err);});
    }

    const changeImageUrl = () => {
      let url = data.image;
      let final_url = url.replace("public/uploads/", "http://localhost:5000/");
      setImageUrl(final_url);
      console.log(data)
    }


 //component did mount
  useEffect(() => {
    loadProfileData();
    loadUserData();
  }, []);


  //component did update
  useEffect(() => {
    changeImageUrl();
  }, [data.image]);

  const btnSelect = () => {
    document.getElementsByClassName('change-img')[0].click()
  };

  return (
    <div className="main-box">
      <span className="item-dp">
          <div className="circle-one circle"></div>
          <div className="circle-two circle"></div>
          <img src={DP} alt="" />
          <div className="circle-three circle"></div>
          <div className="circle circle-four"></div>
      </span>
      <div className="profile-container">
        <div className="profile-row">
            <form className="update-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="image-group" style = {{backgroundImage: `url(${imageurl})`,backgroundSize: '130px 130px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    overflow: 'hidden'
                    }}
              >
                <button type="button" id="newbtn" className="edit-img" onClick={btnSelect}><i class="fas fa-edit i-edit"></i></button>
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
                  value={data.username}
                  onChange={handleInput}
                  spellcheck="false"
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
                  value={data.email}
                  onChange={handleInput}
                  spellcheck="false"
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
                  value={data.age}
                  onChange={handleInput}
                  spellcheck="false"
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
                  value={data.name}
                  onChange={handleInput}
                  spellcheck="false"
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
                  value={data.phone}
                  onChange={handleInput}
                  spellcheck="false"
                />
                <span className="input-icon">
                  <i className="fas fa-phone fa-lg"></i>
                </span>
              </div>

              <div className="login-btn">
                <input
                  type="submit"
                  value="Register"
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
