import React, { useState } from "react";
import "./ChangePassword.css";
import Client from "../../api/Client";
import login from "../../assets/1.png";
import logo from "../../assets/logo2.PNG";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//import { useLogin } from "../../context/LoginProvider/LoginProvider";

function ChangePassword() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState({ value: false, message: "" });

  // console.log(currentUser);

  const newPressed = async (values) => {
    const res = await Client.post("/changePassword", {
      oldPassword: values.oldPassword,
      password: values.password,
      userId: currentUser.id,
    });
    if (res.data.success) {
      console.log(res.data);
      navigate("/home");
    } else {
      setError({ value: true, message: res.data.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required!"),
      password: Yup.string()
        .trim()
        .min(8, "Password is too short!")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Letter, One Number and One Special Case Character"
        )
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
    <div className="ChangePassword" style={{}}>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="formAlign">
          <form onSubmit={formik.handleSubmit}>
            <div className="alert">
              {error.value && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>{error.message}</strong>
                </Alert>
              )}
            </div>
            <br />
            <div className="line1">Change</div>
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
                  formik.touched.oldPassword && formik.errors.oldPassword
                )}
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                label="Old Password *"
                margin="normal"
                name="oldPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.oldPassword}
                variant="outlined"
                sx={{ minWidth: "80%" }}
              />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                label="New Password *"
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
        <img src={login} alt="login" />
      </div>
    </div>
  );
}

export default ChangePassword;
