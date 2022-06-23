import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
} from "@mui/material";
import "./Reports.css";
import SideBar from "../../../components/Sidebar";
import Client from "../../../api/Client";
export const Reports = () => {
    const navigate = useNavigate();
    const createReport = async (values, formikActions) => {
        const res = await Client.post("/create-machine", {
          ...values,
        });
    
        if (res.data.success) {
          console.log("Machine created successfully");
        }
    
        formikActions.resetForm();
        formikActions.setSubmitting(false);
      };
    
      const formik = useFormik({
        initialValues: {
          id: "",
          name: "",
          status: "Good",
          purchasedDate: "",
          lastMaintenance: "",
          isActuatorPresent: false,
          actuatorId: "",
          actuatorName: "",
        },
        validationSchema: Yup.object({
          id: Yup.string()
            .min(6, "ID should contain at least 6 characters")
            .required("ID is required"),
          name: Yup.string().required("Name is required"),
          status: Yup.string().required("Status is required"),
          purchasedDate: Yup.date().max(
            new Date(),
            "Purchased date cannot be in the future"
          ),
          lastMaintenance: Yup.date()
            .min(
              Yup.ref("purchasedDate"),
              "Maintenance date cannot be before purchased date"
            )
            .max(new Date(), "Maintenance date cannot be in the future"),
          isActuatorPresent: Yup.boolean(),
          actuatorId: Yup.string().when("isActuatorPresent", {
            is: true,
            then: Yup.string().required("Actuator ID is required"),
          }),
          actuatorName: Yup.string().when("isActuatorPresent", {
            is: true,
            then: Yup.string().required("Actuator name is required"),
          }),
        }),
        onSubmit: (values, formikActions) => {
            createReport(values, formikActions);
          navigate("/machines");
        },
      });
    
  return (
    <div className="ReportS">
      <SideBar />
      <div className="mainS">
        <div className="title">
          <h2 style={{ padding: "25px" }}>Shipment Report</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          {/* <Typography sx={{ color: "#e5383b" }}>
            Machine ID cannot be updated later
          </Typography> */}
          {/* <TextField
            error={Boolean(formik.touched.id && formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            label="Machine ID *"
            margin="normal"
            name="id"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.id}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br /> */}

          {/* <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            label="Name *"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br /> */}
          {/* <br />
          <TextField
            error={Boolean(formik.touched.status && formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            label="Status"
            margin="normal"
            name="status"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.status}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            id="outlined-select-status"
            select
          >
            {["Good", "Warning", "Danger"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))} */}
          {/* </TextField> */}
          <br />
          <br />
          <TextField
            error={Boolean(
              formik.touched.purchasedDate && formik.errors.purchasedDate
            )}
            helperText={
              formik.touched.purchasedDate && formik.errors.purchasedDate
            }
            label="Start date Date"
            margin="normal"
            name="purchasedDate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.purchasedDate}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />

          <TextField
            error={Boolean(
              formik.touched.lastMaintenance && formik.errors.lastMaintenance
            )}
            helperText={
              formik.touched.lastMaintenance && formik.errors.lastMaintenance
            }
            label="End date"
            margin="normal"
            name="lastMaintenance"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.lastMaintenance}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          {/* <FormControlLabel
            control={
              <Checkbox
                error={Boolean(
                  formik.touched.isActuatorPresent &&
                    formik.errors.isActuatorPresent
                )}
                helperText={
                  formik.touched.isActuatorPresent &&
                  formik.errors.isActuatorPresent
                }
                name="isActuatorPresent"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.isActuatorPresent}
              />
            }
            label="Does it have Actuator"
          /> */}

          {formik.values.isActuatorPresent ? (
            <>
              <br />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.actuatorId && formik.errors.actuatorId
                )}
                helperText={
                  formik.touched.actuatorId && formik.errors.actuatorId
                }
                label="Actuator ID *"
                margin="normal"
                name="actuatorId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.actuatorId}
                variant="outlined"
                sx={{ minWidth: "400px" }}
              />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.actuatorName && formik.errors.actuatorName
                )}
                helperText={
                  formik.touched.actuatorName && formik.errors.actuatorName
                }
                label="Actuator Name *"
                margin="normal"
                name="actuatorName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.actuatorName}
                variant="outlined"
                sx={{ minWidth: "400px" }}
              />
              <br />
              <br />
            </>
          ) : (
            ""
          )}
          <br />
          <br />

          <Button
            color="primary"
            disabled={formik.resetForm}
            sx={{ minWidth: "150px", textTransform: "none" ,margin:2,marginLeft:4}}
            size="large"
            type="reset"
            variant="contained"
          >
            Clear
          </Button>
        
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ minWidth: "150px", textTransform: "none" ,margin:2}}
            size="large"
            type="submit"
            variant="contained"
          >
            Generate
          </Button>
        </form>
      </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;
