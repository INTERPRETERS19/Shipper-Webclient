import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@mui/material";
import "./fee.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DeliveryFeePlan = () => {
  const [fee, setFee] = useState([]);
  useEffect(() => {
    fetchFee();
  }, []);
  const fetchFee = () => {
    axios
      .get("/feePlan")
      .then((res) => {
        console.log(res.data.data);
        setFee(res.data.data.fee);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <div>
        <Button variant="text" onClick={() => navigate("/shipment/addshipments")} sx={{padding:5, fontSize:"20px"}} startIcon={<ArrowBackIosIcon />} >Go Back</Button>
      <div
        className="item-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        

        {fee.map((fees) => (
          <table key={fees._id} id="fees">
            <div>
              <tr >
                <th >Category</th>
                <th>Delivery Fee (Rs.)</th>
              </tr>{" "}
              <tr>
                <td>Less than or equal to 3kg</td>
                <td>
                  {fees.category1} + Standard Fee ({fees.standard_fee})
                </td>
              </tr>{" "}
            </div>
            <div>
              {" "}
              <tr>
                <td>Greater than 3kg and less than or equal to 6kg</td>
                <td>
                  {fees.category2} + Standard Fee ({fees.standard_fee})
                </td>
              </tr>{" "}
            </div>
            <div>
              {" "}
              <tr>
                {" "}
                <td> Greater than 6kg and less than or equal to 10kg</td>
                <td>
                  {fees.category3} + Standard Fee ({fees.standard_fee})
                </td>
              </tr>{" "}
            </div>
            <div>
              {" "}
              <tr>
                <td> Greater than 10kg and less than or equal to 20kg</td>
                <td>
                  {fees.category4} + Standard Fee ({fees.standard_fee})
                </td>
              </tr>{" "}
            </div>
            <div>
              {" "}
              <td>Greater than 20kg</td>
              <td> {fees.category5} + Standard Fee ({fees.standard_fee}) + { fees.additional} for each additional 1kg weight </td>{" "}
            </div>
          </table>
        ))}
      </div>
    </div>
  );
};



export default DeliveryFeePlan;
