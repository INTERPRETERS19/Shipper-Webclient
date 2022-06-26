import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import Getstarted from "../../assets/3.png";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
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
          <img src={Getstarted} alt="logo" height={650} /></div>
          <div>
        <Button
          variant="contained"
          onClick={() => navigate("/review")}
          sx={{
            backgroundColor: "#112c48",
            marginRight: 7,
            padding: 3,
            gap: 1,
            height: 30,
            borderRadius: 1,
            float: "right",
            marginTop: 5
          }}
          endIcon={<DoubleArrowIcon />}
        >
          Add Review
        </Button>
      </div>
        </div>
        
      </div>
      
   
    </div>
  );
};

export default GetStarted;
