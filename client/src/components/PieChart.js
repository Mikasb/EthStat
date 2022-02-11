import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {
  const { defiMap } = props;

  console.log(defiMap);

  let defiProtocolNames = [];
  let transactionData = [];
  for (const property in defiMap) {
    defiProtocolNames.push(defiMap[property].name);
    transactionData.push(defiMap[property].sum);
  }

  const data = {
    labels: defiProtocolNames,
    datasets: [
      {
        label: "Transaction fees spent",
        data: transactionData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(54, 62, 97, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
