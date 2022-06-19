import React, { useState } from "react";
import Button from "@mui/material/Button";
import logo from "../../assets/logo2.PNG";
import login from "../../assets/login.jpg";
//import { Grid } from "@mui/material";
import useForms from "../../components/useForms";
import client from "../../api/Client";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../components/Models/validation";
import { useLogin } from "../../context/LoginProvider/LoginProvider";

import "./Login.css";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [values, setValues, handleInputChange] = useForms(initialValues);
  const [error, setError] = useState("");
  const { setIsLoggedIn, setProfile, profile } = useLogin();
  const navigate = useNavigate();

  const validate = () => {
    if (!isValidObjField(values))
      return updateError("Required all fields!", setError);

    if (!isValidEmail(values.email))
      return updateError("Invalid email!", setError);

    if (!values.password.trim() || values.password.length < 8) {
      return updateError("Password is too short!", setError);
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // console.log(values.email);
        const responces = await client.post("/signin", { ...values });
        // console.log(responces.data);
        // console.log(responces.data.success);
        if (responces.data.success) {
          setProfile(responces.data.user);
          console.log(profile);
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          return updateError(
            "Your User name Or Password is incorrect",
            setError
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signupPressed = () => {
    navigate("/signup");
  };
  const forgetPressed = () => {
    navigate("/fp");
  };
  return (
    <div className="SignUp" style={{ backgroundColor: "#fff" }}>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="formAlign">
          <form>
            <div className="line1">Welcome To</div>
            <div className="line2">
              <span Style="color: #75B6D9">Index</span>Cloud
            </div>
            <br />
            <br />

            <div className="error">
              {error ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              ) : null}
            </div>
            <div className="contents">
              <input
                className="inputColoum"
                type="text"
                placeholder="UserName"
                value={values.email}
                name="email"
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                className="inputColoum"
                type="password"
                placeholder="Password"
                value={values.password}
                name="password"
                onChange={handleInputChange}
                required
              />
              <br />
              <div className="back">
                <Button
                  variant="text"
                  sx={{
                    color: "#75B6D9",
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  onClick={forgetPressed}
                >
                  Forget your password?
                </Button>
              </div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#001E3C",
                  minWidth: "80%",
                  alignItems: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p className="logroot">
                Need an Account?
                <span className="line">
                  <Button
                    variant="text"
                    sx={{
                      color: "#75B6D9",
                      fontSize: 16,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    onClick={signupPressed}
                  >
                    Sign Up
                  </Button>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="right">
        <img src={login} alt="login" />
      </div>
    </div>
  );
}

export default Login;
