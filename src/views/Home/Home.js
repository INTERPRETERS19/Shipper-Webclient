import React from "react";
import "./Home.css";
import SideBar from "../../components/Sidebar";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
} from "devextreme-react/pie-chart";

import { returnsummary } from "../../components/charts/data";

class Home extends React.Component {
  render() {
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
                <div className="value">366</div>
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
                  <Tooltip
                    enabled={true}
                    customizeTooltip={this.customizeTooltip}
                  >
                    <Format />
                  </Tooltip>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  customizeTooltip(arg) {
    return {
      text: `${(arg.percent * 100).toFixed(2)}%`,
    };
  }
}

export default Home;
