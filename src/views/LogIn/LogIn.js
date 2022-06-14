import React from "react";
import Button from "@mui/material/Button";
//import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../assets/logo.PNG";
import login from "../../assets/login.jpg";
//mport { NavLink } from "react-router-dom";

import "./Login.css";

function Login() {
  return (
    <div className="logroot" style={{ backgroundColor: "#fff" }}>
      <div className="l">
        <section>
          <form>
            <div className="line1st">Welcome To</div>
            <div className="line2nd">
              <span Style="color: #75B6D9">Index</span>Cloud
            </div>
            <label htmlFor="username">Username:</label>
            <input
              Style="box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 15px;
              margin-left:20px;
              margin-right:20px;
              gap: 9.7px;
              width: 85%;
              background: #ffffff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
              type="text"
              placeholder="UserName"
            />
            <label htmlFor="password">Password:</label>
            <input
              Style="box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 15px;
              margin-left:20px;
              margin-right:20px;
              gap: 9.7px;
              width: 85%;
              background: #ffffff;
              border: 1.33188px solid #f0f0f0;
              border-radius: 10.655px;"
              type="text"
              placeholder="Password"
            />
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
                &nbsp; forget your password?
              </Button>{" "}
            </div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#001E3C",
                margin: 2,
                padding: 3,
                gap: 9.7,
                width: "85%",
                height: 38.27,
                borderRadius: 2,
              }}
            >
              Login
            </Button>
            <p>
              Need an Account?
              <br />
              <span className="line">
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
                  {/* <NavLink activeClassName="active" to="/signup"> */}
                  Sign Up
                  {/* </NavLink> */}
                </Button>
              </span>
            </p>
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

export default Login;
