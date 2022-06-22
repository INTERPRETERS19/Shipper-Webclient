import React, { useState, useEffect } from "react";
import "./Summary.css";
import SideBar from "../../../components/Sidebar";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Client from "../../../api/Client";
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
} from "devextreme-react/pie-chart";
import { Typography } from "@mui/material";
import { fontSize } from "@mui/system";

const RSummary = () => {
  const [FailtoDeliver, setFailtoDeliver] = useState(0);

  const [Rescheduled, setRescheduled] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const returnsummary = [
    {
      return: "Rescheduled",
      val: Rescheduled,
    },

    {
      return: "Failed to Deliver",
      val: FailtoDeliver,
    },
  ];

  const getfailtoDeliver = async () => {
    try {
      const res = await Client.get(`getFailtoDeliver/${currentUser.id}`);
      if (res.data.success) {
        setFailtoDeliver(res.data.count);
        console.log(res.data.count);
        // setCount(res.data.count);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getrescheduled = async () => {
    try {
      const res = await Client.get(`getRescheduled/${currentUser.id}`);
      if (res.data.success) {
        setRescheduled(res.data.count);
        console.log(res.data.count);
        // setCount(res.data.count);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customizeTooltip = (arg) => {
    return {
      text: `${(arg.percent * 100).toFixed(2)}%`,
    };
  };

  useEffect(() => {
    getfailtoDeliver();
  }, []);

  useEffect(() => {
    getrescheduled();
  }, []);

  return (
    <div className="Summary">
      <SideBar />
      <div className="mainH">
        <div>
          <hr
            style={{
              backgroundColor: "#424547",
              height: 0.5,
            }}
          />
        </div>
        <div  style={{ paddingTop: "100px", paddingLeft:"320px"}}>
          {/* <Typography> Returns </Typography> */}
          <h3 style={{fontSize:"30px"}}>Returns Summary</h3>
        </div>

        <div className="Rcontainer">
          {/* <div className="left">
            <div className="wid">
              <h3>Pending Shipments</h3>
              <AccessTimeIcon sx={{ fontSize: "40px" }} />
              <div className="value">{pending}</div>
            </div>
            <div className="wid">
              <h3>Cash Payable</h3>
              <MonetizationOnIcon sx={{ fontSize: "40px" }} />
              <div className="value">LKR 364526</div>
            </div>
            <div className="wid">
              <h3>Cash Receivables</h3>
              <CreditScoreIcon sx={{ fontSize: "40px" }} />
              <div className="value">LKR 366</div>
            </div>
          </div> */}

          <div className="Pie">
            <PieChart
              id="pie"
              type="doughnut"
              //title="Returns Summary"
              palette="Soft Pastel"
              dataSource={returnsummary}
            >
              <Series argumentField="return"></Series>
              <Legend
                margin={50}
                horizontalAlignment="right"
                verticalAlignment="top"
              />
              <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                <Format />
              </Tooltip>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSummary;
