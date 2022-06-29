import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Getstarted from "../../assets/3.png";
import App from ".";
const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="GetStartedinside">
      <div className="GetStarted">
        <div className="l">
          <div className="firstline">
            Everything you need to speed up your delivery operation
            <div className="para">
              {" "}
              <div className="first">
                <p>
                  Powerful and tested on the field features for your customers,
                  and all your teams including admins, delivery hub staff, and
                  delivery drivers
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "#001E3C",
                maxWidth: "50%",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: 50,
                marginTop: "3%",
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="r">
          <div className="get">
            <div>
              <img src={Getstarted} alt="logo" height={700} />
            </div>
          </div>
        </div>
      </div>
      <div className="review">
        <div className="reviewheader">
          <h1> Reviews </h1>
          <div className="para2">
            Your review will be publically posted on the web. Use the below
            button to create a new review to our page. Feel free to express your
            opinions
          </div>
          <Button
            variant="contained"
            onClick={() => navigate("/review")}
            sx={{
              backgroundColor: "#001E3C",
              minWidth: "30%",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              margin: "40px",
            }}
            endIcon={<DoubleArrowIcon />}
          >
            Add Review
          </Button>
        </div>
        <div className="footer">
          <div className="footerX">
            <p>&copy;2022 Interpreters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
