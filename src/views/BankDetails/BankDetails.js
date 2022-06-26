import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import "./BankDetails.css";
import Client from "../../api/Client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import ListItemText from "@mui/material/ListItemText";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// function generate(element) {
//   return [0].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   );
// }
// allBankDetails,
// getAllBankDetails,
// deleteBankDetails,
// getdeleteBankDetails,
// updateBankDetails,
// getupdateBankDetails,

//   const deleteBankDetails = async () => {
//     await Client.post(`/deletebank/${currentUser.id}`)
//       .then((response) => {})
//       .catch((err) => {
//         console.log("Unable to get all New BankDetails");
//       });
//   };

//   const updateBankDetails = async () => {
//     await Client.post(`/updatebank/${currentUser.id}`)
//       .then((response) => {
//         setUpdateBankDetails(response.data);
//       })
//       .catch((err) => {
//         console.log("Unable to get all Pickups");
//       });
//   };

//   return (
//     <BankDetailsContext.Provider
//       value={{
//         allBankDetails,
//         getAllBankDetails,
//         deleteBankDetails,
//         getdeleteBankDetails,
//         updateBankDetails,
//         getupdateBankDetails,
//       }}
//     >
//       {props.children}
//     </BankDetailsContext.Provider>
//   );
// };

const BankDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [expanded, setExpanded] = React.useState(false);
  const [allBankDetails, setAllBankDetails] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (bank) => {
    setOpen(true);
    formikUpdate.setFieldValue("account_no", bank.account_no);
    formikUpdate.setFieldValue("account_holder_name", bank.account_holder_name);
    formikUpdate.setFieldValue("branch_code", bank.branch_code);
    formikUpdate.setFieldValue("branch_name", bank.branch_name);
    formikUpdate.setFieldValue("bank_name", bank.bank_name);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { allBankDetails, getAllBankDetails } = useContext(BankDetailsContext);
  // useEffect(() => {
  //   getAllBankDetails();
  // }, []);
  // const { deleteBankDetails, getdeleteBankDetails } =
  //   useContext(BankDetailsContext);
  // useEffect(() => {
  //   getdeleteBankDetails();
  // }, []);
  // const { updateBankDetails, getupdateBankDetails } =
  //   useContext(BankDetailsContext);
  // useEffect(() => {
  //   getupdateBankDetails();
  // }, []);
  // console.log(allBankDetails);
  const getAllBankDetails = async () => {
    const res = await Client.get(`allbank/${currentUser.id}`);
    if (res.data.success) {
      setAllBankDetails(res.data.data);
      console.log(res.data);

      console.log("Success");
    } else {
      console.log("Failed");
    }
  };

  useEffect(() => {
    getAllBankDetails();
  }, []);
  // console.log(allBankDetails);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const addDetails = async (values, formikActions) => {
    const res = await Client.post("/bank", {
      ...values,
      shipper_id: currentUser.id,
    });
    if (res.data.success) {
      console.log(res.data);
    } else {
      console.log(res.data);
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  const updateDetails = async (values, formikActions) => {
    const res = await Client.post(`/updatebank/${values.id}`, {
      account_no: values.account_no,
      account_holder_name: values.account_holder_name,
      branch_code: values.branch_code,
      branch_name: values.branch_name,
      bank_name: values.bank_name,
    });
    if (res.data.success) {
      console.log(res.data);
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

  const formikUpdate = useFormik({
    initialValues: {
      id: "",
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
      updateDetails(values, formikActions);
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
              <div className="right">
                {(allBankDetails !== undefined ? allBankDetails : []).map(
                  (bank) => {
                    return (
                      <Accordion
                        expanded={expanded === bank._id}
                        onChange={handleChange(bank._id)}
                        sx={{ width: "100%" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id={bank._id}
                        >
                          <Typography
                            sx={{
                              width: "80%",
                              flexShrink: 0,
                            }}
                          >
                            {bank.bank_name}
                          </Typography>
                        </AccordionSummary>

                        <ListItem
                          sx={{
                            width: "100%",
                            backgroundColor: "rgba(65, 137, 185, 0.1)",
                          }}
                        >
                          <ListItemText
                            primary="Account Holder Name"
                            secondary={bank.account_holder_name}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                          <ListItemText
                            primary="Branch Code"
                            secondary={bank.branch_code}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Branch Name"
                            secondary={bank.branch_name}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Account Number"
                            secondary={bank.account_no}
                          />
                        </ListItem>
                        <Divider />

                        <AccordionDetails>
                          <Typography>
                            <ListItem
                              secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "#001E3C" }}>
                                  <div>
                                    <Button
                                      variant=""
                                      onClick={() => handleClickOpen(bank)}
                                    >
                                      <ModeEditTwoToneIcon />
                                    </Button>
                                    <Dialog open={open} onClose={handleClose}>
                                      <DialogTitle>
                                        Update Bank Details
                                      </DialogTitle>
                                      <DialogContent>
                                        <DialogContentText>
                                          To update to Bank details, feel free
                                          to change the information within the
                                          form. We will update everything for
                                          you.
                                        </DialogContentText>

                                        <TextField
                                          error={Boolean(
                                            formikUpdate.touched.account_no &&
                                              formikUpdate.errors.account_no
                                          )}
                                          helperText={
                                            formikUpdate.touched.account_no &&
                                            formikUpdate.errors.account_no
                                          }
                                          label="Account No"
                                          margin="normal"
                                          name="account_no"
                                          onBlur={formikUpdate.handleBlur}
                                          onChange={formikUpdate.handleChange}
                                          type="text"
                                          value={formikUpdate.values.account_no}
                                          variant="outlined"
                                          fullWidth
                                        />
                                        <TextField
                                          error={Boolean(
                                            formikUpdate.touched
                                              .account_holder_name &&
                                              formikUpdate.errors
                                                .account_holder_name
                                          )}
                                          helperText={
                                            formikUpdate.touched
                                              .account_holder_name &&
                                            formikUpdate.errors
                                              .account_holder_name
                                          }
                                          label="Account Holder Name"
                                          margin="normal"
                                          name="account_holder_name"
                                          onBlur={formikUpdate.handleBlur}
                                          onChange={formikUpdate.handleChange}
                                          type="text"
                                          value={
                                            formikUpdate.values
                                              .account_holder_name
                                          }
                                          variant="outlined"
                                          fullWidth
                                        />

                                        <TextField
                                          error={Boolean(
                                            formikUpdate.touched.branch_code &&
                                              formikUpdate.errors.branch_code
                                          )}
                                          helperText={
                                            formikUpdate.touched.branch_code &&
                                            formikUpdate.errors.branch_code
                                          }
                                          label="Branch Code"
                                          margin="normal"
                                          name="branch_code"
                                          onBlur={formikUpdate.handleBlur}
                                          onChange={formikUpdate.handleChange}
                                          type="text"
                                          value={
                                            formikUpdate.values.branch_code
                                          }
                                          variant="outlined"
                                          fullWidth
                                        />
                                        <TextField
                                          error={Boolean(
                                            formikUpdate.touched.branch_name &&
                                              formikUpdate.errors.branch_name
                                          )}
                                          helperText={
                                            formikUpdate.touched.branch_name &&
                                            formikUpdate.errors.branch_name
                                          }
                                          label="Branch Name"
                                          margin="normal"
                                          name="branch_name"
                                          onBlur={formikUpdate.handleBlur}
                                          onChange={formikUpdate.handleChange}
                                          type="text"
                                          value={
                                            formikUpdate.values.branch_name
                                          }
                                          variant="outlined"
                                          fullWidth
                                        />

                                        <TextField
                                          error={Boolean(
                                            formikUpdate.touched.bank_name &&
                                              formikUpdate.errors.bank_name
                                          )}
                                          helperText={
                                            formikUpdate.touched.bank_name &&
                                            formikUpdate.errors.bank_name
                                          }
                                          label="Bank Name"
                                          margin="normal"
                                          name="bank_name"
                                          onBlur={formikUpdate.handleBlur}
                                          onChange={formikUpdate.handleChange}
                                          type="text"
                                          value={formikUpdate.values.bank_name}
                                          variant="outlined"
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleClose}>
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={formikUpdate.handleSubmit}
                                        >
                                          Subscribe
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
                                </Avatar>
                              </ListItemAvatar>
                            </ListItem>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
