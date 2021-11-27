import React from "react";
import "../assets/css/home.css";

const Home = () => {
  return (
    <div className="contain">
      <div id="heading">
        <h1 class="heading" style={{marginBottom: "10px"}}>Welcome To The Other Side</h1>
        <h5 class="moto">Play and Enjoy</h5>
      </div>
      <div id="images">
        <div className="img" id="quiz"></div>
        <div className="img" id="fitness"></div>
      </div>
      <div id="footer">
        <a
          id="fb"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
          href="https://www.facebook.com/vikas.pathak.3597789"
        >
          <i className="fab fa-facebook-f fa-2x icon-a"></i>
        </a>
        <a
          id="twitter"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
          href="https://twitter.com/vikaspa143"
        >
          <i className="fab fa-twitter fa-2x icon-b"></i>
        </a>
        <a
          id="insta"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
          href="https://www.instagram.com/vikaass_08/"
        >
          <i className="fab fa-instagram fa-2x icon-c"></i>
        </a>
        <a
          id="linkedin"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
          href="https://www.linkedin.com/in/vikas-pathak-a4a22a196/"
        >
          <i className="fab fa-linkedin fa-2x icon-d"></i>
        </a>
      </div>
    </div>
  );
};

export default Home;
