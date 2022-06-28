import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import Client from "../../api/Client";
import AddImage from "./AddImage";

const UpdateProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await Client.get(`/profileShipper/${currentUser.id}`);
      if (res.data.success) {
        formik.setFieldValue("firstName", res.data.data.profile.firstName);
        formik.setFieldValue("lastName", res.data.lastName);
        formik.setFieldValue("email", res.data.mobile_no);
        formik.setFieldValue("street", res.data.street);
        formik.setFieldValue("city", res.data.city);
        formik.setFieldValue("district", res.data.district);
      }
    } catch (err) {
      console.log("Unable to get profile");
    }
  };
  useEffect(() => {
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (values, formikActions) => {
    const res = await Client.post("/updateProfile", {
      ...values,
    });

    if (res.data.success) {
      console.log("Profile updated successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigate(`/updateProfile/${currentUser.id}`);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile_no: "",
      street: "",
      city: "",
      district: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      mobile_no: Yup.string()
        .min(10, "Mobile no should contain at least 10 characters")
        .max(10, "Mobile no should contain maximum 10 characters"),
      street: Yup.string(),
      city: Yup.string(),
      district: Yup.string(),
    }),
    onSubmit: (values, formikActions) => {
      updateUser(values, formikActions);
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
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
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
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
          error={Boolean(formik.touched.mobile_no && formik.errors.mobile_no)}
          helperText={formik.touched.mobile_no && formik.errors.mobile_no}
          label="Mobile No "
          margin="normal"
          name="mobile_no"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.mobile_no}
          variant="outlined"
          sx={{ minWidth: "400px" }}
        />
        <br />
        <TextField
          error={Boolean(formik.touched.street && formik.errors.street)}
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
          error={Boolean(formik.touched.district && formik.errors.district)}
          helperText={formik.touched.district && formik.errors.district}
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
          href={`/profile/profile`}
          sx={{ minWidth: "400px", textTransform: "none" }}
          size="large"
          type="submit"
          variant="contained"
        >
          Update User
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;








