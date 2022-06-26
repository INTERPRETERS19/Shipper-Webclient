import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import Input from "./input";
import Client from "../../api/Client";
import { useNavigate } from "react-router-dom";
import {
  isPassword,
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../components/Models/validation";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile_no: "",
  street: "",
  city: "",
  district: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const validate = () => {
    if (!isValidObjField(form))
      return updateError("Required all fields!", setError);

    if (!isValidEmail(form.email))
      return updateError("Please enter a valid email!", setError);

    // if (!form.password.trim() || form.password.length < 8) {
    //   return updateError("Password must contain minimum of 8 characters!", setError);
    // }
    if (form.password !== form.confirmPassword) {
      return updateError("Passwords does not match!", setError);
    }
    if (!isPassword(form.password))
      return updateError(
        "Password must contain Minimum eight characters, at least one letter, one number and one special character!",
        setError
      );

    return true;
  };
  const signInPressed = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const responces = await Client.post("/signup", { ...form });
        if (responces.data.success) {
          const res = await Client.post("/requestEmailVerification", {
            email: responces.data.message.email,
          });
          // {
          //   res.success && (
          //     <Alert severity="info">
          //       <AlertTitle>Success</AlertTitle>
          //       verifcation email sent successfully —{" "}
          //       <strong>check it out!</strong>
          //     </Alert>
          //   )
          // }
          return res;
        } else {
          return updateError("User already exist", setError);
        }
      } catch (error) {
        return updateError("Something went wrong!!!", setError);
      }
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid>
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

        <Typography component="h1" variant="h3">
          <div className="line2nd">
            <span
              style={{ color: "#87ceeb", fontWeight: "900", fontSize: "60px" }}
            >
              Index
            </span>
            <span
              style={{ color: "#112c48", fontWeight: "900", fontSize: "60px" }}
            >
              Cloud
            </span>
          </div>
        </Typography>
      </Box>
      <form
        className="form"
        style={{
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          <b> Sign up</b>
        </Typography>
        <br />
        <Grid container spacing={2} className="field">
          <Input
            name="firstName"
            label="First Name"
            handleChange={handleChange}
            autoFocus
            half
          />
          <Input
            name="lastName"
            label="Last Name"
            handleChange={handleChange}
            half
          />
          <Input
            name="mobile_no"
            label="Contact number"
            handleChange={handleChange}
          />
          <Input
            name="street"
            label="Street address"
            handleChange={handleChange}
          />
          <Input name="city" label="City" handleChange={handleChange} half />
          <Input
            name="district"
            label="District"
            handleChange={handleChange}
            half
          />
          <Input
            name="email"
            label="Email Address"
            handleChange={handleChange}
            type="email"
          />
          <Input
            name="password"
            label="Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            half
          />
          <Input
            name="confirmPassword"
            label="Repeat Password"
            handleChange={handleChange}
            type="password"
            half
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
          sx={{
            backgroundColor: "#001E3C",
            minWidth: "80%",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: 50,
            marginTop: "20px",
          }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Button onClick={signInPressed}>
              Already have an account? Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
