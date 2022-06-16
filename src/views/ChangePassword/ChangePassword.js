import React, { useState } from "react";
import Button from "@mui/material/Button";
//import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../assets/logo2.PNG";
import { useFormik } from "formik";
import * as Yup from "yup";
import login from "../../assets/login.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ChangePassword.css";
import Client from "../../api/Client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";

function ChangePassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  //const [password, setPassword] = useState();

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
    // console.log(res.data);
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
    <div className="logroot" style={{ backgroundColor: "#fff" }}>
      <div className="l">
        <div
          style={{
            textAlign: "left",
            marginLeft: "-100px",
          }}
        >
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>Token is expired or invalid</strong>
            </Alert>
          )}
        </div>
        <section>
          <form onSubmit={formik.handleSubmit}>
            <div className="line1st">Reset</div>
            <div className="line2nd">
              <span Style="color: #75B6D9">Pass</span>word
            </div>
            {/* <label htmlFor="username">Old Password</label> */}
            <div className="contents">
              {/* <label htmlFor="password">New Password</label> */}

              {/* <input
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
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // onBlur={(event) => setPassword(event.target.value)}
              /> */}
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
                sx={{ minWidth: "400px" }}
                InputLabelProps={{
                  style: {
                    fontSize: 14,
                    position: "absolute",
                    top: "-20px",
                    left: "-10px",
                  },
                }}
              />

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
                sx={{ minWidth: "400px" }}
                InputLabelProps={{
                  style: {
                    fontSize: 14,
                    position: "absolute",
                    top: "-20px",
                    left: "-10px",
                  },
                }}
              />

              <Button
                variant="contained"
                // onClick={newPressed}
                type="submit"
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
      </div>{" "}
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
