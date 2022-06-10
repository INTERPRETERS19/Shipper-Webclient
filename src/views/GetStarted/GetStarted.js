import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";

const GetStarted = () => {
  return (
    <div className="root">
      <div className="titles">
        <div className="firstline">
          Everything you need to super power your delivery operation
        </div>
        <p>
          Powerful and tested on the field features for your customers, and all
          your teams including admins, delivery hub staff, and delivery drivers
        </p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#112c48",
            margin: 6,
            padding: 3,
            gap: 9.7,
            width: "35%",
            height: 38.27,
            borderRadius: 4,
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;
