import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="GetStarted">
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
          onClick={() => navigate("/login")}
          sx={{
            backgroundColor: "#112c48",
            margin: 6,
            padding: 3,
            gap: 9.7,
            height: 38.27,
            borderRadius: 3,
            // textDecoration: "none",
          }}
        >
          Get Started
        </Button>
      </div>
      <div>
      <Button
          variant="contained"
          onClick={() => navigate("/review")}
          sx={{
            backgroundColor: "#112c48",
            marginRight: 7,
            padding: 3,
            gap: 1,
            height: 30,
            borderRadius: 3,
            float: "right"
            // textDecoration: "none",
          }}
          endIcon={<DoubleArrowIcon />}
        >
          Add Review</Button>
      </div>
    </div>
  );
};

export default GetStarted;
