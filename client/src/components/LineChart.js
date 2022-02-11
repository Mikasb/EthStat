import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  const { transDates } = props;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transactions by date",
      },
    },
  };
  let yearMonthLabel = [];
  let numberOfTransactions = [];
  if (transDates !== undefined) {
    yearMonthLabel = Object.keys(transDates);
    numberOfTransactions = Object.values(transDates);
  }

  const data = {
    labels: yearMonthLabel,
    datasets: [
      {
        label: "Monthly transactions",
        data: numberOfTransactions,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
