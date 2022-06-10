import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import forgot from "./forgot.png";
import logo from "../../assets/logo.PNG";

import "./Forgotten.css";

function ForgottenPassword() {
  return (
    <div className="root" style={{ backgroundColor: "#fff" }}>
      <div className="left">
        <div className="forgot">
          <img src={forgot} alt="forgot" />
        </div>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className=" right">
        <div className=" content">
          <div className="heading">
            <div className="line1">Reset your</div>
            <div className="line2">
              <span Style="color: #75B6D9">Pass</span>word
            </div>
          </div>
          <p>
            Please enter your verification code sent to your mobile number
            +94*******170{" "}
          </p>
          <input
            Style="box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 15px;
              margin:20px;
              gap: 9.7px;
              width: 85%;
              background: #ffffff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
            type="text"
            placeholder="Verification code"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#001E3C",
              margin: 3,
              padding: 3,
              gap: 9.7,
              width: "85%",
              height: 38.27,
              borderRadius: 2,
            }}
          >
            Submit
          </Button>
          <div className="back">
            <Button
              variant="text"
              sx={{
                color: "#75B6D9",
                fontSize: 16,
                flexDirection: "flex-end",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              <ArrowBackIosNewIcon /> &nbsp; Back to Sign-In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgottenPassword;
