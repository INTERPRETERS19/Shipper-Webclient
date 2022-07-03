import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import Client from "../../api/Client";
import SideBar from "../../components/Sidebar";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await Client.get(`/profileShipper/${currentUser.id}`);
      if (res.data.success) {
        console.log(res.data);
        formik.setFieldValue("firstName", res.data.data.firstName);
        formik.setFieldValue("lastName", res.data.data.lastName);
        formik.setFieldValue("street", res.data.data.street);
        formik.setFieldValue("city", res.data.data.city);
        formik.setFieldValue("district", res.data.data.district);
      }
    } catch (err) {
      console.log("Unable to get profile");
    }
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (values, formikActions) => {
    const res = await Client.post(`/updateProfile/${currentUser.id}`, {
      ...values,
    });

    if (res.data.success) {
      console.log("Profile updated successfully");
    } else {
      console.log("Profile update failed");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigate(`/viewprofile`);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      district: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      street: Yup.string(),
      city: Yup.string(),
      district: Yup.string(),
    }),
    onSubmit: (values, formikActions) => {
      updateUser(values, formikActions);
    },
  });

  return (
    <div className="Dashboard">
      <SideBar />
      <div className="main">
        <div className="title">
          <h1>EditProfile</h1>
        </div>
        <div className="container">
          <div className="left">
            <div className="box1">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    error={Boolean(
                      formik.touched.firstName && formik.errors.firstName
                    )}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    label="First Name "
                    margin="normal"
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.firstName}
                    variant="outlined"
                    sx={{ minWidth: "400px" }}
                  />
                  <br />

                  <TextField
                    error={Boolean(
                      formik.touched.lastName && formik.errors.lastName
                    )}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    label="Last Name "
                    margin="normal"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.lastName}
                    variant="outlined"
                    sx={{ minWidth: "400px" }}
                  />
                  <br />

                  <TextField
                    error={Boolean(
                      formik.touched.street && formik.errors.street
                    )}
                    helperText={formik.touched.street && formik.errors.street}
                    label="Street "
                    margin="normal"
                    name="street"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.street}
                    variant="outlined"
                    sx={{ minWidth: "400px" }}
                  />
                  <br />
                  <TextField
                    error={Boolean(formik.touched.city && formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    label="City "
                    margin="normal"
                    name="city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.city}
                    variant="outlined"
                    sx={{ minWidth: "400px" }}
                  />
                  <br />
                  <TextField
                    error={Boolean(
                      formik.touched.district && formik.errors.district
                    )}
                    helperText={
                      formik.touched.district && formik.errors.district
                    }
                    label="District "
                    margin="normal"
                    name="district"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.district}
                    variant="outlined"
                    sx={{ minWidth: "400px" }}
                  />
                  <br />
                  <br />

                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    sx={{ minWidth: "400px", textTransform: "none" }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Update User
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
