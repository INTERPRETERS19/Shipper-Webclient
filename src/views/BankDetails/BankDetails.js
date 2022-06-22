import Sidebar from "../../components/Sidebar";
import "./BankDetails.css";
import Client from "../../api/Client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BankDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const addDetails = async (values, formikActions) => {
    console.log(currentUser);
    const res = await Client.post("/bank", {
      ...values,
      shipper_id: currentUser.id,
    });
    if (res.data.success) {
      console.log(res.data);
      console.log(currentUser);
    } else {
      console.log(res.data);
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      account_no: "",
      account_holder_name: "",
      branch_code: "",
      branch_name: "",
      bank_name: "",
    },
    validationSchema: Yup.object({
      account_no: Yup.string().required("Account no is required!"),
      account_holder_name: Yup.string().required(
        "Account holder name is required!"
      ),
      branch_code: Yup.string().required("Branch code is required!"),
      branch_name: Yup.string().required("Branch name is required!"),
      bank_name: Yup.string().required("Bank name is required!"),
    }),
    onSubmit: (values, formikActions) => {
      addDetails(values, formikActions);
    },
  });

  return (
    <div className="BankDetails">
      <Sidebar />
      <div className="main">
        <div className="title">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <div className="details">
              <div className="left">
                <div className="BOXX">
                  <h2> Add Bank Details</h2>
                  <br />
                  <div className="container1">
                    <div>
                      <TextField
                        error={Boolean(
                          formik.touched.account_no && formik.errors.account_no
                        )}
                        helperText={
                          formik.touched.account_no && formik.errors.account_no
                        }
                        label="Account No"
                        margin="normal"
                        name="account_no"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.account_no}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          formik.touched.account_holder_name &&
                            formik.errors.account_holder_name
                        )}
                        helperText={
                          formik.touched.account_holder_name &&
                          formik.errors.account_holder_name
                        }
                        label="Account Holder Name"
                        margin="normal"
                        name="account_holder_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.account_holder_name}
                        variant="outlined"
                      />
                      <div>
                        <TextField
                          error={Boolean(
                            formik.touched.branch_code &&
                              formik.errors.branch_code
                          )}
                          helperText={
                            formik.touched.branch_code &&
                            formik.errors.branch_code
                          }
                          label="Branch Code"
                          margin="normal"
                          name="branch_code"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.branch_code}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(
                            formik.touched.branch_name &&
                              formik.errors.branch_name
                          )}
                          helperText={
                            formik.touched.branch_name &&
                            formik.errors.branch_name
                          }
                          label="Branch Name"
                          margin="normal"
                          name="branch_name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.branch_name}
                          variant="outlined"
                        />
                      </div>
                      <TextField
                        error={Boolean(
                          formik.touched.bank_name && formik.errors.bank_name
                        )}
                        helperText={
                          formik.touched.bank_name && formik.errors.bank_name
                        }
                        label="Bank Name"
                        margin="normal"
                        name="bank_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.bank_name}
                        variant="outlined"
                      />
                    </div>
                  </div>
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
                    Add Details
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
