import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Typography, Button, TextField, MenuItem } from "@mui/material";

import Sidebar from "../../../components/Sidebar";
import "./AddShipments.css";
import Client from "../../../api/Client";
import { useNavigate } from "react-router-dom";

const DISTRICTS = [
  "Colombo",
  "Jaffna",
  "Galle",
  "Kandy",
  "Katutara",
  "Gampaha",
  "Ampara",
  "Batticaloa",
  "Mannar",
  "Matale",
  "Trincomalee",
  "Vavuniya",
  "Anuradhapura",
  "Badulla",
  "Hambantota",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Matara",
  "Mullaitivu",
  "Nuwara Eliya",
  "Puttalam",
  "Ratnapura",
  "Monaragala",
  "Polonnaruwa",
];

const AddShipments = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser);
  const shipperid = currentUser.id;
  console.log(shipperid);
  const submitShipments = async (values, formikActions) => {
    try {
      await Client.post("/createsh", {
        ...values,
        shipperid,
      });

      formikActions.resetForm();
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      recipient_name: "",
      r_no_street: "",
      shipment_weight: "",
      mobile_phone_number: "",
      r_district: "",
      DV: "",
      secondary_phone_number: "",
      r_city: "",
      r_postal_code: "",
      description: "",
      quantity: "",
      COD: "",
      prepaid: "",
      handling: "",
      payment_method: "",
    },
    validationSchema: Yup.object({
      recipient_name: Yup.string().required("Recipient name is required"),
      r_no_street: Yup.string().required("Recipient address is required"),
      shipment_weight: Yup.number()
        .positive("Must be greater than 0")
        .required("Shipment weight is required"),
      mobile_phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits")
        .required("Mobile phone number is required"),
      r_district: Yup.string().required("District is required"),
      DV: Yup.number().min(0, "Cannot be less than 0"),
      secondary_phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
      r_city: Yup.string().required("City is required"),
      r_postal_code: Yup.string(),
      description: Yup.string().required("Description is required"),
      quantity: Yup.number()
        .min(1, "Cannot be less than 1")
        .required("Quantity is required"),
      COD: Yup.number()
        .min(0, "Cannot be less than 0")
        .required("COD is required"),
      prepaid: Yup.boolean().required("Prepaid is required"),
      handling: Yup.string().required("Handling is required"),
      payment_method: Yup.string().required("Payment method is required"),
    }),
    onSubmit: (values, formikActions) => {
      submitShipments(values, formikActions);
      navigate("/shipment/addshipments");
    },
    // onReset: (formikActions) => {
    //   console.log("Reset");
    //   formikActions
    // },
  });
  return (
    <div className="AddShipments">
      <Sidebar />
      <div className="main">
        <div className="title">
          <h1> Add Shipments</h1>

          <br />
          <div className="formBox">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(
                      formik.touched.recipient_name &&
                        formik.errors.recipient_name
                    )}
                    helperText={
                      formik.touched.recipient_name &&
                      formik.errors.recipient_name
                    }
                    label="Recipient Name *"
                    margin="normal"
                    name="recipient_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.recipient_name}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.mobile_phone_number &&
                        formik.errors.mobile_phone_number
                    )}
                    helperText={
                      formik.touched.mobile_phone_number &&
                      formik.errors.mobile_phone_number
                    }
                    label="Mobile phone number *"
                    margin="normal"
                    name="mobile_phone_number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.mobile_phone_number}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.secondary_phone_number &&
                        formik.errors.secondary_phone_number
                    )}
                    helperText={
                      formik.touched.secondary_phone_number &&
                      formik.errors.secondary_phone_number
                    }
                    label="Secondary phone number"
                    margin="normal"
                    name="secondary_phone_number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.secondary_phone_number}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.description && formik.errors.description
                    )}
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    label="Description *"
                    margin="normal"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.description}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.prepaid && formik.errors.prepaid
                    )}
                    helperText={formik.touched.prepaid && formik.errors.prepaid}
                    label="Prepaid *"
                    margin="normal"
                    name="prepaid"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.prepaid}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                    id="outlined-select-prepaid"
                    select
                  >
                    {[
                      ["Yes", true],
                      ["No", false],
                    ].map((option) => (
                      <MenuItem key={option[0]} value={option[1]}>
                        {option[0]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    error={Boolean(
                      formik.touched.r_no_street && formik.errors.r_no_street
                    )}
                    helperText={
                      formik.touched.r_no_street && formik.errors.r_no_street
                    }
                    label="Recipient Address *"
                    margin="normal"
                    name="r_no_street"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.r_no_street}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.r_district && formik.errors.r_district
                    )}
                    helperText={
                      formik.touched.r_district && formik.errors.r_district
                    }
                    label="District *"
                    margin="normal"
                    name="r_district"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.r_district}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                    id="outlined-select-r_district"
                    select
                  >
                    {DISTRICTS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    error={Boolean(
                      formik.touched.r_city && formik.errors.r_city
                    )}
                    helperText={formik.touched.r_city && formik.errors.r_city}
                    label="City *"
                    margin="normal"
                    name="r_city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.r_city}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />
                  <TextField
                    error={Boolean(
                      formik.touched.quantity && formik.errors.quantity
                    )}
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                    label="Quantity *"
                    margin="normal"
                    name="quantity"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.quantity}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.handling && formik.errors.handling
                    )}
                    helperText={
                      formik.touched.handling && formik.errors.handling
                    }
                    label="Handling *"
                    margin="normal"
                    name="handling"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.handling}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                    id="outlined-select-handling"
                    select
                  >
                    {["Standard", "Fragile"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    error={Boolean(
                      formik.touched.shipment_weight &&
                        formik.errors.shipment_weight
                    )}
                    helperText={
                      formik.touched.shipment_weight &&
                      formik.errors.shipment_weight
                    }
                    label="Shipment Weight *"
                    margin="normal"
                    name="shipment_weight"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.shipment_weight}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(formik.touched.DV && formik.errors.DV)}
                    helperText={formik.touched.DV && formik.errors.DV}
                    label="Declared Value"
                    margin="normal"
                    name="DV"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.DV}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.r_postal_code &&
                        formik.errors.r_postal_code
                    )}
                    helperText={
                      formik.touched.r_postal_code &&
                      formik.errors.r_postal_code
                    }
                    label="Postal Code"
                    margin="normal"
                    name="r_postal_code"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.r_postal_code}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(formik.touched.COD && formik.errors.COD)}
                    helperText={formik.touched.COD && formik.errors.COD}
                    label="COD value *"
                    margin="normal"
                    name="COD"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.COD}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                  />

                  <TextField
                    error={Boolean(
                      formik.touched.payment_method &&
                        formik.errors.payment_method
                    )}
                    helperText={
                      formik.touched.payment_method &&
                      formik.errors.payment_method
                    }
                    label="Payment Method *"
                    margin="normal"
                    name="payment_method"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.payment_method}
                    variant="outlined"
                    sx={{ minWidth: "350px" }}
                    id="outlined-select-payment-method"
                    select
                  >
                    {["Cash", "Card"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <br />
              <div className="button_align">
                {/* <Button
                  color="primary"
                  sx={{
                    minWidth: "350px",
                    textTransform: "none",
                    backgroundColor: "#495057",
                  }}
                  size="large"
                  //   type="reset"
                  variant="contained"
                  onClick={() => window.location.reload(false)}
                >
                  Clear
                </Button> */}
                <Button
                  disabled={formik.isSubmitting}
                  sx={{
                    minWidth: "200px",
                    textTransform: "none",
                  }}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Shipment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShipments;
