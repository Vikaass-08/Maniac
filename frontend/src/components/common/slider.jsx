import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import slide1 from "../../assets/images/slides1.svg";
import slide2 from "../../assets/images/slides31.svg";
import slide3 from "../../assets/images/slides4.svg";

const Theme = () => {
  const style = {
    width: " 100%",
    height: "513px",
    maxHeight: "330px",
    marginTop: "80px",
  };
  return (
    <div>
      <OwlCarousel
        className="owl-theme"
        loop
        items="1"
        autoplay
        dots
        autoplayTimeout="2000"
        autoplayHoverPause
      >
        <div className="item login_img">
          <img
            style={{ width: "90%", height: "400px", marginRight: "7rem" }}
            src={slide1}
            alt=""
          />
        </div>
        <div className="item login_img">
          <img src={slide2} alt="" />
        </div>
        <div className="item login_img">
          <img src={slide3} alt="" />
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Theme;
