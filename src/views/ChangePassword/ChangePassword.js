import React from "react";
import Button from "@mui/material/Button";
//import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../assets/logo.PNG";
import login from "../../assets/login.jpg";
//import { NavLink } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  return (
    <div className="logroot" style={{ backgroundColor: "#fff" }}>
      <div className="l">
        <section>
          <form>
            <div className="line1st">Change</div>
            <div className="line2nd">
              <span Style="color: #75B6D9">Pass</span>word
            </div>
            {/* <label htmlFor="username">Old Password</label> */}
            <div className="contents">
              <input
                Style="box-sizing: border-box;
              flex-direction: column;
              justify-content: center;
              padding: 15px;
              margin:12px;
              gap: 9.7px;
              width: 85%;
              background: #fff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
                type="text"
                placeholder="Old Password"
              />
              {/* <label htmlFor="password">New Password</label> */}
              <input
                Style="box-sizing: border-box;
              flex-direction: column;
              justify-content: center;
              padding: 15px;
              margin:12px;
              gap: 9.7px;
              width: 85%;
              background: #fff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
                type="text"
                placeholder="New Password"
              />
              {/* <label htmlFor="password">New Password</label> */}
              <input
                Style="box-sizing: border-box;

              flex-direction: column;
              justify-content: center;
              padding: 15px;
              margin:12px;
              gap: 9.7px;
              width: 85%;
              background: #fff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
                type="text"
                placeholder="Confirm Password"
              />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#001E3C",
                  margin: 2,
                  padding: 3,
                  width: "45%",
                  alignItems: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 35,
                  borderRadius: 4,
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </section>
      </div>

      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="r">
        <img src={login} alt="login" />
      </div>
    </div>
  );
}

export default ChangePassword;
