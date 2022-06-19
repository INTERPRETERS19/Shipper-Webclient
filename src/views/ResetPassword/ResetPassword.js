import React, { useState } from "react";
import "./ResetPassword.css";
import Client from "../../api/Client";
import login from "../../assets/login.jpg";
import logo from "../../assets/logo2.PNG";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);

  const newPressed = async (values) => {
    const res = await Client.post("/resetPassword", {
      password: values.password,
      token: searchParams.get("token"),
      userId: searchParams.get("id"),
    });
    if (res.data) {
      navigate("/home");
    } else {
      setError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .min(8, "Password is too short!")
        .required("Password is required!"),
      confirmPassword: Yup.string().equals(
        [Yup.ref("password"), null],
        "Password does not match!"
      ),
    }),
    onSubmit: (values) => {
      newPressed(values);
    },
  });

  return (
    <div className="ResetPassword">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="formAlign">
          <form onSubmit={formik.handleSubmit}>
            <div className="alert">
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>Token is expired or invalid</strong>
                </Alert>
              )}
            </div>
            <br />
            <div className="line1">Reset</div>
            <div className="line2">
              <p>
                <span Style="color: #75B6D9">Pass</span>word
              </p>
            </div>
            <br />
            <br />
            <div className="contents">
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                label="Password *"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                sx={{ minWidth: "80%" }}
              />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                label="Confirm Password *"
                margin="normal"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
                variant="outlined"
                sx={{ minWidth: "80%" }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
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
              <Box sx={{ height: "10vh" }} />
            </div>
          </form>
        </div>
      </div>

      <div className="right">
        <img src={login} alt="login" />{" "}
      </div>
    </div>
  );
}

export default ResetPassword;
