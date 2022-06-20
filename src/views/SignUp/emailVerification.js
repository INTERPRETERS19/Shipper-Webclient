import React, { useState } from "react";
import { Typography, Container, Box, Grid, Avatar, Button } from "@mui/material";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Client from "../../api/Client";
import Input from "./input";

const GetStarted = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const newPressed = async (values) => {
    console.log(searchParams.get("id"));
    const res = await Client.post("/emailVerification", {
      userId: searchParams.get("id"),
      token: searchParams.get("token"),
    });
    if (res.data) {
      navigate("/home");
    } else {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }} >
        <div className="firstline">
          Your email has been verified!
        </div>
        {/* <form className="form">
        <Grid container spacing={2} className="field">
          <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
          <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        </Grid>
      </form> */}

        <Button variant="contained" sx={{ backgroundColor: "#112c48", margin: 6, padding: 3, gap: 9.7, height: 38.27, borderRadius: 3, textDecoration: "none" }} onClick={newPressed}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default GetStarted;

