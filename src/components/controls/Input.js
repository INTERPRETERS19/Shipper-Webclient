import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      style={{ padding: "15px", marginBottom: "0.1px", marginTop: "0.1px" }}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
