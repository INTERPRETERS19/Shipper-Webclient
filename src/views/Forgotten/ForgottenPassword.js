import React, { useState } from "react";
import forgot from "./forgot.png";
import logo from "../../assets/logo2.PNG";
import Client from "../../api/Client";
import "./Forgotten.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function ForgottenPassword() {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const submitPressed = async (values) => {
    console.log({ ...values });
    const res = await Client.post("/requestResetPassword", {
      email: values.email,
    });
    console.log(res.data);

    if (res.data.success) {
      setSuccess(true);
      console.log(res.data.link);
    } else {
      setSuccess(false);
    }
    console.log(res.data.success);
  };

  const backPressed = async () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Must be a valid email")
        .required("Email is required!"),
    }),
    onSubmit: (values) => {
      submitPressed(values);
    },
  });

  return (
    <div className="Forgotten">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="forgot">
          <img src={forgot} alt="forgot" />
        </div>
      </div>

      <div className=" right">
        <div className=" content">
          <Stack sx={{ width: "100%" }} spacing={2}>
            {success && (
              <Alert severity="info">
                <AlertTitle>Success</AlertTitle>
                Reset password link sent successfully —{" "}
                <strong>check it out!</strong>
              </Alert>
            )}
            {success === false && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong> Invalid E-mail !!! </strong>
              </Alert>
            )}
          </Stack>
          <div className="heading">
            <div className="line1">Reset your</div>
            <div className="line2">
              <span Style="color: #75B6D9">Pass</span>word
            </div>
          </div>
          <br />
          <br />
          <p>
            Please enter your E-mail to receive the link to reset your password.
          </p>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="E-mail"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
            sx={{ minWidth: "80%" }}
          />
          {/* <input
            type="text"
            placeholder="E-mail"
            value={email}
            onBlur={(event) => setEmail(event.target.value)}
          /> */}
          <br />
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            sx={{
              backgroundColor: "#001E3C",
              minWidth: "80%",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: 50,
            }}
          >
            Submit
          </Button>
          <br />
          <br />
          <div className="back">
            <Button
              onClick={backPressed}
              variant="text"
              sx={{
                height: 50,
              }}
            >
              <ArrowBackIosNewIcon /> Back to Log-In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgottenPassword;
