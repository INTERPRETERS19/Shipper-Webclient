// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Button, TextField, MenuItem, Typography } from "@mui/material";

// import Layout from "components/Layout";
// import client from "api/client";

// const AddUser = () => {
//   const navigate = useNavigate();

//   const createUser = async (values, formikActions) => {
//     const res = await client.post("/create-user", {
//       ...values,
//     });

//     if (res.data.success) {
//       console.log("User created successfully");
//     }

//     formikActions.resetForm();
//     formikActions.setSubmitting(false);
//   };

//   const formik = useFormik({
//     initialValues: {
//       id: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "",
//       managedBy: "",
//     },
//     validationSchema: Yup.object({
//       id: Yup.string()
//         .min(5, "ID should contain at least 5 characters")
//         .required("User ID is required"),
//       firstName: Yup.string().required("First Name is required"),
//       lastName: Yup.string().required("Last Name is required"),
//       email: Yup.string().email("Invalid email!").required("Email is required"),
//       password: Yup.string()
//         .trim()
//         .min(8, "Password is too short!")
//         .required("Password is required!"),
//       confirmPassword: Yup.string().equals(
//         [Yup.ref("password"), null],
//         "Password does not match!"
//       ),
//       role: Yup.string().required("Role is required"),
//       managedBy: Yup.string().when("role", {
//         is: "supervisor",
//         then: Yup.string().required("Manager ID is required"),
//       }),
//     }),
//     onSubmit: (values, formikActions) => {
//       createUser(values, formikActions);
//       navigate("/users");
//     },
//   });

//   return (
//     <Layout title="Add User">
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <form onSubmit={formik.handleSubmit}>
//           <Typography sx={{ color: "#e5383b" }}>
//             User ID cannot be updated later
//           </Typography>
//           <TextField
//             error={Boolean(formik.touched.id && formik.errors.id)}
//             helperText={formik.touched.id && formik.errors.id}
//             label="User ID *"
//             margin="normal"
//             name="id"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="text"
//             value={formik.values.id}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(formik.touched.firstName && formik.errors.firstName)}
//             helperText={formik.touched.firstName && formik.errors.firstName}
//             label="First Name *"
//             margin="normal"
//             name="firstName"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="text"
//             value={formik.values.firstName}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(formik.touched.lastName && formik.errors.lastName)}
//             helperText={formik.touched.lastName && formik.errors.lastName}
//             label="Last Name *"
//             margin="normal"
//             name="lastName"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="text"
//             value={formik.values.lastName}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(formik.touched.email && formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//             label="Email *"
//             margin="normal"
//             name="email"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="email"
//             value={formik.values.email}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(formik.touched.password && formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             label="Password *"
//             margin="normal"
//             name="password"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="password"
//             value={formik.values.password}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//             )}
//             helperText={
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//             }
//             label="Confirm Password *"
//             margin="normal"
//             name="confirmPassword"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="password"
//             value={formik.values.confirmPassword}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//           />
//           <br />

//           <TextField
//             error={Boolean(formik.touched.role && formik.errors.role)}
//             helperText={formik.touched.role && formik.errors.role}
//             label="Role *"
//             margin="normal"
//             name="role"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="text"
//             value={formik.values.role}
//             variant="outlined"
//             sx={{ minWidth: "400px" }}
//             id="outlined-select-role"
//             select
//           >
//             {["supervisor", "manager", "admin"].map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>

//           {formik.values.role === "supervisor" ? (
//             <>
//               <br />
//               <br />
//               <TextField
//                 error={Boolean(
//                   formik.touched.managedBy && formik.errors.managedBy
//                 )}
//                 helperText={formik.touched.managedBy && formik.errors.managedBy}
//                 label="Manager ID *"
//                 margin="normal"
//                 name="managedBy"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 type="text"
//                 value={formik.values.managedBy}
//                 variant="outlined"
//                 sx={{ minWidth: "400px" }}
//               />
//             </>
//           ) : (
//             ""
//           )}
//           <br />
//           <br />

//           <Button
//             color="primary"
//             disabled={formik.isSubmitting}
//             sx={{ minWidth: "400px", textTransform: "none" }}
//             size="large"
//             type="submit"
//             variant="contained"
//           >
//             Add User
//           </Button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default AddUser;
