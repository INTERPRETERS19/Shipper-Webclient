import { useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import "./Reports.css";
import SideBar from "../../../components/Sidebar";

import { ShipmentContext } from "../../../context/ShipmentProvider/ShipmentProvider";
import ReportComponent from "../../../components/ReportComponent";

export const Reports = () => {
  const { allShipments, getAllShipments } = useContext(ShipmentContext);
  useEffect(() => {
    getAllShipments();
  }, []);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().max(
        new Date(),
        "Start date cannot be in the future"
      ),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date cannot be before start date")
        .max(new Date(), "End date cannot be in the future"),
    }),
    onSubmit: (values, formikActions) => {
      if (allShipments !== undefined) {
        const reportShipments = allShipments.data.filter(
          (shipment) =>
            shipment.created_at >= values.startDate &&
            shipment.created_at <= values.endDate
        );
        const newShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "New"
        ).length;

        const pickupShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "PickUp"
        ).length;

        const pendingShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "OutForDelivery"
        ).length;

        const deliveredShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "Delivered"
        ).length;

        const rescheduledShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "Rescheduled"
        ).length;

        const failToDeliveryShipments = reportShipments.filter(
          (shipment) => shipment.current_status === "FailToDeliver"
        ).length;

        let totalCOD = 0;
        reportShipments.forEach((shipment) => {
          totalCOD += shipment.COD;
        });

        let totalDV = 0;
        reportShipments.forEach((shipment) => {
          totalDV += shipment.DV;
        });

        ReportComponent(
          reportShipments,
          values.startDate,
          values.endDate,
          newShipments,
          pickupShipments,
          pendingShipments,
          deliveredShipments,
          rescheduledShipments,
          failToDeliveryShipments,
          reportShipments.length,
          totalCOD,
          totalDV
        );
      }
    },
  });

  return (
    <div className="ReportS">
      <SideBar />
      <div className="mainS">
        <div className="title">
          <h1 style={{ padding: "20px" }}>Shipment Report</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={formik.handleSubmit}>
              <br />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.startDate && formik.errors.startDate
                )}
                helperText={formik.touched.startDate && formik.errors.startDate}
                label="Start date"
                margin="normal"
                name="startDate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                value={formik.values.startDate}
                variant="outlined"
                sx={{ minWidth: "400px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />

              <TextField
                error={Boolean(formik.touched.endDate && formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                label="End date"
                margin="normal"
                name="endDate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                value={formik.values.endDate}
                variant="outlined"
                sx={{ minWidth: "400px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />
              <br />
              <br />

              <Button
                color="primary"
                onClick={formik.resetForm}
                sx={{
                  minWidth: "150px",
                  textTransform: "none",
                  margin: 2,
                  marginLeft: 4,
                }}
                size="large"
                type="reset"
                variant="contained"
              >
                Clear
              </Button>

              <Button
                color="primary"
                sx={{ minWidth: "150px", textTransform: "none", margin: 2 }}
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
