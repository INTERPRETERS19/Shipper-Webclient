import React, { useState } from "react";
import Button from "@mui/material/Button";
import logo from "../../assets/logo2.PNG";
import login from "../../assets/login.jpg";
import { Grid } from "@mui/material";
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
  const { setIsLoggedIn } = useLogin();
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
        console.log(values.email);
        const responces = await client.post("/signin", { ...values });
        console.log(responces.data);

        console.log(responces.data.success);

        if (responces.data.success) {
          console.log(responces.data.user);
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
    <div className="logroot" style={{ backgroundColor: "#fff" }}>
      <div className="l">
        <section>
          <form>
            <Grid container>
              <Grid item>
                <div className="line1st">Welcome To</div>
                <div className="line2nd">
                  <span Style="color: #75B6D9">Index</span>Cloud
                </div>
              </Grid>
              <div>
                <Grid className="logroot">
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
                </Grid>
              </div>
              <label htmlFor="username">Username:</label>
              <input
                className="inputColoum"
                type="text"
                placeholder="UserName"
                value={values.email}
                name="email"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                className="inputColoum"
                type="password"
                placeholder="Password"
                value={values.password}
                name="password"
                onChange={handleInputChange}
                required
              />
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
                  &nbsp; forget your password?
                </Button>
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
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p className="logroot">
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
                    onClick={signupPressed}
                  >
                    {/* <NavLink activeClassName="active" to="/signup"> */}
                    Sign Up
                    {/* </NavLink> */}
                  </Button>
                </span>
              </p>
            </Grid>
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
