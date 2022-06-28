import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Rating from "@mui/material/Rating";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Client from "../../api/Client";
import SendIcon from "@mui/icons-material/Send";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const images = [
  {
    url: "./delivery.jpg",
    title: "Review Here",
    width: "100%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 550,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "5px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Review() {
  const navigate = useNavigate();

  const submitReview = async (values, formikActions) => {
    try {
      await Client.post("/review", {
        ...values,
      });

      formikActions.resetForm();
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      comment: "",
      rating: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      comment: Yup.string(),
      rating: Yup.number().required("rating is required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values, formikActions) => {
      submitReview(values, formikActions);
      navigate("/review");
    },
  });
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {images.map((image) => (
        <Popup
          contentStyle={{ width: "400px", height: "450px" }}
          trigger={
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc
                style={{
                  backgroundImage: `url("https://img.freepik.com/free-photo/blurred-view-corridor-with-plants_1203-1080.jpg?t=st=1656269987~exp=1656270587~hmac=9ef9a1ec38323453602ae5855e1ffb6128c29845cd89cfbf2dcdba10e0f1e489&w=996")`,
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    fontSize: "20px",
                    fontWeight: "900",
                    // backgroundColor: 'rgb(0, 0, 255);opacity:0.3;',
                    // color: 'rgb(0, 0, 0);opacity:0;',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
          position="center"
        >
          <form onSubmit={formik.handleSubmit}>
            <center>
              <div style={{ paddingTop: "20px" }}>
                {" "}
                <br />
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  name="name"
                  value={formik.values.name}
                  id="filled-required"
                  label="Your Name Here"
                  variant="filled"
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                />
              </div>
              <br />
              <div>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  name="email"
                  value={formik.values.email}
                  id="filled-required"
                  label="Your Email address"
                  variant="filled"
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                />
              </div>
              <br />
              <div>
                <TextField
                  id="filled-multiline-static"
                  label="Write your review here"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  sx={{ width: "300px" }}
                  name="comment"
                  multiline
                  rows={2}
                  variant="filled"
                />
                <br />
              </div>
            </center>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <br />
              <br />
              <Rating
                name="rating"
                error={Boolean(formik.touched.rating && formik.errors.rating)}
                helperText={formik.touched.rating && formik.errors.rating}
                value={formik.values.rating}
                onChange={formik.handleChange}
                sx={{ padding: "20px" }}
              />
            </div>
            <center>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </center>
          </form>
        </Popup>
      ))}
      <div>
        <br />
        <br />
        <br />

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#112c48",
            padding: 3,
            height: 30,
            borderRadius: 3,
            float: "left",
            marginLeft: 7,
          }}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
        >
          Go Back
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            float: "right",
            paddingLeft: "300px",
            flexDirection: "row",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontStyle: "italic" }}>
            {" "}
            "We all need people who will give us feedback. That's how we
            improve."
          </Typography>
        </div>
      </div>
    </Box>
  );
}
