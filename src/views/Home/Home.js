import React, { useState, useEffect } from "react";
import "./Home.css";
import SideBar from "../../components/Sidebar";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Client from "../../api/Client";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
} from "devextreme-react/pie-chart";

const Home = () => {
  const [pending, setPending] = useState(0);
  const [FailtoDeliver, setFailtoDeliver] = useState(0);
  const [PickUp, setPickUp] = useState(0);
  const [Rescheduled, setRescheduled] = useState(0);
  const [OutForDelivery, setOutForDelivery] = useState(0);
  const [New, setNew] = useState(0);
  const [Delivered, setDelivered] = useState(0);
  const [Recievable, setRecievable] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const returnsummary = [
    {
      return: "Resheduled",
      val: Rescheduled,
    },
    {
      return: "OutForDelivery",
      val: OutForDelivery,
    },
    {
      return: "Delivered",
      val: Delivered,
    },
    {
      return: "Fail To Deliver",
      val: FailtoDeliver,
    },
    {
      return: "New Shipment",
      val: New,
    },
    {
      return: "Pickup request",
      val: PickUp,
    },
  ];

  const getpendings = async () => {
    try {
      const res = await Client.get(`getpending/${currentUser.id}`);
      if (res.data.success) {
        setPending(res.data.count);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getrecievable = async () => {
    try {
      const res = await Client.get(`getRecievable/${currentUser.id}`);
      if (res.data.success) {
        setRecievable(res.data.SumDV);
        console.log(res.data.SumDV);
        console.log("Success");
        console.log(pending);
      } else {
        console.log("Failed");
        console.log(pending);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getfailtoDeliver = async () => {
    try {
      const res = await Client.get(`getFailtoDeliver/${currentUser.id}`);
      if (res.data.success) {
        setFailtoDeliver(res.data.count);
        console.log(res.data.count);
        // setCount(res.data.count);
        console.log("Success");
        console.log(pending);
      } else {
        console.log("Failed");
        console.log(pending);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getpickUp = async () => {
    try {
      const res = await Client.get(`getPickUp/${currentUser.id}`);
      if (res.data.success) {
        setPickUp(res.data.count);
        console.log(res.data.count);
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
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getoutForDelivery = async () => {
    try {
      const res = await Client.get(`getOutForDelivery/${currentUser.id}`);
      if (res.data.success) {
        setOutForDelivery(res.data.count);
        console.log(res.data.count);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getnew = async () => {
    try {
      const res = await Client.get(`getNew/${currentUser.id}`);
      if (res.data.success) {
        setNew(res.data.count);
        console.log(res.data.count);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getdelivered = async () => {
    try {
      const res = await Client.get(`getDelivered/${currentUser.id}`);
      if (res.data.success) {
        setDelivered(res.data.count);
        console.log(res.data.count);
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
    getpendings();
  }, []);

  useEffect(() => {
    getrecievable();
  }, []);

  useEffect(() => {
    getfailtoDeliver();
  }, []);

  useEffect(() => {
    getpickUp();
  }, []);

  useEffect(() => {
    getrescheduled();
  }, []);

  useEffect(() => {
    getoutForDelivery();
  }, []);

  useEffect(() => {
    getnew();
  }, []);

  useEffect(() => {
    getdelivered();
  }, []);

  return (
    <div className="Home">
      <SideBar />
      <div className="mainH">
        <div className="title">
          <h1>IndexCloud</h1>
          <p className="subtile">Welcome back, We've missed you.</p>
        </div>
        <div>
          <hr
            style={{
              backgroundColor: "#424547",
              height: 0.5,
            }}
          />
        </div>
        <div>
          <h2 style={{ padding: "25px" }}>Performance Overview</h2>
        </div>
        <div className="container">
          <div className="left">
            <div className="wid">
              <h3>Pending Shipments</h3>
              <AccessTimeIcon sx={{ fontSize: "40px" }} />
              <div className="value">{pending}</div>
            </div>
            {/* <div className="wid">
              <h3>Cash Payable</h3>
              <MonetizationOnIcon sx={{ fontSize: "40px" }} />
              <div className="value">LKR 364526</div>
            </div> */}
            <div className="wid">
              <h3>Cash Receivables</h3>
              <CreditScoreIcon sx={{ fontSize: "40px" }} />
              <div className="value">LKR {Recievable}</div>
              
            </div>
          </div>

          <div className="right">
            <div className="widBig">
              <PieChart
                id="pie"
                type="doughnut"
                title="Shipment Summary"
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
    </div>
  );
};

export default Home;
