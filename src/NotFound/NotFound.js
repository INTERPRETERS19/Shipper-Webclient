import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.PNG";
import { useLogin } from "../context/LoginProvider/LoginProvider";
import "./NotFound.css";

const NotFound = () => {
  const visual = document.getElementById("visual");
  const events = ["resize", "load"];

  events.forEach(function (e) {
    window.addEventListener(e, function () {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = 45 / (width / height);
      visual.style.transform =
        "translate(-50%, -50%) rotate(-" + ratio + "deg)";
    });
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLogin();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      setIsLoggedIn(false);
      localStorage.removeItem("user");
    }, 10000);
  }, [navigate]);
  return (
    <div className="page_404">
      <div className="logo">
        <img src={logo} alt="logo" height={80} />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Looks like you're lost</h3>

                <p>The page you are looking is not available!</p>
                <h3>Have a nice day!!!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
