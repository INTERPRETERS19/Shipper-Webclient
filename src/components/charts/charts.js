import React from "react";

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Export,
} from "devextreme-react/pie-chart";

import { returnsummary } from "./data";

class Home extends React.Component {
  render() {
    return (
      <PieChart
        id="pie"
        type="doughnut"
        title="Return Summary"
        palette="#7D9D9C"
        dataSource={returnsummary}
      >
        <Series argumentField="return"></Series>
        <Export enabled={true} />
        <Legend
          margin={0}
          horizontalAlignment="right"
          verticalAlignment="top"
        />
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
          <Format />
        </Tooltip>
      </PieChart>
    );
  }

  customizeTooltip(arg) {
    return {
      text: ${(arg.percent * 100).toFixed(2)}%,
    };
  }
}

export default Home;